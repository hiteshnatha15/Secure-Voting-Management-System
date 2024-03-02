import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; // Don't forget to import axios

function CreateElection() {
    const [electionId, setElectionId] = useState('');
    const [electionName, setElectionName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/ElectionRoutes/createElection", {
                electionId,
                electionName,
                startDate,
                endDate
            });
    
            if (response.data.added) {
                toast.success('Election created successfully!');
                console.log('Election created successfully!'); 
                setTimeout(() => {
                    window.location.href = "/ManageElection";
                }, 1000);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.error('Error submitting form:', error); 
            toast.error('An error occurred while submitting the form.');
        }
    };
    return (
        <>
            <ToastContainer />
            <div className="w-full h-full flex justify-center items-center bg-gray-100">
                <div className="bg-white rounded shadow-md p-8">
                    <h2 className="text-2xl font-bold mb-4">Create Election</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor="electionId" className="font-semibold mb-1">Election ID</label>
                            <input
                                type="text"
                                id="electionId"
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                value={electionId}
                                onChange={(e) => setElectionId(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="electionName" className="font-semibold mb-1">Election Name</label>
                            <input
                                type="text"
                                id="electionName"
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                value={electionName}
                                onChange={(e) => setElectionName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="startDate" className="font-semibold mb-1">Start Date</label>
                            <input
                                type="date"
                                id="startDate"
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="endDate" className="font-semibold mb-1">End Date</label>
                            <input
                                type="date"
                                id="endDate"
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Create Election</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateElection;
