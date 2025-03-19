// // 'use client';
// // import { useEffect, useState } from 'react';
// // import apiService from '@/components/apiService';
// // import Navbar from '@/components/Navbar';
// // import { useRouter } from 'next/navigation';
// // import toast from "react-hot-toast";
// // import withAuth from "../../hoc/withAuth.js";

// // const TeamChoose = () => {

// //     const router = useRouter();
// //     // const { matchId } = router.query;

// //     // Temporarily Hardcoded Match ID (Testing Purpose)
// //     const matchId = "65a7b2c9876c9e001c4f0e20";

// //     const [homeTeam, setHomeTeam] = useState({ teamName: '', players: [] });
// //     const [awayTeam, setAwayTeam] = useState({ teamName: '', players: [] });
// //     const [selectedHomePlayers, setSelectedHomePlayers] = useState([]);
// //     const [selectedAwayPlayers, setSelectedAwayPlayers] = useState([]);
// //     const [selectedHomeSubstitutes, setSelectedHomeSubstitutes] = useState([]);
// //     const [selectedAwaySubstitutes, setSelectedAwaySubstitutes] = useState([]);

// //     useEffect(() => {
// //         const fetchTeams = async () => {
// //             try {
// //                 const response = await apiService.fetchData(`/team/choose/${matchId}`);
// //                 setHomeTeam(response.data.homeTeam);
// //                 setAwayTeam(response.data.awayTeam);
// //             } catch (error) {
// //                 toast.error('Error fetching teams:', error);
// //             }
// //         };
// //         fetchTeams();
// //     }, []);

// //     const handleSelectPlayer = (player, teamType, type) => {
// //         if (teamType === 'Home') {
// //             if (type === 'P') {
// //                 if (selectedHomePlayers.some(p => p.playerId === player.playerId)) {
// //                     setSelectedHomePlayers(selectedHomePlayers.filter(p => p.playerId !== player.playerId));
// //                 } else {
// //                     if (selectedHomePlayers.length < 6) {
// //                         setSelectedHomePlayers([...selectedHomePlayers, player]);
// //                     }
// //                 }
// //             } else {
// //                 if (selectedHomeSubstitutes.some(p => p.playerId === player.playerId)) {
// //                     setSelectedHomeSubstitutes(selectedHomeSubstitutes.filter(p => p.playerId !== player.playerId));
// //                 } else {
// //                     if (selectedHomeSubstitutes.length < 1) {
// //                         setSelectedHomeSubstitutes([...selectedHomeSubstitutes, player]);
// //                     }
// //                 }
// //             }
// //         } else {
// //             if (type === 'P') {
// //                 if (selectedAwayPlayers.some(p => p.playerId === player.playerId)) {
// //                     setSelectedAwayPlayers(selectedAwayPlayers.filter(p => p.playerId !== player.playerId));
// //                 } else {
// //                     if (selectedAwayPlayers.length < 6) {
// //                         setSelectedAwayPlayers([...selectedAwayPlayers, player]);
// //                     }
// //                 }
// //             } else {
// //                 if (selectedAwaySubstitutes.some(p => p.playerId === player.playerId)) {
// //                     setSelectedAwaySubstitutes(selectedAwaySubstitutes.filter(p => p.playerId !== player.playerId));
// //                 } else {
// //                     if (selectedAwaySubstitutes.length < 1) {
// //                         setSelectedAwaySubstitutes([...selectedAwaySubstitutes, player]);
// //                     }
// //                 }
// //             }
// //         }
// //     };

// //     const handlePreview = async () => {
// //         try {
// //             const selectedPlayers = [...selectedHomePlayers, ...selectedAwayPlayers];
// //             const selectedSubstitutes = [...selectedHomeSubstitutes, ...selectedAwaySubstitutes];

// //             if (selectedPlayers.length !== 12) {
// //                 toast.error("You must select exactly 12 players!");
// //                 return;
// //             }

// //             if (selectedSubstitutes.length !== 2) {
// //                 toast.error("You must select exactly 2 substitutes.");
// //                 return;
// //             }
// //             // Store in local storage
// //             localStorage.setItem("selectedPlayers", JSON.stringify(selectedPlayers));
// //             localStorage.setItem("selectedSubstitutes", JSON.stringify(selectedSubstitutes));

