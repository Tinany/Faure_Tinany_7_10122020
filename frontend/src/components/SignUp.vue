<template>
    <div class="container col-3">
        <img src="../assets/icon.png" alt="" width="300" height="300" class="mx-auto d-block">
        <h1 class="h2 ml-3 font-weight-bold text-danger text-center">Groupomania</h1>
        <form class="form-signin">
            <div class="row">
                <div class="col">
                    <label for="Last_Name" class="sr-only">Nom</label>
                    <input v-model="form.last_name" type="text" id="inputLastName" class="form-control mb-2" placeholder="Nom" required="" autofocus="">
                </div>
                <div class="col">
                    <label for="First_Name" class="sr-only">Prénom</label>
                    <input type="text" id="inputFirstName" class="form-control mb-2" placeholder="Prénom" required="" autofocus="" v-model="form.first_name">
                </div>
            </div>
            <label for="inputEmail" class="sr-only">Adresse email</label>
            <input type="email" id="inputEmail" class="form-control mb-2" placeholder="Email" required="" autofocus="" v-model="form.mail">
            <label for="inputPassword" class="sr-only">Mot de passe</label>
            <input type="password" id="inputPassword" class="form-control mb-3" placeholder="Mot de passe" required="" v-model="form.password">
            <div class="text-center">
                <button class="btn btn-lg btn-danger btn-block" @click="signUp()">Inscription</button>
            </div>
        </form>
        <div class="text-center mt-2">
            <router-link to="/">Connexion</router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'SignUp',
    data() {
        return {
            form: {
                last_name: "",
                first_name: "",
                mail: "",
                password: ""
            }
        }
    },
    methods: {
        signUp() {
            axios.post('http://localhost:3000/api/auth/signup/', this.form)
            .then(response => {
                let data = response.data;
                this.data = alert(
                "L'ultilisateur " + data.last_name + " " + data.first_name + " a bien été crée!"
                );
                this.$router.replace({
                    name: 'Home'
                })
                
            })
            .catch(error => {
                if (error.status(400)) {
                    alert('Veuillez renforcer le mot de passe');
                    } else {
                        this.data = alert("Mauvais mot de passe !");
                }
            })
        }
    }  
}
</script>

<style scoped>
    a {
    font-size: 20px;
    color: #000;
    }
    #inputLastName:focus, #inputFirstName:focus, #inputEmail:focus, #inputPassword:focus{
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