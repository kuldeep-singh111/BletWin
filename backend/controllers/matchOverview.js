const moment = require('moment-timezone');
const { Match } = require('../models/matches');


// Utility function to convert UTC to New York time
function convertToNewYorkTime(dateTime) {
    try {
        const momentDate = moment.utc(new Date(dateTime).toISOString()); //  Ensure Date format

        if (!momentDate.isValid()) {
            throw new Error('Invalid date format. Unable to parse date.');
        }

        return momentDate.tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');


    } catch (error) {
        console.error('Error in convertToNewYorkTime:', error.message);
        throw error;
    }
}


// Function to get matches by status
async function getMatchesByStatus(status) {
    try {
        return await Match.find({ status }).lean();
    } catch (error) {
        console.error(`Error fetching matches with status "${status}":`, error.message);
        throw new Error('Database query failed. Please try again later.');
    }
}

// Function to update match status
async function updateMatchesToLive() {
    try {
        const currentTime = moment().tz('America/New_York').toDate(); //  Get current time as Date

        //  Directly update all matches whose time has passed
        const result = await Match.updateMany(
            { status: 'Upcoming', match_date: { $lte: currentTime } },
            { $set: { status: 'Live' } }
        );

        console.log(` Updated ${result.modifiedCount} matches to Live.`);
    } catch (error) {
        console.error(` Error updating matches to Live:`, error.message);
    }
}


// Route to fetch match overview
const MatchOverview = async (req, res) => {



    try {
        // Fetch matches by status
        const upcomingMatches = await getMatchesByStatus('Upcoming');
        const liveMatches = await getMatchesByStatus('Live');
        const completedMatches = await getMatchesByStatus('Completed');

        // Get current time in New York timezone
        const currentTime = moment().tz('America/New_York');

        // Update matches from 'Upcoming' to 'Live'
        for (const match of upcomingMatches) {
            const matchDateTime = moment(match.match_date);
            if (matchDateTime.isBefore(currentTime)) {
                await updateMatchesToLive(match._id);
            }
        }

        // Re-fetch updated matches
        const [updatedUpcomingMatches, updatedLiveMatches, updatedCompletedMatches] = await Promise.all([
            getMatchesByStatus('Upcoming'),
            getMatchesByStatus('Live'),
            getMatchesByStatus('Completed')
        ]);

        // Process matches
        const limitedUpcomingMatches = updatedUpcomingMatches.slice(0, 16).map(match => {
            try {
                const formattedDateTime = convertToNewYorkTime(new Date(match.match_date).toISOString());


                return {
                    id: match._id,
                    home_team: match.home_team,
                    away_team: match.away_team,
                    match_date: formattedDateTime,
                    status: 'Upcoming',
                    redirect: '/team/choose/' + match._id
                };
            } catch (error) {
                console.error(`Skipping invalid match in Upcoming: ${match._id}`);
                return null;
            }
        }).filter(Boolean);

        const processedLiveMatches = updatedLiveMatches.map(match => {
            try {
                if (!match.match_date) {
                    throw new Error(`Match ID ${match._id} has an invalid match_date`);
                }

                const formattedDateTime = convertToNewYorkTime(new Date(match.match_date).toISOString());

                return {
                    id: match._id,
                    home_team: match.home_team,
                    away_team: match.away_team,
                    match_date: formattedDateTime,
                    status: 'Live',
                    // redirect: '/leaderboard/' + match._id
                };
            } catch (error) {
                console.error(`Skipping invalid match in Upcoming: ${match._id} - ${error.message}`);
                return null;
            }
        }).filter(Boolean);

        const processedCompletedMatches = updatedCompletedMatches.map(match => {
            try {
                const formattedDateTime = convertToNewYorkTime(new Date(match.match_date).toISOString());


                return {
                    id: match._id,
                    home_team: match.home_team,
                    away_team: match.away_team,
                    match_date: formattedDateTime,
                    status: 'Completed',
                    // redirect: '/match/details/' + match._id
                };
            } catch (error) {
                console.error(`Skipping invalid match in Completed: ${match._id}`);
                return null;
            }
        }).filter(Boolean);

        // Send response
        res.json({
            upcoming: limitedUpcomingMatches,
            live: processedLiveMatches,
            completed: processedCompletedMatches
        });
    } catch (error) {
        console.error('Error fetching match overview:', error.message);

        res.status(500).json({
            message: 'An unexpected error occurred while fetching the match overview.',
            error: error.message
        });
    }
};

const createMatch = async (req, res) => {
    try {
        // Extract data from request body
        const { home_team, away_team, match_date, status } = req.body;

        // Validate required fields
        if (!home_team || !away_team || !match_date || !status) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Convert match_date to Date object
        const formattedDate = new Date(match_date);

        // Create a new match document
        const newMatch = new Match({
            home_team,
            away_team,
            match_date: formattedDate,
            status
        });

        // Save match to the database
        await newMatch.save();

        // Send response back to frontend
        res.status(201).json({
            success: true,
            message: "Match created successfully",
            match: newMatch
        });

    } catch (error) {
        console.error("Error creating match:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Controller to delete a match for admin
const deleteMatch = async (req, res) => {
    try {
        const { matchId } = req.params; // Extract Match ID from request URL

        if (!matchId) {
            return res.status(400).json({ success: false, message: "Match ID is required." });
        }

        const deletedMatch = await Match.findByIdAndDelete(matchId);

        if (!deletedMatch) {
            return res.status(404).json({ success: false, message: "Match not found." });
        }
        // console.log(deletedMatch);
        res.status(200).json({ success: true, message: "Match deleted successfully." });
    } catch (error) {
        console.error("Error deleting Match:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

// Controller to update a Match for admin
const updateMatch = async (req, res) => {
    try {
        const { matchId } = req.params; // Extract Match ID from request URL
        const updateData = req.body; // Get updated Match data from request body

        if (!matchId) {
            return res.status(400).json({ success: false, message: "Match ID is required." });
        }

        const updatedMatch = await Match.findByIdAndUpdate(
            matchId,
            updateData,
            { new: true, runValidators: true } // Return updated document & validate fields
        );

        if (!updatedMatch) {
            return res.status(404).json({ success: false, message: "Match not found." });
        }

        res.status(200).json({ success: true, message: "Match updated successfully.", Match: updatedMatch });
    } catch (error) {
        console.error("Error updating Match:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

module.exports = { MatchOverview, createMatch, deleteMatch, updateMatch };
