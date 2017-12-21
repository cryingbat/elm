<template>
	<div class="header">
		<div class="content-warpper">
			<div class="avatar">
				<img width="64" height="64" :src="seller.avatar" />
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="discription">
					{{seller.description}}/{{seller.deliveryTime}}
				</div>
				<div v-if="seller.supports" class="support">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
				<div v-if="seller.supports" class="support-count" @click='showDetail'>
					<span class="count">{{seller.supports.length}}个</span>
					<i class="icon-keyboard_arrow_right"></i>
				</div>
			</div>
		</div>
		<div class="bulletin-wrapper" @click='showDetail'>
			<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" alt="" width="100%" height="100%">
		</div>
		<transition name='dialog'>
			<div v-show='detailShow' class="detail">
				<div class="detail-warpper clearfix">
					<div class="detail-main">
						<h1 class="name">{{seller.name}}</h1>
						<div class="star-warpper">
							<star :size='48' :score='seller.score'></star>
						</div>
						<div class="title2">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul v:if='seller.supports' class="supports">
							<li class="support-item" v-for='(item,index) in seller.supports'>
								<span class="icon" :class='classMap[seller.supports[index].type]'></span><span class="text" >{{seller.supports[index].description}}</span>
							</li>
						</ul>
						<div class="title2">
							<div class="line"></div>
							<div class="text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletin">
							<p class="content">{{seller.bulletin}}</p>
						</div>
					</div>
				</div>
				<div class="detail-close" @click='closeDetail'>
					<i class="icon-close"></i>
				</div>
			</div>
		</transition>
	</div>
</template>

<script type="text/ecmascript-6">
	import star from '@/components/star/star'
	export default {
	  data(){
	  	   return {
	  	   	  detailShow: false
	  		}
	  },
	  props: {
		seller: {
			type: Object
		}
	  },
	  created(){
	  	this.classMap = ['decrease','discount','special','invoice','guarantee'];
	  },
      components:{
      	star
  	  },
	  methods:{
	  	showDetail() {
	  	  this.detailShow = true
	  	 },
	  	closeDetail() {
	  	  this.detailShow = false
	  	}
	  }
	};
</script>

