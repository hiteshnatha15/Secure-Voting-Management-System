import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function GiveVote() {
    const [selectedElection, setSelectedElection] = useState("");
    const [selectedCandidate, setSelectedCandidate] = useState("");
    const [candidateParty, setCandidateParty] = useState("");
    const [elections, setElections] = useState([]);
    const [candidatesByElection, setCandidatesByElection] = useState([]);
    const [voterData, setVoterData] = useState([]);

    useEffect(() => {
        const fetchElections = async () => {
            try {
                const response = await axios.get('http://localhost:3000/electionRoutes/getElections');
                setElections(response.data);
            } catch (error) {
                console.error('Error fetching elections:', error);
            }
        };

        const fetchCandidates = async () => {
            try {
                const response = await axios.get('http://localhost:3000/candidateRoutes/getCandidates');
                setCandidatesByElection(response.data);
            } catch (error) {
                console.error('Error fetching candidates:', error);
            }
        };

        fetchElections();
        fetchCandidates();
    }, []);

    const handleElectionChange = (e) => {
        setSelectedElection(e.target.value);
    };

    const handleCandidate = (e) => {
        const selectedValue = e.target.value;
        const [candidateName, party] = selectedValue.split(" - ");
        setSelectedCandidate(candidateName);
        setCandidateParty(party);
    };

    const handleVote = async () => {
        try {
            const response = await axios.get("http://localhost:3000/voterInsertRoutes/getVoter");
            setVoterData(response.data);
        } catch (error) {
            console.error('Error fetching voter details:', error);
        }

        try {
            await axios.post('http://localhost:3000/voteRoutes/submitVote', {
                Voter_ID: "voter@gmail.com",
                Voter_Name: "voter1",
                Candidate_Name: selectedCandidate,
                Candidate_Party: candidateParty,
                Election_ID: selectedElection
            });
                toast.success("Thank you! Your vote has been submitted");
                setTimeout(() => {
                    window.location.reload("/giveVote");
                }, 1000);
        } catch (error) {
            console.error('Error submitting vote:', error);
        }
    };

    return (
        <>
            <Navbar />
            <ToastContainer />
            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
                <div className="bg-white shadow-md rounded-md p-6">
                    <h1 className="text-2xl font-bold mb-4">Give Vote</h1>
                    <div className="mb-4">
                        <label htmlFor="election" className="block text-sm font-semibold mb-2">Select Election:</label>
                        <select
                            id="election"
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
                            value={selectedElection}
                            onChange={handleElectionChange}
                            required
                        >
                            <option value="">Select election</option>
                            {elections.map(election => (
                                <option key={election.electionId} value={election.electionId}>{election.electionName}</option>
                            ))}
                        </select>
                    </div>
                    {selectedElection && (
                        <div className="mb-4">
                            <label htmlFor="candidate" className="block text-sm font-semibold mb-2">Select Candidate:</label>
                            <select
                                id="candidate"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
                                value={`${selectedCandidate} - ${candidateParty}`}
                                onChange={handleCandidate}
                                required
                            >
                                <option value="">Select candidate</option>
                                {candidatesByElection.map(candidate => (
                                    <option key={candidate.name} value={`${candidate.name} - ${candidate.party}`}>
                                        {candidate.name} - {candidate.party}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        onClick={handleVote}
                        disabled={!selectedElection || !selectedCandidate}
                    >
                        Submit Vote
                    </button>
                </div>
            </div>
        </>
    );
}

export default GiveVote;
