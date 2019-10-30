<template>
	<div class="communication">
		<ul class="communication-uls">
			<li class="communication-lis" v-for="(item,index) in chat" :key="index">
				<div class="communication-header"><img class="header-img" :src="item.userinfo.image.thumbnail_pic" /><span class="communication-name">{{item.userinfo.nickname}}</span></div>
				<p class="communication-text">{{item.text}}</p>
				<div class="communication-imgs"><img v-for="(j,k) in getnumphoto(item.images)" :key="k" :src="j.img_url.origin_pic" /></div>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		props: {
			sid: Number
		},
		data() {
			return {
				chat:[]
			}
		},
		methods: {
			getchatdata() {
				this.$http(
					`/api/api_moblie_idol_userquanzi.php?action=get_message_list&starid=${this.sid}&qzid=59a7ec5d10eef907605b53a7&getvideo=1&count=10&page=1&notype=1&order=recom_time&getadmin=1`
				).then(res => {
					this.chat = res.data.list;
				})
			},
			getnumphoto(photos){
				
				var photo =photos.slice(0,3);
				return photo;
			}
		},
		mounted() {
			this.getchatdata();
		}
	}
</script>

<style lang="scss">
	.communication {
		height: 460px;

		overflow: hidden;
		overflow-y: scroll;
		padding: 10px;
	}

	.communication-lis {
		min-height: 80px;
		border-bottom: gainsboro 1px solid;
		margin-bottom: 10px;

		.communication-header {
			height: 40px;
			// line-height: 40px;
			display: flex;
			align-items: center;

			.header-img {
				width: 30px;
				height: 30px;
				border-radius: 50%;
				margin: 10px;
			}

			.communication-name {
				font-size: 16px;
			}
		}

		.communication-text {
			padding-top: 10px;
			min-height: 50px;
		}
		.communication-imgs{
			height: 110px;		
			display: flex;
			justify-content:flex-start;
			align-items: center;
			padding-bottom: 5px;
			
			::nth-child(1){
				
			}
			
			img{
				margin: 0px 5px;
				width: 100px;
				height: 100px;
			}
			
			
		}
	}
</style>
