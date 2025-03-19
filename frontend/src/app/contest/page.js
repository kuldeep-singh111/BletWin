'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import withAuth from "../../hoc/withAuth.js";
import apiService from '@/components/apiService.js';
import { useUser } from "@/context/AuthContext.js";
import toast from "react-hot-toast";

const Contest = () => {
    const router = useRouter();
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user, wallet } = useUser();

    useEffect(() => {
        const controller = new AbortController();
        const matchId = JSON.parse(localStorage.getItem("matchId")) || '';

        const fetchContests = async () => {
            try {
                setLoading(true);
                const response = await apiService.fetchData(`/contest/${matchId}`);
                setContests(response.data.contests || []);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Error fetching contests:', error);
                    setContests([]);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchContests();

        return () => {
            controller.abort();
        };
    }, []);

    const handleJoinContest = async (contestId, matchId) => {
        try {
            const response = await apiService.postData('/contest/join', { contestId, matchId });
            toast.success(response.data.message);
            router.push('/leaderboard');
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to join contest");
        }
    };

    const handleWalletClick = () => {
        router.push('/wallet');
    };

    return (
        <div
            className="min-h-screen w-full bg-cover bg-center"
            style={{ backgroundImage: "url(Images/contest_background.jpeg)" }}
        >
            <Navbar />
            <div className="flex justify-center items-center min-h-screen px-4">
                <div className="bg-gray-300 bg-opacity-[15%] text-black text-center font-aleo backdrop-blur-md shadow-lg rounded-xl overflow-hidden max-w-4xl w-full mx-auto mt-20 py-5 px-4 sm:px-6 md:px-8">
                    <h1 className="text-xl sm:text-2xl md:text-4xl mt-6 font-bold font-abril mb-4 drop-shadow-[1px_1px_2px_white]">
                        UNLEASH YOUR PASSION, COMPETE WITH PRIDE -
                    </h1>
                    <h3 className="text-base sm:text-lg md:text-2xl text-[#0A0440] font-alegreya font-bold mb-6 md:mb-10 drop-shadow-[1px_1px_1px_white]">
                        JOIN THE ULTIMATE FOOTBALL CONTEST AND CLAIM YOUR GLORY!
                    </h3>
                    <div className='flex justify-evenly mx-auto my-5 text-sm sm:text-lg md:text-3xl md:mb-10 font-bold'>
                        <span className='font-alegreya drop-shadow-[1px_1px_1px_white]'>Hi, {user.username}</span>
                        <span
                            className='bg-[#0A044033] text-white px-2 sm:px-4 md:px-8 py-1 rounded cursor-pointer'
                            onClick={handleWalletClick}
                        >
                            <span className='text-[#0A0440]'>Wallet $</span> {wallet?.totalMoney.toFixed(2)}
                        </span>
                    </div>
                    <p className='text-[#400404] text-sm sm:text-lg md:mb-10 md:text-3xl font-semibold mb-6 drop-shadow-[1px_1px_1px_white]'>
                        Note: "Before join add fund through wallet."
                    </p>
                    <div className='text-[#0A0440] text-sm sm:text-lg md:text-2xl drop-shadow-[1px_1px_1px_white] font-semibold flex items-center justify-evenly mx-auto'>
                        <div>Available Contests</div>
                        <button className='px-4 sm:px-6 md:px-10 py-1 rounded-lg bg-[linear-gradient(125.26deg,#5672B8_22.66%,rgba(4,11,41,0.86)_59.18%)] text-[#ffffff] text-sm sm:text-lg md:text-2xl font-aleo transform hover:scale-105 transition-transform duration-300'>
                            Search
                        </button>
                    </div>
                    <div className='w-full sm:w-[70%] md:w-[63%] h-48 overflow-y-auto mt-4 mx-auto bg-[#040B29DB] opacity-50 rounded-md p-4'>
                        {loading ? (
                            <p className="text-white text-center">Loading contests...</p>
                        ) : contests.length > 0 ? (
                            <ul className="text-white space-y-4">
                                {contests.map((contest) => (
                                    <li key={contest.contest_id} className="p-4 bg-gray-700 bg-opacity-50 rounded-lg flex flex-col gap-2">
                                        <h4 className="text-lg font-bold text-center">{contest.name}</h4>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-left text-white">{contest.match.home_team}</span>
                                            <span className="text-center text-gray-300">{contest.match.match_date}</span>
                                            <span className="text-right text-white">{contest.match.away_team}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-white">Prize Pool: ${contest.prizepool}</span>
                                            <span className="text-yellow-400 font-bold">Entry Fee: ${contest.entry_fee}</span>
                                        </div>
                                        <div className="flex flex-col sm:flex-row justify-between items-center text-sm space-y-2 sm:space-y-0 sm:space-x-4">
                                            {/* Max Players and Joined in the same row for mobile */}
                                            <span className="text-white">Max Players: {contest.max_players}</span>
                                            <span className="text-white text-center">Joined: {contest.players_joined}</span>

                                            {/* Join Now button in a separate row on mobile, same row on larger screens */}
                                            <div className="w-full sm:w-auto mt-2 sm:mt-0 flex justify-center">
                                                <button
                                                    className={`px-4 py-1 rounded-lg transition ${contest.is_full ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}`}
                                                    onClick={() => !contest.is_full && handleJoinContest(contest.contest_id, contest.match)}
                                                    disabled={contest.is_full}
                                                >
                                                    {contest.is_full ? "Contest Full" : "Join Now"}
                                                </button>
                                            </div>
                                        </div>
                                        {/* Centering Spots Available / Contest Full text */}
                                        <div className="text-left text-sm sm:text-base md:text-lg flex justify-center">
                                            <span className={contest.is_full ? "text-red-500" : "text-green-500"}>
                                                {contest.is_full ? "Contest Full" : "Spots Available"}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-white text-center">No contests available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withAuth(Contest);