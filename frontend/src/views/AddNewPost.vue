<template>
    <section class="newPost container col-lg-7 col-xl-6 mt-4">
        <div class="card border shadow-lg mb-5 bg-white rounded">
            <div class="card">
                <h2 class="text-center h4 card-header">Créez une nouvelle publication</h2>
                <div class="form-group ml-3 mr-3 d-flex">
                  <img v-bind:src=" user_profile_picture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'" alt="user picture" width="80" class="img-thumbnail mt-3">
                  <h3 class="userName ml-3 h5 mb-0">{{ user_first_name }} {{ user_last_name }}</h3>
                </div>
                <div class="form-group">
                    <textarea rows="5" class="form-control rounded-1 card-body" name="description" placeholder="Écrivez quelques choses..." v-model="post.description"></textarea>
                </div>
                  <input class="form-group input" v-model="post.media" placeholder="Saisir l'url de l'image ici" type="text"/>
                <button type="submit" class="btn color-btn" @click="createPost()">Ajouter</button>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";

export default {
  name: "AddNewPost",
  data() {
    return {
      post: {
        description: null,
        media: null,
        user_id: null,
      },
      errorMessage: "",
      successMessage: "",
    }
  },
    computed: {
      ...mapState(["user_id", "user_last_name", "user_first_name", "user_profile_picture"])
  },
    methods: {
    ...mapMutations(["SET_POST_DATAS"]),

    createPost() {

      axios.post("http://localhost:3000/api/post/createPost", {
          description: this.post.description,
          media: this.post.media,
          user_id: this.user_id
        })
        .then(response => {
          this.successMessage = response.data.message;
          this.SET_POST_DATAS(response.data);
          alert('La publication a bien été ajouté !')
          
          axios.defaults.headers.common['Authorization'] = "Bearer " + response.data.token
        })
        .catch(error => {
          this.data = alert("Une erreur est survenue!");
          console.log(error);
        });
    }
  },
};
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

.input {
  margin-right: 25%;
  margin-left: 25%;
}

.userName {
  margin-top: 5%;
}
</style>