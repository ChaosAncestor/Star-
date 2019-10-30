<template>
	<div class="newsview">
		<div class="newsview-back">
			<div class="newsview-img" @click="getback"></div>
			<div class="newsview-title">詳情</div>
		</div>
		<div v-html="htms"></div>
	</div>
</template>

<script>
	export default {
		props: {
			htms: [String]
		},
		methods: {
			getback() {
				this.$router.back();
			},
		},
		mounted() {

		}
	}
</script>

<style lang="scss">
	.newsview {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		overflow: hidden;
		overflow-y: scroll;
		background-color: white;
		padding-top: 40px;

		.newsview-back {
			width: 100%;
			height: 40px;
			top: 0px;
			left: 0px;
			position: absolute;
			background-color: hotpink;
			padding: 0px 20px;
			display: flex;
			align-items: center;
			color: white;
			

			.newsview-img {
				flex: 0 0 25px;
				height: 25px;
				background: url('/img/tt_white_lefterbackicon_titlebar.png') no-repeat;
				background-size: 25px 25px;
			}
			
			.newsview-title{
				flex:1;
				text-align: center;
				font-size: 18px;
			}
		}

	}
</style>
