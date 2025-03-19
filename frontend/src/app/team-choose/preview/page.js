"use client";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import apiService from "@/components/apiService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import withAuth from "../../../hoc/withAuth.js";

const PreviewPage = () => {
    const router = useRouter();
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [selectedSubstitutes, setSelectedSubstitutes] = useState([]);
    const [matchId, setMatchId] = useState('');
    // const matchId = "65a7b2c9876c9e001c4f0e20"; // Temporarily Hardcoded Match ID (Testing Purpose)

    useEffect(() => {
        // Retrieve data from local storage
        const players = JSON.parse(localStorage.getItem("selectedPlayers")) || [];
        const substitutes = JSON.parse(localStorage.getItem("selectedSubstitutes")) || [];
        const matchId = JSON.parse(localStorage.getItem("matchId")) || '';

        setSelectedPlayers(players);
        setSelectedSubstitutes(substitutes);
        setMatchId(matchId);
    }, []);

    const handleSubmit = async () => {
        try {
            await apiService.postData(`/team/choose/save/${matchId}`, {
                selectedPlayers,
                selectedSubstitutes
            });

            toast.success("Team Selected Successfully!");
            router.push('/contest');
        } catch (error) {
            toast.error(error.message || error);
        }
    }

    return (
        <div className="min-h-screen pt-16 bg-gray-100 flex flex-col items-center justify-center px-4">
            <Navbar />

            <div className="w-full text-center shadow-lg rounded-xl p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Preview</h1>

                {/* preview content */}
                <div className="w-full rounded-lg">
                    {/* Players List */}
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <h2 className="text-lg font-semibold">Selected Players</h2>
                        <ul className="mt-2 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                            {selectedPlayers.map((player, index) => (
                                <li key={index} className="bg-gray-300 p-2 rounded-md">{player.playerName} - {player.teamName}</li>
                            ))}
                        </ul>
                    </div>
                    {/* Substitutes List */}
                    <div className="bg-white p-4 rounded-md shadow-md mt-4">
                        <h2 className="text-lg font-semibold">Substitutes</h2>
                        <ul className="mt-2 grid gap-2 md:grid-cols-2">
                            {selectedSubstitutes.map((sub, index) => (
                                <li key={index} className="bg-gray-300 p-2 rounded-md">{sub.playerName} - {sub.teamName}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    className="mt-4 px-5 py-3 text-lg font-semibold text-white bg-gradient-to-b from-blue-500 to-gray-800 rounded-lg shadow-md hover:scale-105 transition"
                >
                    Submit
                </button>

                {/* Change Section */}
                <div className="w-full mx-auto max-w-lg flex flex-col sm:flex-row items-center mt-6 gap-3">
                    <p className="md:text-2xl text-2xl font-bold font-aleo text-[#000000]">Want to change?</p>
                    <button
                        className="p-3 px-8 bg-[linear-gradient(125.26deg,#5672B8_22.66%,rgba(4,11,41,0.86)_59.18%)] font-aleo transform hover:scale-105 transition-transform duration-300 text-white font-bold md:text-xl rounded-md shadow-md"
                        onClick={() => router.back()}
                    >
                        Go back to previous page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default withAuth(PreviewPage);