const userController = require('../controller/userController')

let userDB = [
    {user:'Mandi',password:"montag"},
    {user:'Vroni',password:"dienstag"},
    {user:'Ludwig',password:"mittwoch"},
]


function defaultUsers() {
    userDB.forEach(element => {
        userController.storeUser(element.user,element.password,(err,result)=>{
            if (err)
                console.log("Error: " + err + " occured in storing user "+element.user)
            else
                if (result)
                    console.log("Succeeded in storing user: " + element.user)
        })
    });
}

module.exports = {
     defaultUsers

}