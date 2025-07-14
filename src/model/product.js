const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String,
     required: true, 
     trim: true },
  price: { type: Number,
     required: true },
  description: String,
  category: {
 type:String,
 require:true,
 lowercase:true
  },
  image: {
    main:{
      type:String,
      require:true
    },
    gallery:[{
        url:String,
        altText:String
    }
  ]
  
  },
  _createdAt: {
    type: Date,
    default: Date.now,
  },
  stock:{
    type:Number
    // default:0
  },
  brand:{
type:String,
require:true
  },
   get createdAt() {
    return this._createdAt;
  },
  set createdAt(value) {
    this._createdAt = value;
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
