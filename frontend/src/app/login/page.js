'use client';
import apiService from '@/components/apiService';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from "react-hot-toast";
import redirectIfAuth from "../../hoc/redirectIfAuth.js";

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const router = useRouter();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const errors = {};
        if (!formData.email.trim()) {
            errors.email = 'Email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Invalid email format.';
        }
        if (!formData.password.trim()) {
            errors.password = 'Password is required.';
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return
        }
        try {
            setLoading(true);
            const response = await apiService.login(formData);
            // console.log(response);
            toast.success("Logged in Successfully");
            localStorage.setItem('token', response.data.data)

            setFormData({
                email: '',
                password: '',
            });

            router.push("/");window.location.reload();
        } catch (error) {
            // console.log(error);
            toast.error(error?.response?.data?.message || error?.message);
            // setErrors((prevErrors) => ({
            //     ...prevErrors,
            //     server: error.response?.data?.message || "Something went wrong!",
            // }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen pt-20 pb-5 w-full bg-cover bg-center"
            style={{
                backgroundImage: "url(/Images/registration_ground.png)",
            }}
        >
            <Navbar />

            <h1 className="text-2xl font-bold font-alegreya text-white mb-2 text-center">
                LOG IN AND PLAY TO WIN!
            </h1>

            {/* Login Container */}
            <div className="flex bg-white/10 backdrop-blur-md shadow-lg rounded-xl overflow-hidden max-w-sm sm:max-w-xl md:max-w-3xl w-full md:max-h-80 mx-auto">
                {/* Left Section: Image */}
                <div className="w-1/3 hidden md:block">
                    <Image
                        src="/Images/registration.jpeg"
                        alt="Player"
                        width={270}
                        height={300}
                        className="object-cover"
                        layout="intrinsic"
                    />
                </div>

                {/* Right Section: Form */}
                <div className="flex-1 p-2 sm:p-4 md:p-6">
                    <div className="mb-5 text-black text-center font-semibold font-aleo text-2xl">
                        Login
                    </div>
                    <form onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div className="mb-6">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => handleChange(e)}
                                className="w-full border-b bg-transparent font-aleo text-xl placeholder-gray-800 outline-none pl-2"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        {/* Password Field */}
                        <div className="mb-6">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full border-b bg-transparent font-aleo text-xl outline-none placeholder-gray-800 pl-2"
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        {/* Remember Me and Forgot Password */}
                        {/* <div className="flex items-center justify-between text-white sm:text-lg md:text-xl mb-6">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="mr-2 border-gray-400 rounded"
                                />
                                Remember me
                            </label>
                            <Link
                                href="#"
                                className="hover:underline"
                            >
                                Forget Password?
                            </Link>
                        </div> */}

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full py-1 rounded-full text-green-800 text-lg font-bold hover:bg-green-600 transition"
                            style={{
                                background: 'linear-gradient(150deg, #5fff4d, #008000)',
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
                            }}
                        >
                            {loading ? 'Loading...' : 'Login'}
                        </button>
                    </form>

                    {/* Register Section */}
                    <p className="text-center text-white mt-6">
                        Don&apos;t have an account?{" "}
                        <Link href="register" className="text-[#1E1E1E] text-lg md:text-xl font-medium hover:underline">
                            Register now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default redirectIfAuth(Login);
