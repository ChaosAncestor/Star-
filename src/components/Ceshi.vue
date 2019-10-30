<template>
	<div class="s1">
		<div class="carousel">
			<div class="block">
				<el-carousel height="150px">
					<el-carousel-item v-for="(item,index) in lunbolist" :key="index">
						<img class="elemt-imgs" :src="item.img" />
					</el-carousel-item>
				</el-carousel>
			</div>
		</div>

		<div class="ranking" ref="wrapper">
			<ul class="Ranking-list">
				<li class="Ranking-li" v-for="(item,index) in rankinglist" :key='index' @click="fordetails(rank,item.starinfo.sid,item.rank,item.starinfo.name)">
					<span class="Ranking-num">{{item.rank}}-</span>
					<span class="Ranking-imgs"><img class="imgs" :src="item.starinfo.logo_img" /></span>
					<div class="Ranking-div">
						<div class="Ranking-name">{{item.starinfo.name}}-</div>
						<div class="Ranking-fire">{{item.score}}<i class="fire"></i></div>
					</div>
					<div class="Ranking-click"><span class="click-btn">打榜</span></div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	export default {
		data() {
			return {
				links: "/api/api_mobile_star_rank.php?action=get_star_ranklist&starid=-1&count=20&getLastChampion=1&page=1&type=week&rank_type=3&version=214&channelId=S00100&unique_id=76150360DA02A43D26BF23F1C9F217DC",
				lunbo: "/api/api_moblie_idol_v2.php?action=get_wx_star_rank_lunbotu&type=week&rank_type=3&version=214&channelId=S00100&unique_id=76150360DA02A43D26BF23F1C9F217DC&app_platform=android",
				currertli: 0,
				timer: "",
				rankinglist: [],
				lunbolist: []
			}
		},
		props: {
			rank: Number
		},
		methods: {
			_instarscroll() {
				this.$nextTick(() => {
					if (!this.scroll) {
						this.scroll = new BScroll(this.$refs.wrapper, {
							//开启点击事件 默认为false
							click: true
						})
					} else {
						this.scroll.refresh()
					}
				})
			},
			getlinksdata() {
				this.$http(
					this.links
				).then(res => {
					this.rankinglist = res.data.list;
					console.log(this.rankinglist);
				})
			},
			getlunbodata() {
				this.$http(
					this.lunbo
				).then(res => {
					this.lunbolist = res.data.lunbotu;
					// console.log(this.lunbolist);
				})
			},
			fordetails(rank, sid, nums,names) {
				this.$router.push({
					name: 'details',
					params: {
						rank,
						sid,
						nums,
						names
					}
				});
			}
		},
		watch: {
			rank(newvals) {
				if (newvals) {
					this.links =
						`/api/api_mobile_star_rank.php?action=get_star_ranklist&starid=-1&count=20&getLastChampion=1&page=1&type=week&rank_type=${this.rank}&version=214&channelId=S00100&unique_id=76150360DA02A43D26BF23F1C9F217DC`;
					this.getlinksdata();
					clearInterval(this.timer)
					this.$nextTick(() => {
						this.timer = setInterval(() => {
							this.currertli++;
							if (this.currertli >= this.lunbolist.length) {
								this.currertli = 0;
							}
						}, 1500);
					})
				}
			}
		},
		mounted() {
			this.getlinksdata();
			this.getlunbodata();
			this._instarscroll();
			this.timer = setInterval(() => {
				this.currertli++;
				if (this.currertli >= this.lunbolist.length) {
					this.currertli = 0;
				}
			}, 1500);
		},
		beforeRouteUpdate(to, from, next) {

			this.getlinksdata();
			this.getlunbodata();
			next();
		}
	}
</script>

<style lang="scss" scoped>
	.s1 {
		padding-bottom: 20px;
		border-right: 1px solid pink;
		border-left: 1px solid pink;
	}

	.carousel {
		width: 100%;
		height: 160px;
		padding: 10px 15px;

		.elemt-imgs {
			width: 100%;
			height: 100%;
		}

	}

	.ranking {
		margin-top: 20px;
		padding: 0px 10px;
		height: 360px;
		overflow: hidden;

		.Ranking-list {}
	}



	.Ranking-li {
		height: 60px;
		display: flex;
		text-align: center;
		align-items: center;

		&:nth-child(1) {
			.Ranking-num {
				width: 30px;
				height: 30px;
				font-size: 0;
				background: url("/img/ic_fans_first.png") center no-repeat;
				background-size: 30px 30px;
			}
		}

		&:nth-child(2) {
			.Ranking-num {
				width: 30px;
				height: 30px;
				font-size: 0;
				background: url("/img/ic_fans_second.png") center no-repeat;
				background-size: 30px 30px;
			}
		}

		&:nth-child(3) {
			.Ranking-num {
				width: 30px;
				height: 30px;
				font-size: 0;
				background: url("/img/ic_fans_three.png") center no-repeat;
				background-size: 30px 30px;
			}
		}


		.Ranking-num {
			flex: 0 0 60px;
			font-size: 14px;
		}

		.Ranking-imgs {
			flex: 0 0 60px;

			.imgs {
				width: 80%;
				height: 80%;
				border-radius: 50%;
				vertical-align: middle;
			}

		}

		.Ranking-div {
			flex: 1;

			.Ranking-name {
				height: 40px;
				line-height: 40px;
				font-size: 16px;
			}

			.Ranking-fire {
				height: 20px;
				font-size: 10px;
			}

			.fire {
				vertical-align: middle;
				display: inline-block;
				width: 20px;
				height: 20px;
				background: url("/img/ic_news_liked.png") center no-repeat;
				background-size: 15px 15px;
			}
		}

		.Ranking-click {
			flex: 0 0 40px;

			.click-btn {
				display: inline-block;
				width: 40px;
				height: 20px;
				line-height: 20px;
				font-size: 14px;
				color: white;
				background-color: lightpink;
				border-radius: 10px;
			}
		}
	}
</style>
