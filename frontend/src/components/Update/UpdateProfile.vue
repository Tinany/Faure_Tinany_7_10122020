<template>
    <div class="container col-xl-12 col-md-12">
        <header class="col-xl-12">
            <Header/>
        </header>
        <main>
            <section class="updateProfile container col-5 mt-4">
                <div class="card border shadow mb-5 bg-white rounded">
                    <div class="card">
                        <h2 class="text-center h4 card-header">Modifiez votre profil</h2>
                        <div class="form-group">
                            <div class="row">
                                <div class="col ml-2 mt-2">
                                    <label for="Last_Name" class="sr-only">Nom</label>
                                    <input type="text" id="last_name" class="form-control mb-2" placeholder="Nom" autofocus="" v-model="user.last_name">
                                </div>
                                <div class="col mr-2 mt-2">
                                    <label for="First_Name" class="sr-only">Prénom</label>
                                    <input type="text" id="first_name" class="form-control mb-2" placeholder="Prénom" autofocus="" v-model="user.first_name">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col ml-2">
                                    <label for="City" class="sr-only">Ville</label>
                                    <input type="text" id="city" class="form-control mb-2" placeholder="Ville"  autofocus="" v-model="user.city">
                                </div>
                                <div class="col mr-2">
                                    <label for="image" class="sr-only">Photo de profil :</label>
                                    <input class="form-control color-focus" placeholder="Saisir l'url de l'image ici" type="text" v-model="user.profile_picture">
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn color-btn" @click="updateUser()">Modifier</button>
                    </div>
                </div>
            </section>
            <section class="container col-5 mt-4">
                <div class="card border shadow mb-5 bg-white rounded">
                    <div class="card">
                        <h2 class="text-center h4 card-header-2 card-header">Supprimez votre profil</h2>
                        <div class="form-group">
                            <div class="col mt-2">
                                <div class="row ml-2">
                                    <p class="mt-2 font-weight-bold mr-1">Votre Prénom :</p>
                                    <p class="mt-2"> {{ user.first_name }}</p>
                                </div>
                            </div>
                            <div class="col">
                                <div class="row ml-2">
                                    <p class="mt-2 font-weight-bold mr-1">Votre Nom :</p>
                                    <p class="mt-2"> {{ user.last_name }}</p>
                                </div>
                            </div>
                            <div class="col">
                                <div class="row ml-2">
                                    <p class="mt-2 font-weight-bold mr-1">Vous êtes parmis nous depuis le :</p>
                                    <p class="mt-2">{{ user.creation_date }}</p>
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-danger" @click="deleteUser()">Supprimer</button>
                    </div>
                </div>
            </section>
        </main>
        <footer>
            <Footer/>
        </footer> 
    </div>
</template>

<script>
import axios from "axios";
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { mapState, mapMutations,  mapActions } from "vuex";

export default {
    name: 'UpdateProfile',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            user: {
                id: null,
                last_name: null,
                first_name: null,
                city: null,
                profile_picture: null
            },
            errorMessage: "",
            successMessage: "",
        };
    },
        computed: {
            ...mapState(["user_last_name", "user_first_name", "user_city", "user_profile_picture", "user_id", "user_creation_date"])
        },
        methods: {
            ...mapMutations(["SET_USER_DATAS"]),
            ...mapActions(["logout"]),

        updateUser() {

            axios.patch(`http://localhost:3000/api/auth/user/update/${this.user_id}`, {
            last_name: this.user.last_name,
            first_name: this.user.first_name,
            city: this.user.city,
            profile_picture_picture: this.profile_picture
            })

            .then((response) => {
            this.successMessage = response.data.message;
            this.SET_USER_DATAS(this.user);
            alert("Le profil a été modifié")
            this.$router.replace({
                name: 'Home'
            });

            })

            .catch((err) => {
                this.errorMessage = err.response.data.message;
                });
        },

        deleteUser() {
            axios.delete(`http://localhost:3000/api/auth/user/delete/${this.user_id}`, {

            })
            .then(() => {
                alert('Le profil a bien été supprimé');
                this.logout();
            })
            .catch(error => {
              console.log(error);
              alert('Une erreur est survenue !');
          })
        }
    },
    mounted() {
        this.user.id = this.user_id
        this.user.last_name = this.user_last_name
        this.user.first_name = this.user_first_name
        this.user.city = this.user_city
        this.user.profile_picture = this.user_profile_picture
        this.user.creation_date = this.user_creation_date
        console.log(this.$store.state)
    }
}
</script>

<style scoped>
.form-control:focus{
    border-color:#ffffff;
    box-shadow: 0 0 0 0.05rem rgb(33,52,82);
}

.card-header, .color-btn{
    background-color: rgb(33,52,82);
    color: #fff;
}
.card-header-2 {
    background-color: #dc3545;
    color: #fff;
}
</style>
