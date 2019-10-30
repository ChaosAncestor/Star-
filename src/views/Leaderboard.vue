<template>
	<div class="leaderboard">
		<div class="guard">
			<h1 class="guardian">爱豆守护榜</h1>
			<ul class="guardlist">
				<li class="guardlist-li" v-for="(item,index) in list" :class="{liactive:currertindex==index}" :key="index" @click="Switchbtn(index,item.rank_type)">{{item.rankName}}</li>
			</ul>
		</div>
		<Ceshi :rank="rank"></Ceshi>
		<div class="guard-float" @click="seach"></div>
		<router-view></router-view>
		<div class="leaderboard-seach" v-if="flag">
			<el-input class="leaderboard-input" v-model="input" placeholder="请输入内容"></el-input>
			<el-button class="leaderboard-btn" type="success" @click='success'>搜索</el-button>
			<div class="leaderboard-div">
				<div class="leaderboard-adou">
					<div class="adou-list" v-for="(item,index) in aidou" :key="index" @click="toldetails(item.sid,item._id)">
						<img class="adou-imgs" :src="item.logo_img" /><span class="adou-names">{{item.name}}</span></div>
				</div>
			</div>

			<div class="adou-x" @click="romve"><span>x</span></div>
		</div>
	</div>
</template>

<script>
	import Ceshi from '../components/Ceshi.vue';
	export default {
		props:{
			ranks:Number
		},
		data() {
			return {
				list: [],
				currertindex: 0,
				rank: 3,
				flag: false,
				aidou: [],
				input: '',
				names: ''
			}
		},
		components: {
			Ceshi
		},
		methods: {
			getlistdata() {
				this.$http(
					'/api/api_mobile_star_rank.php?action=get_all_rank_list_desc&version=214&channelId=S00100&unique_id=76150360DA02A43D26BF23F1C9F217DC'
				).then(res => {
					this.list = res.data.rankDesc.slice(0, 5);
					// console.log(this.list);
				})
			},
			getseachdata(name) {
				this.$http(
					`/ids/star_search_v2.php?&word=${name}&platform=all`
				).then(res => {
					console.log(res.data.idolstar.list);
					this.aidou = res.data.idolstar.list;
				})
			},
			Switchbtn(num, item) {
				this.currertindex = num;
				this.rank = item;
			},
			seach() {
				this.flag = !this.flag;
			},
			success() {
				if (!this.input) {
					return;
				}
				var inp = this.input.split(" ").join("");
				// console.log(inp);
				this.input = "";
				this.getseachdata(inp);
			},
			toldetails(sid, _id) {
				// console.log(sid, _id);
				this.$router.push({
					name: 'details',
					params: {
						sid,
						_id
					}
				});
			},
			romve(){
				this.flag = !this.flag;
			}
		},

		mounted() {
			this.getlistdata();

		}
	}
</script>
<style lang="scss" scoped>
	.guardian {
		width: 100%;
		height: 30px;
		line-height: 30px;
		font-weight: bold;
	}

	.guard {
		background-color: deeppink;
		text-align: center;
		color: white;

		.guardian {
			width: 100%;
			height: 30px;
			line-height: 30px;
		}

		.guardlist-li {
			height: 40px;
			line-height: 40px;
			display: inline-block;
			margin-right: 10px;

			&.liactive {
				font-weight: 600;
				color: aliceblue;
				border-bottom: 4px solid #fff;

			}
		}
	}

	.guard-float {
		position: absolute;
		top: 10px;
		right: 20px;
		width: 20px;
		height: 20px;
		background: url('/img/pendant_search.png') center no-repeat;
		background-size: 20px 20px;
	}

	.leaderboard-seach {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(3, 3, 3, 0.8);
		z-index: 50;
		padding: 20px 20px 0px;

	}

	.adou-x {
		position: absolute;
		bottom: 0px;
		left: 0px;
		height: 60px;
		font-size: 30px;
		color: gainsboro;
		width: 100%;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;

		span {
			display: inline-block;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			border: 1px solid gainsboro;
		}
	}

	.leaderboard-input {
		width: 70%;
	}

	.leaderboard-btn {
		width: 30%;
	}

	.leaderboard-div {
		width: 100%;
		height: 500px;
		margin-top: 20px;

		.leaderboard-adou {
			min-height: 60px;

			.adou-list {
				height: 60px;
				display: flex;
				align-items: center;
				background-color: skyblue;
				border-radius: 10px;
				margin-bottom: 10px;

				.adou-imgs {
					flex: 0 0 40px;
					width: 40px;
					height: 40px;
					border-radius: 50%;
					background-color: #fff;
				}

				.adou-names {
					flex: 1;
					font-size: 20px;
					color: #fff;
					text-align: center;

				}
			}
		}
	}
</style>
