import mongoose from "mongoose";
let isConnected = false;

export const connectToDB = async ()=>{
    mongoose.set('strictQuery', true);
    if(isConnected){
        console.log('MongoDB is already connected');
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName: 'noteing',
            useNewUrlParser : true,
            useUnifiedTopology:true,
        })
        isConnected = true;
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
        
    }
}

// Another function to connect to database.
export const connectDb = ()=>{
    if(mongoose.connection.readyState >=1) return;
    mongoose.connect(process.env.MONGODB_URI);
}