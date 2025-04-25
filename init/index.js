const mongoose = require("mongoose");
const initData = require("./data.js");
const listing = require("../models/listing.js");

const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then((res) => {
    console.log("Connected to DB")
    })
    .catch((err) => {
    console.log(err)
    });

async function main() {
    await mongoose.connect(mongo_url) 
}

const initDB = async () => {
   await listing.deleteMany({});
   await listing.insertMany(initData.data);
   console.log("Data was saved");
};

initDB();