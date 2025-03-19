'use client';

import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const faqs = [
    { question: "REGISTRATION FAQS", answer: "Here are some common registration questions." },
    { question: "PLAYING THE GAME FAQS", answer: "How to play the game effectively." },
    { question: "SCORES AND POINTS FAQS", answer: "Understanding the scoring system." },
    { question: "REFER AND EARN FAQS", answer: "Earn rewards by referring friends." },
    { question: "ACCOUNT FAQS", answer: "Managing your account and settings." },
    { question: "WINNING PRIZES FAQS", answer: "How to claim and receive prizes." },
];

export default function Help() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Message:', message);
    };

    return (
        <div className="min-h-screen bg-[url('/Images/helpBackground.jpeg')] bg-cover bg-center text-center px-4 py-20">
            <Navbar />

            <div className="w-full max-w-4xl mx-auto p-6">
                <h2 className="text-2xl font-bold text-black">Hii, How can we help you?</h2>
                <p className="mt-2 text-lg md:text-xl lg:text-2xl font-semibold font-alegreya text-[#152669DB] italic">
                    No question is too small—Let us guide you on your journey to victory!
                </p>
                <form onSubmit={handleSubmit} className="mt-6 w-full font-medium text-white text-lg">
                    <textarea
                        id="message"
                        name="message"
                        placeholder="Type your question here..."
                        className="w-full mt-2 p-3 md:p-6 lg:p-10 rounded-lg bg-[#A5A5A51A] outline-none resize-none"
                        rows="4"
                    />

                    <div className="flex flex-col sm:flex-row items-center w-full">
                        <input
                            type="email"
                            placeholder="Email:"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 p-2 rounded-md border-gray-300 outline-none bg-[#0A044033] placeholder-white"
                            required
                        />
                        <button
                            type="submit"
                            className="ml-2 px-6 py-2 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-gray-800 rounded-md shadow-lg hover:opacity-90"
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>

            <div className="w-full max-w-4xl mx-auto p-6">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-alegreya text-center text-black mb-4">Frequently Asked Questions</h2>

                {faqs.map((faq, index) => (
                    <div key={index} className="mb-2">
                        <button
                            className="flex justify-between items-center w-full px-2 py-1 sm:px-4 sm:py-2 bg-[#0A044033] text-base sm:text-lg font-semibold rounded-lg shadow-md"
                            onClick={() => toggleFAQ(index)}
                        >
                            {faq.question}
                            <FaChevronDown className={`transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
                        </button>
                        {openIndex === index && (
                            <div className="p-4 bg-gray-300 text-black rounded-b-lg">{faq.answer}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
