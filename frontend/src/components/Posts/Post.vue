<template>
    <div class="container col-xl-12 col-md-12">
      <header class="col-xl-12">
          <Header/>
      </header>
      <main class="col-xl-6 col-md-6 col-12 mx-auto">
        <div class="posts card rounded mb-3 shadow">
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
                  pattern="[a-zA-ZÀ-ÿ]{1,512}" v-model="comment.description"/>
                  <button v-on:click.prevent="addComment(post.post_id)" class="btn btn-primary" type="submit"> Envoyer </button>
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
                  <div class="post_description">{{ comment.description }}</div>
                </div>
                <div v-if="comment.user_id === userId || userDatas.moderator !== 0">
                  <button class="btn btn-danger btn-sm btn-block" @click="deleteComment()">
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
        </div>
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

export default {
    name: 'Post',
    components: {
        Header,
        Footer
    },

    data() {
        return {
          post: {},
          userDatas: {},
          comment: {
            description: null
          },
          comments: {}
        };
    },

  mounted() {
      this.userId = JSON.parse(localStorage.getItem("userId"));
      this.userDatas = JSON.parse(localStorage.getItem("user"));
      this.token = JSON.parse(localStorage.getItem("token"))
      let post_id = this.$route.params.id
      
      axios.get(`http://localhost:3000/api/post/onePost/${post_id}`, {'Content-Type': 'application/json', headers: {Authorization: 'Bearer ' + this.token}})
          .then((response) => {
          console.log(response);
          this.post = response.data[0];
      })
      .catch(function (error) {
      console.log(error);
    })

    axios.get(`http://localhost:3000/api/comment/comments/post/${post_id}`)
      .then((response) => {
        this.comments = response.data;
        console.log(this.comments)
      })
      .catch(function (error) {
        console.log(error);
      })
  },

  methods: {
    addComment(post_id) {
        axios.post(`http://localhost:3000/api/comment/createComment/`, {
          description: this.comment.description,
          user_id: this.userId,
          post_id: post_id

        }, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.token}})

        .then(response => {
          this.successMessage = response.data.message;
          alert('Le commentaire a bien été ajouté !')
          this.$router.go()
        })
        .catch(error => {
          this.data = alert("Une erreur est survenue!");
          console.log(error);
        });
    }
  }
}

/*<div class="card-footer">

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
            </div> */
</script>
