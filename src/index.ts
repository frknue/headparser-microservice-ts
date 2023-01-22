
import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(process.cwd() + "/public"));

app.get("/", (req: Request, res: Response) => {
    res.sendFile(process.cwd() + "/public/index.html");
});

app.get("/api/whoami", (req: Request, res: Response) => {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const language = req.headers["accept-language"];
    const software = req.headers["user-agent"];

    res.json({
        ipaddress: ip,
        language: language,
        software: software
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

