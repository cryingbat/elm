<template>
	<transition name="move">
	 <div v-show="showFlag"  class="food">
	 	
	 </div>
	</transition>
</template>

<script type="text/javascript">
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
			}
		}
	}
</script>

<style type="text/css">
	.food{position: fixed;left: 0;top: 0;bottom: 48px;z-index: 30;width: 100%;background: #fff}
	.move-enter{opacity: 0}
	.move-enter-active,.move-leave-active{transition: all 0.8s linear}
	.move-leave{opacity: 1}
</style>