'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as motion from "framer-motion/client";
import { fetchAccountData } from '../utils'; // Import your function

export const DashButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [tagName, setTagName] = useState('');
  const [error, setError] = useState('');
  const [accountData, setAccountData] = useState({}); // New state to store fetched data
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const router = useRouter();

  const showModal = () => setIsModalOpen(true);
  const hideModal = () => setIsModalOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Clear previous error
    if (!accountName || !tagName) {
      setError("Both fields are required");
      return;
    }
    
    try {
      setIsLoading(true); // Start loading
      const data: any = await fetchAccountData(accountName, tagName); // Fetch account data
      
      if (data) {
        setAccountData(data); // Store the data in state  
        console.log(data); // Log the fetched data instead of the state
        setIsLoading(false); // Stop loading
        localStorage.setItem('accountData', JSON.stringify(data)); // Use 'data' directly to store in localStorage

        // Redirect to the dashboard with the data if needed
        router.push(`/Dashboard?accountName=${accountName}&tagName=${tagName}&region=${data.accountInfo.region}`);
      }      
    } catch (error) {
      setError('Error fetching account data. Please try again.'); // Set error message
      console.error('Error fetching account data:', error); // Log error for debugging
      setIsLoading(false); // Stop loading
    }
  };
  

  return (
    <div>
      <motion.button
        className="btn bg-[#fd4556] hover:bg-[#ff8f97] text-white font-extrabold text-lg px-6 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        onClick={showModal}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
      >
        Enter the Battlefield
      </motion.button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="bg-[#1a0a0e] text-white p-8 rounded-lg shadow-xl max-w-md w-full"
          >
            <h3 className="font-bold text-2xl mb-4 text-[#fd4556]">Agent Registration</h3>
            <p className="mb-6 text-[#fffbf5]">Enter your Valorant credentials to access the dashboard.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="accountName" className="block text-sm font-medium text-[#fffbf5] mb-1">
                  Account Name
                </label>
                <input
                  type="text"
                  id="accountName"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#2f2325] border border-[#53212b] rounded-md text-[#fffbf5] focus:outline-none focus:ring-2 focus:ring-[#fd4556]"
                  required
                  placeholder="Enter your account name"
                />
              </div>

              <div>
                <label htmlFor="tagName" className="block text-sm font-medium text-[#fffbf5] mb-1">
                  Tag Name
                </label>
                <input
                  type="text"
                  id="tagName"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#2f2325] border border-[#53212b] rounded-md text-[#fffbf5] focus:outline-none focus:ring-2 focus:ring-[#fd4556]"
                  required
                  placeholder="Enter your tag name"
                />
              </div>

              {error && <p className="text-[#fd4556] text-sm">{error}</p>}
              {isLoading && <p className="text-[#fd4556] text-sm">Loading...</p>} {/* Show loading state */}

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={hideModal}
                  className="px-4 py-2 bg-[#2f2325] text-[#fffbf5] rounded-md hover:bg-[#53212b] transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#fd4556] text-white rounded-md hover:bg-[#ff8f97] transition duration-300"
                >
                  Access Dashboard
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