// //             router.push('preview');
// //         } catch (error) {
// //             toast.error("Error submitting team:", error);
// //         }
// //     };

// //     const renderPlayers = (team, teamType) => {
// //         {
// //             (team?.players?.length == 0) && (
// //                 <div>Loading...</div>
// //             )
// //         }
// //         return team?.players?.map(player => (
// //             <div key={player.playerId} className="flex justify-between items-center p-2 border-b">
// //                 {/* <span>{player.playerName} ({player.position})</span> */}
// //                 <span>{player.playerName}</span>
// //                 <div>
// //                     <input type="checkbox" checked={teamType === 'Home' ? selectedHomePlayers.some(p => p.playerId === player.playerId) : selectedAwayPlayers.some(p => p.playerId === player.playerId)}
// //                         onChange={() => handleSelectPlayer(player, teamType, 'P')} disabled={(teamType === 'Home' ? selectedHomePlayers.length : selectedAwayPlayers.length) >= 6} /> P
// //                     <input type="checkbox" checked={teamType === 'Home' ? selectedHomeSubstitutes.some(p => p.playerId === player.playerId) : selectedAwaySubstitutes.some(p => p.playerId === player.playerId)}
// //                         onChange={() => handleSelectPlayer(player, teamType, 'SP')} disabled={(teamType === 'Home' ? selectedHomeSubstitutes.length : selectedAwaySubstitutes.length) >= 1} /> SP
// //                 </div>
// //             </div>
// //         ));
// //     };

// //     return (
// //         <div className="min-h-screen w-full bg-cover bg-center" style={{ backgroundImage: "url(/Images/team_choose_background.jpeg)" }}>
// //             <Navbar />
// //             <div className="flex items-center justify-center min-h-screen p-4">
// //                 <div className="bg-gray-400 bg-opacity-20 text-white text-center font-aleo backdrop-blur-sm shadow-lg rounded-xl overflow-hidden max-w-4xl w-full mx-auto py-8 px-4 mt-10 md:px-6 max-md:mt-32">
// //                     <h1 className="text-2xl md:text-3xl font-bold drop-shadow-[1px_1px_1px_blue]">Choose Your Team</h1>
// //                     <div className="flex justify-center items-start gap-8 mt-6">
// //                         {/* home team */}
// //                         <div className="w-full max-w-xs text-center">
// //                             <button className="w-full py-2 rounded-full md:text-2xl bg-gradient-to-b from-black to-gray-800 hover:scale-105 transition-transform duration-300 drop-shadow-[0px_0px_2px_white] hover:drop-shadow-[0px_0px_0px_white]">
// //                                 Home Team
// //                             </button>
// //                             <div className="h-52 overflow-y-scroll bg-gray-900 p-2 rounded-md">
// //                                 <h2 className="text-xl font-bold text-center">{homeTeam.teamName}</h2>
// //                                 {renderPlayers(homeTeam, 'Home')}
// //                             </div>
// //                         </div>
// //                         <span className="text-3xl font-medium">VS</span>
// //                         {/* <span className="text-[#0A0440] text-3xl md:text-6xl font-medium font-arizonia mx-auto drop-shadow-[0px_0px_1px_red]">
// //                             VS 
// //                         </span> */}
// //                         {/* away team */}
// //                         <div className="w-full max-w-xs text-center">
// //                             <button className="w-full py-2 rounded-full bg-gradient-to-b  from-black to-gray-800 hover:scale-105 transition-transform duration-300 md:text-2xl drop-shadow-[0px_0px_2px_white]  hover:drop-shadow-[0px_0px_0px_white]">
// //                                 Away Team
// //                             </button>
// //                             <div className="h-52 overflow-y-scroll bg-gray-900 p-2 rounded-md">
// //                                 <h2 className="text-xl font-bold text-center">{awayTeam.teamName}</h2>
// //                                 {renderPlayers(awayTeam, 'Away')}
// //                             </div>
// //                         </div>
// //                     </div>
// //                     <div className="mt-6">
// //                         <button
// //                             onClick={handlePreview}
// //                             className="px-16 py-2 bg-gradient-to-br from-[#B8A956] via-[#290406DB] to-[#290406DB] rounded-full text-2xl font-semibold"
// //                         >
// //                             Preview
// //                         </button>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default withAuth(TeamChoose);