<style type="text/css">
	.clearfix{
	  display: inline-block;
	  }
	.clearfix::after{
	  display: block;
	  line-height: 0;
	  content: '';
	  clear: both;
	  height: 0;
	  visibility: hidden;
	}
	.header{position: relative;color: #fff;overflow: hidden;}
	.content-warpper{position: relative; padding: 24px 12px 18px 24px;font-size: 0}
	.avatar{display: inline-block;vertical-align: top}
	.avatar img{border-radius: 2px}
	.content-warpper .content{display: inline-block;font-size: 14px;margin-left: 16px}
	.content .title{margin:2px 0 8px 0;}
	.title .brand{width: 30px;height: 18px;display: inline-block;background-size: 30px 18px;background-repeat: no-repeat;vertical-align: top;background-image: url(brand@2x.png);@media (-webkit-min-devive-pixel-ratio:3),(min-devive-pixel-ratio:3) background-image: url(brand@3x.png);}
	.title .name{margin-left: 6px;font-size: 16px;line-height: 18px;font-weight: bold;}
	.content .discription{margin-bottom: 10px;line-height: 12px;font-size: 12px;}
	.support .icon{display: inline-block;width: 12px;height: 12px;margin-right: 4px;background-size: 12px 12px;background-repeat: no-repeat;vertical-align: top;}
	.support .icon.decrease{background-image: url(decrease_1@2x.png);@media (-webkit-min-devive-pixel-ratio:3),(min-devive-pixel-ratio:3) background-image: url(decrease_1@3x.png);}
	.support .icon.discount{background-image: url(discount_1@2x.png);@media (-webkit-min-devive-pixel-ratio:3),(min-devive-pixel-ratio:3) background-image: url(discount_1@3x.png);}
	.support .icon.guarantee{background-image: url(guarantee_1@2x.png);@media (-webkit-min-devive-pixel-ratio:3),(min-devive-pixel-ratio:3) background-image: url(guarantee_1@3x.png);}
	.support .icon.invoice{background-image: url(invoice_1@2x.png);@media (-webkit-min-devive-pixel-ratio:3),(min-devive-pixel-ratio:3) background-image: url(invoice_1@3x.png);}
	.support .icon.special{background-image: url(special_1@2x.png);@media (-webkit-min-devive-pixel-ratio:3),(min-devive-pixel-ratio:3) background-image: url(special_1@3x.png);}
	.support .text{line-height: 12px;font-size: 10px;}
	.support-count{position: absolute;right: 12px;bottom: 14px;padding: 0 8px;height: 24px;line-height: 24px;border-radius: 14px;background: rgba(0,0,0,.2);text-align: center;}
	.support-count .count{font-size: 10px;vertical-align: top;}
	.icon-keyboard_arrow_right{font-size: 10px;margin-left: 2px;line-height: 24px}
	.bulletin-wrapper{position: relative; height: 28px;line-height: 28px;padding:0 22px  0 12px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;background: rgba(7,17,27,.2);}
	.bulletin-wrapper .bulletin-title{display: inline-block;width: 22px;height: 12px;vertical-align: top;margin-top: 8px; background-image: url(bulletin@2x.png);background-size: 22px 12px; @media (-webkit-min-devive-pixel-ratio:3),(min-devive-pixel-ratio:3) background-image: url(bulletin@3x.png);}
	.bulletin-wrapper .bulletin-text{font-size: 10px;margin: 0 4px}
	.bulletin-wrapper .icon-keyboard_arrow_right{position: absolute;right: 12px;font-size: 10px;top: 4px;display: inline-block;width: 12px;height: 12px}
	.background{position: absolute;top: 0;left: 0;width: 100%;height: 100%;filter: blur(10px); z-index: -1;background-color: rgba(7,17,27,.5);}
	.detail{position: fixed;top: 0;left: 0; z-index: 100;width: 100%;height: 100%;overflow: auto;transition: all 0.8s;background: rgba(7,17,27,.8);backdrop-filter:blur(10px);}
	.detail-warpper{min-height: 100%}
	.detail-main{margin-top: 64px;padding-bottom: 64px}
	.detail-main .name{line-height: 16px;text-align: center;font-weight: 700;font-size: 16px;}
	.detail-close{position: relative;width: 32px;height: 32px;margin: -64px auto 0 auto;clear:both;font-size: 32px}
	.star-warpper{margin-top: 18px;padding: 2px 0;text-align: center;}
    .title2{display: flex; width: 80%;margin:28px auto 24px auto;}
	.title2 .line{flex: 1;position: relative;top: -6px;border-bottom: 1px solid rgba(255,255,255,.2)}
	.title2 .text{padding: 0 12px;font-size: 14px;font-weight: 700}
	.supports{width: 80%;margin:0 auto;}
	.supports .support-item{padding: 0 12px;margin-bottom: 12px;font-size: 0}
	.supports .support-item:last-child{margin-bottom: 0}
	.supports .icon{display: inline-block;width: 16px;height: 16px;vertical-align: top;margin-right: 6px;background-size: 16px 16px;background-repeat: no-repeat;}
	.supports .icon.decrease{background-image: url(decrease_2@2x.png);@media (-webkit-min-devive-pixel-ratio:3),(min-devive-pixel-ratio:3) background-image: url(decrease_2@3x.png);}
	.supports .icon.discount{background-image: url(discount_2@2x.png);@media (-webkit-min-devive-pixel-ratio:3),(min-devive-pixel-ratio:3) background-image: url(discount_2@3x.png);}
	.supports .icon.guarantee{background-image: url(guarantee_2@2x.png);@media (-webkit-min-devive-pixel-ratio:3),(min-devive-pixel-ratio:3) background-image: url(guarantee_2@3x.png);}
	.supports .icon.invoice{background-image: url(invoice_2@2x.png);@media (-webkit-min-devive-pixel-ratio:3),(min-devive-pixel-ratio:3) background-image: url(invoice_2@3x.png);}
	.supports .icon.special{background-image: url(special_2@2x.png);@media (-webkit-min-devive-pixel-ratio:3),(min-devive-pixel-ratio:3) background-image: url(special_2@3x.png);}
	.supports .support-item .text{font-size: 12px;line-height: 16px}
	.bulletin{width: 80%;margin: 0 auto}
	.bulletin .content{padding: 0 12px ;line-height: 24px;font-size: 12px}
	.dialog-enter{opacity: 0}
	.dialog-enter-active,.dialog-leave-active{transition: all 0.8s}
	.dialog-leave{opacity: 1;}
</style>