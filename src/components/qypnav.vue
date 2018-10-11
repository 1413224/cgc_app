<template>
  <div>
    <div class="nav clearfix">
      <div v-for="item in icocont" class="item">
        <span class="icon"><img :src="item.icourl" alt=""></span><span>{{item.icoText}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    icocont:{
      type:Array,
      default:[]
    },
  },
  methods: {

  },
  mounted(){
    // console.log(this.icocont)
  },
  data () {
    return {
      
    }
  }
}
</script>
<style lang="less" scoped>
  /* .nav {
    height:1rem;
    line-height: 1rem;
    border-bottom: 1px solid #E1E1E1;
    .item{
      float: left;
      width: 25%;
      text-align: center;
      span{
        display: inline-block;
        color: #7386AD;
        font-size: .24rem;
      }
      .icon{
        width: .32rem;
        height: .32rem;
        img{
          width: 100%;
          height: 100%;
          position: relative;
          top: .06rem;
          right: .1rem; 
        }
      }
    }
  } */
  .nav{
    height: 1rem;
    line-height: 1rem;
    border-bottom: 1px solid #E1E1E1;
    display: flex;
    .item{
      flex: 1;
      text-align: center;
      .icon{
        width: .32rem;
        height: .32rem;
        display: inline-block;
        img{
          width: 100%;
          height: 100%;
          position: relative;
          top: .06rem;
          left: -.1rem;
        }
      }
    }
  }
</style>