"use client"
import React from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation";



const Home2 = () => {


    const router = useRouter();

    return (
        <div className="w-full bg-gray-100 py-10">
            <div className="text-center space-y-5 p-10">
                <h1 className="text-3xl sm:text-3xl md:text-4xl text-[#400404] drop-shadow-[1px_1px_1px_red] font-semibold font-abril">
                    EASY TO START, HARD TO FORGET
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-agbalumo drop-shadow-[0px_1px_0px_green] w-2/3 text-center mx-auto">
                    Choose your league, build your dream team, and claim the glory with epic prizes waiting to be won! 🏆⚽🎉
                </p>
            </div>


            <div className="flex flex-col sm:flex-row sm:justify-around items-center gap-8 text-2xl lg:text-xl text-white font-bold font-acme px-4">


                <div className="flex flex-col items-center space-y-3 w-56">
                    <Image width={150} height={150} src={'/Images/contest.png'} alt='Contest' />
                    <button className="py-2 w-full text-white bg-[#3C645F80] rounded-md hover:bg-[#3C645FBF]" onClick={() => router.push('/contest')}>
                        Contest
                    </button>
                </div>


                <div className="flex flex-col items-center space-y-0 w-56">
                    <Image width={150} height={140} src={'/Images/club1.png'} alt='Choose Team' />
                    <button className="py-2 w-full text-white bg-[#3C645F80] rounded-md hover:bg-[#3C645FBF]" onClick={() => router.push('/match-overview')} >
                        Choose Team
                    </button>
                </div>

                <div className="flex flex-col items-center space-y-4 w-56">
                    <Image width={150} height={150} src={'/Images/leader.png'} alt='Leaderboard' className="rounded-full" />
                    <button className="py-2 w-full text-white bg-[#3C645F80] rounded-md hover:bg-[#3C645FBF]" onClick={() => router.push('/leaderboard')}>
                        Leaderboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home2;
