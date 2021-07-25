<template>
    <div class="user-header">
        <div class="left-info">
            <div class="img-logo">
                <img src="@assets/img/logo.png" alt="error">
            </div>
            <div class="index">
                <div class="index-wenzou">大美温州</div>
            </div>
        </div>
        <div class="right-info">
            <div class="upload">

            </div>
            <div class="user-info">

            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'User'
}
</script>
<style scoped>
    .user-header{
        overflow:hidden;
    }
    .user-header .left-info{
        float:left;
        margin-left:20px;
    }
    .user-header .right-info{
        float:right;
        margin-right:20px;
    }
    .user-header .left-info .img-logo{
        display:inline-block;
    }
    .user-header .left-info .index{
        display:inline-block;
    }
</style>