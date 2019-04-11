import {base64_encode,base64_decode} from '../../global/course.js'
let info=base64_decode(localStorage['_HASH_'])
// console.log(info)
var userid
var token
if(info){
  userid = info.userId
  token = info.token
  // console.log(userid)
}else{
  userid = " "
}
const user = {
    state: {
        username: null,
        userstate: false,
        // userId:userid,
        // userId:1,
        id:userid,
        userId:userid,
        openid:"",
        token:token,
        accessCode:"",
        showDefaultNav:true,
        menuId:"001",  //自定义菜单id
        shopMenuId:"002",  //自定义店铺菜单
        platformMenuId:"001",//行业平台菜单id
        shoePlatformMenu:false
    },
  
    mutations: {
        //提交用户信息方法，state是当前vuex实例下user的state，
        //newUserInfo是触发SET_USERINFO方法时的入参
        SET_USER: (state, newUser) => {
          state = newUser;
          console.log('登录成功后，用户为:',state)
        },
        getOpenId:(state,openid) => {
          state.openid = openid
        },

        getParams:(state,params) => {
          state.openid = params.openId
          state.userid = params.userId
          state.accessCode = params.randomAccessCode
          state.token = params.token
        },
        setUid:(state,param) => {
          state.userId = param
        },
        changeMenuId:(state,id) => {
          state.menuId = id
        },
        changeShopMenuId:(state,id) => {
          state.shopMenuId = id
        },
        changeShowDefaultNav:(state,bool)=>{
          state.showDefaultNav = bool
        },
        changePlatformId:(state,id) => {
          state.platformMenuId = id
          state.shoePlatformMenu = true
        }
      },
      //Action 通过 store.dispatch 方法触发
      actions: {
        //newUserInfo为自己的传参
        setUser({ dispatch,commit, state},newUser){
          console.log('用户数据入参：',newUser)
          commit('SET_USER',newUser)
        }
      } 
  };
  
  export default user;