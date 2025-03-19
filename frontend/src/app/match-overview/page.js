"use client";
import React, { useState, useEffect } from "react";
import withAuth from "../../hoc/withAuth.js";
import apiService from "@/components/apiService.js";
import { useUser } from "@/context/AuthContext.js";
import Link from "next/link.js";
import Navbar from "@/components/Navbar.jsx";
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";

// Custom Loading Page
const LoadingPage = () => (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <div className="animate-spin rounded-full border-4 border-t-4 border-t-blue-400 w-16 h-16 mb-8"></div>
        <h1 className="text-3xl font-bold">Loading, please wait...</h1>
    </div>
);

const MatchOverview = () => {
    const [liveMatches, setLiveMatches] = useState([]);
    const [upcomingMatches, setUpcomingMatches] = useState([]);
    const [completedMatches, setCompletedMatches] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false); // Track data loading

    const { user, wallet } = useUser();
    const router = useRouter();

    useEffect(() => {
        const fetchMatchOverview = async () => {
            try {
                const response = await apiService.fetchData('/match/overview');
                setLiveMatches(response.data?.live || []);
                setUpcomingMatches(response.data?.upcoming || []);
                setCompletedMatches(response.data?.completed || []);
            } catch (error) {
                console.error('Error fetching match data:', error);
            } finally {
                setIsLoaded(true); // Data loaded
            }
        };

        fetchMatchOverview();
    }, []);

    // Handle click for match
    const handleMatchClick = async (match) => {
        if (!user) {
            toast.error("Please log in first.");
            return;
        }

        if (match.status === "Upcoming") {

            router.push(`/team-choose/${match.id}`);
            return;
        }

        if (match.status === "Live") {
            try {
                const response = await apiService.fetchData(`/contest/check-contest/${user._id}/${match.id}`);

                if (response.data.hasJoined) {
                    router.push(`/leaderboard/${match.id}`);
                } else {
                    toast.error("You haven't joined any contest for this match.");
                }
            } catch (error) {
                console.error("Error checking contest:", error);
                toast.error("Something went wrong. Please try again.");
            }
        }
    };

    // Format match date
    const formatMatchDate = (dateString) => {
        return new Date(dateString).toLocaleString("en-US", {
            timeZone: "America/New_York",
            weekday: "short",  // Mon, Tue, etc.
            year: "numeric",
            month: "short",    // Jan, Feb, etc.
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,      // AM/PM format
        });
    };

    // Show custom loading page while data is loading
    if (!isLoaded) {
        return <LoadingPage />;
    }

    if (!user) {
        return <p className="text-center text-white text-2xl">User not found</p>;
    }

    return (
        <div
            className="relative w-full pt-14 min-h-[100vh] bg-cover bg-no-repeat bg-center flex items-center justify-center"
            style={{ backgroundImage: "url(/Images/MatchOverview_background.png)" }}
        >
            <Navbar />
            <div className="absolute inset-0 bg-gray-900 bg-opacity-10"></div>

            <div className="relative z-10 max-w-6xl w-full text-center p-6 text-white bg-gray-300 bg-opacity-[15%] rounded-lg flex flex-col items-center justify-center">
                <h1 className="text-4xl font-abril text-black font-bold mt-5 uppercase drop-shadow-[1px_1px_1px_white]">
                    Every Match Leaves Its Mark –
                </h1>
                <p className="text-3xl font-alegreya mt-4 text-[#0A0440] font-bold uppercase drop-shadow-[1px_1px_1px_white]">
                    A Blend Of Skill, Passion, And Unforgettable Moments That Transcend The Final Score.
                </p>

                <div className="flex flex-wrap justify-center items-center gap-10 mt-6">
                    <p className="text-3xl font-alegreya font-bold text-black drop-shadow-[3px_2px_2px_gray]">
                        Hii, <span>{user.username}</span>
                    </p>
                    <p className="text-2xl font-aleo bg-gray-700 bg-opacity-[70%] text-[#0A0440] font-bold px-6 py-2 rounded-lg">
                        Wallet $ <span className="font-bold text-[#fff]">{wallet?.totalMoney.toFixed(2)}</span>
                    </p>
                    <button className="text-2xl font-aleo bg-gray-700 bg-opacity-[70%] font-bold text-[#0A0440] px-6 py-2 rounded-lg">
                        <Link href={'terms-conditions'} target="_blank" className="hover:underline">
                            Terms & Conditions
                        </Link>
                    </button>
                </div>

                <h2 className="text-4xl font-agbalumo text-[#400404] drop-shadow-[1px_1px_2px_white] mt-10">
                    Match Overview
                </h2>

                <div className="flex flex-col md:flex-row justify-center gap-10 mt-12 w-full">
                    {/* Upcoming Matches */}
                    <div className="flex flex-col items-center w-full sm:w-96">
                        <button className="bg-[linear-gradient(125.26deg,#5672B8_22.66%,rgba(4,11,41,0.86)_59.18%)] text-[#ffffff] text-2xl md:text-xl sm:text-lg font-aleo px-6 py-3 sm:px-4 sm:py-2 rounded-lg w-full">
                            Upcoming Matches
                        </button>
                        <div className="bg-gray-700 bg-opacity-50 w-full h-56 rounded-lg mt-4 overflow-y-auto p-2">
                            {upcomingMatches.length > 0 ? (
                                upcomingMatches.map(match => (
                                    <div key={match.id} className="p-2 bg-gray-800 rounded-lg mb-2 text-white">
                                        <p>{match.home_team} vs {match.away_team}</p>
                                        <p>{formatMatchDate(match.match_date)}</p>
                                        <Link href={`/team-choose/${match.id}`} className="text-blue-400 hover:underline">
                                            Select Team
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p className="p-5 text-lg">No Upcoming Matches!</p>
                            )}
                        </div>
                    </div>

                    {/* Live Matches */}
                    <div className="flex flex-col items-center w-full sm:w-96">
                        <button className="bg-[linear-gradient(125.26deg,#5672B8_22.66%,rgba(4,11,41,0.86)_59.18%)] text-[#ffffff] text-2xl md:text-xl sm:text-lg font-aleo px-6 py-3 sm:px-4 sm:py-2 rounded-lg w-full">
                            Live Matches
                        </button>
                        <div className="bg-gray-700 bg-opacity-50 w-full h-56 rounded-lg mt-4 overflow-y-auto p-2">
                            {liveMatches.length > 0 ? (
                                liveMatches.map(match => (
                                    <div key={match.id} className="p-2 bg-gray-800 rounded-lg mb-2 text-white">
                                        <p>{match.home_team} vs {match.away_team}</p>
                                        <p>{formatMatchDate(match.match_date)}</p>
                                        <button
                                            onClick={() => handleMatchClick(match)}
                                            className="text-white px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500"
                                            disabled={!match.hasJoined}
                                        >
                                            {match.hasJoined ? "Go to Leaderboard" : "Not Joined"}
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="p-5 text-lg">No Live Matches!</p>
                            )}
                        </div>
                    </div>

                    {/* Completed Matches */}
                    <div className="flex flex-col items-center w-full sm:w-96">
                        <button className="bg-[linear-gradient(125.26deg,#5672B8_22.66%,rgba(4,11,41,0.86)_59.18%)] text-[#ffffff] text-2xl md:text-xl sm:text-lg font-aleo px-6 py-3 sm:px-4 sm:py-2 rounded-lg w-full">
                            Completed Matches
                        </button>
                        <div className="bg-gray-700 bg-opacity-50 w-full h-56 rounded-lg mt-4 overflow-y-auto p-2">
                            {completedMatches.length > 0 ? (
                                completedMatches.map(match => (
                                    <div key={match.id} className="p-2 bg-gray-800 rounded-lg mb-2 text-white">
                                        <p>{match.home_team} vs {match.away_team}</p>
                                        <p>{formatMatchDate(match.match_date)}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="p-5 text-lg">No Completed Matches!</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withAuth(MatchOverview);
