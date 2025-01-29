// backend.js
import express from "express";
import cors from "cors";
import users from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());

app.use(express.json());


app.post("/users", (req, res) => {
    const userToAdd = req.body;
    users.addUser(userToAdd).then((user) => {
        res.status(201).send(user);
    })
        .catch((error) => {
            console.log(error);
            res.status(404).send(error);
        });
});

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    users.deleteUser(id).then((user) => {
        if (user !== null) {
            res.status(204).send();
        } else {
            console.log("User does not exist, cannot delete.")
            res.status(404).send();
        }
    }).catch((error) => {
        res.status(404).send();
    });
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    users.findUserById(id).then((user) => {
        if(user !== undefined) {
            res.status(200).send(user);
        } else {
            res.status(404).send("User not found.");
        }
    }).catch((error) => {
        res.status(404).send("User not found.");
    });
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    users.getUsers(name, job).then((users) => {
        if(users !== undefined) {
            res.status(200).send(users);
        } else {
            res.status(404).send("Resource not found.");
        }
    }).catch((error) => {
        res.status(404).send("Resource not found.");
    })
});



app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});