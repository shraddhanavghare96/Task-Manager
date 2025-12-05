import React, { useState, useEffect } from "react";

function Settings() {
  const [settings, setSettings] = useState({ notifications: true, defaultPriority: "Normal" });

  useEffect(() => {
    const s = localStorage.getItem("settings");
    if (s) setSettings(JSON.parse(s));
  }, []);

  const save = () => {
    localStorage.setItem("settings", JSON.stringify(settings));
    alert("Settings saved");
  };

  return (
    <div className="card p-3">
      <h4>Settings</h4>
      <div className="mb-2">
        <label className="form-check">
          <input type="checkbox" className="form-check-input" checked={settings.notifications} onChange={e => setSettings(prev => ({ ...prev, notifications: e.target.checked }))} />
          <span className="form-check-label ms-2">Enable notifications</span>
        </label>
      </div>
      <div className="mb-2">
        <label>Default Priority</label>
        <select className="form-control" value={settings.defaultPriority} onChange={e => setSettings(prev => ({ ...prev, defaultPriority: e.target.value }))}>
          <option>Normal</option>
          <option>High</option>
        </select>
      </div>
      <button className="btn btn-primary" onClick={save}>Save</button>
    </div>
  );
}

export default Settings;
