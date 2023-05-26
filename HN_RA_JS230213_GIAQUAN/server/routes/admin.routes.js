const express = require("express");
const router = express.Router();

const database = require("../utils/database");

router.get("/", async (req, res) => {
  try {
    // sử dụng database lấy về toàn bộ user
    let data = await database.execute("SELECT * FROM admines.admins");
    let [admins] = data;
    console.log(admins);
    // let users = data[0]

    // response về cho client
    res.json({
      message: "success",
      admins,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

// API lấy thông tin một bản ghi theo Id
router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    // Câu lệnh truy vấn lấy thông tin tất cả bản ghi
    const queryString = `SELECT * FROM admins WHERE adminId=${id}`;

    const [rows] = await database.query(queryString);
    return res.status(200).json({
      status: "OK",
      data: rows,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Failed",
      error: error.message,
    });
  }
});

// API thêm mới 1 bản ghi
router.post("/", async (req, res) => {
  try {
    // Lấy dữ liệu từ body
    const { adminContent, adminDueDate, adminStatus, adminAssigned } = req.body;
    // Tạo một dữ liệu mới
    const newContent = [adminContent, adminDueDate, adminStatus, adminAssigned];

    // Viết câu lệnh query string
    const queryString =
      "insert into admins( adminContent , adminDueDate , adminStatus , adminAssigned) values (? , ? , ? , ?)";

    await database.query(queryString, newContent);
    return res.status(201).json({
      status: "OK",
      message: "Thêm mới thành công",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Failed",
      error: error.message,
    });
  }
});

// API xóa một bản ghi theo Id
router.delete("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    // Câu lệnh truy vấn xóa bản ghi
    const queryString = `delete from admins where adminId=${id}`;

    await database.query(queryString);
    return res.status(200).json({
      status: "OK",
      message: "Xóa thành công",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Failed",
      error: error.message,
    });
  }
});

// API sửa thông tin một bản ghi theo Id
router.put("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    // Lấy dữ liệu từ body
    const { adminContent, adminDueDate, adminStatus, adminAssigned } = req.body;

    // Viết câu lệnh query string
    const queryString =
      "UPDATE admins SET adminContent = ?, adminDueDate = ?, adminStatus = ?, adminAssigned = ? WHERE adminId = ?";

    await database.query(queryString, [
      adminContent,
      adminDueDate,
      adminStatus,
      adminAssigned,
      id,
    ]);
    return res.status(200).json({
      status: "OK",
      message: "Cập nhật thành công",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Failed",
      error: error.message,
    });
  }
});

module.exports = router;
