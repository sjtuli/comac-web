<!-- LeftTabBar.svelte -->
<script lang="ts">
	import { selectedTab } from './store';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import type { Menu } from './store';
	import { menus } from './store';

	let activeMenu: Menu | null = null;

	const toggleSubMenu = (menu: Menu) => {
		if (activeMenu && activeMenu.id === menu.id) {
			// 点击已打开的一级菜单，折叠
			activeMenu = null;
		} else {
			// 点击未打开的一级菜单，打开
			activeMenu = menu;
			if (!menu.subMenus?.length) {
				$selectedTab = menu;
			}
		}
	};

	// 在组件挂载时折叠所有菜单
	onMount(() => {
		menus.forEach((menu) => {
			menu.isOpen = false;
		});
	});

	const toggleSubMenuItems = (menu: Menu) => {
		menu.isOpen = !menu.isOpen;
		$selectedTab = menu;
	};
</script>

<div class="tab-bar bg-[#333] h-[100vh] color-[#fff] w-50 overflow-y-auto">
	{#each menus as menu}
		<button
			class="p-3 block hover:bg-[#999] w-full"
			on:click="{() => toggleSubMenu(menu)}"
		>
			{menu.name}
			{#if menu.subMenus && menu.subMenus.length > 0}
				<span class="ml-2"
					>{activeMenu && activeMenu.id === menu.id ? '▲' : '▼'}</span
				>
			{/if}
		</button>

		{#if activeMenu && activeMenu.id === menu.id}
			<div
				class="{`bg-[#444] ${activeMenu ? 'block' : 'none'}`}"
				transition:slide
			>
				{#each menu.subMenus ?? [] as subMenu}
					<button
						transition:slide
						class="p-3 hover:bg-[#555] block w-full"
						on:click="{() => toggleSubMenuItems(subMenu)}"
						>{subMenu.name}</button
					>
				{/each}
			</div>
		{/if}
	{/each}
</div>

<style lang="scss" scoped>
</style>
