<template>
    <div class="container col-3">
        <img src="../assets/icon.png" alt="" width="300" height="300" class="mx-auto d-block">
        <h1 class="h2 ml-3 font-weight-bold text-danger text-center mb-4">Groupomania</h1>
        <form class="form-signin" id="form-validation" method="post">
            <div class="row">
                <div class="col">
                    <label for="Last_Name" class="sr-only">Nom</label>
                    <input v-model="last_name" type="text" id="last_name" class="form-control mb-2" placeholder="Nom" required autofocus="">
                </div>
                <div class="col">
                    <label for="First_Name" class="sr-only">Prénom</label>
                    <input type="text" id="first_name" class="form-control mb-2" placeholder="Prénom" required autofocus="" v-model="first_name">
                </div>
            </div>
            <label for="inputEmail" class="sr-only">Adresse email</label>
            <input type="email" id="mail" class="form-control mb-2" placeholder="Email" required autofocus="" v-model="mail">
            <label for="inputPassword" class="sr-only">Mot de passe</label>
            <input type="password" id="password" class="form-control mb-3" placeholder="Mot de passe" required v-model="password">
            <div class="text-center">
                <button class="btn btn-lg btn-danger btn-block" @click="signUp()">Inscription</button>
            </div>
        </form>
        <div class="text-center mt-2">
            <router-link to="/">Connexion</router-link>
        </div>
        <div class="row">
            <div v-if="errorMessage" class="alert alert-danger">
                {{ errorMessage }}
            </div>
            <div v-if="successMessage" class="alert alert-success">
                {{ successMessage }}
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "signUp",
    data() {
        return {
            mail: null,
            password: null,
            last_name: null,
            first_name: null,
            errorMessage: "",
            successMessage: "",
        };
    },
    
    methods: {
        signUp() {
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
                last_name: this.last_name,
                first_name: this.first_name,
                })

            .then((response) => {
            that.successMessage = response.data.message;
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.userId);

            response.headers = {
                Authorization: "Bearer" + response.data.token,
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
    #last_name:focus, #first_name:focus, #mail:focus, #password:focus{
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