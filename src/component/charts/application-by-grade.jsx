function ApplicationsByGrade({ data }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-slate-800">Applications by Grade</h3>
        <button className="text-xs text-teal-600 font-medium hover:underline">View all</button>
      </div>
      <div className="space-y-3">
        {data.map((d) => (
          <div key={d.grade}>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-slate-600">{d.grade}</span>
              <span className="text-sm font-semibold text-slate-800">{d.count.toLocaleString()}</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full transition-all duration-700"
                style={{ width: `${d.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApplicationsByGrade;