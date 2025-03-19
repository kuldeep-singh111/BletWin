'use client';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div
            className="min-h-screen w-full bg-cover bg-center flex flex-col justify-start"
            style={{
                backgroundImage: "url('/Images/Error.gif')",
                backgroundColor: '#DFE3F2',
                opacity: 0.8
            }}
        >

            <div className="flex flex-col justify-center items-center min-h-screen px-4 py-8">
                <div className="text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-[#0A0440] font-bold font-alkalami mb-4 drop-shadow-[1px_1px_2px_white]">
                        404 Error
                    </h1>
                    <h3 className="text-lg sm:text-xl md:text-3xl text-[#152669] font-aleo font-bold italic mb-10 drop-shadow-[1px_1px_1px_white]">
                        The page you're looking for might have been removed or is temporarily unavailable.
                    </h3>

                    <div className="flex justify-center">
                        <Link href="/" passHref>
                            <button className="px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-5 rounded-lg bg-[linear-gradient(125.26deg,#5672B8_22.66%,rgba(4,11,41,0.86)_59.18%)] text-[#ffffff] text-lg sm:text-xl md:text-2xl font-aleo font-semibold transform hover:scale-105 transition-transform duration-300">
                                GO TO HOME PAGE
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
