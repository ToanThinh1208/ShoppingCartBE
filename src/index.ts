import express from "express"; //import express vào dự án
import userRouter from "./routes/users.routers";
import databaseServices from "./services/database.services";

const app = express(); //dùng express tạo 1 server
const PORT = 3000; //server sẽ chạy trên cổng port 3000
// server chi choi voi json nen phai chuyen ve json thi moi nhan dc data
app.use(express.json())
//ket noi database
databaseServices.connect()

app.use('/users', userRouter)

app.listen(PORT, () => {
  console.log(`Project này đang chạy trên post ${PORT}`);
});

// console.log(new Date(2005,7,13).toISOString());
