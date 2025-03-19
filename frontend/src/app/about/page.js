'use client';

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import LoadingPage from "@/components/LoadingPage";  // Import the custom loading page

export default function AboutUs() {
    const [loading, setLoading] = useState(true);

    // Simulate a delay to mimic data fetching or page loading
    useEffect(() => {
        // Simulate a delay before displaying the content
        setTimeout(() => {
            setLoading(false); // Set loading to false after 1 milliseconds
        }, 1); 
    }, []);

    // If the page is still loading, show the custom loading page
    if (loading) {
        return <LoadingPage />;
    }

    return (
        <div className="min-h-screen bg-[#DFE3F2CC] px-2 sm:px-6 lg:px-10 py-14">
            <Navbar />

            <div className="mt-6 text-center">
                <h2 className="text-4xl font-bold text-[#0A0440]">About Us</h2>
            </div>

            {/* Main Content */}
            <div className="mt-6 text-lg leading-relaxed max-w-3xl mx-auto">
                <p className="font-semibold text-xl">
                    Welcome to <span className="italic font-medium font-alex text-2xl text-[#977108]">Lyaim</span> – Where Your Fantasy World Begins!
                </p>

                <p className="mt-4">
                    At <span className="italic font-medium font-alex text-[#A37D4D]">Lyaim</span>, we believe that every great adventure starts with a spark of imagination.
                    Whether you're crafting a winning strategy, exploring new worlds, or competing with friends, our platform is designed to turn your fantasy gaming dreams into reality.
                    We’re not just about playing games – we’re about experiencing them. Our goal is to create an immersive environment where players can dive into fantasy universes, challenge their minds,
                    and connect with fellow gamers who share the same passion. From strategy games to fantasy sports, we bring the best of fantasy gaming to your fingertips.
                </p>

                <p className="mt-4">
                    Born from a love for gaming and the thrill of competition, <span className="italic font-semibold font-alex text-[#A37D4D]">Lyaim</span> was created to give
                    players a space where fantasy, strategy, and fun collide. Our platform offers a seamless experience for both casual gamers and hardcore enthusiasts,
                    with rich content, engaging gameplay, and a strong community to support your journey.
                </p>

                <p className="mt-4">
                    At <span className="italic font-semibold font-alex text-[#A37D4D]">Lyaim</span>, we’re committed to innovation. Our platform is always evolving, with new features, game updates, and challenges to keep you engaged.
                    We’re here to help you level up your fantasy gaming experience, with endless possibilities for excitement, achievement, and fun.
                    With our customer-centric approach, we ensure the highest possible gain for our customers in the most easy, reliable, and secure way.
                </p>

                <p className="mt-6 font-semibold italic text-lg">
                    Join us today and unlock a universe of fantasy gaming where every game is a new adventure.
                    Whether you're chasing the thrill of victory or simply enjoying the journey, there's no limit to where your imagination can take you.
                </p>
            </div>
        </div>
    );
}
