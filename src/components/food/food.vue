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
	 			<div class="cartcontrol-warpper">
		 			<cartcontrol :food="food"></cartcontrol>
		 		</div>
		 		<transition name="add-fade">	
		 		<div class="buy" v-show="!food.count || food.count === 0"  @click.stop.prevent="addFirst" >加入购物车</div>
		 		</transition>
	 		</div>
	 		
	 		<split></split>
	 		<div class="info" v-show="food.info">
	 			<h1 class="info-title">商品介绍</h1>
	 			<p class="text">{{food.info}}</p>
	 		</div>
	 		<split v-show="food.info"></split>
	 		<div class="rating-page">
	 			<h1 class="rating-title">商品评价</h1>
	 			<ratingselect @ratingselect="ratingSelect" @toogleContent="toogleContent" :selectType="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
	 			<div class="rating-wrapper">
	 				<ul v-show="food.ratings && food.ratings.length">
	 					<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
	 						<div class="user">
	 							<span class="name">{{rating.username}}</span>
	 							<img :src="rating.avatar" alt="" class="avatar" width="12" height="12">
	 						</div>
	 						<div class="time">{{rating.rateTime | formatDate}}</div>
	 						<p class="text">
	 							<span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
	 						</p>
	 					</li>
	 				</ul>
	 				<div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
	 			</div>
	 		</div>
	 	</div> 
	 </div>
	</transition>
</template>

<script type="text/javascript">
import Bscroll from "better-scroll"
import Vue from "vue"
import cartcontrol from "@/components/cartcontrol/cartcontrol"
import split from "@/components/split/split"
import ratingselect from "@/components/ratingselect/ratingselect"
import {formatDate} from "@/common/js/formatDate"
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;
	export default {
		props:{
			food:{
				type:Object
			}
		},
		data() {
			return {
				showFlag:false,
				selectType: ALL,
				onlyContent:true,
				desc:{
					all: "全部",
					positive: "推荐",
					negative: "吐槽"
				}
			}
		},
		filters:{
			formatDate(time) {
				let date =new Date(time);
				return formatDate(date,"yyyy-MM-dd hh:mm:ss");
			}
		},
		methods:{
			ratingSelect(type) {
				this.selectType = type;
				this.$nextTick(() => {
		    		this.scroll.refresh()
		    	})
			},
			toogleContent(type2) {
				this.onlyContent = type2;
				this.$nextTick(() => {
		    		this.scroll.refresh()
		    	})
			},
			show() {
				this.showFlag = true;
				this.selectType = ALL;
				this.onlyContent =  true;
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
			},
			needShow(type,text) {
				if(this.onlyContent && !text){
					return false
				}
				if(this.selectType === ALL){
					return true
				}else{
					return type === this.selectType
				}
			}
		},
		components:{
			cartcontrol,
			split,
			ratingselect
		}
	}
</script>

<style type="text/css" scoped>
	.food{position: fixed;left: 0;top: 0;bottom: 48px;z-index: 30;width: 100%;background: #fff;transform: translate3d(0,0,0);}
	.move-fade-enter,.move-fade-leave-active{transform: translate3d(100%,0,0);}
	.move-fade-enter-active,.move-fade-leave-active{transition: all 0.3s linear;}
	.image-header{position: relative;width: 100%;}
	.image-header img{top: 0;left: 0;width: 100%;height: 100%}
	.back{position: absolute;left: 2px;top: 10px;}
	.icon-arrow_lift{display: block;padding: 10px;color: #fff}
	.li-content{position: relative; padding: 18px;}
	.li-content .food-title{font-size: 14px;line-height: 14px;margin-bottom: 8px;font-weight: 700; color: rgb(7,17,27);}
	.li-content .food-detail{margin-bottom: 18px;line-height: 10px;font-size: 0;height: 10px}
	.li-content .food-detail .sell-count,.li-content .food-detail .rating{font-size: 10px;color: rgb(147,153,159);}
	.li-content .food-detail .sell-count{margin-right: 12px}
	.food-price{font-weight: 700;line-height: 24px}
	.food-price .now{color: rgb(240,20,20);margin-right: 18px;font-size: 14px;}
	.food-price .old{text-decoration: line-through;font-size: 10px;color: rgb(147,153,159);}
	.cartcontrol-warpper{position: absolute;right: 12px;bottom: 11px}
	 .buy{position: absolute;right: 18px;bottom: 16px;z-index: 10;height: 24px;line-height: 24px;padding: 0 12px;box-sizing: border-box;font-size: 10px;border-radius: 12px;background: rgb(0,160,220);}
	 .add-fade-enter{opacity: 0;}
	 .add-fade-leave-active,.add-fade-enter-active{transition: all 0.2s;}
	 .add-fade-leave{opacity: 1;}
	.info{padding: 18px}
	 .info .info-title{padding: 0px 0 6px 0;color: rgb(7,17,27); font-size: 14px;font-weight: 700;}
	 .info .text{padding: 6px 8px 0 8px; font-size: 12px;color:rgb(77,85,93);font-weight: 200;line-height: 24px}
	 .rating-page{padding-top: 18px}
	 .rating-title{line-height: 14px;margin-left: 18px;font-size: 14px;}
	 .rating-wrapper{padding: 0 18px;border-bottom:1px solid rgba(7,17,27,.1);}
	 .rating-item{position: relative;padding: 16px 0;}
	 .rating-item .user{position: absolute;right: 0;top: 16px;font-size: 0;line-height: 12px}
	 .rating-item .user .name{display: inline-block;vertical-align: top;font-size: 10px;color: rgb(147,153,159);margin-right: 6px}
	 .rating-item .user .avatar{border-radius:50%;}
	 .rating-item .time{margin-bottom: 6px; line-height: 12px;font-size: 10px;color: rgb(147,153,159)}
	 .rating-item .text{line-height: 16px;font-size: 12px;color: rgb(7,17,27);}
	 .icon-thumb_down,.icon-thumb_up{margin-right: 4px;line-height: 16px;font-size: 12px}
	 .icon-thumb_up{color: rgb(0,160,220);}
	 .icon-thumb_down{color: rgb(147,153,159);}
	 .no-rating{padding: 16px 0;font-size: 12px;color: rgb(147,153,159);text-align: center;}
</style>