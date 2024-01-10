<script lang="ts">
	import { page } from '$app/stores';
	import { preferences } from '../../routes/store';
</script>

<div>
	<div class="flex items-end mb-3">
		<span class="w-20 text-dark-1">头像:</span>
		<img
			class="w-20 h-20 image-render-auto"
			src="https://picsum.photos/200/300"
			alt=""
		/>
	</div>
	<div class="flex items-end mb-3">
		<span class="w-20 text-dark-1">用户名:</span>
		<span>{$preferences.info.username}</span>
	</div>
	<div class="flex items-end mb-3">
		<span class="w-20 text-dark-1">学号:</span>
		<span>{$preferences.info.phone_num}</span>
	</div>
	<div class="flex items-end mb-3">
		<span class="w-20 text-dark-1">性别:</span>
		<span>{$preferences.info.phone_num}</span>
	</div>
	<div class="flex items-end mb-3">
		<span class="w-20 text-dark-1">手机号:</span>
		<span>{$preferences.info.phone_num}</span>
	</div>
	<div class="flex items-end mb-3">
		<span class="w-20 text-dark-1">注册时间:</span>
		<span>{$preferences.info.resign_time}</span>
	</div>
</div>
