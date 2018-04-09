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
			<!-- 右侧商品区域 -->
			<div class="foods_wrapper" ref="foodsWrapper">
				<ul>
					<li v-for="(item, i) in goods" :key="i" class="food_list" ref="foodList">
						<h1 class="title">{{item.name}}</h1>
						<ul>
						<li @click="selectFood(food,$event)" v-for="(food, index) in item.foods" :key="index" class="food_item border_1px">
							<div class="icon">
								<img width="57" height="57" :src="food.icon">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span>
									<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrol_wrapper">
									<!-- <cartcontrol @add="addFood" :food="food"></cartcontrol> -->
								</div>
							</div>
						</li>
						</ul>
					</li>
				</ul>
			</div>
			<shop-cart
				ref="shopcart"
				:selectFoods="selectFoods"
				:deliveryPrice="seller.deliveryPrice"
                :minPrice="seller.minPrice">
			</shop-cart>
		</div>
		<food @add="addFood" :food="selectedFood" ref="food"></food>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import BScroll from 'better-scroll';
	import { queryGoods } from '../../api/fetch';
	import food from '../food';
	import shopCart from '../shopCart';
	export default {
		name: 'goods',
		components: {
			food,
			shopCart
		},
		data () {
			return {
				goods: [],
				listHeight: [],
				scrollY: 0,
				classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
			}
		},
		computed: {
			...mapGetters(["seller"]),
			currentIndex() {
				for (let i = 0; i < this.listHeight.length; i++) {
					let height1 = this.listHeight[i],
						height2 = this.listHeight[i + 1];
					if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
						this.followScroll(i);
						return i;
					}
				}
				return 0;
			},
			selectFoods() {
				let foods = [];
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if (food.count) {
							foods.push(food);
						}
					});
				});
				return foods;
			}
		},
		methods: {
			selectMenu (index, evt) {
				if (!event._constructed) {
					return;
				}
				let foodList = this.$refs.foodList,
					el = foodList[index];
				this.foodsScroll.scrollToElement(el, 300);
			},
			selectFood () {
				if (!event._constructed) {
					return;
				}
				this.selectedFood = food;
				this.$refs.food.show();
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
			},
			calculateHeight() {
				let foodList = this.$refs.foodList,
					height = 0;
				this.listHeight.push(height);
				for (let i = 0; i < foodList.length; i++) {
					height += foodList[i].clientHeight;
					this.listHeight.push(height);
				}
			},
			followScroll (index) {
				let menuList = this.$refs.menuList,
					el = menuList[index];
				this.meunScroll.scrollToElement(el, 300, 0, -100);
			},
			addFood () {

			},
			selectedFood () {

			}
		},
		created () {
			queryGoods().then(res => {
				if(res.errno === 0) {
					this.goods = res.data;
					this.$nextTick(() => {
						this.initScroll();
						this.calculateHeight();
					});
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
		.foods_wrapper{
			flex: 1;
			.title {
				padding-left: 14px;
				height: 26px;
				line-height: 26px;
				border-left: 2px solid #d9dde1;
				font-size: 12px;
				color: rgb(147, 153, 159);
				background: #f3f5f7;
			}
			.food_item {
				display: flex;
				margin: 18px;
				padding-bottom: 18px;
				@include border-1px(rgba(7, 17, 27, 0.1));
				&:last-child {
					@include border-none();
					margin-bottom: 0;
				}
				.icon {
					flex: 0 0 57px;
					margin-right: 10px;
				}
				.content {
					flex: 1;
					.name {
						margin: 2px 0 8px 0;
						height: 14px;
						line-height: 14px;
						font-size: 14px;
						color: rgb(7, 17, 27);
					}
					.desc,
					.extra {
						line-height: 10px;
						font-size: 10px;
						color: rgb(147, 153, 159);
					}
				}
			}
				.desc {
					line-height: 12px;
					margin-bottom: 8px;
				}
				.extra {
					.count {
						margin-right: 12px;
					}
				}
				.price {
					font-weight: 700;
					line-height: 24px;
					.now {
						margin-right: 8px;
						font-size: 14px;
						color: rgb(240, 20, 20);
					}
					.old {
						text-decoration: line-through;
						font-size: 10px;
						color: rgb(147, 153, 159);
					}
				}
				.cartcontrol_wrapper {
					position: absolute;
					right: 0;
					bottom: 12px;
				}
		}
	}
</style>

