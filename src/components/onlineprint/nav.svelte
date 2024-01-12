<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	let steps = ['上传、估价', '付款', '等待打印完成'];
	let urls = ['upload', 'payment', 'printing'];

	export let selectedTab = 0;

	$: {
		selectedTab;
		browser && goto(urls[selectedTab]);
	}

	onMount(() => {
		switch ($page.url.pathname) {
			case '/upload':
				selectedTab = 0;
				break;
			case '/payment':
				selectedTab = 1;
				break;
			case '/printing':
				selectedTab = 2;
				break;
			case '/complete':
				selectedTab = 3;
				break;
		}
	});
</script>

<nav class="m-auto mb-3 w-screen-lg">
	<ul class="flex">
		{#each steps as step, idx}
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<li
				class="m-auto leading-10 bg-sky-100 inline-block text-sky-600 relative w-1/3 transition-all duration-300 pl-6 hover:pl-12 cursor-pointer hover:font-medium h-10 items-center flex
        {selectedTab === idx ? 'active' : ''}"
				on:click="{() => {
					selectedTab = idx;
				}}"
			>
				<span class="text-sm">Step </span>
				{idx + 1}
				{step}
			</li>
		{/each}
	</ul>
</nav>

<style lang="scss" scoped>
	nav li.active::after {
		@apply block absolute;
		position: absolute;
		top: 0;
		right: -1.25rem;
		z-index: 10;
		border-top: 1.25rem solid transparent;
		border-bottom: 1.25rem solid transparent;
		border-left: 1.25rem solid;
		content: '';
	}

	nav li.active::before {
		display: block;
		position: absolute;
		top: 0;
		left: 0px;
		border-top: 1.25rem solid transparent;
		border-bottom: 1.25rem solid transparent;
		border-left: 1.25rem solid rgb(224 242 254);
		content: '';
	}

	nav li:first-child {
		@apply rounded-l-xl;

		&::before {
			@apply hidden;
		}
	}

	nav li:last-child {
		@apply rounded-r-xl;

		&::after {
			@apply hidden;
		}
	}

	nav li.active {
		background: #1e9fff;
		color: #fff;
	}

	nav li.active:after {
		border-left-color: #1e9fff;
	}
</style>
