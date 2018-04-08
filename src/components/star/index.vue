<template>
	<div class="star" :class="starType">
		<span
			v-for="(itemClass, index) in itemClasses"
			:key="index"
			:class="itemClass"
			class="star_item">
		</span>
	</div>
</template>

<script>
	const LENGTH = 5,
		CLS_ON = 'on',
		CLS_HALF = 'half',
		CLS_OFF = 'off';
	export default {
		name: 'star',
		data () {
			return {

			}
		},
		props: {
			size: {
				type: Number,
				default: 0
			},
			score: {
				type: Number,
				default: 0
			}
		},
		computed: {
			starType () {
				return `star_${this.size}`;
			},
			itemClasses () {
				let result = [],
					score = Math.floor(this.score * 2) / 2,
					hasDecimal = score % 1 !== 0,
					integer = Math.floor(score);
				for(let i = 0; i < integer; i++) {
					result.push(CLS_ON);
				}
				if(hasDecimal) {
					result.push(CLS_HALF);
				}
				while(result.length < LENGTH) {
					result.push(CLS_OFF);
				}
				return result;
			}
		}
	}
</script>


<style lang="scss" scoped>
	@import '../../style/mixin.scss';
	.star {
		font-size: 0;
		.star_item {
			display: inline-block;
			background-repeat: no-repeat;
			&:last-child {
				margin-right: 0;
			}
		}
		&.star_48 {
			.star_item {
				width: 20px;
				height: 20px;
				margin-right: 22px;
				background-size: 20px 20px;
				&.on {
					@include bg-image('star48_on');
				}
				&.half {
					@include bg-image('star48_half');
				}
				&.off {
					@include bg-image('star48_off');
				}
			}
		}
		&.star_36 {
			.star_item {
				width: 15px;
				height: 15px;
				margin-right: 6px;
				background-size: 15px 15px;
				&.on {
					@include bg-image('star36_on');
				}
				&.half {
					@include bg-image('star36_half');
				}
				&.off {
					@include bg-image('star36_off');
				}
			}
		}
		&.star_24 {
			.star_item {
				width: 10px;
				height: 10px;
				margin-right: 3px;
				background-size: 10px 10px;
				&.on {
					@include bg-image('star24_on');
				}
				&.half {
					@include bg-image('star24_half');
				}
				&.off {
					@include bg-image('star24_off');
				}
			}
		}
	}
</style>
