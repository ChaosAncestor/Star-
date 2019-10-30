<template>
	<div class="stroke">
		<div class="stroke-none" v-if="flag">暂无爱豆的行程记录!!!</div>
		<ul class="stroke-uls" v-else>
			<li class="stroke-lis" v-for="(item,index) in strokes" :key="index">
				<div class="stroke-date"><span class="stroke-day" v-html="redate(item.xdate)"></span><span class="stroke-week"  v-html="reweek(item.xdate)"></span></div>
				<div class="stroke-content">
					<p class="stroke-event">{{item.action}}</p>
					<p class="stroke-he"><span class="stroke-map">{{item.city ? item.city:item.nation_cn}}</span>
					<span class="{item.public_station ? strokePlatform : ''}">{{item.public_station}}</span>
					<span class="stroke-active">{{item.type_cn}}</span></p>
				</div>
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
				dateyear: 2019,
				datemonth: 10,
				strokes: [],
				flag:false
			}
		},
		methods: {
			getstrokedata() {
				this.$http(
					`/api/api_moblie_idol.php?action=star_xingcheng_list_v2&starid=${this.sid}&getImageSize=1&month=${this.datemonth}&year=${this.dateyear}`
				).then(res => {
						var stroke = [];
						for (let i = 0; i < res.data.list.length; i++) {
							if (res.data.list[i].isliving != 2) {
								stroke.push(res.data.list[i]);
							}
						}
						if(stroke.length > 0){
							this.strokes = stroke;
							this.flag = false;
							
						}else{
							this.flag = true;
						}
				})
			},
			redate(dates) {
				var de = new Date(dates).getDate();
				return de;
			},
			reweek(week) {
				var de = new Date(week).getDay();
				var str = "";
				switch (de) {
					case 0:
						str =  "周日"
						break;
					case 1:
						str =  "周一"
						break;
					case 2:
						str =  "周二"
						break;
					case 3:
						str =  "周三"
						break;
					case 4:
						str =  "周四"
						break;
					case 5:
						str =  "周五"
						break;
					case 6:
						str =  "周六"
						break;
				}
				return str;
			}
		},
		mounted() {
			this.getstrokedata();
			this.dateyear = new Date().getFullYear();
			this.datemonth = new Date().getMonth() + 1;
			// console.log(this.datemonth);
		}

	}
</script>

<style lang="scss">
	.stroke {
		height: 460px;
		overflow: hidden;
		overflow-y: scroll;
		
		.stroke-none{
			width: 100%;
			height: 60px;
			line-height: 60px;
			color: lightpink;
			text-align: center;
		}
	}

	.stroke-uls {
		padding: 15px;

		.stroke-lis {
			width: 100%;
			height: 100px;
			margin-bottom: 20px;
		}
	}

	.stroke-date {
		height: 30px;
		line-height: 30px;

		.stroke-day {
			display: inline-block;
			font-size: 20px;
			margin-right: 10px;
		}

		.stroke-week {
			font-size: 16px;
			font-weight: 400;

		}
	}

	.stroke-content {
		background-color: aliceblue;
		height: 70px;
		border-radius: 10px;

		.stroke-event {
			height: 40px;
			line-height: 40px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

		}

		.stroke-he {
			height: 30px;
			line-height: 30px;
			color: darkgray;
			font-size: 14px;

			.strokePlatform {
				display: inline-block;
				margin-right: 5px;
			}
		}
	}
</style>
