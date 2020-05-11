var UserModel = require("../models/userModels");

function getAll() {
    return UserModel.find();
}

function addNew(username, password, age, address) {
    return UserModel.create({
        username: username,
        password: password,
        age: age,
        address: address,
    })
}
function findByUser(username) {
    return UserModel.find({ username: username })
}
function findAdmin(username) {
    return UserModel.find({ username: username })
}
function checkAccount(username) {
    return UserModel.find({ username: username })
}

function getById(id) {
    return UserModel.find({ _id: id });
}

function updateUser(id, username, password, age, address) {
    var userInfor = {
    }
    if (username) {
        userInfor.username = username
    }
    if (address) {
        userInfor.address = address
    }
    if (password) {
        userInfor.password = password
    }
    if (age) {
        userInfor.age = age
    }
    return UserModel.updateOne({
        _id: id
    }, userInfor)
}

function deleteUser(id) {
    return UserModel.deleteOne({ _id: id })
}
function checkUser(username, password) {
    return UserModel.find({
        $and: [{ username: username }, { password: password }]
    })
}
function page(npage) {
    return UserModel.find().skip((npage - 1) * 3).limit(3)
}
module.exports = {
    getAll: getAll,
    addNew: addNew,
    getById: getById,
    updateUser: updateUser,
    deleteUser: deleteUser,
    checkAccount: checkAccount,
    checkUser: checkUser,
    page: page,
    findByUser:findByUser,
    findAdmin:findAdmin
}