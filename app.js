const express=require('express');
// Database connection 
const mongodb=require("./db")

const app=express();
app.use(express.json());

// user router is  in userroutes  file
app.use("",require("./Router/userRoutes"));
  

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});  