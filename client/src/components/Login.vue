<template>
<div class="flexContainer">
    
        

        <Form class="formWrapper" @submit="processLogin" >
            <div class="flexItem">
                <h1 class="headerFormer">HTL Wels/AHIT 5</h1>
            </div>
            <div class="flexItem">
                

                <font-awesome-icon 
                    :icon="['fas','user']"
                    color="gray"
                    class="fa-1x as-icon"
                     />
                <Field
                    type="text"
                    name="user"
                    placeholder="User"
                    required
                    v-model="user"
                    
                    />
                
            </div>
            <ErrorMessage name="user" />
            <span role="alert" v-if="errorMessage.startsWith('User')">
                   {{ errorMessage}}
            </span>

            <div class="flexItem">
                <font-awesome-icon 
                    :icon="['fas','lock']"
                    color="gray"
                    class="fa-1x  as-icon"
                     />
                <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    v-model="password"
                    :rules="validatePassword"
                    />
                
            </div>
            <ErrorMessage name="password" />
            <span role="alert" v-if="errorMessage.startsWith('Password')">
                   {{ errorMessage}}
            </span>    
            <div class="flexItem">
                <a href=""> Passwort vergessen?</a> 
            </div>
            <div class="flexItem">
                <input type="submit" value="Submit">
            </div>
        </form>
   
</div>    
</template>


<script>
import {ref} from 'vue'
import { Form, Field,ErrorMessage  } from 'vee-validate';
import axios from 'axios'


export default {
    // uriPath: htpp://localhost:3000/passwd?user=seppMaier&password=fcBayern
props: {
    uriPath : {
        type:String,
        required:true
    }
},    
components: {
    Form,
    Field,
    ErrorMessage
  },
setup(props,context) {
        let user=ref('')
        let password=ref('')
        let errorMessage=ref('')

        function processLogin() {
            /*
            let jsonRet = {
                userExist:true,
                allowed:true,
                class:''
            }
            */
           console.log("Process Login mit Parameter ")
            axios.post('/login', {
                user: user.value,
                password: password.value
            })
            .then(response=> {
                let data = response.data
                console.log("Login: RetVal " + response.data)
                if (data.error) {
                    context.emit('loginDone',data.error)
                    console.log("Login: Error occured: " + data.error)
                }
                else if (!data.userKnown)
                     context.emit('loginDone','User not known')
                else if (!data.passwordOK)
                    context.emit('loginDone','Password not valid')
                else
                     context.emit('loginDone','Login done')
                
            })
            .catch(error=> {
                console.log(error);
            });




        }(req,resp,next)
        /* VALIDATOR BEGIN*/
       
         function validatePassword(value) {
             console.log("validate Password...")
            if (!value) return 'This field is required'; 
            if (value.length < 4) return 'At least 4 characters are required'
            return true;
         }
         /* VALIDATOR END */

        return {
        user,
        password,
        processLogin,
        validatePassword,
         errorMessage

    }
}


    
}
</script>

<style scoped>
.flexContainer {
   display: flex;
   height:100%;
   padding:0;
   margin:0;
  justify-content:center;

  /*flex-direction: column; */
}

.formWrapper {
    display:flex;
    flex-direction: column;
    background:lightgoldenrodyellow;
    /* padding: 50px 150px; */
      width:500px;
}

.flexItem {
    margin: 2%;
}
.flexItem h1 {
    color:blue;
}
.flexItem input {
    height:30px;
    width: 70%;
}
.flexItem input[type=submit] {
    background:blue;
    color:white;
    width:40%;
    border-radius:15px;
    font-weight:bold;
    cursor: pointer;
}
span[role=alert] {
    color:red;
}

.as-icon {
    margin-right:5px;
}
</style>