<template>
<div class="card">
    <div class="card-header">
        <div class="post-name"> Publié par <strong>  </strong></div>
        <div class="post-content"> {{ post.description }} </div>
        <div class="post-media"><img :src="post.media"></div>

       <!-- <section>
            <h4 class="comments">Commentaires :</h4>
            <div class="newComment">
                <input v-model="newComment.body" class="commentaire" placeholder="Saisissez votre commentaire..." type="text" pattern="[a-zA-ZÀ-ÿ]{1,512}" />
                <button v-on:click.prevent="addComment()" class="comment-btn" type="submit">Envoyer !</button>
            </div>
            <div :key="index" v-for="(comment, index) in comments" class="allComments">
            </div>
        </section> -->
    </div>
</div>
</template>

<script>

export default {
    name: "Post"
}
</script>