// "use client";
// import { useEffect, useState } from 'react';
// import apiService from '@/components/apiService';
// import Navbar from '@/components/Navbar';
// import { useRouter } from 'next/navigation';
// import toast from "react-hot-toast";
// import { useParams } from "next/navigation";

// const TeamChoose = () => {
//     const router = useRouter();

//     const { matchid } = useParams();
//     const matchId = matchid;

//     console.log(matchId)




//     const [homeTeam, setHomeTeam] = useState({ teamName: '', players: [] });
//     const [awayTeam, setAwayTeam] = useState({ teamName: '', players: [] });
//     const [selectedHomePlayers, setSelectedHomePlayers] = useState([]);
//     const [selectedAwayPlayers, setSelectedAwayPlayers] = useState([]);
//     const [selectedHomeSubstitutes, setSelectedHomeSubstitutes] = useState([]);
//     const [selectedAwaySubstitutes, setSelectedAwaySubstitutes] = useState([]);

//     const [error, setError] = useState();

//     useEffect(() => {
//         const fetchTeams = async () => {
//             try {
//                 const response = await apiService.fetchData(`/team/choose/${matchId}`); console.log(response)
//                 if (!response?.data?.success) {
//                     setError(response?.data?.message)
//                     return
//                 }
//                 setHomeTeam(response?.data?.homeTeam);
//                 setAwayTeam(response?.data?.awayTeam);
//             } catch (error) {
//                 toast.error('Internal Server error!');
//             }
//         };
//         fetchTeams();
//     }, []);

//     if (error) {
//         console.log(error);
//         return (
//             <p>{error}</p>
//         )
//     }

//     const handleSelectPlayer = (player, teamType, type) => {
//         // logic to select player or substitute
//         if (teamType === 'Home') {
//             if (type === 'P') {
//                 if (selectedHomePlayers.some(p => p.playerId === player.playerId)) {
//                     setSelectedHomePlayers(selectedHomePlayers.filter(p => p.playerId !== player.playerId));
//                 } else {
//                     if (selectedHomePlayers.length < 6) {
//                         setSelectedHomePlayers([...selectedHomePlayers, player]);
//                     }
//                 }
//             } else {
//                 if (selectedHomeSubstitutes.some(p => p.playerId === player.playerId)) {
//                     setSelectedHomeSubstitutes(selectedHomeSubstitutes.filter(p => p.playerId !== player.playerId));
//                 } else {
//                     if (selectedHomeSubstitutes.length < 1) {
//                         setSelectedHomeSubstitutes([...selectedHomeSubstitutes, player]);
//                     }
//                 }
//             }
//         } else {
//             if (type === 'P') {
//                 if (selectedAwayPlayers.some(p => p.playerId === player.playerId)) {
//                     setSelectedAwayPlayers(selectedAwayPlayers.filter(p => p.playerId !== player.playerId));
//                 } else {
//                     if (selectedAwayPlayers.length < 6) {
//                         setSelectedAwayPlayers([...selectedAwayPlayers, player]);
//                     }
//                 }
//             } else {
//                 if (selectedAwaySubstitutes.some(p => p.playerId === player.playerId)) {
//                     setSelectedAwaySubstitutes(selectedAwaySubstitutes.filter(p => p.playerId !== player.playerId));
//                 } else {
//                     if (selectedAwaySubstitutes.length < 1) {
//                         setSelectedAwaySubstitutes([...selectedAwaySubstitutes, player]);
//                     }
//                 }
//             }
//         }
//     };

//     const handleSubmit = async () => {
//         try {
//             const selectedPlayers = [...selectedHomePlayers, ...selectedAwayPlayers];
//             const selectedSubstitutes = [...selectedHomeSubstitutes, ...selectedAwaySubstitutes];

//             if (selectedPlayers.length !== 12) {
//                 toast.error("You must select exactly 12 players!");
//                 return;
//             }

