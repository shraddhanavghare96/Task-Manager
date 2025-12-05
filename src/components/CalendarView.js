import React, { useState, useMemo } from "react";
import Calendar from "react-calendar";
import { motion } from "framer-motion";

function CalendarView({ tasks = [], setModalTask }) {
  const [date, setDate] = useState(new Date());
  const tasksByDate = useMemo(() => {
    const map = {};
    (tasks || []).forEach(t => {
      if (!t.dueDate) return;
      const key = new Date(t.dueDate).toDateString();
      if (!map[key]) map[key] = [];
      map[key].push(t);
    });
    return map;
  }, [tasks]);

  const tileContent = ({ date: d, view }) => {
    if (view !== "month") return null;
    const key = d.toDateString();
    const dayTasks = tasksByDate[key] || [];
    if (dayTasks.length === 0) return null;
    return (
      <div style={{ marginTop: 4 }}>
        <small className="badge bg-primary">{dayTasks.length}</small>
      </div>
    );
  };

  const onDateClick = (d) => {
    setDate(d);
  };

  const dayKey = date.toDateString();
  const dayTasks = tasksByDate[dayKey] || [];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="row">
        <div className="col-md-6 mb-3">
          <Calendar
            onChange={onDateClick}
            value={date}
            tileContent={tileContent}
          />
        </div>

        <div className="col-md-6">
          <h5>Tasks on {date.toDateString()}</h5>
          {dayTasks.length === 0 && <div className="text-muted">No tasks for this day.</div>}
          {dayTasks.map(t => (
            <div key={t.id} className="card mb-2">
              <div className="card-body d-flex justify-content-between align-items-start">
                <div>
                  <strong>{t.title}</strong>
                  <div className="small text-muted">{t.category} • {t.priority}</div>
                </div>
                <div>
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={() => setModalTask(t)}>Edit</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default CalendarView;
