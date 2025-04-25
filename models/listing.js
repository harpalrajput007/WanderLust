const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema ({
    title:{
      type : String, 
      required : true,
    }, 
    description: String,
    image:{
       type: Object, 
       default: "https://www.istockphoto.com/photo/coconut-palm-trees-on-tropical-island-beach-at-colorful-sunset-gm1443611234-482534833",
       set: (v) => v === "" ? "https://www.istockphoto.com/photo/coconut-palm-trees-on-tropical-island-beach-at-colorful-sunset-gm1443611234-482534833" : v,
    }, 
    price: Number,
    location: String,
    country: String
});

const listing = mongoose.model("listing", listingSchema);

module.exports = listing;