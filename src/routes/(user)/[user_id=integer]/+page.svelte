<script lang="ts">
	import CreditPoint from './credit-point.svelte';
	import { page } from '$app/stores';
	import LeftTabBar from '../../../components/user/left-tabBar.svelte';
	import MyOrder from '/@/components/user/my-order.svelte';
	import { selectedTab } from '/@/components/user/store';
	import UserInfoTab from '/@/components/user/userInfoTab.svelte';
	import { preferences } from '../../store';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { messageStore } from '/@/components/common/message/store';
	const productId = $page.params.user_id;

	onMount(() => {
		if ($preferences.isLogin && !$preferences.isLogin()) {
			$messageStore = [...$messageStore, { type: 'error', msg: '请先登录' }];
			goto('/login-resign');
		}
	});
</script>

<main class="mt-30 block m-auto 2xl:w-screen-2xl flex">
	<LeftTabBar tabs="{['个人信息', '我的订单', '我的积分']}" />
	<div class="border w-full p-5">
		<h1>你好,{$preferences.info.username}</h1>
		<h1>{$selectedTab}</h1>
		<!-- 其他内容 -->
		<hr class="mb-3" />
		{#if $selectedTab === '个人信息'}
			<UserInfoTab />
		{:else if $selectedTab === '我的订单'}
			<MyOrder />
		{:else if $selectedTab === '我的积分'}
			<CreditPoint />
		{/if}
	</div>
</main>

<style lang="scss" scoped>
</style>
