<template>
	<div id="app">
		<e-header></e-header>
		<div class="tab border-1px">
			<div class="tab-item">
				<router-link to="/goods">商品</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/rating">评论</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/seller">商家</router-link>
			</div>
		</div>
		<keep-alive>
			<router-view/>
		</keep-alive>
	</div>
</template>

<script>
	import eHeader from './components/header';
	export default {
		name: 'App',
		components: {
			eHeader
		},
		created () {
			this.$store.dispatch('setSeller');
		}
	}
</script>

<style lang="scss" scoped>
	@import './style/mixin.scss';
	.tab {
		display: flex;
		width: 100%;
		height: 40px;
		line-height: 40px;
		@include border-1px(rgba(7, 17, 27, 0.1));
	}
    .tab-item {
		flex: 1;
		text-align: center;
		& > a{
			display: block;
			font-size: 14px;
			color: rgb(77, 85, 93);
			&.active {
				color: rgb(240, 20, 20);
			}
		}
	}
</style>
