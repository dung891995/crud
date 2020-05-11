var router = require("express").Router();
var UserService = require("../services/userService");
var path = require("path");
var bcrypt = require('bcryptjs');
var isLogin = false;

router.get("/index", function (req, res, next) {
    res.sendFile(path.join(__dirname, "../views/index.html"))
})
router.get("/home", function (req, res, next) {
    res.sendFile(path.join(__dirname, "../views/home.html"))
})
router.get("/homeAdmin", function (req, res, next) {
    res.sendFile(path.join(__dirname, "../views/homeAdmin.html"))
})
router.get("/admin", function (req, res, next) {
if (isLogin==false) {
    return res.redirect('/api/login')
}
next();
}, function (req, res, next) {
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
    UserService.findByUser(username).then((result) => {
        console.log(result);
        if (result.length<1) {
            next();
        } else {
            return res.json({
                error: true,
                message: "tk đã tồn tại"
            })
        }
    })
}, function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var age = req.body.age;
    var address = req.body.address;
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            UserService.addNew(username, hash, age, address).then(function (data) {
                // res.redirect("/api/home");
                res.json({
                    error: false,
                    data: data
                })
            })


        })
    })
});


router.get("/login", function (req, res, next) {
    if (isLogin) {
        return res.redirect('/api/admin')
    }
    next();
}, function (req, res, next) {
    res.sendFile(path.join(__dirname, "../views/login.html"))
})
router.post("/login", function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    UserService.findByUser(username).then((data) => {
        
        bcrypt.compare(password, data[0].password, function (err, result) {
            
            if (result) {
                isLogin = true;
                res.json({
                    role : result.role,
                    error: false,
                    message:"dang nhap thanh cong"
                })
            } else {
                res.json({
                    error: true,
                    message: "tk or mk sai"
                })

            }
        });
    })

    // UserService.checkUser(username, password).then((result) => {
    //     if (result.length >= 1) {
    //         res.json({ error: true, result })
    //     } else {
    //         res.json({ error: false, message: 'username hoặc pass bị sai' })
    //     }
    // })
})
router.put("/user/:id", function (req, res, next) {
    var username = req.body.username;
    UserService.findAdmin(username).then((result) => {
        console.log(result);
        if (result.length >= 1 && result[0].username == 'admin') {
            // if (result[0].username=='admin') {
            //     next();
            //     } else {
            //         return res.json({
            //             error: true,
            //             message: "ban da dang nhap sai tai khoản hoặc mật khẩu"
            //         })
            //     }
            next();
        } else {
            return res.json({
                error: true,
                message: "ban da dang nhap sai tai khoản hoặc mật khẩu"
            })
        }

    })

}, function (req, res, next) {
    var id = req.params.id;
    var username = req.body.username;
    var password = req.body.password;
    var age = req.body.age;
    var address = req.body.address;

    UserService.updateUser(id, username, password, age, address).then(function (data) {
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
router.get("/logout",function (req, res) {
    isLogin = false;
    res.json({
        error:false,
        message:"dang xuat thanh cong"
    })
})
//tên api đầy đủ của router :
// tên api server + tên api router


module.exports = router;