//             if (selectedSubstitutes.length !== 2) {
//                 toast.error("You must select exactly 2 substitutes.");
//                 return;
//             }
//             // Store in local storage
//             localStorage.setItem("selectedPlayers", JSON.stringify(selectedPlayers));
//             localStorage.setItem("selectedSubstitutes", JSON.stringify(selectedSubstitutes));
//             localStorage.setItem("matchId", JSON.stringify(matchid));

//             router.push('/team-choose/preview');
//         } catch (error) {
//             toast.error("Error submitting team:", error);
//         }
//     };

//     const renderPlayers = (team, teamType) => {
//         if (team?.players?.length === 0) {
//             return <div>Loading...</div>;
//         }
//         return team?.players?.map(player => (
//             <div key={player.playerId} className="flex justify-between items-center p-2 border-b">
//                 <span>{player.playerName}</span>
//                 <div>
//                     <input type="checkbox" checked={teamType === 'Home' ? selectedHomePlayers.some(p => p.playerId === player.playerId) : selectedAwayPlayers.some(p => p.playerId === player.playerId)}
//                         onChange={() => handleSelectPlayer(player, teamType, 'P')} disabled={(teamType === 'Home' ? selectedHomePlayers.length : selectedAwayPlayers.length) >= 6} /> P
//                     <input type="checkbox" checked={teamType === 'Home' ? selectedHomeSubstitutes.some(p => p.playerId === player.playerId) : selectedAwaySubstitutes.some(p => p.playerId === player.playerId)}
//                         onChange={() => handleSelectPlayer(player, teamType, 'SP')} disabled={(teamType === 'Home' ? selectedHomeSubstitutes.length : selectedAwaySubstitutes.length) >= 1} /> SP
//                 </div>
//             </div>
//         ));
//     };

//     return (
//         <div className="min-h-screen w-full bg-cover bg-center" style={{ backgroundImage: "url(/Images/team_choose_background.jpeg)" }}>
//             <Navbar />
//             <div className="flex items-center justify-center min-h-screen p-4">
//                 <div className="bg-gray-400 bg-opacity-20 text-white text-center font-aleo backdrop-blur-sm shadow-lg rounded-xl overflow-hidden w-full mx-auto py-8 px-4 mt-10 md:px-6 md:max-w-4xl">
//                     <h1 className="text-2xl md:text-3xl font-bold drop-shadow-[1px_1px_1px_blue]">Choose Your Team</h1>
//                     <div className="flex flex-col md:flex-row justify-center items-start gap-8 mt-6">
//                         <div className="w-full md:w-1/3 text-center">
//                             <button className="w-full py-2 rounded-full md:text-2xl bg-gradient-to-b from-black to-gray-800 hover:scale-105 transition-transform duration-300 drop-shadow-[0px_0px_2px_white] hover:drop-shadow-[0px_0px_0px_white]">
//                                 Home Team
//                             </button>
//                             <div className="h-52 overflow-y-scroll bg-gray-900 p-2 rounded-md">
//                                 <h2 className="text-xl font-bold text-center">{homeTeam.teamName}</h2>
//                                 {renderPlayers(homeTeam, 'Home')}
//                             </div>
//                         </div>

//                         {/* VS centered vertically and horizontally */}
//                         <div className="flex items-center justify-center text-3xl font-medium mt-4 md:mt-0 md:text-6xl text-[#0A0440] drop-shadow-[0px_0px_1px_red]">
//                             <span>VS</span>
//                         </div>

//                         <div className="w-full md:w-1/3 text-center">
//                             <button className="w-full py-2 rounded-full bg-gradient-to-b from-black to-gray-800 hover:scale-105 transition-transform duration-300 md:text-2xl drop-shadow-[0px_0px_2px_white]  hover:drop-shadow-[0px_0px_0px_white]">
//                                 Away Team
//                             </button>
//                             <div className="h-52 overflow-y-scroll bg-gray-900 p-2 rounded-md">
//                                 <h2 className="text-xl font-bold text-center">{awayTeam.teamName}</h2>
//                                 {renderPlayers(awayTeam, 'Away')}
//                             </div>
//                         </div>
//                     </div>
//                     <div className="mt-6">
//                         <button onClick={handleSubmit} className="px-16 py-2 bg-gradient-to-br from-[#B8A956] via-[#290406DB] to-[#290406DB] rounded-full text-2xl font-semibold">Preview</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TeamChoose;



