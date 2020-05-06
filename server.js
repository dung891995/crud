var express = require("express");
var app = express();
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

var userRouter = require("./routers/userRouter");
app.use("/api",userRouter);
app.listen(3000,function(){
    console.log("đang lắng nghe tại cổng 3000");
})