import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "./css/header.css";
import axios from "axios";

export default function Header() {
  const [username, setUsername] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      adminContent: username,
      adminDueDate: date,
      adminStatus: status,
      adminAssigned: assignedTo,
    };

    try {
      await axios.post("http://localhost:3001/api/v1/admin", data);
      // Reset form fields after successful submission
      setUsername("");
      setDate("");
      setStatus("");
      setAssignedTo("");
      alert("Form dữ liệu thành công !");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Lỗi vui lòng thử lại !!!");
    }
  };

  return (
    <>
      <div className="container-header">
        <form className="flex-from" onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              @
            </span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              @
            </span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="form-select"
              aria-label="Default select example"
            >
              <option selected="">Choose......</option>
              <option value="Pending">Pending</option>
              <option value="Fullfill">Fullfill</option>
              <option value="Reject">Reject</option>
            </select>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              @
            </span>
            <input
              type="text"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div>
            <Button type="submit" id="item-header" variant="primary">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
