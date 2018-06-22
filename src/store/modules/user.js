import {base64_encode,base64_decode} from '../../global/course.js'
let info=base64_decode(localStorage['_HASH_'])
if(info){
  var userid = info.id
}else{
  var userid = " "
}
const user = {
    state: {
        username: null,
        userstate: false,
        userId:userid,
        openid:"",
        token:"",
        accessCode:""
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