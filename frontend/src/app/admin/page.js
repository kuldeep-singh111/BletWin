import Link from 'next/link';

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">Admin Dashboard</h1>
        <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Matches Section */}
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-semibold mb-2">Matches</h3>
            <p className="mb-4">Schedule and manage upcoming matches.</p>
            <Link href="/admin/matches" className="text-blue-200 hover:text-white transition duration-300">
              Go to Matches
            </Link>
          </div>

          {/* Teams Section */}
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-semibold mb-2">Teams</h3>
            <p className="mb-4">Manage the teams participating in your platform.</p>
            <Link href="/admin/teams" className="text-green-200 hover:text-white transition duration-300">
              Go to Teams
            </Link>
          </div>

          {/* Contests Section */}
          <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-semibold mb-2">Contests</h3>
            <p className="mb-4">Create and manage contests for players.</p>
            <Link href="/admin/contests" className="text-yellow-200 hover:text-white transition duration-300">
              Go to Contests
            </Link>
          </div>

          {/* Player Stats Section */}
          <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-semibold mb-2">Player Stats</h3>
            <p className="mb-4">View and manage player statistics.</p>
            <Link href="/admin/playerStats" className="text-red-200 hover:text-white transition duration-300">
              Go to Player Stats
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default AdminPage;