'use client';
import { useRouter } from 'next/navigation'; 

const Home1 = () => {
    
    const router = useRouter();

    const handleJoinClick = () => {
        router.push('/match-overview');
    };

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center px-4"
            style={{
                backgroundImage: "url(/Images/home1.png)",
                backgroundPosition: "70% center", // Start from 70% from the left, not from the extreme left
                backgroundSize: "cover", // so that image covers the container
                backgroundRepeat: "no-repeat", // Prevents repeating the image
                height: "100vh", // For full viewport height
                width: "100%", // for full width
            }}
        >
            <div className="w-2/3 md:left-1/3 absolute text-white space-y-10 max-md:w-full max-md:px-6 max-md:relative max-md:flex max-md:flex-col max-md:items-center max-md:justify-center">
                <div className="text-center font-acme space-y-5">
                    <h1 className="text-3xl font-semibold font-abril drop-shadow-[4px_4px_4px_black]">
                        KICK OFF YOUR FANTASY JOURNEY!!!
                    </h1>
                    <p className="text-2xl font-semibold drop-shadow-[4px_4px_4px_black]">
                        Build your dream team,
                    </p>
                    <p className="text-2xl font-semibold drop-shadow-[4px_4px_4px_black]">
                        Dominate the field,
                    </p>
                    <p className="text-2xl font-semibold drop-shadow-[4px_4px_4px_black]">
                        And win big! 🤑
                    </p>
                </div>

                <div className="text-center space-y-5">
                    <p className="text-3xl font-bold font-agbalumo text-[#970808] drop-shadow-[1px_1px_2px_white]">
                        SO, WHAT ARE YOU WAITING FOR???
                    </p>
                    <button
                        style={{
                            background: "linear-gradient(150deg, #5672B8, #040B29DB)",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                        }}
                        className="w-fit px-16 py-2 rounded-2xl text-[#93EEE3] text-lg font-semibold hover:text-[#588b91] transition"
                        onClick={handleJoinClick}  
                    >
                        JOIN NOW
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home1;
