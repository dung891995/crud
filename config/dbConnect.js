var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/k4', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("kết nối database thành công");
});
module.exports = mongoose;

// UserModel.find({address:"HP"}).then(function(data){
//   console.log(data);
// })
// cau 15
// UserModel.updateMany({
//   address:"HP"
// },{
//   password: "1234"
// }).then(function(data){
//   console.log(data);
// })
//cau 16
// UserModel.updateOne({
//   address:"HP"
// },{
//   age: 1000
// }).then(function(data){
//   console.log(data);
// })

//cau 17
// UserModel.findOne({
//   password:"1234"
// }).then(function(data){
//   console.log(data);
// })






//cách tìm khi mình làm login
// UserModel.find({
//   username:"ta",
//   password: "1"
// }).then(function(data){
//   if(data.length>=1){
//     console.log("chúc mừng đăng nhập thành công");
//   }else{
//     console.log("bạn sai tài khoản hoặc mật khẩu");
//   }
// })
// UserModel.find().limit().exec()
// UserModel.create({
//   username:"ta"
// }).then(function(data){
//   console.log(data);
// })

//and : các điều kiện trong end phải xảy ra đồng thời
//or: thỏa mãn 1 trong các kiện thì cx ra in ra bản ghi
/*
 * >: $gt 
 * <: $lt: less than
 * =: $eq : equal
 * >=: $gte: 
 * <=: $lte
 */
//-1: giam dan, 1 theo thu tang dan
// ứng dụng để về sau chúng ta se làm phân trang
// UserModel.find().skip(2).limit(2).then(function(data){
//   console.log(data);
// })







// //trả về dưới dạng là promise
// UserModel.create({
//     username: "HN2",
//     password: '1',
//     age: 2020
// })
// .then(function(data){
//     console.log(data);
// })


//in ra toàn bộ bản ghi trong document
// UserModel.find().then(function(data){
//     console.log(data);
// })
// ỉn ra bản ghi theo điều kiện
// UserModel.find({
//     //điều kiện
//     age:2020
// }).then(function(data){
//     console.log(data);
// })


//cập nhật dữ liệu của bản ghi
// UserModel.updateMany({
//     //điều kiện, bản ghi nào sẽ được cập nhât giá trị
//     // không bao giờ được cập nhật giá trị _id của 1 bản ghi
//     age: 2021
// },{
//     // các trường mình muốn cập nhật
//     username: "Yến Anh"
// }).then(function(data){
//     console.log(data);
//     console.log("-----------------------");
//     console.log("cập nhật thành công");
// });


//xóa bản ghi
// UserModel.deleteMany().then(function(data){
//     console.log(data);
//     console.log("xóa thành công");
// })