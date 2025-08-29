import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

// 👇 your backend base URL
const API_BASE = "https://stunning-disco-x5rg747wv955hrw5-5050.app.github.dev";

export default function Edit() {
  const [form, setForm] = useState({
    name: "",
    position: "",
    level: "",
  });

  const params = useParams();     // /edit/:id
  const navigate = useNavigate();

  // helpers
  function updateForm(value) {
    return setForm((prev) => ({ ...prev, ...value }));
  }

  // Load the record once when the component mounts
  useEffect(() => {
    async function fetchData() {
      const id = (params.id || "").trim();

      try {
        const res = await fetch(`${API_BASE}/record/${id}`);
        if (!res.ok) {
          const text = await res.text();
          window.alert(`GET /record/${id} failed: ${res.status} ${text}`);
          navigate("/");
          return;
        }

        const record = await res.json();
        if (!record) {
          window.alert(`Record with id ${id} not found`);
          navigate("/");
          return;
        }

        setForm({
          name: record.name ?? "",
          position: record.position ?? "",
          level: record.level ?? "",
        });
      } catch (err) {
        window.alert(err.message || err);
        navigate("/");
      }
    }

    fetchData();
  }, [params.id, navigate]);

  // Submit -> PATCH /record/:id
  async function onSubmit(e) {
    e.preventDefault();
    const id = (params.id || "").trim();

    try {
      const res = await fetch(`${API_BASE}/record/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`PATCH /record/${id} failed: ${res.status} ${text}`);
      }

      navigate("/");
    } catch (error) {
      window.alert(error.message || error);
    }
  }

  // UI
  return (
    <div>
      <h3>Update Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            className="form-control"
            type="text"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="position">Position</label>
          <input
            id="position"
            className="form-control"
            type="text"
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
              id="levelIntern"
              value="Intern"
              checked={form.level === "Intern"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="levelIntern" className="form-check-label">Intern</label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="levelJunior"
              value="Junior"
              checked={form.level === "Junior"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="levelJunior" className="form-check-label">Junior</label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="levelSenior"
              value="Senior"
              checked={form.level === "Senior"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="levelSenior" className="form-check-label">Senior</label>
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Update record" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}
