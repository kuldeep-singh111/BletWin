// 'use client';

// import { useEffect, useState } from 'react';
// import apiService from '@/components/apiService';
// import toast from 'react-hot-toast';

// const UsersPage = () => {
//   const [users, setUsers] = useState();

//   useEffect(() => {
//     // Fetch users when component mounts
//     const fetchUsers = async () => {
//       try {
//         const response = await apiService.fetchData('/admin/getUsers');
//         setUsers(response.data?.users || []);
//       } catch (error) {
//         toast.error('Error fetching users! Check console.');
//         console.error(error);
//       }
//     };

//     fetchUsers();
//   }, [])

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">All Users</h1>

//       <div className=''>
//         <table className="min-w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border border-gray-300 px-4 py-2 text-left">Username</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">Mobile No</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">Referral Code</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">Wallet Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.username} className="hover:bg-gray-50">
//                 <td className="border border-gray-300 px-4 py-2">{user.username}</td>
//                 <td className="border border-gray-300 px-4 py-2">{user.email}</td>
//                 <td className="border border-gray-300 px-4 py-2">{user.mobileNo}</td>
//                 <td className="border border-gray-300 px-4 py-2">{user.referralCode || '-'}</td>
//                 <td className="border border-gray-300 px-4 py-2">${user.wallet.depositAmount.toFixed(2)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UsersPage;