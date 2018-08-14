<template>
	<section class="brand-box">
		<settingHeader :title="title"></settingHeader>
		<div class="search-box">
			<img :src="'./static/images/ss.png'" />
			<input type="text" readonly="readonly" placeholder="搜索" />
		</div>
		<div class="banner-box">
			<img :src="bannerImg" />
		</div>
		<div class="title-box">优质品牌</div>
		<div v-for="(item,index) in list">
			<div class="content-box" :style="{backgroundImage: 'url('+ item.bgImg +')',backgroundSize: 'cover',backgroundrRepeat: 'no-repeat'}">
				<div class="middle">
					<div class="left">
						<img :src="item.logo" />
						<div>
							<p>{{item.text1}}</p>
							<p>{{item.text2}}</p>
						</div>
					</div>
					<div class="right">
						进入
					</div>
					<div class="sjx"></div>
				</div>
			</div>
			<div class="swiper-inner">
				<swiper :options="swiperOption" :id="index" class="swiper">
					<swiper-slide v-for="(i,index) in item.zstList" :key="index" @click.native="toGoodsDetails(i.goodsId)">
						<img :src="i.img" />
						<div class="tip">
							<p class="title">{{i.name}}</p>
							<p class="money">¥ {{i.money}}</p>
						</div>
					</swiper-slide>
					<!--<swiper-slide>
						查看更多
						<img :src="'./static/brand/JT.png'" alt="" />
					</swiper-slide>-->
				</swiper>
			</div>
		</div>
		<div class="pro-allbox">
			<div class="title-box">优质好货</div>
			<div class="item-box">
				<div class="item" v-for="(item,index) in pList" :key="index" @click="toGoodsDetails(item.goodsId)">
					<div class="da-box">
						<img :src="item.img" alt="" />
					</div>
					<p class="title">{{item.title}}</p>
					<p class="price"><span class="jg">¥ {{item.money}}</span></p>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import settingHeader from '../../components/setting_header'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		components: {
			settingHeader,
			swiper,
			swiperSlide
		},
		data() {
			return {
				title: '品牌馆',
				swiperOption: {},
				swiperIndex: 0,
				list: [],
				bannerImg: '',
				rbList: [{
					id: 1,
					bgImg: './static/brand/zst-bg.png',
					logo: './static/brand/zst.png',
					text1: 'Shiseido 资生堂',
					text2: '百年资生堂美丽不变',
					zstList: [{
							name: '爽肤水化妆水肌水乳润滋养露400ml',
							money: '40',
							img: './static/brand/zst_sp1.png',
							goodsId:'lxgoods9820180803324074100'
						},
						{
							name: '惠润鲜花芳香洗发水护发素套装...',
							money: '759',
							img: './static/brand/zst_sp2.png',
							goodsId:'lxgoods9820180803463396325'
						},
						{
							name: '洗颜专科柔澈泡沫温和保湿洁面乳...',
							money: '39',
							img: './static/brand/zst_sp3.png',
							goodsId:'lxgoods9820180803694372095'
						},
						{
							name: '丝蓓绮奢耀柔艳亮泽山茶花洗发水...',
							money: '108',
							img: './static/brand/zst_sp4.png',
							goodsId:'lxgoods9820180803166822605'
						}
					]
				}, {
					id: 2,
					bgImg: './static/brand/hw-bg.png',
					logo: './static/brand/hw.png',
					text1: 'Kao 花王',
					text2: '日本原装 品牌直营',
					zstList: [{
							name: '三倍透气纸尿裤NB90【4包套装】',
							money: '40',
							img: './static/brand/hw_sp1.png',
							goodsId:'lxgoods9820180803438651190'
						},
						{
							name: '热敷蒸汽眼罩睡眠眼罩 14片/盒装',
							money: '89',
							img: './static/brand/hw_sp2.png',
							goodsId:'lxgoods9820180803515353486'
						},
						{
							name: '婴幼儿手口带盖湿纸巾宝宝专用清...',
							money: '46',
							img: './static/brand/hw_sp3.png',
							goodsId:'lxgoods9820180803712727315'
						},
						{
							name: '纸尿裤L54 4包装',
							money: '472',
							img: './static/brand/hw_sp4.png',
							goodsId:'lxgoods9820180803264638952'
						}
					]
				}, {
					id: 3,
					bgImg: './static/brand/sn-bg.png',
					logo: './static/brand/sn.png',
					text1: 'SANA 莎娜',
					text2: '豆乳天然美肌，温和护肤',
					zstList: [{
							name: '豆乳美肌洗面奶 150g',
							money: '68',
							img: './static/brand/sn_sp1.png',
							goodsId:'lxgoods9820180803524589835'
						},
						{
							name: '豆乳美肌化妆水 200ml',
							money: '89',
							img: './static/brand/sn_sp2.png',
							goodsId:'lxgoods9820180803909952765'
						},
						{
							name: '豆乳美肌乳液 150ml',
							money: '86',
							img: './static/brand/sn_sp3.png',
							goodsId:'lxgoods9820180803870710397'
						},
						{
							name: '豆乳美肌眼霜25g',
							money: '88',
							img: './static/brand/sn_sp4.png',
							goodsId:'lxgoods9820180803141940305'
						}
					]
				}],
				hgList: [{
					id: 1,
					bgImg: './static/brand/hg-bg.png',
					logo: './static/brand/hg.png',
					text1: 'WHOO 后',
					text2: '“皇后”的秘诀',
					zstList: [{
							name: 'WHOO后天气丹花献光彩紧颜系列礼盒7件套(333ml)',
							money: '1,540.00',
							img: './static/brand/hg-pr1.png',
							goodsId:'lxgoods9820180803727543574'
						},
						{
							name: 'WHOO后拱辰享 气韵生润颜洁面膏',
							money: '285.00',
							img: './static/brand/hg-pr2.png',
							goodsId:'lxgoods9820180803475973759'
						},
						{
							name: 'WHOO后拱辰享水水沄水乳礼盒6件套(308ml)',
							money: '820.00',
							img: './static/brand/hg-pr3.png',
							goodsId:'lxgoods9820180803798657918'
						},
						{
							name: 'WHOO后拱辰享气韵生润颜系列礼盒7件套（334ml+2g）',
							money: '1,220.00',
							img: './static/brand/hg-pr4.png',
							goodsId:'lxgoods9820180803911126713'
						}
					]
				}, {
					id: 2,
					bgImg: './static/brand/lz-bg.jpg',
					logo: './static/brand/lz.png',
					text1: 'LANEIGE兰芝',
					text2: '唤醒肌肤闪耀之美',
					zstList: [{
							name: 'Laneige兰芝雪纱防晒隔离霜妆前乳 美白裸妆提亮肤色30ml',
							money: '245.00 ',
							img: './static/brand/lz-pr1.jpg',
							goodsId:'lxgoods9820180803731475841'
						},
						{
							name: 'Laneige兰芝补水保湿面膜夜间修护睡眠面膜70ml',
							money: '139.00',
							img: './static/brand/lz-pr2.jpg',
							goodsId:'lxgoods9820180803451720158'
						},
						{
							name: 'Laneige兰芝夜间保湿修护唇膜 保湿滋润 淡化唇纹 唇部护理',
							money: '125.00',
							img: './static/brand/lz-pr3.jpg',
							goodsId:'lxgoods9820180803874100740'
						},
						{
							name: '兰芝小白光气垫BB美白防晒遮瑕持久不易脱妆自然',
							money: '325.00',
							img: './static/brand/lz-pr4.jpg',
							goodsId:'lxgoods9820180803559930059'
						}
					]
				}, {
					id: 3,
					bgImg: './static/brand/ys-bg.jpg',
					logo: './static/brand/ys.jpg',
					text1: 'its skin伊思',
					text2: '蜗牛霜创始者',
					zstList: [{
							name: '韩国正品its skin伊思红参蜗牛BB霜50ml 保湿隔离提亮美白遮瑕',
							money: '118.00',
							img: './static/brand/ys-pr1.jpg',
							goodsId:'lxgoods9820180803343525628'
						},
						{
							name: 'Its skin伊思晶钻蜗牛霜修护补水紧致保湿滋润面霜',
							money: '245.00',
							img: './static/brand/ys-pr2.jpg',
							goodsId:'lxgoods9820180803659286609'
						},
						{
							name: 'Its skin伊思晶钻蜗牛面膜 营养滋润修护焕白保湿补水锁水紧致嫩肤',
							money: '118.00',
							img: './static/brand/ys-pr3.jpg',
							goodsId:'lxgoods9820180803266710346'
						},
						{
							name: 'Its skin伊思晶钻蜗牛再生乳液1号清爽型140ml',
							money: '159.00',
							img: './static/brand/ys-pr4.jpg',
							goodsId:'lxgoods9820180803626095612'
						}
					]
				}],
				oxList: [{
					id: 1,
					bgImg: './static/brand/ojb-bg.jpg',
					logo: './static/brand/ojb.jpg',
					text1: 'BLACKMORES澳佳宝',
					text2: '澳洲天然健康品牌',
					zstList: [{
							name: 'Blackmores 深海鱼油软胶囊400粒澳佳宝欧米伽3中老年澳洲保健品',
							money: '196.00',
							img: './static/brand/ojb-pr1.jpg',
							goodsId:'lxgoods9820180803677574906'
						},
						{
							name: 'Blackmores澳佳宝葡萄糖胺软骨素120片呵护关节健康',
							money: '179.00',
							img: './static/brand/ojb-pr2.jpg',
							goodsId:'lxgoods9820180803810992729'
						},
						{
							name: 'Blackmores/澳佳宝孕妇黄金营养素180粒含叶酸DHA',
							money: '179.00',
							img: './static/brand/ojb-pr3.jpg',
							goodsId:'lxgoods9820180803736595174'
						},
						{
							name: 'Blackmores澳佳宝小白菊偏头痛缓释胶囊60粒CW澳洲大药房',
							money: '169.00',
							img: './static/brand/ojb-pr4.jpg',
							goodsId:'lxgoods9820180803150701686'
						}
					]
				}, {
					id: 2,
					bgImg: './static/brand/ego-bg.jpg',
					logo: './static/brand/ego.jpg',
					text1: 'Ego',
					text2: '专注敏感肌肤护理',
					zstList: [{
							name: 'Ego QV新生婴幼儿润肤保湿霜 宝宝补水儿童润肤霜250g小老虎面霜',
							money: '86.00',
							img: './static/brand/ego-pr1.jpg',
							goodsId:'lxgoods9820180803305241622'
						},
						{
							name: 'ego澳洲进口 婴幼儿童宝宝防晒乳霜sunsense物理防紫外线霜SPF50',
							money: '65.00',
							img: './static/brand/ego-pr2.jpg',
							goodsId:'lxgoods9820180803412279328'
						},
						{
							name: 'ego QV 止汗露腋下去味走珠 爽身除汗滚珠男女士抑汗80g澳洲进口',
							money: '72.00',
							img: './static/brand/ego-pr3.jpg',
							goodsId:'lxgoods9820180803436137777'
						},
						{
							name: 'Ego QV宝宝 沐浴露新生婴儿洗发沐浴二合一儿童250g澳洲进口',
							money: '75.00',
							img: './static/brand/ego-pr4.jpg',
							goodsId:'lxgoods9820180803945391246'
						}
					]
				}, {
					id: 3,
					bgImg: './static/brand/eco-bg.jpg',
					logo: './static/brand/eco.jpg',
					text1: 'eco',
					text2: ' +safer for you',
					zstList: [{
							name: 'ecostore真丝羊毛洗衣液500ml 进口内裤内衣珍贵高档衣物洗涤剂',
							money: '78.00',
							img: './static/brand/eco-pr1.jpg',
							goodsId:'lxgoods9820180803155435698'
						},
						{
							name: 'ecostore天然进口肥皂洗澡香皂沐浴洗脸皂正品羊奶皂80g*6',
							money: '139.00 ',
							img: './static/brand/eco-pr2.jpg',
							goodsId:'lxgoods9820180803777721978'
						},
						{
							name: 'ecostore孕妇洗发水220ml 天然无香洗发露无硅油新西兰进口正品',
							money: '88.00',
							img: './static/brand/eco-pr3.jpg',
							goodsId:'lxgoods9820180803399061728'
						},
						{
							name: 'ecostore玫瑰豆蔻洗手液250ml 天然杀菌抑菌清洁剂新西兰进口',
							money: '62.00 ',
							img: './static/brand/eco-pr4.jpg',
							goodsId:'lxgoods9820180803958366863'
						}
					]
				}],
				mgList: [{
					id: 1,
					bgImg: './static/brand/cc-bg.jpg',
					logo: './static/brand/cc.png',
					text1: 'COACH 蔻驰',
					text2: '蔻驰美式轻奢时尚',
					zstList: [{
							name: '粒面皮革COACH SWAGGER CARRYALL 27手提包',
							money: '5450.00',
							img: './static/brand/cc-pr1.jpg',
							goodsId:'lxgoods9820180803533391970'
						},
						{
							name: 'COACH抛光粒面皮革旋锁链带大手袋',
							money: '3500.00',
							img: './static/brand/cc-pr2.jpg',
							goodsId:'lxgoods9820180803616078604'
						},
						{
							name: 'COACH铬鞣皮革茶玫瑰印花DINKY手袋',
							money: '6500.00',
							img: './static/brand/cc-pr3.jpg',
							goodsId:'lxgoods9820180803302411098'
						},
						{
							name: 'COACH抛光粒面皮革PRAIRIE手提包',
							money: '3500.00',
							img: './static/brand/cc-pr4.jpg',
							goodsId:'lxgoods9820180803277677575'
						}
					]
				}, {
					id: 2,
					bgImg: './static/brand/bs-bg.jpg',
					logo: './static/brand/bs.png',
					text1: 'BOSE',
					text2: '激情动听，从此不受线制',
					zstList: [{
							name: 'BOSE QuietControl 30 无线耳机 蓝牙降噪耳机 进口',
							money: '1939.00',
							img: './static/brand/bs-pr1.jpg',
							goodsId:'lxgoods9820180803854794316'
						},
						{
							name: 'BOSE soundsport wireless无线 蓝牙入耳式 运动耳机',
							money: ' 1059.00',
							img: './static/brand/bs-pr2.jpg',
							goodsId:'lxgoods9820180803497674916'
						},
						{
							name: 'BOSE QUIETCOMFORT35 Ⅱ QC35II 无线降噪蓝牙耳罩式耳机主动降噪',
							money: '2887.00',
							img: './static/brand/bs-pr3.jpg',
							goodsId:'lxgoods9820180803355121669'
						},
						{
							name: 'BOSE SOUNDSPORT PULSE无线运动耳机 测心率蓝牙运动耳机',
							money: '1787.00',
							img: './static/brand/bs-pr4.jpg',
							goodsId:'lxgoods9820180803374878682'
						}
					]
				}, {
					id: 3,
					bgImg: './static/brand/jbl-bg.jpg',
					logo: './static/brand/jbl.png',
					text1: 'JBL',
					text2: '荣获“技术格莱美奖”',
					zstList: [{
							name: 'JBL PULSE3无线蓝牙音响音乐脉动',
							money: '1299.00',
							img: './static/brand/jbl-pr1 (2).jpg',
							goodsId:'lxgoods9820180803356645461'
						},
						{
							name: ' JBL GO音乐金砖无线蓝牙音响音箱音响 家用 进口',
							money: '169.00',
							img: './static/brand/jbl-pr2 (2).jpg',
							goodsId:'lxgoods9820180803700236816'
						},
						{
							name: 'JBL CLIP2 防水蓝牙音响 便携 蓝牙音箱',
							money: '349.00',
							img: './static/brand/jbl-pr3 (2).jpg',
							goodsId:'lxgoods9820180803152388444'
						},
						{
							name: 'JBL CHARGE3无线蓝牙音箱音响户外',
							money: '839.00',
							img: './static/brand/jbl-pr4 (2).jpg',
							goodsId:'lxgoods9820180803823661842'
						}
					]
				}],
				jndList: [{
					id: 1,
					bgImg: './static/brand/goo-bg.jpg',
					logo: './static/brand/goo.png',
					text1: 'Canada Goose',
					text2: '给予温暖 无限可能',
					zstList: [{
							name: 'Canada Goose羽绒服女中长款毛领连帽Expedition',
							money: '12649.00',
							img: './static/brand/goo-pr1.jpg',
							goodsId:'lxgoods9820180803390420721'
						},
						{
							name: 'Canada goose女羽绒服625蓬白鸭绒Shelburne黑标防风毛领',
							money: '12319.00',
							img: './static/brand/goo-pr2.jpg',
							goodsId:'lxgoods9820180803780445275'
						},
						{
							name: 'CanadaGoose加拿大鹅羽绒服男款Selkirk派克大衣3801MA',
							money: '9899.00',
							img: './static/brand/goo-pr3.jpg',
							goodsId:'lxgoods9820180803581086381'
						},
						{
							name: 'CanadaGoose加拿大鹅羽绒服女款Kensington派克大衣2506L',
							money: '11998.00',
							img: './static/brand/goo-pr4.jpg',
							goodsId:'lxgoods9820180803833671632'
						}
					]
				}, {
					id: 2,
					bgImg: './static/brand/ll-bg.jpg',
					logo: './static/brand/ll.png',
					text1: 'Lululemon',
					text2: '加拿大专业运动品牌',
					zstList: [{
							name: 'lululemon丨Energy 女士运动内衣 LW2326C',
							money: '420.00',
							img: './static/brand/ll-pr1.jpg',
							goodsId:'lxgoods9820180803146794215'
						},
						{
							name: 'lululemon丨Align 女士运动长裤 II LW5LJFS',
							money: '850.00',
							img: './static/brand/ll-pr2.jpg',
							goodsId:'lxgoods9820180803132234204'
						},
						{
							name: 'lululemon丨Fast Paced Run 女士运动帽LW9I16C',
							money: '220.00',
							img: './static/brand/ll-pr3.jpg',
							goodsId:'lxgoods9820180803828467663'
						},
						{
							name: 'lululemon丨Swiftly Tech 女士长袖圆领运动 T 恤 LW3MEDC',
							money: '650.00',
							img: './static/brand/ll-pr4.jpg',
							goodsId:'lxgoods9820180803930651311'
						}
					]
				}, {
					id: 3,
					bgImg: './static/brand/sr-bg.jpg',
					logo: './static/brand/sr.png',
					text1: 'SunRype',
					text2: '纯水果制成无添加',
					zstList: [{
							name: 'SunRype儿童宝宝零食加拿大水果条72条婴儿果丹皮无添加一岁以上',
							money: '168.00',
							img: './static/brand/sr-pr1.png',
							goodsId:'lxgoods9820180803491767825'
						},
						{
							name: '2.SunRype水果条儿童宝宝零食果丹皮24条婴儿一岁以上',
							money: '85.00',
							img: './static/brand/sr-pr2.jpg',
							goodsId:'lxgoods9820180803997440406'
						},
						{
							name: 'SunRype桑莱普野莓味水果粒14g*8袋 儿童宝宝零食 天然辅食',
							money: '49.00',
							img: './static/brand/sr-pr3.png',
							goodsId:'lxgoods9820180803662658490'
						},
						{
							name: 'SunRype桑莱普香蕉草莓味水果粒14g*8袋 儿童宝宝零食',
							money: '49.00',
							img: './static/brand/sr-pr4.jpg',
							goodsId:'lxgoods9820180803491767825'
						}
					]
				}],
				dgList: [{
					id: 1,
					bgImg: './static/brand/bm-bg.jpg',
					logo: './static/brand/bm.png',
					text1: 'PUMA 彪马',
					text2: 'Forever Faste',
					zstList: [{
							name: 'Puma彪马 休闲运动小白鞋',
							money: '1.549.00',
							img: './static/brand/bm-pr1.jpg',
							goodsId:'lxgoods9820180803259371578'
						},
						{
							name: 'PUMA小花情侣男女休闲短袖T恤',
							money: '299.00',
							img: './static/brand/bm-pr2.jpg',
							goodsId:'lxgoods9820180803660528483'
						},
						{
							name: 'PUMA彪马Contrast JKT 立领休闲运动防水外套',
							money: '599.00',
							img: './static/brand/bm-pr3.png',
							goodsId:'lxgoods9820180803961978813'
						},
						{
							name: 'PUMA 彪马18春男女运动条纹拼接袜子',
							money: '160.00',
							img: './static/brand/bm-pr4.png',
							goodsId:'lxgoods9820180803363940201'
						}
					]
				}, {
					id: 2,
					bgImg: './static/brand/boss-bg.jpg',
					logo: './static/brand/boss.jpg',
					text1: 'BOSS',
					text2: '成功自信，出众超群',
					zstList: [{
							name: 'BOSS修身版新羊毛珠边缝线外套Hayes_cyl',
							money: '6,000.00',
							img: './static/brand/boss-pr1.jpg',
							goodsId:'lxgoods9820180803436743652'
						},
						{
							name: 'BOSS常规版常规版棉质商务衬衫',
							money: '1,300.00',
							img: './static/brand/boss-pr2.jpg',
							goodsId:'lxgoods9820180803251645884'
						},
						{
							name: 'BOSS常规版弹力棉logo T恤',
							money: '1,000.00',
							img: './static/brand/boss-pr3.jpg',
							goodsId:'lxgoods9820180803428868281'
						},
						{
							name: 'BOSS修身版条纹丝光棉polo衫',
							money: '1,200.00',
							img: './static/brand/boss-pr4.jpg',
							goodsId:'lxgoods9820180803192056693'
						}
					]
				}, {
					id: 3,
					bgImg: './static/brand/ne-bg.jpg',
					logo: './static/brand/ne.png',
					text1: 'NIVEA妮维雅',
					text2: '欧洲家庭信赖选择',
					zstList: [{
							name: '妮维雅大蓝罐面霜润肤霜身体乳女250mlCosme全家修复补水保湿滋润',
							money: '69.00',
							img: './static/brand/ne-pr1.png',
							goodsId:'lxgoods9820180803900166687'
						},
						{
							name: 'Nivea 妮维雅美白润肤乳液身体乳春夏补水保湿嫩滑400ml',
							money: ' 69.00',
							img: './static/brand/ne-pr2.jpg',
							goodsId:'lxgoods9820180803150913752'
						},
						{
							name: '妮维雅防晒乳液透亮水感防晒啫喱spf50清爽凝露女40ml',
							money: '53.00',
							img: './static/brand/ne-pr3.jpg',
							goodsId:'lxgoods9820180803908673593'
						},
						{
							name: '妮维雅男士洗面奶控油祛痘祛黑头深层清洁保湿洁面泥150ml*2',
							money: '76.00',
							img: './static/brand/ne-pr4.jpg',
							goodsId:'lxgoods9820180803948019842'
						}
					]
				}],
				ydlList: [{
					id: 1,
					bgImg: './static/brand/gc-bg.jpg',
					logo: './static/brand/gc.png',
					text1: 'GUCCI',
					text2: 'My Good Life',
					zstList: [{
							name: 'GUCCI Sylvie系列皮革迷你链条手袋',
							money: '17,900',
							img: './static/brand/gc-pr1.jpg',
							goodsId:'lxgoods9820180803673186544'
						},
						{
							name: 'GUCCI水晶G皮革中跟浅口鞋',
							money: '9,600',
							img: './static/brand/gc-pr2.jpg',
							goodsId:'lxgoods9820180803703417290'
						},
						{
							name: 'Animalier长款钱包',
							money: '5,700',
							img: './static/brand/gc-pr3.jpg',
							goodsId:'lxgoods9820180803361712153'
						},
						{
							name: '老虎切丝保龄球衫',
							money: '7,350',
							img: './static/brand/gc-pr4.jpg',
							goodsId:'lxgoods9820180803418216032'
						}
					]
				}, {
					id: 2,
					bgImg: './static/brand/fl-bg.jpg',
					logo: './static/brand/fl.png',
					text1: 'FILA',
					text2: '传承百年运动基因',
					zstList: [{
							name: 'FILA斐乐破坏者2代女鞋街头潮流新品复古拼接时尚皮面潮鞋运动鞋',
							money: '1152.00',
							img: './static/brand/fl-pr1.jpg',
							goodsId:'lxgoods9820180803822405463'
						},
						{
							name: 'FILA斐乐男帽2018新款棒球帽透气时尚潮流运动帽男',
							money: '252.00',
							img: './static/brand/fl-pr2.jpg',
							goodsId:'lxgoods9820180803670092548'
						},
						{
							name: 'FILA斐乐手表男女情侣表时尚潮流运动大表盘腕表石英表162',
							money: ' 669.00',
							img: './static/brand/fl-pr3.jpg',
							goodsId:'lxgoods9820180803440469796'
						},
						{
							name: 'FILA斐乐男T恤2018夏季新品短袖T男时尚简约LOGO运动T恤男',
							money: '289.00',
							img: './static/brand/fl-pr4.jpg',
							goodsId:'lxgoods9820180803540288979'
						}
					]
				}, {
					id: 3,
					bgImg: './static/brand/kk-bg.jpg',
					logo: './static/brand/kk.png',
					text1: 'KIKO',
					text2: '品质不再是高价的同义词',
					zstList: [{
							name: '意大利KIKO新款小黑管口红 豆沙色4系 持久保湿不脱色唇膏',
							money: '49.00',
							img: './static/brand/kk-pr1.jpg',
							goodsId:'lxgoods9820180803967179011'
						},
						{
							name: 'KIKO镜面3D唇釉当季热门唇彩 滋润保湿不黏腻',
							money: '95.00',
							img: './static/brand/kk-pr2.jpg',
							goodsId:'lxgoods9820180803195338918'
						},
						{
							name: 'KIKO水波纹单色眼影干湿两用 显色持久不晕染大地色人鱼姬',
							money: '99.00',
							img: './static/brand/kk-pr3.jpg',
							goodsId:'lxgoods9820180803580445710'
						},
						{
							name: '4.KIKO四色烘焙眼影干湿两用 哑光珠光色彩丰富易上色',
							money: '169.00',
							img: './static/brand/kk-pr4.jpg',
							goodsId:'lxgoods9820180803573817386'
						}
					]
				}],
				fgList: [{
					id: 1,
					bgImg: './static/brand/lf-bg.jpg',
					logo: './static/brand/lf.png',
					text1: 'ASC 拉菲',
					text2: '创造安全 感受安心',
					zstList: [{
							name: '拉菲ASC法国进口红酒徽纹干红葡萄酒整箱6支装AOC',
							money: '699.00',
							img: './static/brand/lf-pr1.jpg',
							goodsId:'lxgoods9820180803991496025'
						},
						{
							name: '拉菲ASC智利进口小瓶红酒巴斯克干红葡萄酒整箱装187ml',
							money: '199.00',
							img: './static/brand/lf-pr2.jpg',
							goodsId:'lxgoods9820180803734369103'
						},
						{
							name: '拉菲ASC法国进口红酒传奇波尔多AOC干红葡萄酒6支整箱',
							money: '528.00',
							img: './static/brand/lf-pr3.jpg',
							goodsId:'lxgoods9820180803152011352'
						},
						{
							name: '拉菲ASC进口红酒珍藏波尔多AOC干红葡萄酒6支整箱原瓶正品',
							money: '699.00',
							img: './static/brand/lf-pr4.jpg',
							goodsId:'lxgoods9820180803751120283'
						}
					]
				}, {
					id: 2,
					bgImg: './static/brand/kdy-bg.jpg',
					logo: './static/brand/kdy.png',
					text1: 'Cartier 卡地亚',
					text2: '清醒气息迷人芬芳',
					zstList: [{
							name: 'LOVE手镯，镶嵌4颗钻石18K',
							money: '76,000',
							img: './static/brand/kdy-pr1.png',
							goodsId:'lxgoods9820180803778352378'
						},
						{
							name: 'LOVE项链18K玫瑰金',
							money: '16,200',
							img: './static/brand/kdy-pr2.png',
							goodsId:'lxgoods9820180803826269778'
						},
						{
							name: 'TANK SOLO腕表',
							money: '18,000',
							img: './static/brand/kdy-pr3.png',
							goodsId:'lxgoods9820180803191999308'
						},
						{
							name: 'TRINITY手镯',
							money: '4,300',
							img: './static/brand/kdy-pr4.png',
							goodsId:'lxgoods9820180803483011396'
						}
					]
				}, {
					id: 3,
					bgImg: './static/brand/xne-bg.jpg',
					logo: './static/brand/xne.png',
					text1: 'CHANEL 香奈儿',
					text2: '独一无二精致工艺',
					zstList: [{
							name: '香奈儿 Chanel Gabrielle嘉柏丽尔女士淡香精',
							money: ' 889.00 ',
							img: './static/brand/xne-pr1.jpg',
							goodsId:'lxgoods9820180803779357838'
						},
						{
							name: 'Chanel香奈儿Bleu蔚蓝男士淡香水50 100ml持久木质香',
							money: ' 555.00 ',
							img: './static/brand/xne-pr2.jpg',
							goodsId:'lxgoods9820180803976672974'
						},
						{
							name: 'Chanel 香奈儿粉色邂逅淡香水EDT 柔情浪漫 女士香雾 50/100ml',
							money: ' 699.00',
							img: './static/brand/xne-pr3.jpg',
							goodsId:'lxgoods9820180803326878803'
						},
						{
							name: 'Chanel 香奈儿COCO NOIR可可小姐黑色女士香水50ml',
							money: '4.868.00',
							img: './static/brand/xne-pr4.jpg',
							goodsId:'lxgoods9820180803747529109'
						}
					]
				}],
				ygList: [{
					id: 1,
					bgImg: './static/brand/bbl-bg.jpg',
					logo: './static/brand/bbl.jpg',
					text1: 'BURBERRY 博柏利',
					text2: '可清新可优雅的风格',
					zstList: [{
							name: 'BURBERRY 博柏利男士巴宝莉春夏时尚商务休闲长袖衬衫CAMBRIDGE',
							money: ' 1607.00',
							img: './static/brand/bbl-pr1.jpg',
							goodsId:'lxgoods9820180803445064955'
						},
						{
							name: 'BURBERRY 博柏利男士2018新款商务短袖衬衫',
							money: '2288.00',
							img: './static/brand/bbl-pr2.jpg',
							goodsId:'lxgoods9820180803670473976'
						},
						{
							name: 'BURBERRY巴宝莉英国皇室品牌情侣款羊绒围巾 MU HALF MEGA CHECK',
							money: '4189.00',
							img: './static/brand/bbl-pr3.jpg',
							goodsId:'lxgoods9820180803669004457'
						},
						{
							name: 'BURBERRY 博柏利 男士海军蓝/黑色 皮革装饰烟熏格纹公文包',
							money: '6999.00',
							img: './static/brand/bbl-pr4.jpg',
							goodsId:'lxgoods9820180803642544172'
						}
					]
				}, {
					id: 2,
					bgImg: './static/brand/lhlh-bg.jpg',
					logo: './static/brand/lhlh.jpg',
					text1: 'Unilever 联合利华',
					text2: '让生活更美好',
					zstList: [{
							name: '凡士林美白身体乳保湿滋润香体持久全身补水润肤乳400ml女烟酰胺',
							money: '55.00',
							img: './static/brand/lhlh-pr1.jpg',
							goodsId:'lxgoods9820180803226781950'
						},
						{
							name: 'Dove 多芬氨基酸洁面泡泡慕斯泡沫洗面奶洁面乳160ml*2',
							money: '79.00',
							img: './static/brand/lhlh-pr2.jpg',
							goodsId:'lxgoods9820180803558657663'
						},
						{
							name: 'Ponds 旁氏魔力定妆控油BB粉-粉嫩闪亮50g 遮瑕提亮 控油吸汗',
							money: '19.00 ',
							img: './static/brand/lhlh-pr3.jpg',
							goodsId:'lxgoods9820180803843623683'
						},
						{
							name: '力士植萃纯净无硅油洗发水护发素套装450g*2 受损修复',
							money: '129.00 ',
							img: './static/brand/lhlh-pr4.jpg',
							goodsId:'lxgoods9820180803183221049'
						}
					]
				}, {
					id: 3,
					bgImg: './static/brand/choo-bg.jpg',
					logo: './static/brand/choo.png',
					text1: 'JIMMY CHOO',
					text2: '自信尊贵时尚生活品牌',
					zstList: [{
							name: 'Jimmy Choo Romy 85系列女士高跟鞋',
							money: '5,150',
							img: './static/brand/choo-pr1.jpg',
							goodsId:'lxgoods9820180803849343258'
						},
						{
							name: 'Jimmy Choo Kelly 100系列女士高跟鞋',
							money: '6,890',
							img: './static/brand/choo-pr2.jpg',
							goodsId:'lxgoods9820180803441928089'
						},
						{
							name: 'Jimmy Choo MISCHA 85系列女士高跟鞋',
							money: '8,090',
							img: './static/brand/choo-pr3.jpg',
							goodsId:'lxgoods9820180803916192962'
						},
						{
							name: 'Jimmy Choo MISTY 120系列女士高跟鞋',
							money: '5,750',
							img: './static/brand/choo-pr4.jpg',
							goodsId:'lxgoods9820180803983553629'
						}
					]
				}],
				pList: [{
						img: './static/brand/pr1.png',
						title: '三倍透气纸尿裤NB90【4包套装】',
						money: '40.00',
						goodsId:'lxgoods9820180803438651190'
					}, {
						img: './static/brand/pr2.png',
						title: '爽肤水化妆水肌水乳润滋养露400ml',
						money: '40.00',
						goodsId:'lxgoods9820180803324074100'
					},
					{
						img: './static/brand/pr3.png',
						title: 'ESTĒE LAUDER 雅诗兰黛 小棕瓶面部精华 特...',
						money: '688.00',
						goodsId:'lxgoods9820180801304655402'
					}, {
						img: './static/brand/pr4.png',
						title: 'Blackmores 深海鱼油软胶囊400粒澳佳宝欧米...',
						money: '196.00',
						goodsId:'lxgoods9820180814865643230'
					},
					{
						img: './static/brand/pr5.png',
						title: 'Swarovski 施华洛世奇 女士Iconic Swan黑天鹅…',
						money: '880.00',
						goodsId:'lxgoods9820180813169898400'
					},
					{
						img: 'http://domain.cgc999.com:8080/group1/M00/00/4E/rBL0CFtj_OGACJ1kAABU2IA7fSM913.jpg',
						title: 'FILA斐乐手表男女情侣表时尚潮流运动大表盘腕表石英表162',
						money: '669.00',
						goodsId:'lxgoods9820180803440469796'
					},
					{
						img: './static/brand/pr7.png',
						title: 'ESTĒE LAUDER 雅诗兰黛 小棕瓶面部精华 特...',
						money: '688.00',
						goodsId:'lxgoods9820180801304655402'
					},
					{
						img: './static/brand/pr8.png',
						title: 'Blackmores 深海鱼油软胶囊400粒澳佳宝欧米...',
						money: '196.00',
						goodsId:'lxgoods9820180814865643230'
					}
				],
			}
		},
		mounted() {

			var _this = this

			this.swiperOption = {
				slidesPerView: 'auto',
				autoplay: false,
				freeModeMomentum: true,
				on: {
					touchEnd: function(event) {
						if(this.istr) {
							_this.change(this.el.id) //获取ID  ID代表滑动了那个swiper
						}
					},
					setTranslate: function(translate) { //偏移量
						if(translate < -180) {
							this.istr = true
						} else {
							this.istr = false
						}
					}
				},
			}

			if(this.$route.query.index == 0) {
				this.list = this.hgList
				document.title = '韩国馆'
				this.bannerImg = './static/brand/hg-banner.png'
			} else if(this.$route.query.index == 1) {
				this.list = this.rbList
				document.title = '日本馆'
				this.bannerImg = './static/brand/riben-banner.png'
			} else if(this.$route.query.index == 2) {
				this.list = this.oxList
				document.title = '澳新馆'
				this.bannerImg = './static/brand/ox-banner.png'
			} else if(this.$route.query.index == 3) {
				this.list = this.mgList
				document.title = '美国馆'
				this.bannerImg = './static/brand/meiguo-banner.png'
			} else if(this.$route.query.index == 4) {
				this.list = this.jndList
				document.title = '加拿大馆'
				this.bannerImg = './static/brand/jnd-banner.png'
			} else if(this.$route.query.index == 5) {
				this.list = this.dgList
				document.title = '德国馆'
				this.bannerImg = './static/brand/deguo-banner.png'
			} else if(this.$route.query.index == 6) {
				this.list = this.ydlList
				document.title = '意大利馆'
				this.bannerImg = './static/brand/yidali-banner.png'
			} else if(this.$route.query.index == 7) {
				this.list = this.fgList
				document.title = '法国馆'
				this.bannerImg = './static/brand/faguo-banner.png'
			} else if(this.$route.query.index == 8) {
				this.list = this.ygList
				document.title = '英国馆'
				this.bannerImg = './static/brand/yingguo-banner.png'
			}
		},
		methods: {
			change(index) {
				console.log(index)
			},
			toGoodsDetails(goodsId) {
				var _this = this
				_this.$router.push({
					path: '/multi_user_mall/commodity_details',
					query: {
						goodsId: goodsId
					}
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.brand-box {
		background-color: #F5F6FA;
		.search-box {
			height: 1rem;
			padding: 0.16rem 0.30rem;
			box-sizing: border-box;
			background: rgba(255, 255, 255, 1);
			position: relative;
			input {
				width: 100%;
				height: 100%;
				background: rgba(26, 38, 66, 0.08);
				border-radius: 4px;
				text-align: center;
				font-size: 0.24rem;
				font-family: PingFangSC-Regular;
				color: rgba(144, 162, 199, 1);
			}
			input::-webkit-input-placeholder {
				color: #90A2C7;
			}
			input:-moz-placeholder {
				color: #90A2C7;
			}
			img {
				width: 0.30rem;
				height: 0.30rem;
				position: absolute;
				top: 50%;
				left: 43%;
				transform: translate(-43%, -50%);
			}
		}
		.banner-box {
			height: 2.88rem;
			overflow: hidden;
			img {
				width: 100%;
				height: auto;
				display: block;
			}
		}
		.title-box {
			height: 1.02rem;
			line-height: 1.02rem;
			text-align: center;
			font-size: 0.38rem;
			font-family: PingFangSC-Regular;
			color: rgba(34, 34, 34, 1);
			background: rgba(255, 255, 255, 1);
		}
		.content-box {
			height: 2.7rem;
			margin-top: 0.20rem;
			position: relative;
			.middle {
				display: flex;
				align-items: center;
				justify-content: space-between;
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				z-index: 15;
				padding: 0.78rem 0.48rem 0.72rem 0.44rem;
				box-sizing: border-box;
				.left {
					display: flex;
					img {
						width: 1.20rem;
						height: 1.20rem;
						margin-right: 0.16rem;
					}
					div {
						display: flex;
						justify-content: center;
						flex-direction: column;
						p:nth-child(1) {
							font-size: 0.28rem;
							font-family: PingFangSC-Medium;
							color: rgba(255, 255, 255, 1);
							margin-bottom: 0.08rem;
						}
						p:nth-child(2) {
							font-size: 0.28rem;
							font-family: PingFangSC-Regular;
							color: rgba(255, 255, 255, 1);
						}
					}
				}
				.right {
					width: 1.24rem;
					height: 0.46rem;
					line-height: 0.46rem;
					text-align: center;
					border-radius: 13px;
					border: 1px solid rgba(255, 255, 255, 1);
					font-size: 0.22rem;
					font-family: PingFangSC-Medium;
					color: rgba(255, 255, 255, 1);
				}
				.sjx {
					position: absolute;
					left: 0.87rem;
					bottom: 0;
					width: 0;
					height: 0;
					border: 0.17rem solid;
					border-color: transparent transparent white transparent;
				}
			}
		}
		.content-box:after {
			width: 100%;
			height: 100%;
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			z-index: 10;
		}
		.content-box:before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 1);
			opacity: 0.5995;
			z-index: 11;
		}
		.swiper-inner {
			padding: 0.10rem 0rem 0 0.20rem;
			box-sizing: border-box;
			.swiper-slide {
				width: 2.20rem;
				height: 3.47rem;
				margin-right: 0.10rem;
				background-color: white;
				display: flex;
				flex-direction: column;
				align-items: center;
				img {
					width: 2.20rem;
					height: 2.20rem;
					margin-right: 0.05rem;
				}
				.tip {
					flex: 1;
					padding: 0.12rem;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.title {
						font-size: 0.24rem;
						font-family: PingFangSC-Regular;
						color: rgba(34, 34, 34, 1);
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					.money {
						font-size: 0.26rem;
						font-family: PingFangSC-Semibold;
						color: rgba(242, 48, 48, 1);
					}
				}
			}
			/*.swiper-slide:last-child {
				width: 0.90rem;
				height: 3.48rem;
				writing-mode: tb-rl;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: transparent;
				margin-right: 0;
				font-size: 0.24rem;
				font-family: PingFangSC-Regular;
				color: rgba(115, 134, 173, 1);
				letter-spacing: 2px;
				img {
					width: 0.20rem;
					height: 0.20rem;
				}
			}*/
		}
		.pro-allbox {
			padding: 0.20rem 0;
			.title-box {
				margin-bottom: 0.10rem;
			}
			.item-box {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				padding: 0 0.1rem;
				.item {
					width: 3.62rem;
					margin-bottom: 0.06rem;
					background-color: white;
					position: relative;
					.po-img {
						position: absolute;
						top: 0;
						left: 0;
						img {
							width: 1.28rem;
							height: 0.4rem;
						}
					}
					.da-box {
						height: 3.62rem;
						overflow: hidden;
						img {
							width: 100%;
							height: auto;
						}
					}
					.title {
						width: 100%;
						box-sizing: border-box;
						padding: 0 0.17rem;
						font-size: 0.26rem;
						font-family: PingFangSC-Regular;
						color: rgba(34, 34, 34, 1);
						height: 0.76rem;
						line-height: 0.38rem;
						margin-top: 0.1rem;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					.price {
						padding: 0.13rem 0.17rem 0.28rem 0.17rem;
						.jg {
							font-size: 0.28rem;
							font-family: PingFangSC-Semibold;
							color: rgba(242, 48, 48, 1);
						}
						.zf {
							font-size: 0.28rem;
							font-family: PingFangSC-Medium;
							color: rgba(51, 111, 255, 1);
							.f20 {
								font-size: 0.20rem;
								font-family: PingFangSC;
								color: rgba(51, 111, 255, 1);
							}
						}
					}
				}
			}
		}
	}
</style>