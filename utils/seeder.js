const  Room =  require('../models/room');
const  rooms =  require('../data/rooms.json');
const mongoose = require('mongoose');


//dev
//mongodb://localhost:27017/bookit

//prod
//mongodb://admin:admin123@booktit-shard-00-00.tp0eh.mongodb.net:27017,booktit-shard-00-01.tp0eh.mongodb.net:27017,booktit-shard-00-02.tp0eh.mongodb.net:27017/Bookit?ssl=true&replicaSet=atlas-eyr1pd-shard-0&authSource=admin&retryWrites=true&w=majority;
mongoose.connect('mongodb://admin:admin123@booktit-shard-00-00.tp0eh.mongodb.net:27017,booktit-shard-00-01.tp0eh.mongodb.net:27017,booktit-shard-00-02.tp0eh.mongodb.net:27017/Bookit?ssl=true&replicaSet=atlas-eyr1pd-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => seedRooms())

const seedRooms = async () => {
    try {
         await Room.deleteMany();
         console.log('Rooms are deleted');

        await Room.insertMany(rooms);
        console.log('All rooms are added');
    }
    catch(err) {
        console.log(err.message);
        process.exit();
    }
}

