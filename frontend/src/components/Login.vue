<template>
    <div class="container col-3">
        <img src="../assets/icon.png" alt="" width="300" height="300" class="mx-auto d-block">
        <h1 class="h2 ml-3 font-weight-bold text-danger text-center  mb-4">Groupomania</h1>
        <form class="form-signin" id="form-validation">
            <label for="mail" class="sr-only">Adresse email</label>
            <input type="email" id="mail" class="form-control mb-2" placeholder="Email" required="" autofocus="" v-model="mail">
            <label for="password" class="sr-only">Mot de passe</label>
            <input type="password" id="password" class="form-control mb-3" placeholder="Mot de passe" required="" v-model="password">
            <div class="text-center">
                <button class="btn btn-lg btn-danger btn-block" type="submit" @click="login()">Connexion</button>
            </div>
        </form>
        <div class="text-center mt-2">
            <router-link to="/SignUp">Inscription</router-link>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Login",
    data() {
        return {
            mail: null,
            password: null,
            errorMessage: "",
            successMessage: "",
        };
    },

    methods: {

        login() {
            let form = document.querySelector("#form-validation"),
            that = this,
            mail_form = document.querySelector("#mail"),
            password_form = document.querySelector("#password");

            if (mail_form === "" || mail_form === null) {
            that.errorMessage = "Veuillez saisir un email valide";
            }

            if (password_form === "" || password_form === null) {
            that.errorMessage = "Veuillez saisir un mot de passe valide";
            }

            if (form.checkValidity(event) === false) {
                event.preventDefault();
                event.stopPropagation();

            } else {

                axios.post("http://localhost:3000/api/auth", {
                    mail: this.mail,
                    password: this.password,
                })

                .then((response) => {
                    that.successMessage = response.data.message;
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("userId", response.data.userId);

                    response.headers = {
                        Authorization: "Bearer " + response.data.token,
                    };
                })

                .catch((err) => {
                that.errorMessage = err.response.data.message;
                });
            }

            this.$router.replace({
                name: 'Home'
            })
        },
    },
};
</script>



<style scoped>
    a {
    font-size: 20px;
    color: #000;
    }
    #mail:focus, #password:focus{
    border-color:#ffffff;
    box-shadow: 0 0 0 0.25rem rgb(255 0 33 / 25%);
    }
    .sr-only{
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    border: 0;
    }
</style>