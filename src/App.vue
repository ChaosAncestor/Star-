<template>
	<div id="app">
		<router-view class="view-s" @btn='login' :flags='flags'></router-view>
		<div class="nav">
			<keep-alive>
				<router-link to='/' exact class='nav-item' tag="div">榜单</router-link>
			</keep-alive>
			<router-link :to="{name:'preson',params:{flags}}" class='nav-item' tag="div">个人</router-link>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				// publicPath: process.env.BASE_URL,
				flags:false
			}
		},
		methods:{
			login(){
				this.flags = true;
				console.log(this.flags);
			}
		}
	}
</script>

<style>
	.nav .nav-item.active {
		color: skyblue;
	}
/* 	.view-s{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 40px;
	} */
	.nav{
		display: flex;
		width: 100%;
		height: 40px;
		line-height: 40px;
		position: fixed;
		bottom: 0;
		left: 0;
		/* border-top: #999 1px solid; */
		background-color:white;
		box-sizing: border-box;
		border-radius: 5px;
		box-shadow: 0 0 1px 1px #FFC0CB inset;
	}
	.nav-item{
		flex: 1;
		text-align: center;
	}
	.nav-item:nth-child(1){
		border-right:#FFC0CB 1px solid;
	}
</style>
