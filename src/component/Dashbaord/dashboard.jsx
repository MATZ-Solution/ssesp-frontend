import React, { useState } from 'react';

const Dashboard = () => {
  const [stats] = useState({
    totalApplications: 2847,
    approved: 1523,
    pending: 892,
    enrolled: 1468
  });

  const [recentApplications] = useState([
    {
      id: '#SSESP-2847',
      name: 'Ahmed Ali Khan',
      grade: 'Grade 9',
      schoolType: 'Government',
      date: 'Feb 10, 2026',
      status: 'pending'
    },
    {
      id: '#SSESP-2846',
      name: 'Fatima Bibi',
      grade: 'Grade 8',
      schoolType: 'SEF',
      date: 'Feb 10, 2026',
      status: 'approved'
    },
    {
      id: '#SSESP-2845',
      name: 'Muhammad Bilal',
      grade: 'Grade 7',
      schoolType: 'Government',
      date: 'Feb 09, 2026',
      status: 'pending'
    },
    {
      id: '#SSESP-2844',
      name: 'Ayesha Noor',
      grade: 'Grade 6',
      schoolType: 'SEF',
      date: 'Feb 09, 2026',
      status: 'approved'
    },
    {
      id: '#SSESP-2843',
      name: 'Ali Raza',
      grade: 'Grade 9',
      schoolType: 'Government',
      date: 'Feb 08, 2026',
      status: 'rejected'
    },
    {
      id: '#SSESP-2842',
      name: 'Zainab Hassan',
      grade: 'Grade 8',
      schoolType: 'SEF',
      date: 'Feb 08, 2026',
      status: 'approved'
    }
  ]);

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40',
      approved: 'bg-green-500/20 text-green-400 border border-green-500/40',
      rejected: 'bg-red-500/20 text-red-400 border border-red-500/40'
    };
    return styles[status] || styles.pending;
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      alert('Logging out...');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] to-[#1a1f2e] p-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#0f4d3a] to-[#1a7a5e] rounded-2xl p-8 mb-8 shadow-2xl border border-green-500/30">
          <h1 className="text-3xl font-bold text-white mb-2">SSESP Admin Dashboard</h1>
          <p className="text-green-200 text-sm">Sindh School Education Scholarship Program - Session 2026-27</p>
          
          <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-xl">
                A
              </div>
              <div>
                <h3 className="text-white font-semibold">Admin Officer</h3>
                <p className="text-green-200 text-sm">Government of Sindh - SEF</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="bg-red-500/20 border border-red-500/50 text-red-300 px-6 py-2 rounded-xl hover:bg-red-500/30 transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Total Applications */}
          <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-green-500/20 hover:border-green-500/50 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-2xl">
                📝
              </div>
            </div>
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Total Applications</p>
            <h3 className="text-4xl font-bold text-green-400 mb-2">{stats.totalApplications.toLocaleString()}</h3>
            <p className="text-green-500 text-sm">↑ 23% from last month</p>
          </div>

          {/* Approved */}
          <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-green-500/20 hover:border-green-500/50 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-2xl">
                ✅
              </div>
            </div>
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Approved</p>
            <h3 className="text-4xl font-bold text-green-400 mb-2">{stats.approved.toLocaleString()}</h3>
            <p className="text-green-500 text-sm">↑ 18% from last month</p>
          </div>

          {/* Pending Review */}
          <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-green-500/20 hover:border-green-500/50 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-2xl">
                ⏳
              </div>
            </div>
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Pending Review</p>
            <h3 className="text-4xl font-bold text-green-400 mb-2">{stats.pending.toLocaleString()}</h3>
            <p className="text-red-400 text-sm">↓ 12% from last week</p>
          </div>

          {/* Enrolled Students */}
          <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-green-500/20 hover:border-green-500/50 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-2xl">
                🎓
              </div>
            </div>
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Enrolled Students</p>
            <h3 className="text-4xl font-bold text-green-400 mb-2">{stats.enrolled.toLocaleString()}</h3>
            <p className="text-green-500 text-sm">↑ 31% from last month</p>
          </div>
        </div>

        {/* Recent Applications Table */}
        <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-8 border border-green-500/20 mb-8">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <h2 className="text-2xl font-bold text-white">Recent Applications</h2>
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-xl hover:shadow-lg hover:shadow-green-500/50 transition-all hover:-translate-y-0.5">
              🔍 Filter Applications
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-green-500/10">
                <tr>
                  <th className="text-left p-4 text-green-400 text-xs uppercase tracking-wider font-semibold">Application ID</th>
                  <th className="text-left p-4 text-green-400 text-xs uppercase tracking-wider font-semibold">Student Name</th>
                  <th className="text-left p-4 text-green-400 text-xs uppercase tracking-wider font-semibold">Grade</th>
                  <th className="text-left p-4 text-green-400 text-xs uppercase tracking-wider font-semibold">School Type</th>
                  <th className="text-left p-4 text-green-400 text-xs uppercase tracking-wider font-semibold">Date Applied</th>
                  <th className="text-left p-4 text-green-400 text-xs uppercase tracking-wider font-semibold">Status</th>
                  <th className="text-left p-4 text-green-400 text-xs uppercase tracking-wider font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((app, index) => (
                  <tr 
                    key={index} 
                    className="border-b border-white/5 hover:bg-green-500/5 transition-all"
                  >
                    <td className="p-4 text-gray-300 text-sm">{app.id}</td>
                    <td className="p-4 text-gray-300 text-sm font-medium">{app.name}</td>
                    <td className="p-4 text-gray-300 text-sm">{app.grade}</td>
                    <td className="p-4 text-gray-300 text-sm">{app.schoolType}</td>
                    <td className="p-4 text-gray-300 text-sm">{app.date}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="bg-green-500/20 border border-green-500/40 text-green-400 px-4 py-1 rounded-lg text-sm mr-2 hover:bg-green-500/30 transition-all">
                        View
                      </button>
                      <button className="bg-green-500/20 border border-green-500/40 text-green-400 px-4 py-1 rounded-lg text-sm hover:bg-green-500/30 transition-all">
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
          <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-green-500/20">
            <h3 className="text-white text-lg font-semibold mb-4">📊 Applications by Grade</h3>
            <div className="h-48 bg-green-500/5 rounded-xl flex items-center justify-center text-green-400 text-sm">
              Chart visualization area
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-green-500/20">
            <h3 className="text-white text-lg font-semibold mb-4">📈 Monthly Application Trends</h3>
            <div className="h-48 bg-green-500/5 rounded-xl flex items-center justify-center text-green-400 text-sm">
              Chart visualization area
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 border border-green-500/20">
          <h3 className="text-white text-lg font-semibold mb-4">⚡ Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 hover:bg-green-500/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-500/20 transition-all">
              <div className="text-3xl mb-2">➕</div>
              <div className="text-gray-300 text-sm font-medium">Add New Application</div>
            </button>
            <button className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 hover:bg-green-500/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-500/20 transition-all">
              <div className="text-3xl mb-2">📥</div>
              <div className="text-gray-300 text-sm font-medium">Export Data</div>
            </button>
            <button className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 hover:bg-green-500/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-500/20 transition-all">
              <div className="text-3xl mb-2">📊</div>
              <div className="text-gray-300 text-sm font-medium">Generate Report</div>
            </button>
            <button className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 hover:bg-green-500/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-500/20 transition-all">
              <div className="text-3xl mb-2">⚙️</div>
              <div className="text-gray-300 text-sm font-medium">Settings</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;