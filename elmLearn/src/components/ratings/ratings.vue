<template>
	<div class="ratings" ref="rating">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边{{seller.rankRate}}%</div>
				</div>
				<div class="overview-right">
					<div class="score-warpper">
						<span class="title">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-warpper">
						<span class="title">商品评分</span>
						<star :size="36" :score="seller.foodScore"></star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-warpper">
						<span class="title">送达时间</span>
						<span class="score">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="ratings"></ratingselect>
			<div class='rating-warpper'>
				<ul>
					<li v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)" class="rating-item">
						<div class="avatar">
							<img width="28" height="28" :src="rating.avatar" alt="">
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-warpper">
								<star :size="24" :score="rating.score"></star>
								<span class="delivery" v-show="rating.deliveryTime"></span>
								<p class="text">{{rating.text}}</p>
								<div class="recommend" v-show="rating.recommend.length && rating.recommend">
									<i class="icon-thumb_up"></i>
									<span v-for="item in rating.recommend" class="item">{{item}}</span>
								</div>
								<div class="time">{{rating.rateTime | formatDate}}</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import  star from "@/components/star/star"
import Bscroll from "better-scroll"
import split from "@/components/split/split"
import {formatDate} from "@/common/js/formatDate"
import ratingselect from "@/components/ratingselect/ratingselect"
	const ALL = 2;
	const ERR_OK =0;
	export default {
		props:{
			seller:{
				type:Object
			}
		},
		data() {
			return {
				ratings:[],
				selectType: ALL,
				onlyContent:true,
				desc:{
					all: "全部",
					positive: "推荐",
					negative: "吐槽"
				}
			}
		},
		components:{
			star,
			split,
			ratingselect
		},
		filters:{
			formatDate(time) {
				let date =new Date(time);
				return formatDate(date,"yyyy-MM-dd hh:mm:ss");
			}
		},
		created() {
			this.$http.get("/api/ratings").then((res) => {
				res=res.body
				if(res.errno == ERR_OK){
					this.ratings =res.data;
					this.$nextTick(() => {
						this.scroll = new Bscroll(this.$refs.rating,{
						click:true
					})
					})
				}
			}),

		 this.$root.eventHub.$on('ratingselect',(type) => {
		 	this.selectType = type;
		    this.$nextTick(() => {
		    	this.scroll.refresh()
		    })
		  });
		 this.$root.eventHub.$on('toogleContent',(type2) => {
		   this.onlyContent = type2;
		    this.$nextTick(() => {
		    	this.scroll.refresh()
		    })
		  });
		},
		methods:{
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
		}
	}
</script>

<style type="text/css" scoped>
	.ratings{position: absolute;top: 174px;bottom: 0;left: 0; width: 100%;overflow: hidden;}
	.overview{display: flex;padding: 18px 0}
	.overview-left{padding: 6px 0; flex: 0 0 137px;width: 137px;border-right: 1px solid rgba(7,17,27,.2);text-align: center;}
	@media only screen and (max-width: 320px) {
		.overview-left{width:120px;flex:0 0 120px}
	}
	.overview-left .score{margin-bottom: 6px; color: rgb(255,153,0);line-height: 28px;font-size: 24px}
	.overview-left .title{margin-bottom: 8px; line-height: 12px;font-size: 12px;color: rgb(7,17,27);font-weight: 700;}
	.overview-left  .rank{ line-height: 10px;font-size: 10px;color: rgb(147,153,159);}
	.overview-right{flex: 1;padding:6px 0 6px 24px; }
	@media only screen and (max-width: 320px) {
		.overview-right{padding-left: 6px}
	}
	.overview-right .score-warpper{margin-bottom: 8px;line-height: 18px;font-size: 0}
	.overview-right .score-warpper .title,.delivery-warpper .title{display: inline-block; font-size: 12px;color: rgb(7,17,27);line-height: 18px}
	.overview-right .score-warpper .star{display: inline-block;vertical-align: top;margin:  0 12px;}
	.overview-right .score-warpper .score{display: inline-block;vertical-align: top;font-size: 12px;color: rgb(255,153,0);line-height: 18px}
	.delivery-warpper{font-size:}
	.delivery-warpper .score{display: inline-block; font-size: 12px;margin-left: 12px;color: rgb(147,153,159);}
	.rating-warpper{padding:0 18px;}
	.rating-item{display: flex; padding:18px 0;border-bottom: 1px solid rgba(7,17,27,.1)}
	.rating-item .avatar{margin-right: 12px;flex: 0 0 28px;width: 28px;height: 28px}
	.rating-item .avatar img{border-radius:50%;}
	.rating-item .content{position: relative;flex: 1}
	.rating-item .content .name{margin-bottom: 4px; line-height: 12px;font-size: 10px;color: rgba(7,17,27,1)}
	.rating-item .content .star-warpper{margin:0 6px 0 0 ;text-align: left; font-size: 0}
	.rating-item .content .star-warpper .star{display: inline-block;vertical-align: top;margin-right: 6px}
	.rating-item .content .star-warpper .delivery{display: inline-block;vertical-align: top;color: rgb(147,153,159);font-size: 10px}
	.rating-item .content .text{color: rgb(7,17,27);font-size: 12px;margin: 8px 0}
	.rating-item .content .recommend{line-height: 16px;font-size: 12px}
	.rating-item .content .recommend .icon-thumb_up,.item{display: inline-block;margin-right: 8px;margin-bottom: 4px;font-size: 9px}
	.rating-item .content .recommend .icon-thumb_up{color: rgba(0,160,220,1)}
	.rating-item .content .recommend .item{padding: 0 6px;border: 1px solid rgba(7,17,27,.1);border-radius: 1px;color: rgb(147,153,159);background: #fff}
	.rating-item .content .time{font-size: 10px;position: absolute;top: 0;right: 0;line-height: 12px;color: rgb(147,153,159);}
</style>