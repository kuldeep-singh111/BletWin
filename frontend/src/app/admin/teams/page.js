'use client';

import { useState, useEffect } from 'react';
import apiService from '@/components/apiService';
import toast from 'react-hot-toast';

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [newTeam, setNewTeam] = useState({
    matchId: '',
    homeTeam: '',
    awayTeam: '',
    homeTeamPlayers: '',
    awayTeamPlayers: '',
    // id: null, // Added ID for editing
  });

  // Fetch teams on component mount
  useEffect(() => {
    const fetchTeams = async () => {
      // try {
      //   const response = await apiService.getData('/admin/teams');
      //   setTeams(response.data);
      // } catch (error) {
      //   toast.error('Error fetching teams');
      // }
    };
    fetchTeams();
  }, []);

  // Create a new team
  const handleCreateTeam = async () => {
    try {
      const payload = {
        matchId: newTeam.matchId,
        homeTeam: newTeam.homeTeam,
        awayTeam: newTeam.awayTeam,
        homeTeamPlayers: newTeam.homeTeamPlayers.split(', '),
        awayTeamPlayers: newTeam.awayTeamPlayers.split(', '),
      };
      const response = await apiService.postData('/admin/team', payload);
      // setTeams([...teams, response.data]);
      toast.success('Team added successfully!'); console.log(response);
      setNewTeam({
        matchId: '',
        homeTeam: '',
        awayTeam: '',
        homeTeamPlayers: '',
        awayTeamPlayers: '',
        // id: null,
      });
    } catch (error) {
      toast.error('Error adding team');
      console.error('Error:', error);
    }
  };

  // Edit a team
  const handleEditTeam = (team) => {
    setNewTeam({
      matchId: team.matchId,
      homeTeam: team.homeTeam,
      awayTeam: team.awayTeam,
      homeTeamPlayers: team.homeTeamPlayers.join(', '),
      awayTeamPlayers: team.awayTeamPlayers.join(', '),
      id: team.id,
    });
  };

  // Save the edited team
  const handleSaveEdit = async () => {
    // try {
    //   const payload = {
    //     matchId: newTeam.matchId,
    //     homeTeam: newTeam.homeTeam,
    //     awayTeam: newTeam.awayTeam,
    //     homeTeamPlayers: newTeam.homeTeamPlayers.split(', '),
    //     awayTeamPlayers: newTeam.awayTeamPlayers.split(', '),
    //   };
    //   const response = await apiService.putData(/admin/team/${newTeam.id}, payload);
    //   setTeams(teams.map((team) => (team.id === response.data.id ? response.data : team)));
    //   toast.success('Team edited successfully!');
    //   setNewTeam({
    //     matchId: '',
    //     homeTeam: '',
    //     awayTeam: '',
    //     homeTeamPlayers: '',
    //     awayTeamPlayers: '',
    //     id: null,
    //   });
    // } catch (error) {
    //   toast.error('Error editing team');
    // }
  };

  // Delete a team
  const handleDeleteTeam = async (id) => {
    // try {
    //   await apiService.deleteData(/admin/team/${id});
    //   setTeams(teams.filter((team) => team.id !== id));
    //   toast.success('Team deleted successfully!');
    // } catch (error) {
    //   toast.error('Error deleting team');
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Teams</h1>

      {/* Render Add New Team Form */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Add / Edit Team</h3>
        <input
          type="text"
          className="border p-2 mb-2 w-full"
          placeholder="Match ID"
          value={newTeam.matchId}
          onChange={(e) => setNewTeam({ ...newTeam, matchId: e.target.value })}
        />
        <input
          type="text"
          className="border p-2 mb-2 w-full"
          placeholder="Home Team"
          value={newTeam.homeTeam}
          onChange={(e) => setNewTeam({ ...newTeam, homeTeam: e.target.value })}
        />
        <textarea
          className="border p-2 mb-2 w-full"
          placeholder="Enter Home Team Players (comma separated)"
          value={newTeam.homeTeamPlayers}
          onChange={(e) => setNewTeam({ ...newTeam, homeTeamPlayers: e.target.value })}
        />
        <input
          type="text"
          className="border p-2 mb-2 w-full"
          placeholder="Away Team"
          value={newTeam.awayTeam}
          onChange={(e) => setNewTeam({ ...newTeam, awayTeam: e.target.value })}
        />
        <textarea
          className="border p-2 mb-2 w-full"
          placeholder="Enter Away Team Players (comma separated)"
          value={newTeam.awayTeamPlayers}
          onChange={(e) => setNewTeam({ ...newTeam, awayTeamPlayers: e.target.value })}
        />
        <button
          onClick={newTeam.id ? handleSaveEdit : handleCreateTeam}
          className="bg-blue-500 text-white px-6 py-2 rounded-md"
        >
          {newTeam.id ? 'Save Changes' : 'Add Team'}
        </button>
      </div>

      {/* Render Teams in Card Format */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((team) => (
          <div key={team.id} className="border p-4 rounded-md shadow-lg hover:shadow-xl transform transition duration-300">
            <h3 className="text-2xl font-semibold mb-2">{team.homeTeam} vs {team.awayTeam}</h3>
            <p><strong>Match ID:</strong> {team.matchId}</p>
            <p><strong>Home Team Players:</strong> {team.homeTeamPlayers.join(', ')}</p>
            <p><strong>Away Team Players:</strong> {team.awayTeamPlayers.join(', ')}</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleEditTeam(team)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTeam(team.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamsPage;