/*
一个中间突出的tabbar
*/
<template >
	<view class="flex-sb tabbar-container" >
		<view class="tabItem" v-for="item of tabBarRoute" :class="[item.centerItem ? 'center-item' : '']" @click="changeItem(item)">
			<view class="tab-top">
				<image :src="currentItem == item.id?item.selectIcon:item.icon" mode=""></image>
			</view>
			<view class="item-bottom" :class="[currentItem==item.id ? 'item-active' : '']">
				<text>{{item.text}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			currentPage: {
				type: Number,
				default: 0
			}

		},
		data() {
			return {
				currentItem: 0,
				tab:true,
				tabBarRoute: [{
						id: 0,
						path: "/pages/index/index",
						icon: "/static/images/tabbarPages/home.png",
						selectIcon: "/static/images/tabbarPages/home-active.png",
						text: "首页",
						centerItem: false
					},
					{
						id: 1,
						path: "/pages/index/index",
						icon: "/static/images/tabbarPages/add.png",
						selectIcon: "/static/images/tabbarPages/addactive.png",
						text: "",
						centerItem: true
					},
					{
						id: 2,
						path: "/pages/mine/mine",
						icon: "/static/images/tabbarPages/mine.png",
						selectIcon: "/static/images/tabbarPages/mine-active.png",
						text: "我的",
						centerItem: false
					}
				]
			};
		},
		created() {
			
		},	
		mounted() {
			
			this.currentItem = this.currentPage;
			console.log(this.currentPage)
			uni.hideTabBar(); //隐藏原生tabbar
		},
		
		methods:{
			
			changeItem(item){
				
				this.currentItem = item.id;
				console.log(item)
				uni.switchTab({
					url:item.path
				})
			}
		}
	}
</script>

<style lang="scss">
	.tabbar-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 110rpx;
		box-shadow: 0 0 5px #999;
		display: flex;
		align-items: center;
		padding: 5rpx 30rpx;
		color: #999999;

		.tabItem {
			margin: 0 40rpx;
		}

		.item-active {
			color: #E64340;
		}
	}

	.tab-top {
		width: 60rpx;
		height: 60rpx;
		padding: 10rpx;
	}

	.tab-top image {
		width: 100%;
		height: 100%;
	}

	.center-item {
		flex-shrink: 0;
		margin: 0 !important;
		width: 90rpx;
		height: 90rpx;
		position: absolute;
		top: -30rpx;
		left: calc(50% - 40rpx);
		border-radius: 50%;
		box-shadow: 0 0 5px #999;
		background-color: #ffffff;

		image {
			width: 70rpx;
			height: 70rpx;
		}
	}

	.item-bottom {
		font-size: 28rpx;
		width: 100%;
		text-align: center;

	}
</style>
