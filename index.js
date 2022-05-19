import express from "express";
// import serverless from "serverless-http";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import usersRoutes from "./routes/users.js";

// import router from "./routes/posts.js";
// import { router as router2 } from "./routes/users.js";

export const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/users", usersRoutes);

app.get("/", (req, res) => {
  res.send("APP IS RUNNING");
});

// app.use(`/.netlify/functions/api`, router);
// app.use(`/.netlify/functions/api`, router2);

// export default serverless(app);

const pass = encodeURIComponent("Hansel123%mongo");
const CONNECTION_URL = `mongodb+srv://Oliva96:${pass}@cluster0.yk1vu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
