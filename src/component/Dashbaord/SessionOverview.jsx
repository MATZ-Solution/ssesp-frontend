// components/SessionOverview.jsx
import React from 'react';
import RingChart from '../charts/ring-chart';

function SessionOverview({ approvalRate, enrollmentRate, pendingPercentage }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
      <h3 className="font-semibold text-slate-800 mb-4">Session Overview</h3>
      <div className="flex justify-around">
        <RingChart value={approvalRate} label="Approval Rate" color="#14b8a6" />
        <RingChart value={enrollmentRate} label="Enrollment Rate" color="#3b82f6" />
        <RingChart value={pendingPercentage} label="Pending" color="#f59e0b" />
      </div>
    </div>
  );
}
export default SessionOverview;