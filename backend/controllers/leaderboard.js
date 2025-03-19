const User = require('../models/user');
const Contest = require('../models/Contest');
const Team = require('../models/Team');
const PlayerStats = require('../models/PlayerStats');
const mongoose = require('mongoose');

function distributePrizePool(prizePool, numPlayers) {
    let distribution = [];
    if (numPlayers === 2) {
        distribution = [prizePool * 0.44, prizePool * 0.06];
    } else if (numPlayers === 3) {
        distribution = [prizePool * 0.44, prizePool * 0.04, prizePool * 0.02];
    } else if (numPlayers === 4) {
        distribution = [prizePool * 0.44, prizePool * 0.03, prizePool * 0.04, prizePool * 0.02];
    } else if (numPlayers === 5) {
        distribution = [prizePool * 0.44, prizePool * 0.03, prizePool * 0.015, prizePool * 0.01, prizePool * 0.005];
    }
    return distribution;
}



const LeaderBoard = async (req, res) => {

    try {
        let userId = req.user?.id;
        if (!userId) return res.status(401).json({ message: "Unauthorized: User not authenticated." });

        let { matchId } = req.query;

        if (!matchId) {

            return res.status(400).json({ message: " matchId is required." });
        }
        matchId = new mongoose.Types.ObjectId(matchId);

        if (!mongoose.Types.ObjectId.isValid(matchId)) {

            return res.status(400).json({ message: "Invalid matchId format." });
        }

        userId = new mongoose.Types.ObjectId(userId);



        // const userContest = await Contest.findOne({
        //     matchId,
        //     'players.userId': userId,
        // // });
        const userContest = await Contest.findOne({
            matchId: new mongoose.Types.ObjectId(matchId),
            players: { $elemMatch: { userId: new mongoose.Types.ObjectId(userId) } }
        });



        if (!userContest) {
            return res.status(403).json({ message: "You have not joined any contests for this match." });
        }

        // const contests = await Contest.find({
        //     matchId,
        //     'players.userId': userId
        // }).populate({
        //     path: 'players.userId',
        //     select: 'username'
        // });

        const contests = await Contest.find({
            matchId: new mongoose.Types.ObjectId(matchId),
            players: { $elemMatch: { userId: new mongoose.Types.ObjectId(userId) } }
        }).populate({
            path: 'players.userId',
            model: 'user',
            select: 'username'
        });

        if (!contests.length) return res.status(404).json({ message: "No contests found for this match." });

        const contestsWithPlayers = contests.map((contest) => {
            const players = contest.players
                .filter(player => player.userId)
                .map(player => ({
                    username: player.userId.username,
                    score: player.totalPoints || 0,
                    winning: player.winning || 0,

                }));

            players.sort((a, b) => b.score - a.score);
            players.forEach((player, index) => player.rank = index + 1);

            return {
                contestId: contest._id,
                contestName: contest.name,
                entryFee: contest.entryFee,
                prizePool: contest.prizePool,
                players,
            };
        });

        res.status(200).json({ contests: contestsWithPlayers });
    } catch (error) {

        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const Finalize = async (req, res) => {
    try {
        const contestId = req.params.contestId;
        console.log("hey its contest id", contestId);

        const contest = await Contest.findById(contestId).populate({
            path: 'players.userId',
            model: 'user',
        });
        if (!contest) return res.status(404).json({ message: "Contest not found." });

        const { prizePool, players, maxPlayers, entryFee } = contest;
        const numPlayers = players.length;
        if (numPlayers === 0) return res.status(400).json({ message: "No players in this contest." });

        // Sort players based on totalPoints (highest first)
        players.sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0));

        // Prize distribution logic
        const distribution = distributePrizePool(prizePool, numPlayers);

        let winners = new Set(); // Store winner user IDs
        await Promise.all(players.map(async (player, index) => {
            const winningAmount = distribution[index] || 0;
            if (winningAmount > 0) {
                winners.add(String(player.userId._id)); // Mark as winner
                await User.updateOne(
                    { _id: player.userId._id },
                    {
                        $inc: {
                            'wallet.totalMoney': winningAmount,
                            'wallet.withdrawableAmount': winningAmount,
                            'wallet.winningAmount': winningAmount,
                        },
                    }
                );
            }
        }));


        if (numPlayers < maxPlayers && entryFee) {
            const refundAmount = entryFee * 0.9;
            await Promise.all(players.map(async (player) => {

                if (!winners.has(String(player.userId._id))) {
                    await User.updateOne(
                        { _id: player.userId._id },
                        {
                            $inc: {
                                'wallet.totalMoney': refundAmount,
                                'wallet.depositAmount': refundAmount,
                            },
                        }
                    );
                }
            }));
        }

        // Rank calculation
        players.forEach((player, index) => {
            player.rank = index + 1;
        });

        // Save ranks in DB
        await Contest.updateOne({ _id: contestId }, { $set: { players } });

        res.status(200).json({ message: "Match finalized and results saved." });
    } catch (error) {
        console.error('Error finalizing contest:', error);
        return res.status(500).json({ message: error.message });
    }
};


