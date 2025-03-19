'use client';

import apiService from '@/components/apiService';
import Navbar from '@/components/Navbar';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaFacebook, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

const ContactUs = () => {
    const [formData, setFormData] = useState({ email: "", message: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await apiService.contact(formData);
            setFormData({ email: "", message: "" })
            toast.success(res.data?.message || "Message sent successfully!");
        } catch (error) {
            toast.error("Error:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300 p-4 font-aleo">
            <Navbar />
            <div className='bg-gray-500 bg-opacity-40 shadow-lg rounded-xl overflow-hidden max-w-4xl w-full mx-auto py-8 px-6 mt-20 md:px-12 flex flex-col items-center text-center'>
                <h1 className="md:text-3xl text-2xl font-bold font-aleo text-[#0A0440] drop-shadow-[1px_1px_1px_black]">Contact Us</h1>
                <p className="md:text-3xl text-2xl italic text-[#0A0440] font-semibold sm:mt-10 mt-5 font-alegreya drop-shadow-[1px_1px_2px_white]">
                    Get in touch – we&apos;re here to provide the answers you need.
                </p>

                <form onSubmit={handleSubmit} className="">
                    {/* message area */}
                    <div className="w-full max-w-lg bg-gray-700 p-6 font-aleo text-lg rounded-lg mt-10 shadow-lg">
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            minLength={10}
                            className="w-full h-32 p-3 text-gray-200 bg-gray-700 rounded-md border-none resize-none focus:outline-none"
                            placeholder="Have something on your mind? We'd love to hear from you!"
                        ></textarea>
                    </div>
                    {/* email and send button */}
                    <div className="w-full max-w-lg flex flex-col sm:flex-row items-center mt-6 gap-3">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="flex-1 w-full sm:w-auto p-3 bg-gray-400 rounded-md text-white font-aleo font-semibold focus:outline-none placeholder-white"
                            placeholder='Enter Your Email:'
                        />
                        <button
                            type="submit"
                            className="p-3 px-8 bg-[linear-gradient(125.26deg,#5672B8_22.66%,rgba(4,11,41,0.86)_59.18%)]  font-aleo transform hover:scale-105 transition-transform duration-300 text-white font-bold md:text-xl rounded-md shadow-md"
                        >
                            Send
                        </button>
                    </div>
                </form>

                <p className="mt-8 md:text-xl text-lg font-semibold text-black drop-shadow-[1px_1px_1px_white]">
                    Contact us today and let&apos;s get started.
                </p>

                <div className="flex gap-6 mt-6">
                    <FaLinkedin className="text-blue-900 text-3xl cursor-pointer" />
                    <FaFacebook className="text-blue-700 text-3xl cursor-pointer" />
                    <FaInstagram className="text-pink-600 text-3xl cursor-pointer" />
                    <FaEnvelope className="text-red-600 text-3xl cursor-pointer" />
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
