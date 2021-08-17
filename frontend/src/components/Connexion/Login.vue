<template>
    <section class="container">
        <img src="@/assets/icon.png" alt="" width="280" height="280" class="mx-auto d-block">
        <h1 class="h2 ml-3 font-weight-bold text-danger text-center mb-4">Groupomania</h1>
        <div class="row">
            <div class="form-signin mx-auto d-block col-md-5 col-lg-4" id="form-validation">
                <label for="mail" class="sr-only">Adresse email</label>
                <input type="email" id="mail" class="form-control mb-2" placeholder="Email" required="" autofocus="" v-model="mail">
                <label for="password" class="sr-only">Mot de passe</label>
                <input type="password" id="password" class="form-control mb-3" placeholder="Mot de passe" required="" v-model="password">
                <div class="text-center">
                    <button class="btn btn-lg btn-danger btn-block" type="submit" @click="login()">Connexion</button>
                </div>
            </div>
        </div>
        <div class="text-center mt-2 row mx-auto d-block">
            <router-link to="/SignUp" class="col-5">Inscription</router-link>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";

export default {
    name: "Login",
    data() {
        return {
            id: null,
            mail: null,
            password: null,
            first_name: null,
            last_name: null,
            city: null,
            creation_date: null,
            errorMessage: "",
            successMessage: ""
        };
    },

    methods: {
        ...mapMutations(["SET_USER_DATAS"]),
        login() {

            if (this.mail === "" || this.mail === null) {
                this.errorMessage = "Veuillez saisir un email valide";
                alert('Veuillez saisir votre adresse mail');
            }

            else if (this.password === "" || this.password === null) {
                this.errorMessage = "Veuillez saisir un mot de passe valide";
                alert('Veuillez saisir votre mot de passe');

            } else {

                axios.post("http://localhost:3000/api/auth/login", {
                id: this.id,
                mail: this.mail,
                password: this.password,
                first_name: this.first_name,
                last_name: this.last_name,
                city: this.city,
                creation_date: this.creation_date
                })

            .then((response) => {
            this.successMessage = response.data.message;
            this.SET_USER_DATAS(response.data)

            axios.defaults.headers.common['Authorization'] = "Bearer " + response.data.token,

            this.$router.push({
                name: 'Home'
                })
            })

            .catch((err) => {
                this.errorMessage = err.response.data.message;
                alert('Adresse mail ou mot de passe incorrect');
                });
            }
        },
    }
};
</script>



<style scoped>
    html {
        max-width: auto;
    }
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