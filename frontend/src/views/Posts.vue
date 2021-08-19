<template>
  <div class="container">
    <section>
        <h3 class="text-center font-weight-bold text-danger mb-5 h2">Les dernières publications partagées</h3>
        <div class="posts card mb-3 shadow" v-for="post in posts.post" :key="post">
            <div class="card-header">
                <div class="user d-flex justify-content-between">
                  <div class="d-flex mb-3">
                    <div class="user_profile_picture">
                      <img v-bind:src=" post.user_profile_picture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'" alt="user picture" width="80" height="80" class="img-thumbnail mr-3">
                    </div>
                    <div class="userName mt-3">
                      <span class="font-weight-bold">{{ post.user_first_name }} {{ post.user_last_name }}</span> a partagé une publication, il y a 
                    </div>
                  </div>
                  <div v-if="post.user_id === user_id">
                    <button href="" class="btn btn-danger btn-sm btn-block" @click="showUpdatePostPage()">Edit post</button>
                  </div>
                </div>
                <div class="post_description"> {{ post.description }} </div>
            </div>
            <img :src="post.media" class="post-media d-flex justify-content-center">
            <div class="card-footer">
                <h4 class="comment mt-2">Commentaires :</h4>
                <div class="newComment d-flex flex-row add-comment-section mt-4 mb-4">
                    <img v-bind:src=" user_profile_picture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'" alt="user picture" width="50" class="img-thumbnail mr-3">
                    <input v-model="newComment" class="commentInput form-control mr-3 mt-1" placeholder="Saisissez votre commentaire..." type="text" pattern="[a-zA-ZÀ-ÿ]{1,512}" />
                    <button v-on:click.prevent="addComment()" class="comment-btn btn btn-color text-white" type="submit">Envoyer</button>
                </div>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "Posts",

  data() {
    return {
      posts: {},
      updatePost: false
    }
  },
    computed: {
      ...mapState(["user_id", "user_last_name", "user_first_name", "user_profile_picture"])
  },
  mounted() {
    axios.get("http://localhost:3000/api/post/posts")
      .then((response) => {
        console.log(response.data);
        this.posts = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods: {
        showUpdatePostPage() {
          this.$router.push({
              name: 'UpdatePost'
          })
    }
  }
};
</script>

<style scoped>
.post-media {
    width: 100%;
    height: 25vw;
    object-fit: cover;
}
.btn-color {
  background-color: rgb(33,52,82);
}
.commentInput:focus{
    border-color:#ffffff;
    box-shadow: 0 0 0 0.05rem rgb(33,52,82);
}
</style>