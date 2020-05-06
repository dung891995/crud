var router = require("express").Router();
var UserService = require("../services/userService");
var path = require("path");
router.get("/index", function (req, res, next) {
    res.sendFile(path.join(__dirname, "../views/index.html"))
})
router.get("/home", function (req, res, next) {
    res.sendFile(path.join(__dirname, "../views/home.html"))
})
router.get("/admin", function (req, res, next) {
    res.sendFile(path.join(__dirname, "../views/admin.html"))
})
router.get("/user", function (req, res, next) {
    UserService.getAll().then(function (data) {
        res.json(data);
    })
})
router.get("/user/:id", function (req, res, next) {
    var id = req.params.id;
    UserService.getById(id).then(function (data) {
        res.json(data)
    })
})

router.post("/user", function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var age = req.body.age;
    var address = req.body.address;
    UserService.checkAccount(username).then((result) => {
        if (result.length >= 1) {
            res.json({
                error: true,
                message: 'tk đã tồn tại'
            })
        } else {
            UserService.addNew(username, password, age, address).then(function (data) {
                // res.redirect("/api/home");
                res.json({
                    error: false,
                    data: data
                })
            })
        }

    })
})
router.get("/login", function (req, res, next) {
    res.sendFile(path.join(__dirname, "../views/login.html"))
})
router.post("/login", function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    UserService.checkUser(username, password).then((result) => {
        if (result.length >= 1) {
            res.json({ error: true, result })
        } else {
            res.json({ error: false, message: 'username hoặc pass bị sai' })
        }
    })
})
router.put("/user/:id", function (req, res, next) {
    var id = req.params.id;
    var username = req.body.username;
    var password = req.body.password;
    var age = req.body.age;
    var address = req.body.address;
   
    UserService.updateUser(id,username, password, age, address).then(function (data) {
        res.json(data);
    })
})
router.delete("/user/:id", function (req, res, next) {
    var id = req.params.id;
    UserService.deleteUser(id).then(function (data) {
        res.json(data);
    })
})
router.get("/dang-ki", function (req, res, next) {
    var username = "quang";
    var password = '1'
    var age = 30;
    var address = "hn"
    UserService.addNew(username, password, age, address).then(function () {
        res.json("them moi thanh cong")
    })

});
router.get("/page/:npage", function (req, res, next) {
    var npage = +req.params.npage;
    UserService.page(npage).then((result) => {
        res.json(result)
    })
})

//tên api đầy đủ của router :
// tên api server + tên api router


module.exports = router;