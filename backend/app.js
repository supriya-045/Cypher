import express from "express";
import storageRouter from "./routes/storeRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));

app.use(cors({
    origin: "*",
    methods: "GET,POST,PUT,PATCH",
    credentials: true
  }));

app.get("/", (req, res) => {
    return res.status(200).send({
        message: "Cypher-API is running...",
    })
});

app.use("/api", storageRouter);

export default app;