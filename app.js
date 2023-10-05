require("express-async-errors");
const express = require("express");
const { PORT, MONGODB_CONNECTION } = require("./src/config");
const { default: mongoose } = require("mongoose");
const authRouter = require("./src/resources/auth");
const badgesRouter = require("./src/resources/badges");
const certificateRouter = require("./src/resources/certificates");
const { auth } = require("./src/middleware/auth");

const app = express();
app.use(express.json());

// routes
app.use("/auth", authRouter);
app.use("/badges", auth, badgesRouter);
app.use("/certificates", auth, certificateRouter);

// Error handling
app.use((err, req, res, next) => {
  console.log(err);
  let status = err.status || 500;

  res
    .status(err.isJoi ? 400 : status)
    .send({ err: true, message: err.message });
});

// startup
mongoose
  .connect(MONGODB_CONNECTION)
  .then(() => console.log("connected to mongodb"));

app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));
