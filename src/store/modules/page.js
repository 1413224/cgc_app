var isLogin = localStorage['isLogin']
var userInfo = {}
if(localStorage['userInfo']){
	userInfo = JSON.parse(localStorage['userInfo'])
}
const page = {
	state: {
		direction: 'forward',
		addressData: '',
		isLoading: false,
		back: false,
		isLogin: isLogin,
		includeList:[],
		ispreview:false,
		isWx:true,
		userInfo:userInfo
	},
	mutations: {
		UPDATE_DIRECTION(state, payload) {
			state.direction = payload.direction
		},
		UPDATE_DACK(state, payload) {
			state.back = payload.back
		},
		UPDATE_LOADING(state, isLoading) {
			state.isLoading = isLoading
		},
		UPDATE_USER_INFO(state, userInfo){
			state.userInfo = userInfo
		},
		setIsLogin(state,isLogin){
			state.isLogin = isLogin
		}
	}
}
export default page