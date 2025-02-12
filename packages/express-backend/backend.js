// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
    users_list: [
        {
            id: "xyz789",
            name: "Charlie",
            job: "Janitor"
        },
        {
            id: "abc123",
            name: "Mac",
            job: "Bouncer"
        },
        {
            id: "ppp222",
            name: "Mac",
            job: "Professor"
        },
        {
            id: "yat999",
            name: "Dee",
            job: "Aspring actress"
        },
        {
            id: "zap555",
            name: "Dennis",
            job: "Bartender"
        }
    ]
};

const findUserByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    );
};

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};

const deleteUser = (id) => {
    const index = users["users_list"].findIndex(user => user.id === id);
    return (users["users_list"].splice(index, 1).length > 0);
}

const findUserByNameAndJob = (name, job) => {
    return users["users_list"].filter(
        (user) => user["name"] === name && user["job"] === job
    )
}

app.use(cors());

app.use(express.json());


app.post("/users", (req, res) => {
    const userToAdd = req.body;
    if (userToAdd.id === undefined) {
        userToAdd.id = Math.floor(Math.random()*1000000).toString();
    }
    addUser(userToAdd);
    res.status(201).send(userToAdd);
});

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    console.log("Attemping to delete user with id ", id);
    const success = deleteUser(id);
    if (success) {
        res.status(204).send()
    } else {
        res.status(404).send()
    }
})

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined) {
        let result = undefined;
        if (job != undefined) {
            result = findUserByNameAndJob(name,job);
        } else {
            result = findUserByName(name);
        }
        result = { users_list: result };
        res.send(result);
    } else {
        res.send(users);
    }
});



app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});