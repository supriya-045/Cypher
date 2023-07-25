import http from "http";
import app from "./app.js";
import { createDatabaseConnection } from "./client/mongoClient.js";
import { port } from "./constants/config.js";

app.set("port", port);

const server = http.createServer(app);
server.keepAliveTimeout = 10000;

async function startServer() {
    try {
        await createDatabaseConnection();
    } catch (err) {
        console.log("Error while starting server: ", err);
        return;
    }
    server.listen(port);
    console.log(`Server is listening on port: ${port}...`)
}

startServer();
