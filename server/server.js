const express = require("express");
const cors = require("cors");
const taskRouter = require("./routes/tasks");
const app = express();
app.use(express.json());
app.use(cors());
require("./database/connect");
const PORT = 8000;

app.use("/tasks", taskRouter);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server is running on the port ${PORT}`);
});
