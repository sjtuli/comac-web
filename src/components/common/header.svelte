<script lang="ts">
	import { ButtonTypes } from './button.store';
	import Button from './button.svelte';
	import Menu from './menu.svelte';

	let menuVisible = false;
	function setmenuVisible(i: boolean) {
		menuVisible = i;
	}
</script>

<template>
	<header
		class="pointer-events-none w-full fixed top-0 py-8 select-none z-50 bg-gradient-to-b dark:from-gray-900 to-transparent from-[#50B0EC]"
	>
		<div class="flex justify-between section-container pointer-events-auto">
			<a href="/#home" class="link flex w-100 justify-between items-center">
				<img
					src="/sjtu-logo.png"
					alt="Logo - Ayush Singh"
					width="{200}"
					height="{22}"
				/>
				<div class="bg-black w-0.3 h-2/3"></div>
				<span class="text-2xl text-[#C8161D]">3D打印云平台</span>
			</a>
			<nav class="flex items-center justify-between w-70 <sm:w-40">
				<Button
					classes=" "
					type="{ButtonTypes.PRIMARY}"
					name="在线打印"
					href="/onlineprint"
					otherProps="{{
						rel: 'noreferrer',
					}}"
				></Button>
				<a href="\login&resign" class="text-xl <sm:hidden">Jaccount 登录</a>
				<div class="outer-menu sm:hidden {menuVisible ? 'menu-visible' : ''}">
					<button
						class="hamburger w-6 h-6 flex items-center justify-center link relative"
						on:click="{() => {
							menuVisible = !menuVisible;
						}}"
					>
						<div
							class="relative flex-none w-full bg-white duration-300 flex items-center justify-center"
						></div>
					</button>
					<Menu {setmenuVisible} />
				</div>
			</nav>
		</div>
	</header>
</template>
