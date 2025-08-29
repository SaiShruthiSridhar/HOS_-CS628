import React, { useState } from "react";
import { useNavigate } from "react-router";

// 👇 your backend base URL
const API_BASE = "https://stunning-disco-x5rg747wv955hrw5-5050.app.github.dev";

export default function Create() {
  const [form, setForm] = useState({
    name: "",
    position: "",
    level: "",
  });
  const navigate = useNavigate();

  // Update form state
  function updateForm(value) {
    return setForm((prev) => ({ ...prev, ...value }));
  }

  // Handle submit → POST /record
  async function onSubmit(e) {
    e.preventDefault();
    const newPerson = { ...form };

    try {
      const res = await fetch(`${API_BASE}/record`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPerson),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`POST /record failed: ${res.status} ${text}`);
      }

      setForm({ name: "", position: "", level: "" });
      navigate("/");
    } catch (error) {
      window.alert(error.message || error);
    }
  }

  // UI
  return (
    <div>
      <h3>Create New Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="position">Position</label>
          <input
            type="text"
            className="form-control"
            id="position"
            value={form.position}
            onChange={(e) => updateForm({ position: e.target.value })}
          />
        </div>

        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionIntern"
              value="Intern"
              checked={form.level === "Intern"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="positionIntern" className="form-check-label">
              Intern
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionJunior"
              value="Junior"
              checked={form.level === "Junior"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="positionJunior" className="form-check-label">
              Junior
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionSenior"
              value="Senior"
              checked={form.level === "Senior"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="positionSenior" className="form-check-label">
              Senior
            </label>
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create person" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}
