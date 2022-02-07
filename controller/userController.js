const User = require('../models/userSchema')
const bcrypt = require('bcrypt');
const saltRounds = 10;


function storeUser(userN, clearPasssword,callBack) {
    bcrypt.hash(clearPasssword, saltRounds, function(err, hash) {
        if (err) 
            callBack(err)
        let newUser = new User({
        username:userN,
        password:hash
    })
    newUser.save().then(user=>{
        callBack(null,true)
    })
    .catch(err=>{
        callBack(err)
    })
})
    
}

module.exports = {
    storeUser
}

