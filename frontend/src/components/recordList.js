import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// 👇 your backend base URL
const API_BASE = "https://stunning-disco-x5rg747wv955hrw5-5050.app.github.dev";

const Record = (props) => (
  <tr>
    <td>{props.record.name}</td>
    <td>{props.record.position}</td>
    <td>{props.record.level}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>
        Edit
      </Link>{" "}
      |
      <button
        className="btn btn-link"
        onClick={() => props.deleteRecord(props.record._id)}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);

  // Fetch all records
  useEffect(() => {
    async function getRecords() {
      try {
        const response = await fetch(`${API_BASE}/record`);
        if (!response.ok) {
          const text = await response.text();
          window.alert(`An error occurred: ${response.status} ${text}`);
          return;
        }
        const data = await response.json();
        setRecords(data);
      } catch (err) {
        window.alert(err.message || err);
      }
    }

    getRecords();
    return;
  }, [records.length]); // matches the lab’s pattern

  // Delete one record
  async function deleteRecord(id) {
    try {
      const res = await fetch(`${API_BASE}/record/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const text = await res.text();
        window.alert(`DELETE failed: ${res.status} ${text}`);
        return;
      }
      const newRecords = records.filter((el) => el._id !== id);
      setRecords(newRecords);
    } catch (err) {
      window.alert(err.message || err);
    }
  }

  // Map rows
  function recordList() {
    return records.map((record) => (
      <Record
        record={record}
        deleteRecord={deleteRecord}
        key={record._id}
      />
    ));
  }

  // UI
  return (
    <div>
      <h3>Record List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Level</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}
