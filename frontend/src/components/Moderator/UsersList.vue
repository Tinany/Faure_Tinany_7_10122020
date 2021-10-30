<template>
    <div class="container col-xl-12 col-md-12">
        <header class="col-xl-12">
            <Header/>
        </header>
        <main>
            <section class="container col-12 col-xl-6 mt-4">
                <div class="card border shadow mb-5 bg-white rounded">
                    <div class="card">
                        <h2 class="text-center h4 card-header">Liste des utilisateurs</h2>
                        <div class="row color mb-2 d-flex align-items-center" v-for="user in users.userList" :key="user">
                            <img v-bind:src=" user.profile_picture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' " 
                            alt="user picture"
                            width="80"
                            class="img mr-3 ml-3"/>
                            <h3>{{ user.first_name }} {{ user.last_name }}</h3>
                            <h4 class="ml-2 mt-2 h5">({{ user.city }})</h4>
                            <button type="submit" class="btn btn-danger ml-auto mr-4 p-2" @click="deleteUser(user.id)">Supprimer</button>
                        </div>
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
import axios from "axios"
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

    export default {
        name: 'UsersList',
        components : {
            Header,
            Footer
        },
        data() {
            return {
                users: {},
            }
        },

        mounted() {
            axios.get("http://localhost:3000/api/auth/usersList")
            .then((response) => {
                console.log(response.data);
                this.users = response.data;
            })
            .catch(function (error) {
                console.log(error);
            })
        },

        methods : {

        deleteUser(user_id) {
            axios.delete(`http://localhost:3000/api/auth/user/delete/${user_id}`, 
            {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.token}})

            .then(() => {
                alert('Le profil a bien été supprimé');
                localStorage.clear();
                this.$router.push('/'); 
            })
            .catch(error => {
              console.log(error);
              alert('Une erreur est survenue !');
          })
        }

        }
    }
</script>