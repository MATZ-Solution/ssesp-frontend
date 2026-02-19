

function MonthlyTrendsChart({ data }) {
    const maxApps = Math.max(...data.map((d) => d.apps));

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-slate-800">Monthly Trends</h3>
        <span className="text-xs bg-teal-50 text-teal-700 font-medium px-2.5 py-1 rounded-full">2025–26</span>
      </div>
      <div className="flex items-end gap-2 h-40">
        {data.map((d) => {
          const pct = (d.apps / maxApps) * 100;
          return (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-1 group">
              <span className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                {d.apps}
              </span>
              <div className="w-full flex items-end justify-center h-32">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-teal-500 to-teal-300 group-hover:from-teal-600 group-hover:to-teal-400 transition-colors duration-150"
                  style={{ height: `${pct}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-500">{d.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MonthlyTrendsChart;