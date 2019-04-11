var isLogin = localStorage['isLogin'] ? localStorage['isLogin'] : false
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
		isWx:true,
		userInfo:userInfo,
		toPath:{}
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
		},
		setToPath(state,toPath){
			state.toPath = toPath
		}
	}
}
export default page