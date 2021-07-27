<template>
    <div class="container col-3">
        <img src="../assets/icon.png" alt="" width="300" height="300" class="mx-auto d-block">
        <h1 class="h2 ml-3 font-weight-bold text-danger text-center">Groupomania</h1>
        <form class="form-signin">
            <label for="inputEmail" class="sr-only">Adresse email</label>
            <input type="email" id="inputEmail" class="form-control mb-2" placeholder="Email" required="" autofocus="" v-model="form.mail">
            <label for="inputPassword" class="sr-only">Mot de passe</label>
            <input type="password" id="inputPassword" class="form-control mb-3" placeholder="Mot de passe" required="" v-model="form.password">
            <div class="text-center">
                <button class="btn btn-lg btn-danger btn-block" type="submit" @click="submit()">Connexion</button>
            </div>
        </form>
        <div class="text-center mt-2">
            <router-link to="/SignUp">Inscription</router-link>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'Login',
    data() {
        return {
            form: {
                mail: "",
                password: ""
            }
        }
    },
    methods: {
        ...mapActions({
            login: 'auth/login'
        }),
        submit () {
            this.login(this.form)
            .then(() => {
                this.$router.replace({
                    name: 'Home'
                })
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
    #inputEmail:focus, #inputPassword:focus{
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