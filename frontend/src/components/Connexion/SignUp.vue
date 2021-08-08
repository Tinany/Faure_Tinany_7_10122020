<template>
    <section class="container">
        <img src="@/assets/icon.png" alt="" width="280" height="280" class="mx-auto d-block">
        <h1 class="h2 ml-3 font-weight-bold text-danger text-center mb-4">Groupomania</h1>
        <div class="mx-auto d-block col-md-5 col-lg-4">
            <div class="form-signin row">
                <div class="col">
                    <label for="Last_Name" class="sr-only">Nom</label>
                    <input v-model="last_name" type="text" id="last_name" class="form-control mb-2" placeholder="Nom" required autofocus="">
                </div>
                <div class="col">
                    <label for="First_Name" class="sr-only">Prénom</label>
                    <input type="text" id="first_name" class="form-control mb-2" placeholder="Prénom" required autofocus="" v-model="first_name">
                </div>
            </div>
            <label for="inputCity" class="sr-only">Ville</label>
            <input type="text" id="city" class="form-control mb-2" placeholder="Ville" required autofocus="" v-model="city">
            <label for="inputEmail" class="sr-only">Adresse email</label>
            <input type="email" id="mail" class="form-control mb-2" placeholder="Email" required autofocus="" v-model="mail">
            <label for="inputPassword" class="sr-only">Mot de passe</label>
            <input type="password" id="password" class="form-control mb-3" placeholder="Mot de passe" required v-model="password">
            <div class="text-center">
                <button class="btn btn-lg btn-danger btn-block" @click="signUp()">Inscription</button>
            </div>
        </div>
        <div class="text-center mt-2 row mx-auto d-block">
            <router-link to="/" class="col-5">Connexion</router-link>
        </div>
        <div class="row">
            <div v-if="errorMessage" class="alert alert-danger">
                {{ errorMessage }}
            </div>
            <div v-if="successMessage" class="alert alert-success">
                {{ successMessage }}
            </div>
        </div>
    </section>
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
            city: null,
            errorMessage: "",
            successMessage: "",
        };
    },
    
    methods: {
        signUp() {

            if (this.mail === "" || this.mail === null) {
                this.errorMessage = "Veuillez saisir un email valide";
            }

            else if (this.password === "" || this.password === null) {
                this.errorMessage = "Veuillez saisir un mot de passe valide";

            } else {
                axios.post("http://localhost:3000/api/auth/signup", {
                mail: this.mail,
                password: this.password,
                last_name: this.last_name,
                first_name: this.first_name,
                city: this.city,
                })

            .then((response) => {
            this.successMessage = response.data.message;
            this.$store.state.token = response.data.token;
            this.$store.state.user = response.data.user;

            response.headers = {
                Authorization: "Bearer" + response.data.token,
                };

            this.$router.push({
                name: 'Home'
                })
            })

            .catch((err) => {
                this.errorMessage = err.response.data.message;
                });
            }
        },
    },
};
</script>

<style scoped>
    a {
    font-size: 20px;
    color: #000;
    }
    #last_name:focus, #first_name:focus, #mail:focus, #password:focus, #city:focus{
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