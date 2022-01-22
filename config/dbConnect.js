const mongoose  =  require("mongoose");

const dbConnect = () => {
    if(mongoose.connection.readyState >= 1) {
        console.log('db not connect');
        return
    }
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(con => console.log('Connected to local db '))
}

export default dbConnect;