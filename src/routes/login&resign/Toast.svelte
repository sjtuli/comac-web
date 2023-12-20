<!-- Toast.svelte -->
<script lang="ts">
	import { fly } from 'svelte/transition';

	let message: string;
	let type: string;
	let background: string;
	export let visible = false;

	// 函数用于显示 Toast
	export function showToast(
		msg: string,
		_type: 'info' | 'success' | 'warning' | 'error',
	) {
		type = _type;
		message = msg;
		visible = true;
		setTimeout(() => {
			visible = false;
		}, 2000); // 5 秒后隐藏 Toast
	}

	$: {
		switch (type) {
			case 'success':
				background = 'bg-green-500';
				break;
			case 'warning':
				background = 'bg-yellow-500';
				break;
			case 'error':
				background = 'bg-red-500';
				break;
			case 'info':
				background = 'bg-blue-500';
				break;
			default:
				background = 'bg-blue-500';
		}
	}
</script>

{#if visible}
	<div
		transition:fly="{{ y: -10 }}"
		class="fixed top-30 right-10 p-3 rounded-xl text-xl text-light {background}"
	>
		{message}
	</div>
{/if}
