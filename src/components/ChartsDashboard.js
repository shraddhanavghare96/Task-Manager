import React, { useMemo } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function ChartsDashboard({ tasks = [] }) {
  const byPriority = useMemo(() => {
    const counts = { High: 0, Normal: 0, Unknown: 0 };
    tasks.forEach(t => counts[t.priority || "Unknown"] = (counts[t.priority || "Unknown"] || 0) + 1);
    return counts;
  }, [tasks]);

  const byCategory = useMemo(() => {
    const map = {};
    tasks.forEach(t => map[t.category || "General"] = (map[t.category || "General"] || 0) + 1);
    return map;
  }, [tasks]);

  const pieData = {
    labels: Object.keys(byPriority),
    datasets: [{ data: Object.values(byPriority), backgroundColor: ['#e74c3c','#f1c40f','#3498db'] }]
  };

  const barData = {
    labels: Object.keys(byCategory),
    datasets: [{ label: 'Tasks by Category', data: Object.values(byCategory), backgroundColor: '#0984e3' }]
  };

  return (
    <div className="row">
      <div className="col-md-6 mb-3">
        <div className="card p-3">
          <h5>Priority Distribution</h5>
          <Pie data={pieData} />
        </div>
      </div>

      <div className="col-md-6 mb-3">
        <div className="card p-3">
          <h5>Tasks by Category</h5>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
}

export default ChartsDashboard;