const CalculateScores = async (req, res) => {
    try {
        let { matchId } = req.body;
        console.log(matchId, "first")


        if (!matchId) return res.status(400).json({ message: "matchId is required." });

        matchId = matchId.trim().replace(/^"|"$/g, '');

        if (!mongoose.Types.ObjectId.isValid(matchId)) {
            return res.status(400).json({ message: "Invalid matchId format." });
        }

        matchId = new mongoose.Types.ObjectId(matchId);
        console.log(" Converted matchId:", matchId);

        console.log("your cal id ", matchId)

        const teams = await Team.find({ matchId }).populate('userId', 'username');
        if (!teams.length) return res.status(404).json({ message: "No teams found for this match." });

        // const playerIds = teams.flatMap((team) =>
        //     team.selectedPlayers.map(player => player.playerId)
        // );
        //  Fix: Convert `playerId` to ObjectId and remove invalid values
        const playerIds = teams.flatMap((team) =>
            team.selectedPlayers.map(player => {
                if (typeof player.playerId === "string" && mongoose.Types.ObjectId.isValid(player.playerId)) {
                    return new mongoose.Types.ObjectId(player.playerId);
                } else {

                    return null; // Invalid ID ko ignore karo
                }
            }).filter(id => id !== null) // Null values hatao
        );

        const playerStats = await PlayerStats.find({ matchId, playerId: { $in: playerIds } });

        await Promise.all(
            teams.map(async (team) => {
                let totalPoints = 0;
                team.selectedPlayers.forEach((player) => {
                    const stats = playerStats.find(stat => String(stat.playerId) === String(player.playerId));
                    if (stats) {
                        totalPoints += (stats.goals || 0) * 6;
                        totalPoints += (stats.assists || 0) * 3;
                        totalPoints += Math.floor((stats.shots || 0) / 10) * 1;
                        totalPoints += Math.floor((stats.passes || 0) / 50) * 2;
                        totalPoints += (stats.tackles || 0) * 2;
                        totalPoints += (stats.interceptions || 0) * 2;
                        totalPoints -= (stats.yellowCards || 0) * 1;
                        totalPoints += (stats.penaltiesScored || 0) * 5;
                    }
                });
                await Team.findByIdAndUpdate(team._id, { totalPoints });
            })
        );

        res.status(200).json({ message: "Scores calculated and updated successfully." });
    } catch (error) {
        console.error('Error calculating scores:', error);
        return res.status(500).json({ message: error.message });
    }
};





const createPlayerStat = async (req, res) => {
    try {
        const {
            matchId,
            playerId,
            goals,
            assists,
            shots,
            passes,
            tackles,
            interceptions,
            yellowCards,
            penaltiesScored,
        } = req.body;

        if (!matchId || !playerId) {
            return res.status(400).json({ success: false, message: 'Match ID and Player ID are required' });
        }

        // Creating new player stat entry
        const newPlayerStat = new PlayerStats({
            matchId,
            playerId,
            goals: goals || 0,
            assists: assists || 0,
            shots: shots || 0,
            passes: passes || 0,
            tackles: tackles || 0,
            interceptions: interceptions || 0,
            yellowCards: yellowCards || 0,
            penaltiesScored: penaltiesScored || 0,
        });

        // Save to database
        const savedStat = await newPlayerStat.save();

        return res.status(201).json({
            success: true,
            message: 'Player stats added successfully',
            data: savedStat,
        });
    } catch (error) {
        console.error('Error adding player stats:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};




module.exports = { LeaderBoard, Finalize, CalculateScores, createPlayerStat };







