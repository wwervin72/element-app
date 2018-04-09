<template>
	<div>
		<div class="goods">
			<!-- 左侧菜单栏 -->
			<div class="menu_wrapper" ref="menuWrapper">
				<ul>
					<li v-for="(item, index) in goods"
						:key="index"
						class="menu_item"
						@click="selectMenu(index, $event)"
						ref="menuList"
						:class="{
							current: currentIndex === index
						}">
						<span class="text border_1px">
							<span v-if="item.type > 0" class="icon" :class="classMap[item.type]"></span>
							{{item.name}}
						</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import { queryGoods } from '../../api/fetch';
	export default {
		name: 'goods',
		data () {
			return {
				goods: [],
				currentIndex: 0,
				scrollY: 0,
				classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
			}
		},
		methods: {
			selectMenu (index, evt) {

			},
			initScroll (index, evt) {
				this.meunScroll = new BScroll(this.$refs.menuWrapper, {
					click: true
				});

				this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
					click: true,
					probeType: 3
				});

				this.foodsScroll.on('scroll', (pos) => {
					// 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
					if (pos.y <= 0) {
						this.scrollY = Math.abs(Math.round(pos.y));
					}
				});
			}
		},
		created () {
			queryGoods().then(res => {
				if(res.errno === 0) {
					this.goods = res.data;
				}
			});
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin.scss';
	.goods {
		display: flex;
		position: absolute;
		top: 174px;
		bottom: 46px;
		width: 100%;
		overflow: hidden;
		.menu_wrapper {
			flex: 0 0 80px;
			width: 80px;
			background: #f3f5f7;
			.menu_item {
				display: table;
				height: 54px;
				width: 56px;
				padding: 0 12px;
				line-height: 14px;
				&.current {
					position: relative;
					z-index: 10;
					margin-top: -1px;
					background: #fff;
					font-weight: 700;
					.text{
						@include border-none();
					}
				}
				.icon {
					display: inline-block;
					vertical-align: top;
					width: 12px;
					height: 12px;
					margin-right: 2px;
					background-size: 12px 12px;
					background-repeat: no-repeat;
					&.decrease {
						@include bg-image('decrease_3');
					}
					&.discount {
						@include bg-image('discount_3');
					}
					&.guarantee {
						@include bg-image('guarantee_3');
					}
					&.invoice {
						@include bg-image('invoice_3');
					}
					&.special {
						@include bg-image('special_3');
					}
				}
				.text {
					display: table-cell;
					width: 56px;
					vertical-align: middle;
					@include border-1px(rgba(7, 17, 27, 0.1));
					font-size: 12px;
				}
			}
		}
	}
</style>

