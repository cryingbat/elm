<template>
	<div class="rating-select">
		<div class="rating-type">
			<span @click="select(2)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
			<span @click="select(0)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
			<span @click="select(1)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
		</div>
		<div @click="toogleContent" class="switch" :class="{'on': onlyContent}">
			<span class="icon-check_circle"></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;
	export default {
		props:{
			ratings:{
				type :Array,
				default(){
					return [];
				}
			},
			selectType:{
				type: Number,
				default: ALL
			},
			onlyContent:{
				type:Boolean,
				default:false
			},
			desc:{
				type:Object,
				default() {
					return {
						all: "全部",
						positive: "满意",
						negative: "不满意"
					}
				}
			}
		  },
		methods: {
			select(type){
				this.$emit('ratingselect', type);
			},
			toogleContent(type2) {
				var type2 = !this.onlyContent;
				this.$emit('toogleContent', type2);
			}
		},
		computed:{
			positives() {
				return this.ratings.filter((rating) => {
					return rating.rateType === POSITIVE;
				})
			},
			negatives() {
				return this.ratings.filter((rating) => {
					return rating.rateType === NEGATIVE;
				})
			}
		}
	}
</script>

<style>
	.rating-select .rating-type{padding: 18px 0;margin: 0 18px;border-bottom: 1px solid rgba(7,17,27,.1);font-size: 0;color: rgb(77,85,93)}
	.block{display: inline-block;padding: 8px 12px;margin-right: 8px;border-radius: 3px;font-size: 12px;font-weight: 300;line-height: 16px}
	.block.active{color: #fff}
	.block.positive{background: rgba(0,160,220,.2);}
	.block.positive.active{background: rgba(0,160,220,1);}
	.block.negative{background: rgba(77,85,93,.2);}
	.block.negative.active{background: rgba(77,85,93,1);}
	.block .count{font-size: 8px;margin-left: 2px}
	.switch{padding: 12px 18px ;line-height: 24px;font-size: 12px;border-bottom: 1px solid rgba(7,17,27,.1);color: rgb(147,153,159);font-size: 0}
	.icon-check_circle{margin-right: 4px; font-size: 24px;width: 24px;height: 24px;display: inline-block;}
	.switch.on .icon-check_circle{color:#00c850;}
	.switch .text{font-size: 12px;vertical-align: top}
</style>