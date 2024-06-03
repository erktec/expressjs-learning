import express, { json } from 'express';

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const mockUsers = [
        { id: 1, username: "erick", displayName: "Erick Armstrong" },
        { id: 2, username: "heidi", displayName: "Heidi Armstrong" },
        { id: 3, username: "jack", displayName: "Jack Armstrong" },
        { id: 4, username: "audrey", displayName: "Audrey Armstrong" }
    ];

const mockProducts = [
        { id: 123, name: "pool cover", price: 12.99 },
        { id: 125, name: "pool vacuum", price: 99.99 }
    ];

// Defining Routes
app.get("/", (request, response) => {
    response.status(201).send({msg:"Hello"});
});

app.get("/api/users", (request, response) => {
    console.log(request.query);
    const {
        query: {filter, value },
    } = request;

        if (filter && value) return response.send(
        mockUsers.filter((user) => user[filter].includes(value))
    );
    return response.send(mockUsers);
});

app.post("/api/users", (request, response) => {
    const { body } = request;
    const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
    mockUsers.push(newUser);
    return response.status(201).send(newUser);
});

app.get("/api/users/:id", (request, response) => {
    console.log(request.params);
    const parsedId = parseInt(request.params.id);
    console.log(parsedId);
    if (isNaN(parsedId)) 
        return response.status(400).send({msg: "Bad request. Invalid ID."});
    const findUser = mockUsers.find((user) => user.id === parsedId);
    if (!findUser) return response.sendStatus(404);
    return response.send(findUser);
});

app.get("/api/products", (request, response) => {
    response.send(mockProducts);
});



app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`)
});

