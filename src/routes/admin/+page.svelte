<script lang="ts">
	import MyOrder from '/@/components/user/my-order.svelte';
	import { selectedTab } from './store';
	import UserInfoTab from '/@/components/user/userInfoTab.svelte';
	import { preferences } from '../store';
	import type { Menu } from './store';
	import Leftbar from './leftbar.svelte';
	import Header from './header.svelte';
	import Userlist from './userlist.svelte';
</script>

<Header />
<main class="block m-auto flex">
	<Leftbar />
	<div class="border w-full p-5">
		<h1 class="mb-3">你好,{$preferences.info.username}</h1>
		<h1>{$selectedTab.name}</h1>
		<hr class="mb-3" />
		{#if $selectedTab.name === '后台首页'}
			<UserInfoTab></UserInfoTab>
		{:else if $selectedTab.name === '订单列表'}
			<MyOrder />
		{:else if $selectedTab.name === '注册用户'}
			<Userlist />
		{/if}
	</div>
</main>
