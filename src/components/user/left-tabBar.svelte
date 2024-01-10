<!-- LeftTabBar.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { selectedTab } from './store';
	export let tabs: string[];

	// 设置默认选中的 tab
	onMount(() => {
		selectedTab.set(tabs[0]);
	});
</script>

<div class="flex flex-col w-50 <2xl:w-30">
	{#each tabs as tab_, idx (idx)}
		<button
			class="{`tab p-2 mb-6 rounded-l-2xl hover:bg-[#ddd]  transition-300 cursor-pointer ${
				$selectedTab === tab_ ? 'bg-sky-300' : ''
			}`}"
			on:click="{() => {
				selectedTab.set(tab_);
			}}"
		>
			{tab_}
		</button>
	{/each}
</div>

<style lang="scss" scoped>
</style>
