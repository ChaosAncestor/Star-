<template>
	<div class="news">
		<div class="news-none" v-if="!flag">暂时该爱豆时讯哦！！！</div>
		<ul class="news-uls" v-else>
			<li class="news-lis" v-for="(item,index) in sidnews" :key="index" @click="gethtms(item)">
				<div class="news-imgs">
					<img class="imgs" :src="outimgs(item)" />
				</div>
				<div class="news-title">{{outtitle(item)}}</div>
				<div class="news-view">阅{{outviews(item)}}</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: {
			sid: Number,

		},
		data() {
			return {
				sidnews: [],
				flag: true
			}
		},
		methods: {
			gethtms(item) {
				
				if(item.data_news){
					var str = item.data_news.html_text
					this.$router.push({name:'newsview',params:{htms:str}});
				}else if(item.data_video){
					// return item.data_video.url_page
					window.location.href = item.data_video.url_page
				}else if(item.data_image){
					return item.data_image.images[0].web_page
				}
				// this.$router.push({name:'newsview',params:{htms:ghtm}});
				
			},
			getsidnews() {
				this.$http(
					`/api/api_moblie_idol_v2.php?action=get_home_page_recommend_list&starid=${this.sid}&version=214&channelId=S00100&unique_id=76150360DA02A43D26BF23F1C9F217DC&app_platform=android`
				).then(res => {
					// console.log(res);
					if (res.data.feedlist) {
						this.flag = true;
						this.sidnews = res.data.feedlist.list;
					} else {
						this.flag = false;
					}
				})

			},
			outviews(item){
				if(item.data_news){
					return item.data_news.views
				}else if(item.data_video){
					return item.data_video.views
				}else if(item.data_image){
					return item.data_image.allcount
				}
			},
			outtitle(item){
				if(item.data_news){
					return item.data_news.title
				}else if(item.data_video){
					return item.data_video.text
				}else if(item.data_image){
					return item.data_image.action
				}
			},
			outimgs(item){
				if(item.data_news){
					return item.data_news.images[0].img_url.middle_pic
				}else if(item.data_video){
					return item.data_video.images[0].img_url.middle_pic
				}else if(item.data_image){
					return item.data_image.images[0].img_url.middle_pic
				}
			}
		},
		mounted() {
			this.getsidnews();
		},
		beforeRouteUpdate(to, from, next) {
			this.getsidnews();
			next();
		}
	}
</script>

<style lang="scss">
	.news {
		color: #000000;
		
		.news-none{
			width: 100%;
			height: 60px;
			line-height: 60px;
			color: lightpink;
			text-align: center;
		}
	}

	.news-uls {
		padding: 0px 15px;
		height: 450px;
		overflow: hidden;
		overflow-y: scroll;
	}

	.news-lis {
		width: 100%;
		height: 80px;
		border-bottom: #999 solid 1px;
		display: flex;
		padding: 10px;
		position: relative;

		// :nth-last-child(1){
		// 	border-bottom: 0;
		// }

		.news-imgs {
			height: 100%;
			flex: 0 0 60px;
			border: 1px solid #333;

			.imgs {
				width: 100%;
				height: 100%;
			}
		}

		.news-title {
			width: 100%;
			margin-left: 20px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			font-size: 14px;
		}

		.news-view {
			position: absolute;
			right: 0px;
			bottom: 10px;
			font-size: 12px;
		}
	}
</style>
