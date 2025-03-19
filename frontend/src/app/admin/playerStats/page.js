'use client';

import { useState } from 'react';
import apiService from '@/components/apiService';
import toast from 'react-hot-toast';
import withAdminAuth from '@/hoc/withAdminAuth.js';

const PlayerPage = () => {
  const [playerStats, setPlayerStats] = useState([]);
  const [newPlayerStat, setNewPlayerStat] = useState({
    matchId: '',
    playerId: '',
    goals: '',
    assists: '',
    shots: '',
    passes: '',
    tackles: '',
    interceptions: '',
    yellowCards: '',
    penaltiesScored: '',
  });

  const handleCreatePlayerStat = async () => {
    try {
      const response = await apiService.postData('/admin/player-stats', newPlayerStat); // API POST request
      setPlayerStats([...playerStats, response.data]);
      toast.success('Player stats added successfully!');
      setNewPlayerStat({
        matchId: '',
        playerId: '',
        goals: 0,
        assists: 0,
        shots: 0,
        passes: 0,
        tackles: 0,
        interceptions: 0,
        yellowCards: 0,
        penaltiesScored: 0,
      });
    } catch (error) {
      toast.error('Error adding player stats');
      console.error('Error:', error);
    }
  };

  const handleUpdatePlayerStat = async (id, updatedStat) => {
    try {
      //   const response = await apiService.putData(/admin/player-stats/${id}, updatedStat); // API PUT request
      const updatedStats = playerStats.map((stat) =>
        stat.id === id ? response.data : stat
      );
      setPlayerStats(updatedStats);
      toast.success('Player stats updated successfully!');
    } catch (error) {
      toast.error('Error updating player stats');
      console.error('Error:', error);
    }
  };

  const handleDeletePlayerStat = async (id) => {
    try {
      //   await apiService.deleteData(/admin/player-stats/${id}); // API DELETE request
      const updatedStats = playerStats.filter((stat) => stat.id !== id);
      setPlayerStats(updatedStats);
      toast.success('Player stats deleted successfully!');
    } catch (error) {
      toast.error('Error deleting player stats');
      console.error('Error:', error);
    }
  };




  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Admin Dashboard</h1>

      {/* Player Stats Section */}
      <Section
        title="Player Stats"
        data={playerStats}
        renderForm={
          <div>
            <h3 className="text-xl font-semibold mb-2">Add New Player Stats</h3>
            <input
              type="text"
              className="border p-2 mb-2 w-full"
              placeholder="Match ID"
              value={newPlayerStat.matchId}
              onChange={(e) => setNewPlayerStat({ ...newPlayerStat, matchId: e.target.value })}
            />
            <input
              type="text"
              className="border p-2 mb-2 w-full"
              placeholder="Player ID"
              value={newPlayerStat.playerId}
              onChange={(e) => setNewPlayerStat({ ...newPlayerStat, playerId: e.target.value })}
            />
            <input
              type="number"
              className="border p-2 mb-2 w-full"
              placeholder="Goals"
              value={newPlayerStat.goals}
              onChange={(e) => setNewPlayerStat({ ...newPlayerStat, goals: e.target.value })}
            />
            <input
              type="number"
              className="border p-2 mb-2 w-full"
              placeholder="Assists"
              value={newPlayerStat.assists}
              onChange={(e) => setNewPlayerStat({ ...newPlayerStat, assists: e.target.value })}
            />
            <input
              type="number"
              className="border p-2 mb-2 w-full"
              placeholder="Shots"
              value={newPlayerStat.shots}
              onChange={(e) => setNewPlayerStat({ ...newPlayerStat, shots: e.target.value })}
            />
            <input
              type="number"
              className="border p-2 mb-2 w-full"
              placeholder="Passes"
              value={newPlayerStat.passes}
              onChange={(e) => setNewPlayerStat({ ...newPlayerStat, passes: e.target.value })}
            />
            <input
              type="number"
              className="border p-2 mb-2 w-full"
              placeholder="Tackles"
              value={newPlayerStat.tackles}
              onChange={(e) => setNewPlayerStat({ ...newPlayerStat, tackles: e.target.value })}
            />
            <input
              type="number"
              className="border p-2 mb-2 w-full"
              placeholder="Interceptions"
              value={newPlayerStat.interceptions}
              onChange={(e) => setNewPlayerStat({ ...newPlayerStat, interceptions: e.target.value })}
            />
            <input
              type="number"
              className="border p-2 mb-2 w-full"
              placeholder="Yellow Cards"
              value={newPlayerStat.yellowCards}
              onChange={(e) => setNewPlayerStat({ ...newPlayerStat, yellowCards: e.target.value })}
            />
            <input
              type="number"
              className="border p-2 mb-2 w-full"
              placeholder="Penalties Scored"
              value={newPlayerStat.penaltiesScored}
              onChange={(e) => setNewPlayerStat({ ...newPlayerStat, penaltiesScored: e.target.value })}
            />
            <button
              onClick={handleCreatePlayerStat}
              className="bg-blue-500 text-white px-6 py-2 rounded-md"
            >
              Add Player Stats
            </button>
          </div>
        }
      />
    </div>
  );
}

function Section({ title, data, renderForm }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((item, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-lg bg-white">
            {/* <h4 className="font-semibold text-lg">{Player ${item.playerId}}</h4> */}
            <div className="text-sm text-gray-500">
              <p><strong>Match ID:</strong> {item.matchId}</p>
              <p><strong>Goals:</strong> {item.goals}</p>
              <p><strong>Assists:</strong> {item.assists}</p>
              <p><strong>Shots:</strong> {item.shots}</p>
              <p><strong>Passes:</strong> {item.passes}</p>
              <p><strong>Tackles:</strong> {item.tackles}</p>
              <p><strong>Interceptions:</strong> {item.interceptions}</p>
              <p><strong>Yellow Cards:</strong> {item.yellowCards}</p>
              <p><strong>Penalties Scored:</strong> {item.penaltiesScored}</p>
            </div>

            <div className="mt-2 flex justify-between">
              <button
                onClick={() => handleUpdatePlayerStat(item.id, { ...item })}
                className="text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeletePlayerStat(item.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">{renderForm}</div>
    </div>
  );
}

export default PlayerPage;