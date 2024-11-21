const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");
const mongoose = require('mongoose');

const app = express();
const publishersRouter = require('./app/routers/publisher.route');
const booksRouter = require('./app/routers/book.route');
const employeesRouter = require('./app/routers/employee.route');
const readersRouter = require('./app/routers/reader.route');
const tradesRouter = require('./app/routers/trade.route');

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/employees', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Kết nối đến MongoDB thành công');
})
.catch((err) => {
    console.error('Kết nối đến MongoDB thất bại:', err);
});

app.use(cors());
app.use(express.json());

app.use("/api/nhaxuatban", publishersRouter);
app.use("/api/sach", booksRouter);
app.use("/api/nhanvien", employeesRouter);
app.use("/api/docgia", readersRouter);
app.use("/api/muonsach", tradesRouter);

const employeeSchema = new mongoose.Schema({
  hotennv: String,
  sdt: String,
  chucvu: String,
  diachi: String,
  msnv: String,
  password: String
});

const Employee = mongoose.model('Employee', employeeSchema);

app.post('/api/register', async (req, res) => {
  const { hotennv, sdt, chucvu, diachi, msnv, password } = req.body;
  const employee = new Employee({ hotennv, sdt, chucvu, diachi, msnv, password });
  try {
    await employee.save();
    res.status(201).send('Đăng ký thành công');
  } catch (error) {
    res.status(400).send('Đăng ký thất bại');
  }
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application." });
});

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;
