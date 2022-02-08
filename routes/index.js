var express = require('express');
var router = express.Router();
const passport = require('passport')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


router.post('/login', (req, res, next) => {
    console.log('/login ....')
    passport.authenticate('local', { session: true }, (err, user, info) => {
        let jsonResult = {
            error: false,
            userKnown: false,
            passwordOK: false
        }
        if (err)
            jsonResult.error = true
        else if (!user) {
            if (info.message === "Password not valid") {
                jsonResult.userKnown = true
            }
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(jsonResult))
        } else {
            req.login(user, (error) => {
                if (error) return next(error);
                console.log("Request Login supossedly successful.");
                res.setHeader('Content-Type', 'application/json');
                jsonResult.passwordOK = true
                jsonResult.userKnown = true
                return res.end(JSON.stringify(jsonResult)) // user  known
            })

        }

    })(req, res, next)
})

router.get('/sessions', (req, res, next) => {
    if (req.session.page_views) {
        req.session.page_views++
            res.send("You visited this page " + req.session.page_views + " times.")
    } else {
        req.session.page_views = 1
        res.send("Welcome to this page for the first time")
    }
})


module.exports = router;