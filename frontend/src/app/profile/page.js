'use client';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from "@/context/AuthContext.js";
import withAuth from "../../hoc/withAuth.js";
import LoadingPage from '@/components/LoadingPage.js';
import { FaChevronDown } from "react-icons/fa";
import { useState } from 'react';

const Profile = () => {
  const { user, loading, wallet } = useUser();
  const [showReferral, setShowReferral] = useState(false);

  if (loading) {
    // return <p className="text-center text-white text-2xl">Loading...</p>;
    return <LoadingPage />
  }

  if (!user) {
    return <p className="text-center text-white text-2xl">User not found</p>;
  }

  return (
    <div
      className="min-h-screen pt-24 w-full bg-cover bg-center"
      style={{
        background: 'linear-gradient(90deg, #0A0440, #78CAC0)',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Navbar />
      <div className="flex justify-center items-center min-h-screen p-4 font-aleo ">
        <div className="bg-gray-300 bg-opacity-5 max-w-4xl w-full rounded-xl overflow-hidden">
          <div className="flex flex-col md:flex-row justify-center items-center w-full mx-auto">

            {/* Image */}
            <div className="hidden md:block w-1/3">
              <Image
                src="/Images/userProfile.png"
                alt="Player"
                width={300}
                height={500}
                className="object-cover"
                layout="intrinsic"
              />
            </div>

            {/* user details */}
            <div className="flex-1 p-6 md:p-12 w-full">
              <div className="flex justify-between text-2xl font-bold">
                <span>Hii, {user.username}</span>
                <p className="px-3 py-1 rounded-md bg-[#0A044033]">
                  <Link href="/wallet">
                    Wallet <span className='text-white'>$ {wallet?.totalMoney.toFixed(2)}</span>
                  </Link>
                </p>
              </div>

              <div className="mt-6 space-y-4">

                <input
                  type="email"
                  name="email"
                  value={user?.email}
                  readOnly
                  className="w-full border-b bg-transparent font-aleo text-xl placeholder-black outline-none pl-2 py-2"
                />


                {/* <input
                  type="text"
                  name="username"
                  value={user?.username}
                  readOnly
                  className="w-full border-b bg-transparent font-aleo text-xl outline-none placeholder-black pl-2 py-2"
                /> */}



                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    name="username"
                    value={user?.username}
                    readOnly
                    className="w-full border-b bg-transparent font-aleo text-xl outline-none placeholder-black pl-2 py-2"
                  />
                  {/*  Dropdown Button */}
                  <button
                    onClick={() => setShowReferral(!showReferral)}
                    className="text-white bg-gradient-to-r from-[#5672B8] via-[#040B29DB] to-[#040B29DB] px-2 py-1 rounded-full hover:text-gray-500"
                  >
                    <FaChevronDown />
                  </button>
                </div>


                {showReferral && (
                  <p className="text-white bg-[#45435c33] p-2 rounded-md mt-2 text-center font-aleo">
                    A total of  <span className='font-bold text-green-950'>{user?.referralCount || 0}</span> users have registered using your referral.
                  </p>
                )}




                <input
                  type="number"
                  name="mobileNo"
                  value={user?.mobileNo}
                  readOnly
                  className="w-full border-b bg-transparent font-aleo text-xl placeholder-black outline-none pl-2 py-2"
                />


                <input
                  type="text"
                  name="referralCode"
                  placeholder="Referral Code"
                  value={user?.referralCode || ''}
                  readOnly
                  className="w-full border-b bg-transparent font-aleo text-xl outline-none placeholder-black pl-2 py-2"
                />
              </div>


              <div className="flex flex-col md:flex-row justify-center items-center gap-3 font-medium text-white mt-6">
                <p className='text-2xl'>Want to update your profile ?{" "}</p>
                <Link href="/profile-update">
                  <button className="bg-gradient-to-r from-[#5672B8] via-[#040B29DB] to-[#040B29DB] text-white text-2xl px-16 py-2 rounded-full font-aleo hover:text-gray-500">Update</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default withAuth(Profile);