// 'use client';
// import { useEffect, useState } from 'react';
// import apiService from '@/components/apiService';
// import Navbar from '@/components/Navbar';
// import { useRouter } from 'next/navigation';
// import toast from "react-hot-toast";
// import withAuth from "../../hoc/withAuth.js";

// const TeamChoose = () => {

//     const router = useRouter();
//     // const { matchId } = router.query;

//     // Temporarily Hardcoded Match ID (Testing Purpose)
//     const matchId = "65a7b2c9876c9e001c4f0e20";

//     const [homeTeam, setHomeTeam] = useState({ teamName: '', players: [] });
//     const [awayTeam, setAwayTeam] = useState({ teamName: '', players: [] });
//     const [selectedHomePlayers, setSelectedHomePlayers] = useState([]);
//     const [selectedAwayPlayers, setSelectedAwayPlayers] = useState([]);
//     const [selectedHomeSubstitutes, setSelectedHomeSubstitutes] = useState([]);
//     const [selectedAwaySubstitutes, setSelectedAwaySubstitutes] = useState([]);

//     useEffect(() => {
//         const fetchTeams = async () => {
//             try {
//                 const response = await apiService.fetchData(`/team/choose/${matchId}`);
//                 setHomeTeam(response.data.homeTeam);
//                 setAwayTeam(response.data.awayTeam);
//             } catch (error) {
//                 toast.error('Error fetching teams:', error);
//             }
//         };
//         fetchTeams();
//     }, []);

//     const handleSelectPlayer = (player, teamType, type) => {
//         if (teamType === 'Home') {
//             if (type === 'P') {
//                 if (selectedHomePlayers.some(p => p.playerId === player.playerId)) {
//                     setSelectedHomePlayers(selectedHomePlayers.filter(p => p.playerId !== player.playerId));
//                 } else {
//                     if (selectedHomePlayers.length < 6) {
//                         setSelectedHomePlayers([...selectedHomePlayers, player]);
//                     }
//                 }
//             } else {
//                 if (selectedHomeSubstitutes.some(p => p.playerId === player.playerId)) {
//                     setSelectedHomeSubstitutes(selectedHomeSubstitutes.filter(p => p.playerId !== player.playerId));
//                 } else {
//                     if (selectedHomeSubstitutes.length < 1) {
//                         setSelectedHomeSubstitutes([...selectedHomeSubstitutes, player]);
//                     }
//                 }
//             }
//         } else {
//             if (type === 'P') {
//                 if (selectedAwayPlayers.some(p => p.playerId === player.playerId)) {
//                     setSelectedAwayPlayers(selectedAwayPlayers.filter(p => p.playerId !== player.playerId));
//                 } else {
//                     if (selectedAwayPlayers.length < 6) {
//                         setSelectedAwayPlayers([...selectedAwayPlayers, player]);
//                     }
//                 }
//             } else {
//                 if (selectedAwaySubstitutes.some(p => p.playerId === player.playerId)) {
//                     setSelectedAwaySubstitutes(selectedAwaySubstitutes.filter(p => p.playerId !== player.playerId));
//                 } else {
//                     if (selectedAwaySubstitutes.length < 1) {
//                         setSelectedAwaySubstitutes([...selectedAwaySubstitutes, player]);
//                     }
//                 }
//             }
//         }
//     };

//     const handlePreview = async () => {
//         try {
//             const selectedPlayers = [...selectedHomePlayers, ...selectedAwayPlayers];
//             const selectedSubstitutes = [...selectedHomeSubstitutes, ...selectedAwaySubstitutes];

//             if (selectedPlayers.length !== 12) {
//                 toast.error("You must select exactly 12 players!");
//                 return;
//             }

//             if (selectedSubstitutes.length !== 2) {
//                 toast.error("You must select exactly 2 substitutes.");
//                 return;
//             }
//             // Store in local storage
//             localStorage.setItem("selectedPlayers", JSON.stringify(selectedPlayers));
//             localStorage.setItem("selectedSubstitutes", JSON.stringify(selectedSubstitutes));

