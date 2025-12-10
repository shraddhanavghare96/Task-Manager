import React, { useState } from "react";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [visible, setVisible] = useState(true); // for cross button hide

  const submit = (e) => {
    e.preventDefault();
    alert("Message submitted. (Demo only)");
    setForm({ name: "", email: "", message: "" });
  };

  if (!visible) return null; // hide entire card when cross is clicked

  return (
    <div className="card p-3 position-relative">

      {/* ❌ Close button */}
      <button
        className="btn btn-sm btn-light position-absolute"
        style={{ top: "10px", right: "10px" }}
        onClick={() => setVisible(false)}
      >
        ✖
      </button>

      <h4>Contact</h4>

      <form onSubmit={submit}>
        <div className="mb-2">
          <input
            required
            className="form-control"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

        <div className="mb-2">
          <input
            required
            type="email"
            className="form-control"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        <div className="mb-2">
          <textarea
            required
            className="form-control"
            rows="4"
            placeholder="Message"
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default Contact;
