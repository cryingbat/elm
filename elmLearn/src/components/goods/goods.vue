<template>
	<div>
		<div class="goods">
			<div class="menu-warpper" ref='mwarpper'>
				<ul >
					<li  v-for="(item,$index) in goods" class="menu-item" :class="{'current': currentIndex==$index}"  @click='selectMenu($index,$event)'>
						<span class="text">
							<span v-show='item.type>0' class="icon" :class='classMap[item.type]'></span>{{item.name}}
						</span>
					</li>
				</ul>
			</div>
			<div class="foods-warpper" ref='fwarpper'>
				<ul>
					<li v-for='(item,index) in goods' class="food-list food-list-hook">
						<h1 class="title">{{item.name}}</h1>
						<ul>
							<li @click="selectFood(foods)" v-for='foods in item.foods' class="food-item">
								<div class="icon">
									<img width="57" height="57" :src="foods.icon" alt="">
								</div>
								<div class="content">
									<h2 class="name">{{foods.name}}</h2>
									<p class="desc">{{foods.description}}</p>
									<div class="extra">
										<span class="count">月售{{foods.sellCount}}份</span><span>好评率{{foods.rating}}%</span>
									</div>
									<div class="price">
										<span class="now">￥{{foods.price}}</span><span class="old" v-show='foods.oldPrice'>￥{{foods.oldPrice}}</span>
									</div>
									<div class="cartcontrol-warpper">
										<cartcontrol :food='foods'></cartcontrol>
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<shopcart  :select-foods='selectFoods' :delivery-price='seller.deliveryPrice' :min-price='seller.minPrice' ></shopcart>
		</div>
		<food :food="selectedFood" ref='food'></food>
	</div>
</template>

<script type='text/ecmascript-6'>
	import Bscroll from "better-scroll"
	import food from "@/components/food/food"
	import shopcart from "@/components/shopcart/shopcart"
	import cartcontrol from "@/components/cartcontrol/cartcontrol"
	const ERR_OK = 0;
	export default {
	 props:{
	 	seller:{
	 	   type:Object
	 	  }
		},
		data(){
			return {
				goods:[],
				listHeight:[],
				scrollY: 0,
				selectedFood:{}
			};
		},
		computed: {
			currentIndex() {
			  for(let i = 0; i<this.listHeight.length; i++){
			  	  let height1 = this.listHeight[i];
			  	  let height2 = this.listHeight[i+1];
			  	  if(!height2 || (this.scrollY >= height1 && this.scrollY<height2)){
			  	  	return i;
			  		}
				}
				return 0;
			},
			selectFoods() {
			 let foods = [];
			 this.goods.forEach( (good) => {
			  good.foods.forEach((food) => {
			  		if(food.count){
			  			foods.push(food)
			  		}
				})
			})
				return foods;
			}
		},
		created(){
		this.classMap = ['decrease','discount','special','invoice','guarantee'];
		 this.$http.get("/api/goods").then((response) => {
		 		response = response.body;
		 		if(response.errno == ERR_OK ){
		 			this.goods = response.data;
		 			this.$nextTick(() => {
		 			  this._initScroll();
		 			  this._caculateHeight();
		 			})
		 		}
			})
		},
		components: {
			shopcart,
			cartcontrol,
			food
		},
		methods :{
			selectFood(food) {
				this.selectedFood == food;
				this.$refs.food.show();
			},
			selectMenu(index,event) {
				if(!event._constructed){
					return;
			  	};
				let foodList = this.$refs.fwarpper.getElementsByClassName('food-list-hook');
				let el = foodList[index];
				this.foodScroll.scrollToElement(el,300);
			},
			_initScroll() {
				this.menuScroll = new Bscroll(this.$refs.mwarpper, {
					click:true
				});
				this.foodScroll = new Bscroll(this.$refs.fwarpper, {
					click:true,
					probeType: 3
				})
				this.foodScroll.on("scroll",(pos) => {
					this.scrollY = Math.abs( Math.round(pos.y) );
				})
			},
			_caculateHeight() {
				let foodList = this.$refs.fwarpper.getElementsByClassName('food-list-hook');
				let height = 0;
				this.listHeight.push(height);
				for(let i = 0; i<foodList.length; i++){
					let item = foodList[i];
					height += item.clientHeight;
					this.listHeight.push(height);
				}
			}
		}
	}
</script>

<style type="text/css" scoped>
	.goods{display: flex;overflow: hidden; position: absolute;top: 174px;bottom: 46px; width: 100%}
	.goods .menu-warpper{flex: 0  0 80px;width: 80px;background:#f3f5f7; }
	.goods .menu-warpper .menu-item{display: table;height: 54px;width: 56px;line-height: 14px;padding: 0 12px;border-bottom: 1px solid rgba(7,17,27,.1)}
	.current{position: relative;margin-top: -1px;background-color: #fff;font-weight: 700;}
	.goods .menu-warpper .menu-item .icon{display: inline-block;width: 12px;height: 12px;margin-right: 2px;background-size: 12px 12px;background-repeat: no-repeat;vertical-align: top;}
	.goods .menu-warpper .menu-item .icon.decrease{background-image: url(decrease_3@2x.png);@media (-webkit-min-devive-pixel-ratio:3),(min-devive-pixel-ratio:3) background-image: url(decrease_3@3x.png);}
	.goods .menu-warpper .menu-item .icon.discount{background-image: url(discount_3@2x.png);@media (-webkit-min-devive-pixel-ratio:3),(min-devive-pixel-ratio:3) background-image: url(discount_3@3x.png);}
	.goods .menu-warpper .menu-item .icon.guarantee{background-image: url(guarantee_3@2x.png);@media (-webkit-min-devive-pixel-ratio:3),(min-devive-pixel-ratio:3) background-image: url(guarantee_3@3x.png);}
	.goods .menu-warpper .menu-item .icon.invoice{background-image: url(invoice_3@2x.png);@media (-webkit-min-devive-pixel-ratio:3),(min-devive-pixel-ratio:3) background-image: url(invoice_3@3x.png);}
	.goods .menu-warpper .menu-item .icon.special{background-image: url(special_3@2x.png);@media (-webkit-min-devive-pixel-ratio:3),(min-devive-pixel-ratio:3) background-image: url(special_3@3x.png);}
	.goods .menu-warpper .menu-item .text{display: table-cell;width: 56px;vertical-align: middle; font-size: 12px;}
	.goods .foods-warpper{flex: 1}
	.goods .foods-warpper .title{padding-left: 14px;height: 26px;line-height: 26px;border-left: 2px solid #d9dde1;font-size: 12px;color:rgba(147,153,159);background:#f3f5f7;}
	.food-item{display: flex;margin: 18px;border-bottom: 1px solid rgba(7,17,27,.1);padding-bottom: 18px}
	.food-item:last-child{border-bottom: 0;margin-bottom: 0}
	.food-item .icon{flex: 0 0 57px;margin-right: 10px}
	.food-item .content{flex: 1;position: relative;font-size: 12px}
	.food-item .content .name{font-size: 14px;line-height: 14px;margin:2px 0 8px 0; color: rgb(7,17,27);}
	.food-item .content .desc{margin-bottom: 8px;line-height: 14px}
	.food-item .content .extra .count{margin-right: 12px;}
	.food-item .content .price{font-weight: 700;line-height: 24px}
	.now{color: rgb(240,20,20);margin-right: 18px;font-size: 14px;}
	.old{text-decoration: line-through;font-size: 10px;color: rgb(147,153,159);}
	.cartcontrol-warpper{position: absolute;right: 0;bottom: -12px}
</style>