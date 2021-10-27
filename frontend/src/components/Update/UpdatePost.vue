<template>
    <div class="container col-xl-12 col-md-12">
        <header class="col-xl-12">
            <Header/>
        </header>
        <main class="container">
            <section class="card">
                <div class="card-header">
                    <h3 class="text-center font-weight-bold mb-5">Modifier ou supprimer cette publication</h3>
                </div>
                <h4 class="ml-3 mt-2">Changer la description :</h4>
                <input v-model="post.description" id="description" type="text" pattern="[a-zA-ZÀ-ÿ]{1,128}" class="mt-3 mb-3 ml-5 mr-5"/>
                <h4 class="ml-3 mt-2 mb-2">Changer le média :</h4>
                <input v-model="post.media" id="media"  class="mb-3 ml-5 mr-5" type="text" pattern="/^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+) (?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/"/>
                <button @click="updatePost(post.id)" class="send color-btn btn btn-dark text-light" type="submit">Modifier</button>
            </section>
            <section class="container col-xl-5 col-12 mt-5">
                <div class="card border shadow mb-5 bg-white rounded">
                    <div class="card">
                        <button type="submit" class="btn btn-danger" @click="deletePost(post.id)">Supprimer cette publication</button>
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
import axios from "axios";
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

    export default {
        name: 'UpdatePost',
        components: {
            Header,
            Footer
        },

        data() {
            return {
            post: {},
            };
        },

        methods: {

        updatePost(post_id) {
            axios.patch(`http://localhost:3000/api/post/update/${post_id}`, {
            description: this.post.description,
            media: this.post.media
            }, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.token}})

            .then(() => {
            alert("La publication a été modifié")
            this.$router.replace({
                name: 'Home'
                })
            })
            .catch(error => {
              console.log(error);
              alert('Une erreur est survenue !');
          })
        },

        deletePost(post_id) {
            axios.delete(`http://localhost:3000/api/post/delete/${post_id}`, 
            {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.token}})

            .then(() => {
                alert('La publication a bien été supprimé');
                this.$router.replace({
                    name: 'Home'
                });
            })
            .catch(error => {
              console.log(error);
              alert('Une erreur est survenue !');
          })
        }
    },
    mounted() {
        this.token = JSON.parse(localStorage.getItem("token"))
        let post_id = this.$route.params.id
        
        axios.get(`http://localhost:3000/api/post/onePost/${post_id}`, {'Content-Type': 'application/json', headers: {Authorization: 'Bearer ' + this.token}})
            .then((response) => {
            console.log(response);
            this.post = response.data[0];
        })
        .catch(function (error) {
        console.log(error);
      });
    }
}
</script>

<style scoped>
.card-header, .color-btn{
    background-color: rgb(33,52,82);
    color: #fff;
}
</style>