<template>
	<div>
		<div class="shopcart">
		<div class="content" @click="toggleList">
			<div class="content-left">
				<div class="logo-warpper">
					<div class="logo" :class="{'highlight':totalCount>0}">
						<i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
					</div>
					<div class="num" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right">
				<div class="pay" :class="payClass" @click.prevent='pay'>{{payDesc}}</div>
			</div>
		</div>
			<div class="shopcart-list" v-show="listShow" :class="{'shopcartposition' : listShow}">
				<div class="list-header">
					<h1 class="title">购物车</h1>
					<span class="empty" @click='empty'>清空</span>
				</div>
				<div class="list-content" ref="listcontent">
					<ul>
						<li class="food" v-for="food in selectFoods">
							<span class="name">{{food.name}}</span>
							<div class="price">
								<span>￥{{food.price*food.count}}</span>
							</div>
							<div class="cartcontrol-warpper">
								<cartcontrol :food="food"></cartcontrol>
							</div>
						</li>
					</ul>
				</div>
			</div>
	</div>
	<div class="list-mask" v-show='listShow' @click='toggleList'></div>
	</div>
</template>

<script >
	import Bscroll from "better-scroll"
	import cartcontrol from "@/components/cartcontrol/cartcontrol"

	export default {
		props:{
			selectFoods:{
				type:Array,
				default() {
					return [];
				}
			},
			deliveryPrice:{
				type:Number,
				default:0
			},
			minPrice:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				fold:true
			}
		},
		methods:{
			toggleList() {
			  if(!this.totalCount){
			  	return;
			  }else{
			  	this.fold = !this.fold;
			  }
			},
			empty() {
				this.selectFoods.forEach((food) => {
					food.count=0;
				})
			},
			pay() {
				if(this.totalPrice<this.minPrice){
					return;
				}else{
					window.alert(`支付${this.totalPrice}元`)
				}
			}
		},
		computed:{
			totalPrice() {
				let total = 0;
				this.selectFoods.forEach((food) => {
					total += food.price * food.count;
				})
				return total;
			},
			totalCount(){
				let count = 0;
				this.selectFoods.forEach((food) => {
					count += food.count;
				})
				return count;
			},
			payDesc() {
			  if(this.totalPrice === 0){
			  	return `￥${this.minPrice}元起送`
	           }else if(this.totalPrice < this.minPrice){
	           	let dif=this.minPrice-this.totalPrice
	           	return `还差￥${dif}元起送`
	           }else{
	           	return `去结算`
	           }
			},
			payClass() {
				if(this.totalPrice<this.minPrice){
					return "not_enough"
				}else{
					return "enough"
				}
			},
			listShow() {
				if(!this.totalCount){
					this.fold=true;
					return false;
				}
				let show = !this.fold;
				if(show){
					if(!this.scroll){
						this.$nextTick(() => {
						this.scroll = new Bscroll(this.$refs.listcontent,{
							click:true
						})
					})
					}else{
						this.scroll.refresh();
					}
				}
				return show;
			}
		},
		components:{
			cartcontrol
		}
	}
</script>

<style type='css/text' scoped>
	.shopcart{position: fixed;bottom: 0;left: 0;z-index: 50;width: 100%;height: 48px;}
	.shopcart .content{display: flex;font-size: 0; background-color: #141d27;height: 48px;}
	.shopcart .content-left{flex: 1; height: 48px;}
	.shopcart .content-left .logo-warpper{position: relative;top: -10px;margin: 0 12px;padding: 6px;width: 56px;height: 56px;box-sizing: border-box;vertical-align: top;border-radius: 50%;background-color: #141d27;  display: inline-block; }
	.shopcart .content-left .logo-warpper .num{position: absolute;top: 0;right: 0;width: 24px;height: 16px;line-height: 16px;text-align: center;border-radius: 16px;font-size: 9px;background: rgb(240,20,20);color: #fff;font-weight: 700; box-shadow: 0 4px 8px 0 rgba(0,0,0,.4)}
	.logo{width: 100%;height: 100%;border-radius: 50%;background-color: #2b343c;}
	.logo.highlight{background: rgb(0,160,220);}
	.icon-shopping_cart{line-height: 44px;text-align: center; font-size: 24px; color: #80858a;height: 44px;width: 44px;display: inline-block;}
	.icon-shopping_cart.highlight{color:#fff;}
	.shopcart .content-left .price{ display: inline-block; vertical-align: top;line-height: 24px;margin-top: 12px;box-sizing: border-box;padding-right: 12px;border-right: 1px solid rgba(255,255,255,.1);font-size: 16px;font-weight: 700;color:rgba(255,255,255,.4);}
	.shopcart .content-left .price.highlight{color: #fff;}
	.shopcart .content-left .desc{ display: inline-block; vertical-align: top;line-height: 24px;margin: 12px  0 0 12px;color: rgba(255,255,255,.4);font-size: 10px}
	.shopcart .content-right{flex: 0,0,105px; width: 105px;height: 48px;}
	.pay{height: 48px;text-align: center;line-height: 48px;font-size: 12px;color: rgba(255,255,255,.4);background-color: #2b333b;font-weight: 700}
	.pay.not_enough{background: #2b333b}
	.pay.enough{background: #00b43c;color: #fff}
	.shopcart .shopcart-list{position: absolute;top: 0;left: 0;z-index: -1;width: 100%;transition: all 0.5s ease;}
	/*.fade-enter-to,.fade-leave{position: absolute;top: -100%;left: 0;z-index: -1;width: 100%;transition: all 0.5s ease;transform: translateY(0);}
	.fade-enter,.fade-leave-to{transform: translateY(-100%);}*/
	.shopcart .shopcart-list.shopcartposition{transform: translateY(-100%);}
	.list-header{height: 40px;line-height: 40px;padding:0 18px; background: #f3f6f7;font-size: 14px;font-weight: 200;color: rgb(7,17,27);border-bottom: 1px solid rgba(7,17,27,.1)}
	.list-header .title{float: left;font-size: 14px;color: rgb(7,17,27);}
	.list-header .empty{float: right;font-size: 12px;color: rgb(0,160,220);}
	.list-content{padding:0 18px ;max-height: 217px;background: #fff;overflow: hidden;}
	.list-content .food{position: relative;box-sizing: border-box;padding: 12px 0;border-bottom: 1px solid rgba(7,17,27,.1)}
	.list-content .food .name{line-height: 24px;font-size: 14px;color: rgb(7,17,27);}
	.list-content .food .price{position: absolute;right: 90px;bottom: 12px;line-height: 24px;font-size: 14px;font-weight: 700;color: rgb(240,20,20);}
	.list-content .food .cartcontrol-warpper{position: absolute;right: 0px;bottom: 6px;}
	.list-mask{position: fixed;top: 0;left: 0; width: 100%;height: 100%;z-index: 40;opacity: 1;background: rgba(7,17,27,0.6);backdrop-filter:blur(10px);}
</style>