//             router.push('preview');
//         } catch (error) {
//             toast.error("Error submitting team:", error);
//         }
//     };

//     const renderPlayers = (team, teamType) => {
//         {
//             (team?.players?.length == 0) && (
//                 <div>Loading...</div>
//             )
//         }
//         return team?.players?.map(player => (
//             <div key={player.playerId} className="flex justify-between items-center p-2 border-b">
//                 {/* <span>{player.playerName} ({player.position})</span> */}
//                 <span>{player.playerName}</span>
//                 <div>
//                     <input type="checkbox" checked={teamType === 'Home' ? selectedHomePlayers.some(p => p.playerId === player.playerId) : selectedAwayPlayers.some(p => p.playerId === player.playerId)}
//                         onChange={() => handleSelectPlayer(player, teamType, 'P')} disabled={(teamType === 'Home' ? selectedHomePlayers.length : selectedAwayPlayers.length) >= 6} /> P
//                     <input type="checkbox" checked={teamType === 'Home' ? selectedHomeSubstitutes.some(p => p.playerId === player.playerId) : selectedAwaySubstitutes.some(p => p.playerId === player.playerId)}
//                         onChange={() => handleSelectPlayer(player, teamType, 'SP')} disabled={(teamType === 'Home' ? selectedHomeSubstitutes.length : selectedAwaySubstitutes.length) >= 1} /> SP
//                 </div>
//             </div>
//         ));
//     };

//     return (
//         <div className="min-h-screen w-full bg-cover bg-center" style={{ backgroundImage: "url(/Images/team_choose_background.jpeg)" }}>
//             <Navbar />
//             <div className="flex items-center justify-center min-h-screen p-4">
//                 <div className="bg-gray-400 bg-opacity-20 text-white text-center font-aleo backdrop-blur-sm shadow-lg rounded-xl overflow-hidden max-w-4xl w-full mx-auto py-8 px-4 mt-10 md:px-6 max-md:mt-32">
//                     <h1 className="text-2xl md:text-3xl font-bold drop-shadow-[1px_1px_1px_blue]">Choose Your Team</h1>
//                     <div className="flex justify-center items-start gap-8 mt-6">
//                         {/* home team */}
//                         <div className="w-full max-w-xs text-center">
//                             <button className="w-full py-2 rounded-full md:text-2xl bg-gradient-to-b from-black to-gray-800 hover:scale-105 transition-transform duration-300 drop-shadow-[0px_0px_2px_white] hover:drop-shadow-[0px_0px_0px_white]">
//                                 Home Team
//                             </button>
//                             <div className="h-52 overflow-y-scroll bg-gray-900 p-2 rounded-md">
//                                 <h2 className="text-xl font-bold text-center">{homeTeam.teamName}</h2>
//                                 {renderPlayers(homeTeam, 'Home')}
//                             </div>
//                         </div>
//                         <span className="text-3xl font-medium">VS</span>
//                         {/* <span className="text-[#0A0440] text-3xl md:text-6xl font-medium font-arizonia mx-auto drop-shadow-[0px_0px_1px_red]">
//                             VS 
//                         </span> */}
//                         {/* away team */}
//                         <div className="w-full max-w-xs text-center">
//                             <button className="w-full py-2 rounded-full bg-gradient-to-b  from-black to-gray-800 hover:scale-105 transition-transform duration-300 md:text-2xl drop-shadow-[0px_0px_2px_white]  hover:drop-shadow-[0px_0px_0px_white]">
//                                 Away Team
//                             </button>
//                             <div className="h-52 overflow-y-scroll bg-gray-900 p-2 rounded-md">
//                                 <h2 className="text-xl font-bold text-center">{awayTeam.teamName}</h2>
//                                 {renderPlayers(awayTeam, 'Away')}
//                             </div>
//                         </div>
//                     </div>
//                     <div className="mt-6">
//                         <button
//                             onClick={handlePreview}
//                             className="px-16 py-2 bg-gradient-to-br from-[#B8A956] via-[#290406DB] to-[#290406DB] rounded-full text-2xl font-semibold"
//                         >
//                             Preview
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default withAuth(TeamChoose);


