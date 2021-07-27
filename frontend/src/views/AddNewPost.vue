<template>
    <div class="newPost container col-5">
        <div class="card border">
            <form class="card" action="" method="POST">
                <h2 class="text-center h4 card-header">Créez une nouvelle publication</h2>
                <div class="form-group">
                    <textarea rows="6" class="form-control rounded-1 card-body" name="description"></textarea>
                </div>
                <div class="form-group align-self-center">
                    <input type="file" class="form-control-file" id="formControlFile">
                </div>
                <button type="submit" class="btn btn-danger">Ajouter</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
  name: "AddNewPost",
};
</script>

<style scoped>
.form-control:focus{
    border-color:#ffffff;
    box-shadow: 0 0 0 0.10rem rgb(255 0 33 / 25%);
}
.card{
    border-color: #dc3545;
}
.card-header{
    background-color: #dc3545;
    color: #fff;
}
</style>