<template>
    <div class="container col-xl-12 col-md-12">
        <header class="col-xl-12">
            <Header/>
        </header>
        <main>
            <section class="updateProfile container col-12 col-xl-6 mt-4">
                <div class="card border shadow mb-5 bg-white rounded">
                    <div class="card">
                        <h2 class="text-center h4 card-header">Liste des utilisateurs</h2>
                        <div v-for="user in users.user" :key="user">
                            <img v-bind:src=" user.profile_picture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' " 
                            alt="user picture"
                            width="80"
                            class="img mr-3"/>
                            <h3>{{ user.first_name }} {{ user.last_name }}</h3>
                            <p>{{ user.city }}</p>
                            <button type="submit" class="btn color-btn" @click="deleteUser(user.id)">Supprimer</button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <footer>
            <Footer class="fixed-bottom"/>
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
        }
    }
</script>
