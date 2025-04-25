const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");  

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
    res.send("Hi, i am a root");
});


//index route
app.get("/listings", async(req, res) => {
    const allListings = await listing.find({}); //find({}) : means fetch all documents from the listings collection with no filter.
    res.render("./listings/index.ejs", {allListings});
});


//New route
app.get("/listings/new", (req, res) => {
    res.render("./listings/new.ejs");
});


//show route
app.get("/listings/:id", async(req, res) => {
    let {id} = req.params;
    const oneListing = await listing.findById(id);
    res.render("./listings/show.ejs",  {oneListing});
});


//Create route
app.post("/listings", async(req, res) => {
    //let {title, description, image, price, location, country} = req.body
    const newListing = new listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});


//Edit route
app.get("/listings/:id/edit", async(req, res) => {
    let {id} = req.params;
    const oneListing = await listing.findById(id);
    res.render("./listings/edit.ejs", {oneListing});
});


//Update route
app.put("/listings/:id", async(req,res) => {
    let {id} = req.params;
    await listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
});


//Delete route
app.delete("/listings/:id", async(req,res) => {
    let {id} = req.params;
    let deletedListing = await listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});

// app.get("/testListing", async(req,res) => {
//     let samplelisting = new listing({
//         title: "My new villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Goa",
//         country: "India",
//     });

//     await samplelisting.save();
//     console.log("sample was saved");
//     res.send("Successful");
// });

app.listen(8080, () => {
    console.log("Server is listening to port 8080");
});