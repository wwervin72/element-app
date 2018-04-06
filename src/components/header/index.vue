<template>
	<div class="header">
		<div class="content_wrapper">
			<div class="avatar">
				<img width="64" height="64" :src="seller.avatar">
			</div>
			<div class="content">
				<div class="title">
					<div class="brand"></div>
					<div class="name">{{seller.name}}</div>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div v-if="seller.supports" class="support">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
				<div v-if="seller.supports" class="support_count">
					<span class="count">{{seller.supports.length}}个</span>
					<i class="icon-keyboard_arrow_right"></i>
				</div>
				<div class="background">
					<img :src="seller.avatar" width="100%" height="100%">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'E-header',
		data () {
			return {
				classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
			}
		},
		computed: {
			seller () {
				return this.$store.state.seller
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>

