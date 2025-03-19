'use client';
import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import Navbar from '@/components/Navbar';
import withAuth from "../../hoc/withAuth.js";
import apiService from "@/components/apiService.js";
import { useUser } from '@/context/AuthContext.js';
import React from 'react';

function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortType, setSortType] = useState(null);
    const [contestId, setContestId] = useState(null);
    const [matchId, setMatchId] = useState(null);

    const { user } = useUser();

    useEffect(() => {
        const storedMatchId = localStorage.getItem("matchId");
        if (storedMatchId) {
            setMatchId(storedMatchId);
            fetchLeaderboard(storedMatchId);
        } else {
            console.log("Match ID not found in LocalStorage");
            setLoading(false);
        }
    }, []);

    const fetchLeaderboard = async (matchId) => {
        if (!matchId) {
            console.log("Match ID not found!");
            return;
        }
        matchId = matchId.replace(/^"|"$/g, '')
        try {

            // console.log("Sending matchId to backend:", matchId);
            const response = await apiService.fetchData(`/leaderboard?matchId=${matchId}`);
            if (response.data?.contests.length > 0) {
                setLeaderboardData(response.data.contests[0].players);
                setContestId(response.data.contests[0].contestId);
            } else {
                setLeaderboardData([]);
                setContestId(null);
            }
        } catch (error) {
            console.log("Error fetching leaderboard:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCalculateScores = async () => {
        if (!matchId) {
            console.log("Match ID not found!");
            return;
        }
        try {
            await apiService.postData("/leaderboard/calculate/scores", { matchId: matchId.trim() });
            fetchLeaderboard(matchId);
        } catch (error) {
            console.log("Error calculating scores:", error);
        }
    };

    const handleFinalizeMatch = async () => {
        if (!contestId) {
            console.log("Contest ID not found!");
            return;
        }
        try {
            await apiService.postData(`/leaderboard/finalize/${contestId}`);
            fetchLeaderboard(matchId);
        } catch (error) {
            console.log("Error finalizing match:", error);
        }
    };

    const handleSort = (type) => {
        setSortType(type);
        const sortedData = [...leaderboardData].sort((a, b) => {
            if (type === "rank") return a.rank - b.rank;
            if (type === "points") return b.score - a.score;
            if (type === "winning") return b.winning - a.winning;
            return 0;
        });
        setLeaderboardData(sortedData);
    };

    if (loading) {
        return <p className="text-center text-white text-2xl">Loading...</p>;
    }

    return (
        <div className="min-h-screen pt-20 flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url(/Images/leaderboardBackground.jpeg)" }}>

            <Navbar />

            <div className="w-full max-w-4xl mx-auto text-center p-8 bg-opacity-50 bg-white rounded-lg shadow-lg">
                <div className="text-[#152669DB] sm:text-xl md:text-2xl lg:text-3xl font-alegreya font-semibold">
                    <div>WHERE PASSION MEETS PERSEVERANCE,</div>
                    <p>
                        VICTORY FINDS ITS PLACE ON THE
                        <span className="text-[#305612] font-bold"> LEADERBOARD</span>.
                    </p>
                </div>

                <div className="my-5 text-2xl sm:text-3xl font-aleo font-bold">
                    <div>Hii, {user.username}</div>
                </div>

                <div className="bg-[#5672B8]/30 shadow-lg rounded-xl p-3 pb-5">
                    <div className="w-full sm:w-1/2 mx-auto">
                        <Button text="Live Contest" color="white" />
                    </div>

                    <div className="bg-[#040B29DB]/50 backdrop-blur-md shadow-lg w-full h-60 sm:h-72 rounded-lg mt-3 overflow-y-auto p-3">
                        {leaderboardData.length > 0 ? (
                            <ul className="text-white text-left">
                                {leaderboardData.map((player, index) => (
                                    <li key={index} className="flex justify-between sm:justify-start sm:flex-row flex-col border-b border-gray-500 p-2">
                                        <span className="w-full sm:w-1/4 text-center">#{player.rank}</span>
                                        <span className="w-full sm:w-1/4 text-center">{player.username}</span>
                                        <span className="w-full sm:w-1/4 text-center">{player.score} pts</span>
                                        <span className="w-full sm:w-1/4 text-center text-green-400">${player.winning}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-white text-xl py-5 text-center">No Leaderboard Data</p>
                        )}
                    </div>

                    {/* Sort Buttons Section */}
                    <div className="flex flex-wrap justify-center items-center gap-3 font-medium text-white mt-5">
                        <button
                            onClick={() => handleSort("rank")}
                            className={`bg-[#0A044033] px-4 py-1 rounded-md ${sortType === "rank" ? "bg-green-500 text-white" : ""} sm:px-6`}>
                            Rank
                        </button>
                        <button
                            onClick={() => handleSort("points")}
                            className={`bg-[#0A044033] px-4 py-1 rounded-md ${sortType === "points" ? "bg-blue-500 text-white" : ""} sm:px-6`}>
                            Points
                        </button>
                        <button
                            onClick={() => handleSort("winning")}
                            className={`bg-[#0A044033] px-4 py-1 rounded-md ${sortType === "winning" ? "bg-yellow-500 text-white" : ""} sm:px-6`}>
                            Winning
                        </button>
                    </div>

                    {/* Action Buttons Section */}
                    <div className="flex flex-wrap justify-center items-center mt-5 gap-4">
                        <button
                            onClick={handleCalculateScores}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md sm:px-6">
                            Calculate Scores
                        </button>
                        {/* <button
                            onClick={handleFinalizeMatch}
                            className="bg-red-600 text-white px-4 py-2 rounded-md sm:px-6">
                            Finalize Match
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withAuth(Leaderboard);
