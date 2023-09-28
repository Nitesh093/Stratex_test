const mongoose=require("mongoose");

function generateUserGUID() {
    return Math.floor(Math.random() * 1000000);
  }
  

const userSchema=mongoose.Schema({
    UserGUID: { type: Number, unique: true, default: generateUserGUID },
  EmailAddress:{
    type: String,
    
  },
  BusinessName: String,
  BusinessNumber: String,
  UniqueCode: String,
  ExternalReference: String,
  PhoneNum: String,
  HomeAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
  },
  PostalAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
  },
  CreationDate: { type: Date, default: Date.now },
  ModifyDate: { type: Date, default: Date.now },
  ArchiveDate: Date,

})

module.exports=mongoose.model('users',userSchema);