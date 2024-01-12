<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';

	let countdown = 3;
	let interval: string | number | NodeJS.Timeout | undefined;

	const startCountdown = () => {
		interval = setInterval(() => {
			countdown -= 1;

			if (countdown === 0) {
				clearInterval(interval);
				navigateToOrdersPage();
			}
		}, 1000);
	};

	const navigateToOrdersPage = () => {
		goto('/1');
	};

	const navigateImmediately = () => {
		clearInterval(interval);
		navigateToOrdersPage();
	};

	onMount(() => {
		startCountdown();

		return () => {
			clearInterval(interval);
		};
	});
</script>

<section class="mb-10 flex justify-center">
	<div class="w-screen-lg bg-gray-100 p-6 rounded-md shadow-md">
		<h1 class="text-xl font-bold mb-4">订单提交成功</h1>
		<p>您的订单已提交，将在 {countdown} 秒后跳转到 "我的订单" 页面。</p>

		<div class="mt-4 flex justify-between">
			<button
				on:click="{navigateImmediately}"
				class="bg-blue-500 text-white py-2 px-4 rounded">立即跳转</button
			>
			<span class="text-gray-500">{countdown}s</span>
		</div>
	</div>
</section>
