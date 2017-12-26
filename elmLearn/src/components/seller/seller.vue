<template>
	<div class="seller" ref='seller'>
		<div class="seller-content">
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc">
					<star :size="36" :score="seller.score"></star>
					<span class="text">{{seller.ratingCount}}</span><span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							<span class="stress">{{seller.minPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryTime}}</span>分钟
						</div>
					</li>
				</ul>
				<div class="favorite" @click="toggleFavorite">
					<span class="icon-favorite" :class="{'active':favorite}"></span>
					<span class="text">{{favoriteText}}</span>
				</div>
			</div>
			<split></split>
			<div class="bulletin">
				<h1 class="title">公告与活动</h1>
				<div class="content-warpper">
					<p class="content-n">{{seller.bulletin}}</p>
				</div>
				<ul v:if='seller.supports' class="support">
					<li class="support-item" v-for='(item,index) in seller.supports'>
						<span class="icon" :class='classMap[seller.supports[index].type]'></span><span class="text" >{{seller.supports[index].description}}</span>
					</li>
				</ul>
			</div>
			<split></split>
			<div class="pics">
				<h1 class="title">商家实景</h1>
				<div class="pic-warpper" ref="picwarpper">
					<ul class="pic-list" ref="piclist">
						<li class="pic-item" v-for="pic in seller.pics">
							<img :src="pic" width="120" height="90" alt="">
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="info">
				<h1 class="title">商家信息</h1>
				<ul>
					<li class="info-item" v-for="info in seller.infos">{{info}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import star from "@/components/star/star"
import split from "@/components/split/split"
import Bscroll from "better-scroll"
	export default {
		props:{
			seller:{
				type:Object
			}
		},
		data() {
			return {
				favorite:false
			}
		},
		components:{
			star,
			split
		},
		created() {
			this.classMap = ['decrease','discount','special','invoice','guarantee'];
		},
		watch :{
			'seller'() {
				this._initScroll();
				this._initPics();
			}
		},
		mounted() {
			this._initScroll();
			this._initPics();
		},
		methods:{
			_initScroll() {
				if(!this.scroll){
					this.scroll = new Bscroll(this.$refs.seller,{
						click:true
					})
				}else {
					this.scroll.refresh()
				}
			},
			_initPics() {
				if(this.seller.pics){
				let picWidth=120;
				let margin = 6;
				let width =(picWidth+margin)*this.seller.pics.length-margin;
				this.$refs.piclist.style.width=width+'px';
				this.$nextTick(() => {
					if(!this.picScroll){
					this.picScroll = new Bscroll(this.$refs.picwarpper,{
						click:true,
						scrollX:true,
						eventPassthrough:'vertical'
					})
					}else{
						this.picScroll.refresh();
					}
				})
			  }
			},
			toggleFavorite() {
				this.favorite = !this.favorite
			}
		},
		computed:{
			favoriteText() {
				return this.favorite?"已收藏":"收藏"
			}
		}
	}
</script>

<style type="text/css" scoped>
	.seller{position: absolute;top: 174px;bottom: 0;left: 0; width: 100%;overflow: hidden;}
	.overview{position: relative; padding:18px;}
	.overview .title,.pics .title{margin-bottom: 8px;line-height: 14px;color: rgb(7,17,27);font-size: 14px}
	.overview .desc{padding-bottom: 18p x;border-bottom: 1px solid rgba(7,17,27,.1);font-size: 0}
	.overview .desc .star{display: inline-block;line-height: 18px; vertical-align: top;margin-right: 8px;}
	.overview .desc .text{margin-right: 12px;line-height: 18px; font-size: 10px;display: inline-block;vertical-align: top;color: rgb(77,85,93);}
	.overview .remark{display: flex;padding-top: 18px}
	.overview .remark .block{flex: 1;text-align: center;border-right: 1px solid rgba(7,17,27,.1)}
	.overview .remark .block:last-child{border:none;}
	.overview .remark .block h2{margin-bottom: 4px;line-height: 10px;font-size: 10px}
	.overview .remark .block .content{line-height: 24px;font-size: 10px;color: rgba(7,17,27,1);}
	.overview .remark .block .content .stress{font-size: 24px}
	.bulletin{padding: 18px 18px 0 18px}
	.bulletin .title{margin-bottom: 8px;line-height: 14px;color: rgb(7,17,27);}
	.bulletin .content-warpper{padding:0 12px 16px 12px;border-bottom: 1px solid rgba(7,17,27,.1);}
	.bulletin .content-warpper .content-n{line-height: 24px;font-size: 12px;color: rgb(240,20,20);}
	.bulletin .support{}
	.bulletin .support .support-item{padding:16px 12px;font-size: 0;border-bottom: 1px solid rgba(7,17,27,.1)}
	.bulletin .support .support-item:last-child{border:none;}
	.support .icon{vertical-align: top; display: inline-block;width: 12px;height: 12px;margin-right: 4px;background-size: 12px 12px;background-repeat: no-repeat;vertical-align: top;}
	.support .icon.decrease{background-image: url(decrease_4@2x.png);@media (-webkit-min-devive-pixel-ratio:3),(min-devive-pixel-ratio:3) background-image: url(decrease_4@3x.png);}
	.support .icon.discount{background-image: url(discount_4@2x.png);@media (-webkit-min-devive-pixel-ratio:3),(min-devive-pixel-ratio:3) background-image: url(discount_4@3x.png);}
	.support .icon.guarantee{background-image: url(guarantee_4@2x.png);@media (-webkit-min-devive-pixel-ratio:3),(min-devive-pixel-ratio:3) background-image: url(guarantee_4@3x.png);}
	.support .icon.invoice{background-image: url(invoice_4@2x.png);@media (-webkit-min-devive-pixel-ratio:3),(min-devive-pixel-ratio:3) background-image: url(invoice_4@3x.png);}
	.support .icon.special{background-image: url(special_4@2x.png);@media (-webkit-min-devive-pixel-ratio:3),(min-devive-pixel-ratio:3) background-image: url(special_4@3x.png);}
	.support .text{font-size: 12px;line-height: 16px;color: rgb(7,17,27);}
	.pics{padding:18px;}
	.pic-warpper{width: 100;overflow: hidden;white-space: nowrap;}
	.pic-list{font-size: 0}
	.pic-item{display: inline-block;margin-right: 6px;width: 120px;height: 90px}
	.pic-item:last-child{margin: 0}
	.info{padding:18px 18px 0 18px;color: rgb(7,17,27)}
	.info .title{padding-bottom: 12px;border-bottom: 1px solid rgba(7,17,27,.1);line-height: 14px;font-size: 14px}
	.info  .info-item{padding: 16px 12px;line-height: 16px;border-bottom: 1px solid rgba(7,17,27,.1);font-size: 12px}
	.info  .info-item:last-child{border:none;}
	.favorite{position: absolute;right:11px;top: 10px;text-align: center;}
	.icon-favorite{display: block;width: 48px; margin-bottom: 4px; color: #d4d6d9;font-size: 24px;line-height: 24px}
	.icon-favorite.active{color: rgb(240,20,20);}
	.info .text{line-height: 10px;font-size: 10px;color: rgb(77,85,93);}
	</style>