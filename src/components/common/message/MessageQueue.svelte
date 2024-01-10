<script lang="ts">
	import { messageStore } from './store';
	import type { MessageObject } from './store';
	import Message from './Message.svelte';
	import { onMount, onDestroy } from 'svelte';

	let messages: (string | MessageObject)[] = [];

	const unsubscribe = messageStore.subscribe((value) => {});

	onMount(() => {
		messages = $messageStore;
	});

	$: {
		if ($messageStore && $messageStore.length > messages.length) {
			setTimeout(() => {
				// 移除队列中的第一个消息
				$messageStore = $messageStore.slice(1);
			}, 3000);
		}
		messages = $messageStore;
	}

	function messageToShow(message: string | MessageObject) {
		return typeof message === 'string' ? message : message.msg;
	}

	function isDictionary(
		obj: Record<string, any> | string | MessageObject,
	): obj is Record<string, any> {
		return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
	}

	onDestroy(() => {
		unsubscribe();
	});
</script>

<div class="fixed top-30 right-10">
	{#each messages as message, idx (idx)}
		<Message
			message="{messageToShow(message)}"
			type="{isDictionary(message) ? message.type : 'default'}"
		/>
	{/each}
</div>

<style lang="scss" scoped>
</style>