"use client";
import { useEffect, useState } from 'react';
import apiService from '@/components/apiService';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";
import { useParams } from "next/navigation";

const TeamChoose = () => {
    const router = useRouter();

    const { matchid } = useParams();
    const matchId = matchid;

    console.log(matchId)




    const [homeTeam, setHomeTeam] = useState({ teamName: '', players: [] });
    const [awayTeam, setAwayTeam] = useState({ teamName: '', players: [] });
    const [selectedHomePlayers, setSelectedHomePlayers] = useState([]);
    const [selectedAwayPlayers, setSelectedAwayPlayers] = useState([]);
    const [selectedHomeSubstitutes, setSelectedHomeSubstitutes] = useState([]);
    const [selectedAwaySubstitutes, setSelectedAwaySubstitutes] = useState([]);

    const [error, setError] = useState();

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await apiService.fetchData(`/team/choose/${matchId}`); console.log(response)
                if (!response?.data?.success) {
                    setError(response?.data?.message)
                    return
                }
                setHomeTeam(response?.data?.homeTeam);
                setAwayTeam(response?.data?.awayTeam);
            } catch (error) {
                toast.error('Internal Server error!');
            }
        };
        fetchTeams();
    }, []);

    if (error) {
        console.log(error);
        return (
            <p>{error}</p>
        )
    }

    const handleSelectPlayer = (player, teamType, type) => {
        if (teamType === 'Home') {
            if (type === 'P') {
                if (selectedHomePlayers.some(p => p.playerId === player.playerId)) {
                    // ✅ Deselect player from main players list
                    setSelectedHomePlayers(prev => prev.filter(p => p.playerId !== player.playerId));
                } else {
                    if (selectedHomePlayers.length < 6) {
                        setSelectedHomePlayers(prev => [...prev, player]);
                        // ✅ Remove from substitutes if selected as main player
                        setSelectedHomeSubstitutes(prev => prev.filter(p => p.playerId !== player.playerId));
                    }
                }
            } else if (type === 'SP') {
                if (selectedHomeSubstitutes.some(p => p.playerId === player.playerId)) {
                    // ✅ Deselect player from substitutes list
                    setSelectedHomeSubstitutes(prev => prev.filter(p => p.playerId !== player.playerId));
                } else {
                    if (selectedHomeSubstitutes.length < 1) {
                        setSelectedHomeSubstitutes(prev => [...prev, player]);
                        // ✅ Remove from main players if selected as a substitute
                        setSelectedHomePlayers(prev => prev.filter(p => p.playerId !== player.playerId));
                    }
                }
            }
        } else if (teamType === 'Away') {
            if (type === 'P') {
                if (selectedAwayPlayers.some(p => p.playerId === player.playerId)) {
                    // ✅ Deselect player from main players list
                    setSelectedAwayPlayers(prev => prev.filter(p => p.playerId !== player.playerId));
                } else {
                    if (selectedAwayPlayers.length < 6) {
                        setSelectedAwayPlayers(prev => [...prev, player]);
                        // ✅ Remove from substitutes if selected as main player
                        setSelectedAwaySubstitutes(prev => prev.filter(p => p.playerId !== player.playerId));
                    }
                }
            } else if (type === 'SP') {
                if (selectedAwaySubstitutes.some(p => p.playerId === player.playerId)) {
                    // ✅ Deselect player from substitutes list
                    setSelectedAwaySubstitutes(prev => prev.filter(p => p.playerId !== player.playerId));
                } else {
                    if (selectedAwaySubstitutes.length < 1) {
                        setSelectedAwaySubstitutes(prev => [...prev, player]);
                        // ✅ Remove from main players if selected as a substitute
                        setSelectedAwayPlayers(prev => prev.filter(p => p.playerId !== player.playerId));
                    }
                }
            }
        }
    };

    const handleSubmit = async () => {
        try {
            const selectedPlayers = [...selectedHomePlayers, ...selectedAwayPlayers];
            const selectedSubstitutes = [...selectedHomeSubstitutes, ...selectedAwaySubstitutes];

            if (selectedPlayers.length !== 12) {
                toast.error("You must select exactly 12 players!");
                return;
            }

            if (selectedSubstitutes.length !== 2) {
                toast.error("You must select exactly 2 substitutes.");
                return;
            }
            // Store in local storage
            localStorage.setItem("selectedPlayers", JSON.stringify(selectedPlayers));
            localStorage.setItem("selectedSubstitutes", JSON.stringify(selectedSubstitutes));
            localStorage.setItem("matchId", JSON.stringify(matchid));

            router.push('/team-choose/preview');
        } catch (error) {
            toast.error("Error submitting team:", error);
        }
    };

    const renderPlayers = (team, teamType) => {
        if (team?.players?.length === 0) {
            return <div>Loading...</div>;
        }
        return team?.players?.map(player => (
            <div key={player.playerId} className="flex justify-between items-center p-2 border-b">
                <span>{player.playerName}</span>
                <div>
                    <input type="checkbox" checked={teamType === 'Home' ? selectedHomePlayers.some(p => p.playerId === player.playerId) : selectedAwayPlayers.some(p => p.playerId === player.playerId)}
                        onChange={() => handleSelectPlayer(player, teamType, 'P')} disabled={(teamType === 'Home' ? selectedHomePlayers.length : selectedAwayPlayers.length) >= 6} /> P
                    <input type="checkbox" checked={teamType === 'Home' ? selectedHomeSubstitutes.some(p => p.playerId === player.playerId) : selectedAwaySubstitutes.some(p => p.playerId === player.playerId)}
                        onChange={() => handleSelectPlayer(player, teamType, 'SP')} disabled={(teamType === 'Home' ? selectedHomeSubstitutes.length : selectedAwaySubstitutes.length) >= 1} /> SP
                </div>
            </div>
        ));
    };

    return (
        <div className="min-h-screen w-full bg-cover bg-center" style={{ backgroundImage: "url(/Images/team_choose_background.jpeg)" }}>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="bg-gray-400 bg-opacity-20 text-white text-center font-aleo backdrop-blur-sm shadow-lg rounded-xl overflow-hidden w-full mx-auto py-8 px-4 mt-10 md:px-6 md:max-w-4xl">
                    <h1 className="text-2xl md:text-3xl font-bold drop-shadow-[1px_1px_1px_blue]">Choose Your Team</h1>
                    <div className="flex flex-col md:flex-row justify-center items-start gap-8 mt-6">
                        <div className="w-full md:w-1/3 text-center">
                            <button className="w-full py-2 rounded-full md:text-2xl bg-gradient-to-b from-black to-gray-800 hover:scale-105 transition-transform duration-300 drop-shadow-[0px_0px_2px_white] hover:drop-shadow-[0px_0px_0px_white]">
                                Home Team
                            </button>
                            <div className="h-52 overflow-y-scroll bg-gray-900 p-2 rounded-md">
                                <h2 className="text-xl font-bold text-center">{homeTeam.teamName}</h2>
                                {renderPlayers(homeTeam, 'Home')}
                            </div>
                        </div>

                        {/* VS centered vertically and horizontally */}
                        <div className="flex items-center justify-center text-3xl font-medium mt-4 md:mt-0 md:text-6xl text-[#0A0440] drop-shadow-[0px_0px_1px_red]">
                            <span>VS</span>
                        </div>

                        <div className="w-full md:w-1/3 text-center">
                            <button className="w-full py-2 rounded-full bg-gradient-to-b from-black to-gray-800 hover:scale-105 transition-transform duration-300 md:text-2xl drop-shadow-[0px_0px_2px_white]  hover:drop-shadow-[0px_0px_0px_white]">
                                Away Team
                            </button>
                            <div className="h-52 overflow-y-scroll bg-gray-900 p-2 rounded-md">
                                <h2 className="text-xl font-bold text-center">{awayTeam.teamName}</h2>
                                {renderPlayers(awayTeam, 'Away')}
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <button onClick={handleSubmit} className="px-16 py-2 bg-gradient-to-br from-[#B8A956] via-[#290406DB] to-[#290406DB] rounded-full text-2xl font-semibold">Preview</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamChoose;

