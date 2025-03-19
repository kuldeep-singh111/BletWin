const User = require('../models/user');
const Contest = require('../models/Contest');
const Team = require('../models/Team');
// const dotenv = require('dotenv');
// dotenv.config();


// Fetch all contests 
const ContestHandle = async (req, res) => {
    // console.log('Contests route hit by user ID:', req.user.id);
    const userId = req.user._id;
    const { matchId } = req.params;

    if (!matchId) {
        return res.status(400).json({ success: false, message: "Match ID is required." });
    }

    try {
        const contests = await Contest.find({ matchId });

        if (!contests || contests.length === 0) {
            console.log('No contests found for user ID:', userId);
            return res.json({ contests: [] });
        }

        const formattedContests = contests.map(contest => ({
            contest_id: contest._id,
            name: contest.name,
            entry_fee: contest.entryFee,
            max_players: contest.maxPlayers,
            prizepool: contest.prizePool,
            players_joined: contest.playersJoined,
            is_full: contest.playersJoined >= contest.maxPlayers,
            match: contest.matchId,
        }));

        // console.log('Formatted contests data for user ID:', userId, formattedContests);
        res.status(200).json({ contests: formattedContests });
    } catch (error) {
        // console.error('Error fetching contests for user ID:', userId, error);
        res.status(500).json({ error: 'Error fetching contests' });
    }
};




// Post Join a contest 
const JoinContest = async (req, res) => {
    const userId = req.user.id;
    let { contestId, matchId } = req.body;

    // console.log(`User ID ${userId} attempting to join contest ID: ${contestId} with match ID: ${matchId}`);

    try {
        // Check if the user has already joined the contest
        const existingEntry = await Contest.findOne({ _id: contestId, "players.userId": userId });

        if (existingEntry) {
            console.warn(`User ID ${userId} has already joined contest ID: ${contestId}`);
            return res.status(400).json({ error: 'You have already joined this contest' });
        }

        // Fetch contest details
        const contest = await Contest.findById(contestId);
        if (!contest) {
            console.warn(`Contest ID ${contestId} not found for user ID: ${userId}`);
            return res.status(404).json({ error: 'Contest not found' });
        }

        const { entryFee, maxPlayers, playersJoined, prizePool } = contest;

        // Check if the contest is full
        if (playersJoined >= maxPlayers) {
            console.warn(`Contest ID ${contestId} is full`);
            return res.status(400).json({ error: 'Contest is full' });
        }

        // Fetch user wallet details
        const user = await User.findById(userId);
        if (!user || !user.wallet) {
            console.warn(`Wallet not found for user ID: ${userId}`);
            return res.status(404).json({ error: 'User wallet not found' });
        }

        const { wallet } = user;
        let remainingFee = parseFloat(entryFee);
        let cashBonusUsed = 0;
        let depositUsed = 0;

        // Handle cash bonus and deposit logic
        if (remainingFee >= 20 && wallet.cashBonus > 0) {
            cashBonusUsed = Math.min(remainingFee * 0.1, wallet.cashBonus);
            remainingFee -= cashBonusUsed;
        }

        if (remainingFee > 0) {
            if (wallet.depositAmount >= remainingFee) {
                depositUsed = remainingFee;
                remainingFee = 0;
            } else {
                console.warn(`Insufficient deposit amount. Remaining fee: $${remainingFee}, Available deposit: ${wallet.depositAmount}`);
                return res.status(400).json({ error: 'Insufficient deposit balance, please add more funds!' });
            }
        }

        // Deduct fees and update wallet
        wallet.cashBonus -= cashBonusUsed;
        wallet.depositAmount -= depositUsed;
        wallet.totalMoney -= entryFee;

        wallet.withdrawableAmount = Math.min(wallet.withdrawableAmount, wallet.totalMoney);
        await user.save();

        console.log(`Wallet updated for user ID ${userId}: Cash bonus deducted: $${cashBonusUsed}, Deposit deducted: $${depositUsed}`);

        // Validate team existence
        const team = await Team.findOne({ userId, matchId });
        if (!team) {
            console.warn(`No team found for user ID: ${userId}`);
            return res.status(404).json({ error: 'No team found for this user in the match' });
        }

        // Add user/team to contest
        contest.playersJoined += 1;
        contest.teams.push(team._id);
        contest.players.push({
            userId: userId,
            totalPoints: 0
        });
        await contest.save();

        console.log(`User ID ${userId} successfully joined contest ID: ${contestId}`);
        res.json({ message: 'Successfully joined the contest', contestId });
    } catch (error) {
        console.error('Error joining contest for user ID:', userId, error);
        res.status(500).json({ error: 'Error joining contest' });
    }
};


