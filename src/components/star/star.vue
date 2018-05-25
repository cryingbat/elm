<template>
	<div class="star" :class="starType">
		<span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" track-by='index'></span>
	</div>
</template>

<script>
	const LENGTH = 5;
	const CLA_ON = 'on';
	const CLA_OFF = 'off';
	const CLA_HALF = 'half';
	export default {
		props:{
			size:{
				type:Number
			},
			score:{
				type:Number
		   }
		},
		computed:{
			starType() {
				return "star-"+this.size;
		   },
		   itemClasses() {
		   	 let result = [];
		   	 let score = Math.floor(this.score*2)/2;
		   	 let hasDecimal = score%1 !== 0;
		   	 let integer = Math.floor(score);
		   	 for(let i=0; i<integer;i++){
		   	 	result.push(CLA_ON);
		   		}
		   	 if(hasDecimal){
		   		result.push(CLA_HALF);
		  	 }
		  	 while(result.length<LENGTH){
		  	 	result.push(CLA_OFF);
		  		}
		  	 return result;
			}
	    }
	}
</script>

<style type="text/css">
	.star{font-size: 0}
	.star .star-item{display: inline-block;background-repeat: no-repeat; }
	.star.star-48 .star-item{width: 20px;height: 20px;margin-right: 22px;background-size: 20px 20px}
	.star.star-48 .star-item:last-child{margin-right: 0}
	.star.star-48 .star-item.on{background-image: url(star48_on@2x.png); @media (-webkit-min-devive-pixel-ratio:3),(min-devive-pixel-ratio:3) background-image: url(star48_on@3x.png);}
	.star.star-48 .star-item.off{background-image: url(star48_off@2x.png);@media (-webkit-min-devive-pixel-ratio:3),(min-devive-pixel-ratio:3) background-image: url(star48_off@3x.png);}
	.star.star-48 .star-item.half{background-image: url(star48_half@2x.png); @media (-webkit-min-devive-pixel-ratio:3),(min-devive-pixel-ratio:3) background-image: url(star48_half@3x.png);}
	.star.star-36 .star-item{width: 15px;height: 15px;margin-right: 6px;background-size: 15px 15px}
	.star.star-36 .star-item:last-child{margin-right: 0}
	.star.star-36 .star-item.on{background-image: url(star36_on@2x.png); @media (-webkit-min-devive-pixel-ratio:3),(min-devive-pixel-ratio:3) background-image: url(star36_on@3x.png);}
	.star.star-36 .star-item.off{background-image: url(star36_off@2x.png); @media (-webkit-min-devive-pixel-ratio:3),(min-devive-pixel-ratio:3) background-image: url(star36_off@3x.png);}
	.star.star-36 .star-item.half{background-image: url(star36_half@2x.png); @media (-webkit-min-devive-pixel-ratio:3),(min-devive-pixel-ratio:3) background-image: url(star36_half@3x.png);}
	.star.star-24 .star-item{width: 10px;height: 10px;margin-right: 3px;background-size: 10px 10px}
	.star.star-24 .star-item:last-child{margin-right: 0}
	.star.star-24 .star-item.on{background-image: url(star24_on@2x.png); @media (-webkit-min-devive-pixel-ratio:3),(min-devive-pixel-ratio:3) background-image: url(star24_on@3x.png);}
	.star.star-24 .star-item.off{background-image: url(star24_off@2x.png); @media (-webkit-min-devive-pixel-ratio:3),(min-devive-pixel-ratio:3) background-image: url(star24_off@3x.png);}
	.star.star-24 .star-item.half{background-image: url(star24_half@2x.png); @media (-webkit-min-devive-pixel-ratio:3),(min-devive-pixel-ratio:3) background-image: url(star24_half@3x.png);}
</style>