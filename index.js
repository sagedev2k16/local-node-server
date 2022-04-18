const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 8775;

let users = [
    {userName: "Employee", empId: 1, role: "employee"},
    {userName: "Manager", empId: 2, role: "manager"},
];

app.get("/", (req, res) => {
    res.send("Hello from server");
});

app.get("/date", (req, res) => {
    res.send("Current time is: " + new Date());
});

app.get("/users", (req, res) => {
    console.log("Getting users");
    res.send(users);
});

app.post("/create/:type", (req, res) => {
    let type = req.params.type;
    let newUser = req.body;
    console.log("Creating new", type, req.body);
    newUser["empId"] = users.length + 1;
    newUser["role"] = type;

    console.log("Creating new user", newUser);
    users.push(newUser);

    res.status(201).send({
        msg: "New user created",
        user: newUser
    });
});

app.listen(PORT, () => {
    console.log("Server listening on port - " + PORT);
});