//  Check if User has Joined a Contest for a Match
const checkUserContest = async (req, res) => {
    try {
        const { userId, matchId } = req.params;

        //  Check if user has joined any contest for this match
        const contestJoined = await Contest.findOne({ matchId, teams: { $in: [userId] } });

        res.json({ hasJoined: !!contestJoined }); // true if joined, false if not
    } catch (error) {
        console.error("Error checking contest:", error);
        res.status(500).json({ error: "Error checking contest" });
    }
};

// Controller to store data coming from admin panel
const createContest = async (req, res) => {
    try {
        const { name, entryFee, maxPlayers, prizePool, matchId } = req.body;

        // Validate required fields
        if (!name || !entryFee || !maxPlayers || !prizePool || !matchId) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Create a new contest object
        const newContest = new Contest({
            name,
            entryFee,
            maxPlayers,
            prizePool,
            matchId,
            teams: [], // Ensure teams array is set
            players: [] // Initially, no players joined
        });

        // Save contest to the database
        await newContest.save();

        res.status(201).json({ success: true, message: "Contest created successfully", contest: newContest });

    } catch (error) {
        console.error("Error creating contest:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Controller to get all contests for admin
const getAllContests = async (req, res) => {
    try {
        // Fetch contests excluding 'teams' and 'players'
        const contests = await Contest.find({}, { teams: 0, players: 0 });

        if (!contests.length) {
            return res.status(404).json({ success: false, message: "No contest found." });
        }

        // Convert createdAt & updatedAt to human-readable format
        const formattedContests = contests.map(contest => ({
            ...contest.toObject(), // Convert Mongoose document to plain object
            createdAt: new Date(contest.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
            updatedAt: new Date(contest.updatedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
        }));
        // res.status(200).json({ success: true, contests });
        res.status(200).json({ success: true, contests: formattedContests });
    } catch (error) {
        console.error("Error fetching contests:", error);
        res.status(500).json({ success: false, message: "Internal server error!" });
    }
};

// Controller to delete a contest for admin
const deleteContest = async (req, res) => {
    try {
        const { contestId } = req.params; // Extract contest ID from request URL

        if (!contestId) {
            return res.status(400).json({ success: false, message: "Contest ID is required." });
        }

        const deletedContest = await Contest.findByIdAndDelete(contestId);

        if (!deletedContest) {
            return res.status(404).json({ success: false, message: "Contest not found." });
        }
        // console.log(deletedContest);
        res.status(200).json({ success: true, message: "Contest deleted successfully." });

    } catch (error) {
        console.error("Error deleting contest:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

// Controller to update a contest for admin
const updateContest = async (req, res) => {
    try {
        const { contestId } = req.params; // Extract contest ID from request URL
        const updateData = req.body; // Get updated contest data from request body

        if (!contestId) {
            return res.status(400).json({ success: false, message: "Contest ID is required." });
        }

        const updatedContest = await Contest.findByIdAndUpdate(
            contestId,
            updateData,
            { new: true, runValidators: true } // Return updated document & validate fields
        );

        if (!updatedContest) {
            return res.status(404).json({ success: false, message: "Contest not found." });
        }

        res.status(200).json({ success: true, message: "Contest updated successfully.", contest: updatedContest });
    } catch (error) {
        console.error("Error updating contest:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

module.exports = { ContestHandle, JoinContest, checkUserContest, createContest, getAllContests, deleteContest, updateContest };