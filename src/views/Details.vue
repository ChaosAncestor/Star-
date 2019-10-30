<template>
	<div class="details">
		<div class="details-personal">
			<p class="details-top"><i class="details-back" @click="getback"></i><span class="star-name">{{personal.name ? personal.name: namet}}</span></p>
			<div class="details-bottom"><template v-if="ranks"><span class="details-list">{{isranks}}</span><span class="details-number">NO.{{num}}</span></template><span class="details-signature" @click="punch">{{flag ? "已签到":"签到"}}</span></div>
			<img class="details-imgs" :src="personal.dongtai_img_v2" />
		</div>
		<div class="details-alert" v-if="flags"><div class="alert-ok">签到成功</div></div>
		<div class="details-message">
			<div class="message-list fixer">
				<router-link :to="{name:'news',params:{sid}}" tag='div' class="item">
					<div class="item-1"><img class="item-imgs" src="/img/idol_fc_header_logo_bg.png" /></div>
					<div class="message-fonts">时讯</div>
				</router-link>
				<router-link :to="{name:'stroke',params:{sid}}" tag='div' class="item">
					<div class="item-1"><img class="item-imgs" src="/img/ic_xingcheng.png" /></div>
					<div class="message-fonts">行程</div>
				</router-link>
				<router-link :to="{name:'communication',params:{sid}}" tag='div' class="item">
					<div class="item-1"><img class="item-imgs" src="/img/ic_vip_singed_miss_day.png" /></div>
					<div class="message-fonts">聊天</div>
				</router-link>
			</div>
			<keep-alive>
				<router-view class="two-router"></router-view>
			</keep-alive>
		</div>

	</div>
</template>

<script>
	export default {
		props: {
			rank: Number,
			sid: Number,
			nums: Number,
			names: String

		},
		data() {
			return {
				personal: [],
				back: -1,
				num: 0,
				ranks:null,
				flag:false,
				flags:false,
				namet:""
			}
		},
		// watch:{
		// 	rank(){
		// 		return this.rank;
		// 	}
		// },
		computed:{
			isranks(){
				switch (this.ranks){
					case 1:
					return "韩流榜";
					case 2:
					return "华语榜";
					case 3:
					return "总榜";
					case 4:
					return "日娱榜";
					case 5:
					return "新势力榜";
					default:
					return "新势力榜";
				}
			}
		},
		methods: {
			getlistdata() {
				this.$http(
					`/msg/star_combination/${this.sid}.json?`
				).then(res => {
					// console.log(res);
					// console.log(res.data.list);
					if(res.data.list[0]){
						this.personal = res.data.list[0];
					}else{
						// this.personal = 
					}
					
				})
			},
			getback() {
				// this.$router.go(this.back);
				this.$router.push({
					name: 'leaderboard',
					params: {
						ranks:this.rank
					}
				})
			},
			punch(){
				if(!this.flag){
					this.flags = true;
					setTimeout(()=>{
						this.flag = true;
						this.flags = false;
					},1000);
				}
			}
		},
		mounted() {
			this.getlistdata();
			// console.log(this.sid, this.rank, this.nums);
			this.num = this.nums;
			this.ranks = this.rank
			this.namet = this.names
		}
	}
</script>

<style lang="scss">
	.fixer:after {
		content: "";
		display: block;
		height: 0px;
		clear: both;
		visibility: hidden;
	}
	
	.details-alert{
		width: 100%;
		height: 100%;
		background-color:rgba(0,0,0,0.7);
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		margin: 0px auto;
		z-index: 2;
		
		.alert-ok{
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			margin: auto;
			width: 200px;
			height: 100px;
			line-height: 100px;
			background-color: white;
			text-align: center;
			border-radius: 20px;
			font-size: 24px;
			color: pink;
		}	
	}

	.details {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background-color: white;
		z-index: 100;
		background: url('/img/live_vertical_bg.jpg') no-repeat;
		background-size: 100% 100%;
	}

	.details-personal {
		width: 100%;
		height: 30%;

		.details-imgs {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			z-index: -1;
			opacity: 0.7;
		}

		.details-top {
			margin-top: 10px;
			padding: 0px 15px;

			.details-back {
				display: inline-block;
				width: 25px;
				height: 25px;
				background: url('/img/tt_white_lefterbackicon_titlebar.png') no-repeat;
				background-size: 25px 25px;

			}

			.star-name {
				display: inline-block;
				height: 25px;
				line-height: 25px;
				float: right;
				color: white;
			}
		}

		.details-bottom {
			position: absolute;
			top: 100px;
			height: 30px;
			line-height: 30px;
			width: 100%;
			padding: 0px 30px;


			.details-list {
				display: inline-block;
				height: 100%;
				color: white;
				margin-right: 5px;
				font-size: 16px;
			}

			.details-number {
				display: inline-block;
				height: 100%;
				color: yellow;
				font-size: 18px;
			}

			.details-signature {
				text-align: center;
				transform: translateY(25%);
				width: 60px;
				height: 20px;
				line-height: 20px;
				// vertical-align: middle;
				background-color: yellow;
				border-radius: 10px;
				float: right;
				font-size: 12px;
			}
		}
	}

	.details-message {
		width: 100%;
		height: 80%;
		position: absolute;
		right: 0;
		left: 0;
		bottom: 0;
		border-right: 1px #333 solid;
		border-left: 1px #333 solid;
		background-color: white;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}

	.message-list {
		width: 100%;
		height: 60px;
		display: flex;
		text-align: center;
		margin-top: 10px;
		border-bottom: pink 1px solid;

		.item {
			flex: 1;
			color: deeppink;
			font-size: 14px;

			&.active {
				color: skyblue;
			}

			.item-1 {
				height: 35px;

				.item-imgs {
					height: 100%;
				}
			}

			.message-fonts {
				height: 25px;
				line-height: 25px;
			}
		}
	}


	.two-router {
		color: #333;
	}
</style>
