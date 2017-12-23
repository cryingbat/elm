<template>
	<transition name="move-fade">
	 <div v-show="showFlag"  class="food" ref="sfood">
	 	<div class="food-content">
	 		<div class="image-header">
	 			<img :src="food.image" alt="">
	 			<div class="back" @click="hide"><i class="icon-arrow_lift" ></i></div>
	 		</div>
	 		<div class="li-content">
	 			<h1 class="food-title">{{food.name}}</h1>
	 			<div class="food-detail">
	 				<span class="sell-count">月售{{food.sellCount}}份</span>
	 				<span class="rating">好评率{{food.rating}}</span>
	 			</div>
	 			<div class="food-price">
	 				<span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
	 			</div>
	 		</div>
	 		<div class="cartcontrol-warpper">
	 			<cartcontrol :food="food"></cartcontrol>
	 		</div>
	 		<transition name="add-fade">	
	 		<div class="buy" v-show="!food.count || food.count === 0"  @click.stop.prevent="addFirst" >加入购物车</div>
	 		</transition>
	 	</div> 
	 </div>
	</transition>
</template>

<script type="text/javascript">
import Bscroll from "better-scroll"
import Vue from "vue"
import cartcontrol from "@/components/cartcontrol/cartcontrol"
	export default {
		props:{
			food:{
				type:Object
			}
		},
		data() {
			return {
				showFlag:false
			}
		},
		methods:{
			show() {
				this.showFlag=true;
				this.$nextTick(() => {
					if(!this.scroll){
						this.scroll=new Bscroll(this.$refs.sfood,{
							click:true
						})
					}else{
						this.scroll.refresh()
					}
				})
			},
			hide() {
				this.showFlag=false;
			},
			addFirst() {
				Vue.set(this.food,"count",1)
			}
		},
		components:{
			cartcontrol
		}
	}
</script>

<style type="text/css" scoped>
	.food{position: fixed;left: 0;top: 0;bottom: 48px;z-index: 30;width: 100%;background: #fff;}
	.move-fade-enter{transform: translate3d(100%,0,0);}
	.move-fade-enter-active,.move-fade-leave-active{transition: all 0.3s linear;}
	/*.move-fade-leave{transform: translate3d(0,0,0);}*/
	.move-fade-leave-active{transform: translate3d(0,0,0);}
	.image-header{position: relative;width: 100%;}
	.image-header img{top: 0;left: 0;width: 100%;height: 100%}
	.back{position: absolute;left: 2px;top: 10px;}
	.icon-arrow_lift{display: block;padding: 10px;color: #000}
	.li-content{padding: 18px;}
	.li-content .food-title{font-size: 14px;line-height: 14px;margin-bottom: 8px;font-weight: 700; color: rgb(7,17,27);}
	.li-content .food-detail{margin-bottom: 18px;line-height: 10px;font-size: 0;height: 10px}
	.li-content .food-detail .sell-count,.li-content .food-detail .rating{font-size: 10px;color: rgb(147,153,159);}
	.li-content .food-detail .sell-count{margin-right: 12px}
	.food-price{font-weight: 700;line-height: 24px}
	.food-price .now{color: rgb(240,20,20);margin-right: 18px;font-size: 14px;}
	.food-price .old{text-decoration: line-through;font-size: 10px;color: rgb(147,153,159);}
	.cartcontrol-warpper{position: absolute;right: 12px;bottom: 12px}
	 .buy{position: absolute;right: 18px;bottom: 18px;z-index: 10;height: 24px;line-height: 24px;padding: 0 12px;box-sizing: border-box;font-size: 10px;border-radius: 12px;background: rgb(0,160,220);}
	 .add-fade-enter{opacity: 0;}
	 .add-fade-leave-active,.add-fade-enter-active{transition: all 0.2s;}
	 .add-fade-leave{opacity: 1;}
</style>