import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "./css/table.css";
import axios from "axios";

export default function Table() {
  const [datas, setDatas] = useState([]);

  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/v1/admin");
      setDatas(response.data.admins);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (adminId) => {
    try {
      // Gửi yêu cầu xóa dữ liệu đến server
      await axios.delete(`http://localhost:3001/api/v1/admin/${adminId}`);

      // Xóa mục khỏi danh sách datas
      setDatas((prevDatas) =>
        prevDatas.filter((data) => data.adminId !== adminId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Content</th>
            <th scope="col">Due date</th>
            <th scope="col">Status</th>
            <th scope="col">Assigned To</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr key={data.adminId}>
              <th scope="row">{index + 1}</th>
              <td>{data.adminContent}</td>
              <td>{data.adminDueDate}</td>
              <td>{data.adminStatus}</td>
              <td>{data.adminAssigned}</td>
              <td>
                <Button className="item-button" variant="success">
                  Update
                </Button>
                <Button
                  className="item-button"
                  variant="danger"
                  onClick={() => handleDelete(data.adminId)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
