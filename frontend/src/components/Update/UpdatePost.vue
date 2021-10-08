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
                <button @click="updatePost()" class="send btn btn-dark text-light" type="submit">Modifier</button>
            </section>
            <section>
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
import { mapState, mapMutations } from "vuex";

    export default {
        name: 'UpdatePost',
        components: {
            Header,
            Footer
        },

        data() {
            return {
                post: {
                    id: null,
                    description: null,
                    media: null,
                },
            errorMessage: "",
            successMessage: "",
            };
        },
        computed: {
            ...mapState(["post_id", "post_description", "post_media"])
        },
        methods: {
            ...mapMutations(["SET_POST_DATAS"]),

        updatePost() {

            axios.patch(`http://localhost:3000/api/auth/post/update/${this.post_id}`, {
            description: this.post.description,
            media: this.post.media
            })

            .then((response) => {
            this.successMessage = response.data.message;
            this.SET_POST_DATAS(this.post);
            alert("La publication a été modifié")
            this.$router.replace({
                name: 'Home'
            });

            })

            .catch((err) => {
                this.errorMessage = err.response.data.message;
                });
        },
    },
    mounted() {
        this.post.id = this.post_id
        this.post.description = this.post_description
        this.post.media = this.post_media
        console.log(this.$store.state)
    }
}
</script>