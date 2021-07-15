const express = require('express');
const server = express();
server.use(express.json());

const {db:destination} = require('./DB');
const { getRandomId } = require('./HELPERS');

//CRUD
//CREATE => POST
server.post("/destinations", (req,res) => {
//generate unique id
const _id = getRandomId();
console.log(_id);

const { name, location, photo, description} = req.body;

destination[_id] = {_id, name, location, photo, description};


res.json({status :"success"})

res.send(destination);
});

// READ => GET
server.get("/destinations", (req, res) => {
res.send(destination);
});



//UPDATE => PUT
server.put("/destinations", (req, res) => {

const {_id} = req.query;

if(_id === undefined) {
    return res
        .status(400)
        .send({message: "?_id required"});
}
if (destination[_id] === undefined) {
    return res
        .status(410)
        .send({message : "no destination with that _id to update"})
}

const dest = destination[_id];
const {name, location, photo, description} = req.body

if (name !== undefined) {
    dest.name = name;
}

if(location !== undefined) {
    dest.location = location;
}
if(photo !== undefined) {
    dest.photo = photo;
}
if(description !== undefined) {
    dest.description = description;
}

res.send({status : "success"});
})



//DELETE => DELETE
server.delete("/destinations", (req, res) => {

 const {_id} = req.query;
if(_id === undefined) {
    return res
        .status(400)
        .send({message: "?_id required"});
}
    
const dest = destination[_id];

if (dest === undefined) {
    return res.status(410).send({message : "no destination with that _id to delete"})
}
    //go find and delete

    delete destination[_id];
    return res.send({status : "sucessfully deleted"})
})

server.listen(3000, () => {
    console.log("Server listening")
});