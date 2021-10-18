<template>
  <div class="container">
    <section>
      <h3 class="text-center font-weight-bold text-danger mb-5 h2">Les dernières publications partagées</h3>
      <div class="posts card rounded mb-3 shadow" v-for="post in posts.post" :key="post">
        <div class="card-header">
          <div class="user d-flex justify-content-between">
            <div class="d-flex mb-3">
              <div class="user_profile_picture">
                <img v-bind:src=" post.profile_picture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' " 
                alt="user picture"
                width="80"
                class="img mr-3"/>
              </div>
              <div class="userName mt-3">
                <span class="font-weight-bold">{{ post.first_name }} {{ post.last_name }}</span>
                a partagé une publication
              </div>
            </div>
            <div v-if="post.user_id === userId || userDatas.moderator !== 0">
              <button class="btn btn-danger btn-sm btn-block" @click="showUpdatePostPage(post.post_id)">
                Edition
              </button>
            </div>
          </div>
          <div class="post_description">{{ post.description }}</div>
          </div>
          <img :src="post.media" class="post-media d-flex justify-content-center" />
          <div class="card-footer">
            <h4 class="comment mt-2">Commentaires :</h4>

            <div class="newComment d-flex flex-row align-items-center add-comment-section mt-4 mb-4">
                <img v-bind:src="userDatas.profile_picture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'"
                alt="user picture"
                width="50"
                class="img mr-3"/>
                <input  class="commentInput form-control mr-3 mt-1" placeholder="Saisissez votre commentaire..." type="text"
                pattern="[a-zA-ZÀ-ÿ]{1,512}"/>
                <button v-on:click.prevent="addComment(post_id)" class="comment-btn btn btn-color text-white" type="submit"> Envoyer </button>
            </div>

            <div class="comments" v-for="comment in comments.comment" :key="comment">
              <div class="user_profile_picture">
                <img v-bind:src=" comment.profile_picture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' " 
                alt="user picture"
                width="80"
                class="img mr-3"/>
              </div>
              <div class="userName mt-3">
                <span class="font-weight-bold">{{ comment.first_name }} {{ comment.last_name }}</span>
              </div>
              <div>
                <div class="post_description">{{ post.description }}</div>
              </div>
              <div v-if="comment.user_id === userId || userDatas.moderator !== 0">
                <button class="btn btn-danger btn-sm btn-block">
                  Edition
                </button>
              </div>
            </div>
          </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Posts",

  data() {
    return {
      posts: {},
      updatePost: false,
      comments: {},
      userId: null,
      userDatas: {},
    };
  },

  mounted() {
    this.userId = JSON.parse(localStorage.getItem("userId"));
    this.userDatas = JSON.parse(localStorage.getItem("user"));
    this.token = JSON.parse(localStorage.getItem("token"));

    axios.get("http://localhost:3000/api/post/posts")
      .then((response) => {
        console.log(response.data);
        this.posts = response.data;
      })
      .catch(function (error) {
        console.log(error);
      }),

    axios.get(`http://localhost:3000/api/comment/comments/post/${this.post_id}`)
      .then((response) => {
        console.log(response.data);
        this.comments = response.data;
      })
      .catch(function (error) {
        console.log(error);
      })
  },

  methods: {

    showUpdatePostPage(post_id) {
      this.$router.push({
        name: "UpdatePost",
        params: { id: post_id },
      });
    },
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
  background-color: rgb(33, 52, 82);
}
.commentInput:focus {
  border-color: #ffffff;
  box-shadow: 0 0 0 0.05rem rgb(33, 52, 82);
}

.comment-btn {
  height: 40px;
  margin-top: 5px;
}
.userName {
  margin-left: 10px;
}
.img {
  border: 4px solid rgb(255, 255, 255);
  width: auto;
  height: 80px;
  object-fit: contain;
}
.post-media {
  width: auto;
  height: 500px;
  object-fit: cover;
}
</style>