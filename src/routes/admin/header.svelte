<!-- Header.svelte -->
<script lang="ts">
	let isMenuOpen = false;

	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen;
	};
</script>

<header class="bg-blue-500 p-1 text-white flex">
	<!-- 首页图标 -->
	<div class="flex items-center">
		<img src="/sjtu-logo.png" alt="Home" class="h-12 bg-light" />
		<h1 class="text-lg font-semibold ml-3">3D打印云平台后台管理</h1>
	</div>

	<!-- 用户头像 -->
	<div class="flex items-center ml-auto">
		<img
			src="https://picsum.photos/200/300"
			alt="User"
			class="w-8 h-8 rounded-full mr-2"
		/>

		<!-- 消息图标 -->
		<img
			src="https://picsum.photos/200/300"
			alt="Message"
			class="w-6 h-6 cursor-pointer"
			on:click="{toggleMenu}"
		/>

		<!-- 响应式菜单 -->
		<div class="menu absolute top-full right-0 bg-white shadow-lg p-2 mt-2">
			<p>Menu Item 1</p>
			<p>Menu Item 2</p>
			<p>Menu Item 3</p>
		</div>
	</div>
</header>
