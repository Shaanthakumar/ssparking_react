import React from "react";
import './cntus.css'; // Import the CSS file

function Cntus() {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen dark">
                <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-white mb-4 text-center">REACH US 📩</h2> {/* Updated class */}
                    
                    <form className="flex flex-col">
                        <input
                            placeholder="Enter your name"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="text"
                        />
                        <input
                            placeholder="Enter your email address"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="email"
                        />
                        <input
                            placeholder="Drop your concern"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="text"
                        />

                        <button
                            className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-green-600 hover:to-blue-600 transition ease-in-out duration-150"
                        >
                            DROP ➤
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Cntus;
