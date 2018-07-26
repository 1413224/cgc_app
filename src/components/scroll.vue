<template>
  <div ref="wrapper">
    <div>
      <div v-if="dropDown" class="pulldown-tip">{{pullingDownText}}</div>
      <slot></slot>
      <!-- <div v-if="dropUp" class="pulldown-tip">{{pullingUpText}}</div> -->
    </div>
    
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    props: {
      /**
       * 1 滚动的时候会派发scroll事件，会截流。
       * 2 滚动的时候实时派发scroll事件，不会截流。
       * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
       */
      probeType:{
        type:Number,
        default:2
      },
      //点击列表是否派发click事件
      click:{
        type:Boolean,
        default:true
      },
      //是否开启横向滚动
      scrollX:{
        type:Boolean,
        default:false
      },
      //是否派发滚动事件
      listenScroll:{
        type:Boolean,
        default:false
      },
      //列表的数据
      data:{
        type:Array,
        default:null
      },
      //是否派发滚动到底部的事件，用于上拉加载
      pullingUp:{
        type:Boolean,
        default:false
      },
      //是否派发顶部下拉的事件，用于下拉刷新
      pullingDown:{
        type:Boolean,
        default:false
      },
      //是否派发列表滚动开始的事件
      beforeScroll:{
        type:Boolean,
        default:false
      },
      //当数据更新后，刷新scroll的延时。
      refreshDelay:{
        type:Number,
        default:20
      },
      //pullingDown提示(控制显示隐藏)
      dropDown:{
        type:Boolean,
        default:false
      },
      //文字提示
      pullingDownText:{
        type:String,
        default:"下拉刷新"
      },
    },
    data(){
      return {
        // pullingDownText:"下拉刷新"
        pullingUpText:"上拉加载",
        dropUp:false
      }
    },
    mounted() {
      //保证在DOM渲染完毕后初始化better-scroll
      setTimeout(()=>{
        this._initScroll();
      },20)
    },
    methods: {
      _initScroll(){
        if(!this.$refs.wrapper){
          return;
        }

        // better-scroll的初始化
        this.scroll = new BScroll(this.$refs.wrapper,{
          probeType:this.probeType,
          click:this.click,
          scrollX:this.scrollX,
          /*pullUpLoad:{
            threshold:-70
          }*/
        })

        //是否派发滚动事件
        /*if(this.listenScroll){
          let me = this
          this.scroll.on('scroll',(pos) => {
            console.log(pos.y)
            me.$emit('scroll',pos)
          })
        }*/
        if(this.listenScroll || this.pullingDown || this.pullingUp){
          let me = this
          this.scroll.on('scroll',(pos) => {

            // console.log(pos.y)

            if(20 <= pos.y && pos.y<=30){
              this.dropDown = true
              this.pullingDownText = "下拉刷新"
            }else if(pos.y > 50){
              // alert(0)
              me.pullingDownText = "松开立即刷新"
            }

            if(this.listenScroll){
              me.$emit('scroll',pos)
            }

          })
        }



        //是否派发滚动到底部事件，用于上拉加载
        if(this.pullingUp){
          this.scroll.on('scrollEnd',(pos) => {
            //滚动到底部
            if(this.scroll.y <= (this.scroll.maxScrollY + 50)){
              this.$emit('pullingUp')
            }
          })
        }

        //是否派发顶部下拉事件，用于下拉刷新
        if(this.pullingDown){
          var _this=this
          this.scroll.on('touchEnd',(pos) => {
            //下拉动作
            if(pos.y > 50){
              this.dropDown = false
              this.$emit('pullDown')
            }else{
              this.dropDown = false
            }
          })
        }

        //是否派发列表滚动开始的事件
        if(this.beforeScroll){
          this.scroll.on('beforeScrollStart',() => {
            this.$emit('beforeScroll')
          })
        }
    
      },
      disable(){
        //代理better-scroll的disable方法
        this.scroll && this.scroll.disable()
      },
      enable(){
        // 代理better-scroll的enable方法
        this.scroll && this.scroll.enable()
      },
      refresh(){
        // 代理better-scroll的refresh方法
        this.scroll && this.scroll.refresh()
      },
      scrollTo(){
        // 代理better-scroll的scrollTo方法
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement(){
        // 代理better-scroll的scrollToElement方法
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>

<style scoped lang="less">
.pulldown-tip{
  width: 100%;
  height: 50px;
  background: #eee;
}
</style>
