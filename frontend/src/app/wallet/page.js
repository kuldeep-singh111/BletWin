'use client';
import { useState, useEffect, Suspense} from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import apiService from '@/components/apiService';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import { useUser } from "@/context/AuthContext.js";

export default function WalletPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WalletContent />
    </Suspense>
  );
}

function WalletContent() {
    const searchParams = useSearchParams();
    const status = searchParams.get('status');
    const token = searchParams.get('token');

    const { user } = useUser();
    const [wallet, setWallet] = useState({
        totalMoney: 0,
        depositAmount: 0,
        winningAmount: 0,
        withdrawableAmount: 0,
        cashBonus: 0,
    });
    const [addAmount, setAddAmount] = useState('');
    const [withdrawData, setWithdrawData] = useState({ amount: '', paypalID: '', age: '' });
    const [errors, setErrors] = useState({ addAmount: '', withdraw: {} });

    useEffect(() => {
        fetchWalletData();
    }, []);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const status = searchParams.get('status');
        const token = searchParams.get('token');

        if (status === 'success' && token) {
            handlePaymentSuccess(token);
        } else if (status === 'cancel') {
            toast.error("Payment was cancelled!");
            window.history.replaceState(null, '', '/wallet');
        }
    }, []);

    const fetchWalletData = async () => {
        try {
            const response = await apiService.fetchData('/wallet');
            if (response.data && response.data.wallet) {
                setWallet(response.data.wallet);
            } else {
                console.error('Invalid wallet data received:', response.data);
            }
        } catch (error) {
            console.error('Error fetching wallet:', error);
            toast.error('Failed to load wallet data. Please try again later.');
        }
    };

    const handlePaymentSuccess = async (paypalToken) => {
        try {
            const response = await apiService.fetchData(`/wallet/add-funds/success?token=${paypalToken}`);

            if (response.data.success) {
                toast.success(response.data.message);
                fetchWalletData(); // Update wallet balance
                window.history.replaceState(null, '', '/wallet');
            } else {
                toast.error("Payment verification failed!");
            }
        } catch (error) {
            if (error.response?.data?.message === "Payment already captured.") {
                toast.info("This payment was already processed.");
                window.history.replaceState(null, '', '/wallet');
            } else {
                toast.error("Payment verification failed!");
            }
        }
    };

    const handleAddMoney = async () => {
        if (!addAmount) {
            setErrors((prev) => ({ ...prev, addAmount: 'Please fill out this field.' }));
            return;
        } else if (isNaN(addAmount) || Number(addAmount) <= 0) {
            setErrors((prev) => ({ ...prev, addAmount: 'Please enter a valid amount greater than 0.' }));
            return;
        }

        try {
            const response = await apiService.postData('/wallet/add-funds', { amount: Number(addAmount) });
            window.location.href = response.data.approvalUrl;
        } catch (error) {
            toast.error('Failed to initiate payment. Try again!');
        }
    };

    const handleWithdraw = async () => {
        let newErrors = {};
        let amount = Number(withdrawData.amount);
        let paypalID = withdrawData.paypalID.trim();

        if (!withdrawData.amount) {
            newErrors.amount = 'Please fill out this field.';
        } else if (isNaN(amount)) {
            newErrors.amount = 'Amount must be numeric.';
        }

        if (!paypalID) {
            newErrors.paypalID = 'Please fill out this field.';
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(paypalID)) {
            newErrors.paypalID = 'Please enter a valid PayPal ID.';
        }

        if (!withdrawData.age) {
            newErrors.age = 'Please fill out this field.';
        } else if (isNaN(withdrawData.age)) {
            newErrors.age = 'Age must be numeric.';
        } else if (Number(withdrawData.age) < 18) {
            newErrors.age = 'Age must be greater than or equal to 18.';
        }

        if (Object.keys(newErrors).length) {
            setErrors((prev) => ({ ...prev, withdraw: newErrors }));
            return;
        }

        try {
            const response = await apiService.postData('/wallet/withdraw', { amount, paypalID, age: Number(withdrawData.age) });
            toast.success('Withdrawal request submitted successfully!');
            setWithdrawData({ amount: '', paypalID: '', age: '' });
            fetchWalletData();
        } catch (error) {
            console.error("Withdrawal Error:", error.response?.data?.message);
            toast.error(error.response?.data?.message || 'Withdrawal failed. Try again!');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#6b2c2c] to-[#4c60a6] flex items-center justify-center p-2 text-white">
            <Navbar />
            <div className="w-full max-w-4xl mt-20 p-6 rounded-lg shadow-xl font-aleo text-black flex flex-col items-center">
                <div className="flex w-full md:gap-12 gap-7 items-center">
                    <Image src="/Images/w 1.png" alt="Wallet" width={200} height={200} className='max-md:w-40 max-sm:hidden' />
                    <div className="flex flex-col space-y-4 w-full">
                        <h1 className="md:text-2xl text-xl font-semibold max-[400px]:text-sm">
                            Hii, <span className="font-bold">{user?.username || 'Username'}</span>
                            <span className="bg-[#0a0440] md:text-xl text-sm bg-opacity-25 text-[#0a0440] px-4 py-2 max-[400px]:px-1 rounded-lg ml-4">
                                Total Money: <span className='text-white text-lg md:text-xl'>{wallet?.totalMoney?.toFixed(2) || '0.00'}</span>
                            </span>
                        </h1>
                        <p className="border-b border-white pb-1">Deposited Amount: <span className="font-bold ml-4 text-[#bebdbd]">$ {wallet?.depositAmount?.toFixed(2) || '0.00'}</span></p>
                        <p className="border-b border-white pb-1">Winning Amount: <span className="font-bold ml-4 text-[#bebdbd]">$ {wallet?.winningAmount?.toFixed(2) || '0.00'}</span></p>
                        <p className="border-b border-white pb-1">Withdrawable Amount: <span className="font-bold ml-4 text-[#bebdbd]">$ {wallet?.withdrawableAmount?.toFixed(2) || '0.00'}</span></p>
                        <p className="border-b border-white pb-1">Cash Bonus: <span className="font-bold ml-4 text-[#bebdbd]">$ {wallet?.cashBonus?.toFixed(2) || '0.00'}</span></p>
                        <div className="flex gap-4 items-center mt-2 flex-col sm:flex-row">
                            <input
                                type="text"
                                value={addAmount}
                                onChange={(e) => setAddAmount(e.target.value)}
                                className={`w-full p-2 border-b ${errors.addAmount ? 'border-red-500' : 'border-white'} bg-transparent outline-none`}
                                placeholder="Enter amount to add"
                            />
                            {errors.addAmount && <p className="text-red-500 text-sm mt-1">{errors.addAmount}</p>}
                            <button onClick={handleAddMoney} className="bg-gradient-to-br from-[#5672B8] via-[rgba(4,11,41,0.86)] to-[#040b29] text-white font-bold px-6 max-sm:px-12 py-2 rounded-full hover:text-gray-500">Add_Money</button>
                        </div>
                    </div>
                </div>
                <div className="flex w-full mt-6 gap-8 items-center max-sm:mt-12">
                    <div className="flex-1 flex flex-col">
                        <p className="text-[#400404] md:text-3xl text-2xl max-sm:text-xl font-bold drop-shadow-[0px_0px_1px_white]">Want to Withdraw Funds?</p>
                        {['amount', 'paypalID', 'age'].map((field, index) => (
                            <div key={index} className="w-full flex flex-col mt-2">
                                <input
                                    type="text"
                                    value={withdrawData[field]}
                                    onChange={(e) => setWithdrawData((prev) => ({ ...prev, [field]: e.target.value }))}
                                    className={`w-full p-2 border-b ${errors.withdraw[field] ? 'border-red-500' : 'border-white'} bg-transparent outline-none`}
                                    placeholder={`Enter ${field}`}
                                />
                                {errors.withdraw[field] && <p className="text-red-500 text-sm mt-1">{errors.withdraw[field]}</p>}
                            </div>
                        ))}
                        <div className="flex justify-center">
                            <button onClick={handleWithdraw} className="mt-4 bg-gradient-to-br from-[#5672B8] via-[rgba(4,11,41,0.86)] to-[#040b29] font-bold text-white px-14 py-2 rounded-full hover:text-gray-500">Withdraw</button>
                        </div>
                    </div>
                    <Image src="/Images/s 1.png" alt="Hand Exchange" width={250} height={150} className='max-md:w-52 max-sm:hidden' />
                </div>
            </div>
        </div>
    );
}
