<template>
	<div class="preson">
		<div class="preson-message">个人信息</div>
		<div class="presonv-div1">
			<div class="presonv-img">
				<img class="imgs" :src="flags ? '/img/bg.png':'/img/timg.jpg'" />
			</div>
			<div class="presonv-text" @click="login">{{flags ? name:'登录/注册'}}</div>
		</div>

		<div class="presonv-div2">
			<div class="presonv-msg" v-for="(item,index) in list" :key='index'>
				<p class="msg-content">{{item}}</p>
				<p class="msg-j">></p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			flags: Boolean
		},
		data() {
			return {
				list: ['消息通知', '字体大小', '帮助中心', '设置', '反馈', '关于我们'],
				flag: false,
				name: "哈哈哈"
			}
		},
		
		methods: {
			login() {
				this.$emit('btn');
			}
		},
		// created() {
  //             this.flag = this.$route.params.flags;
		// 	console.log("久的", this.$route.params.flags);
		// },
		// mounted() {
		// 	this.flags = this.flag
		// 	console.log(this.flags);
		// },
		// beforeRouteUpdate (to, from, next) {
		// 	this.flags = this.flag;
		// next();
		// },
	}
</script>

<style lang="scss">
	.preson {
		background-color: rgba(201, 201, 201, 0.2)
	}

	.preson-message {
		width: 100%;
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #fff;
		text-align: center;
		background-color: pink;
		color: white;
		font-weight: 500;
		font-size: 16px;
	}

	.presonv-div1 {
		width: 100%;
		height: 200px;
		background-color: pink;

		.presonv-img {
			width: 100%;
			height: 140px;
			display: flex;
			align-items: center;
			justify-content: center;

			.imgs {
				width: 100px;
				height: 100px;
				border-radius: 50%;
				background-color: white;
			}
		}

		.presonv-text {
			height: 60px;
			line-height: 60px;
			text-align: center;
			color: white;
			font-size: 22px;
			font-weight: 300;
		}
	}

	.presonv-div2 {
		height: 385px;
		// border: #B0E2FF 1px solid;
		width: 100%;
		margin-top: 5px;
		background-color: white;
		padding: 0px 20px;

		.presonv-msg {
			height: 40px;
			height: 40px;
			line-height: 40px;
			display: flex;
			border-bottom: 1px rgba(201, 201, 201, 0.5) solid;
			margin-bottom: 20px;

			.msg-content {
				flex: 1;

			}

			.msg-j {
				flex: 0 0 40px;
				text-align: center;
				font-size: 20px;
				color: gainsboro;
			}

		}
	}
</style>
