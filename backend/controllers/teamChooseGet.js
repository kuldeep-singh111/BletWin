const Lineup = require("../models/Lineup.js");
const Team = require("../models/Team.js");
const { Match } = require("../models/matches.js");
const mongoose = require("mongoose");

const TeamChooseGet = async (req, res) => {



    try {
        const { matchId } = req.params;





        //  Validate Match ID Format
        if (!matchId || !mongoose.Types.ObjectId.isValid(matchId)) {
            return res.status(400).json({ success: false, message: "Invalid or missing Match ID." });
        }

        //  Fetch Match Details from Database
        const match = await Match.findById(matchId);
        if (!match) {
            return res.status(404).json({ success: false, message: "Match not found." });
        }

        const { home_team, away_team } = match; //  Dynamic Team Names



        //  Fetch Players from Lineup Collection (Only from Database)
        const homePlayers = await Lineup.find({ matchId, teamName: home_team });
        const awayPlayers = await Lineup.find({ matchId, teamName: away_team });



        //  If No Players Found, Return Empty Data
        if (homePlayers.length === 0 && awayPlayers.length === 0) {
            return res.status(404).json({ success: false, message: "No lineup data found for this match." });
        }

        //  Success Response
        return res.status(200).json({
            success: true,
            homeTeam: { teamName: home_team, players: homePlayers },
            awayTeam: { teamName: away_team, players: awayPlayers }
        });

    } catch (error) {
        console.error("Error Fetching Lineup:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};


//  Team Choose POST Route
const TeamChoosePost = async (req, res) => {
    const { matchId } = req.params;
    const { selectedPlayers, selectedSubstitutes } = req.body;
    const userId = req.user.id;

    if (!matchId) {
        return res.status(400).json({ message: "Match ID is required." });
    }

    if (!Array.isArray(selectedPlayers) || !Array.isArray(selectedSubstitutes)) {
        return res.status(400).json({ message: "Selected players and substitutes must be arrays." });
    }

    if (selectedPlayers.length !== 12) {
        return res.status(400).json({ message: "You must select exactly 12 players." });
    }

    if (selectedSubstitutes.length !== 2) {
        return res.status(400).json({ message: "You must select exactly 2 substitutes." });
    }

    try {
        const existingTeams = await Team.countDocuments({ userId, matchId });
        if (existingTeams >= 10) {
            return res.status(400).json({ message: "You can create a maximum of 10 teams for this match." });
        }

        const existingTeam = await Team.findOne({ userId, matchId });
        if (existingTeam) {
            existingTeam.selectedPlayers = selectedPlayers;
            existingTeam.substitutes = selectedSubstitutes;
            await existingTeam.save();
            return res.status(200).json({ message: "Team updated successfully.", selectedPlayers, selectedSubstitutes });
        }

        const newTeam = new Team({
            userId,
            matchId,
            selectedPlayers,
            substitutes: selectedSubstitutes,
        });

        await newTeam.save();
        return res.status(201).json({ message: "Team created successfully.", selectedPlayers, selectedSubstitutes });
    } catch (error) {
        res.status(500).json({ message: "Error saving team", error: error.message });
    }
};

const createLineUp = async (req, res) => {
    try {
        const { matchId, homeTeamPlayers, awayTeamPlayers, homeTeam, awayTeam } = req.body;
        // console.log('payload', matchId, homeTeamPlayers, awayTeamPlayers, homeTeam, awayTeam);

        const homePlayers = homeTeamPlayers.map((player, index) => ({
            matchId,
            teamName: homeTeam,
            // teamName: "India",
            playerId: index,
            playerName: player,
            position: player.position?.name || "Unknown"
        }));

        const awayPlayers = awayTeamPlayers.map((player, index) => ({
            matchId,
            teamName: awayTeam,
            // teamName: "Australia",
            playerId: index,
            playerName: player,
            position: player.position?.name || "Unknown"
        }));

        await Lineup.insertMany([...homePlayers, ...awayPlayers]);
        // console.log([...homePlayers, ...awayPlayers]);
        // return [...homePlayers, ...awayPlayers];
        res.status(201).json({ success: true, message: "Teams created successfully" });

    } catch (error) {
        console.error("Error creating team:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = { TeamChooseGet, TeamChoosePost, createLineUp };
