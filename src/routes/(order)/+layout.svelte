<script lang="ts">
	import { selectedTab } from './../admin/store.ts';
	import Nav from '@/components/onlineprint/nav.svelte';

	let status = {
		step: 'upload',
	};

	const selectli = (name: any) => {
		switch (name) {
			case 'upload':
				status.step = 'upload';
				break;
			case 'pay':
				status.step = 'pay';
				break;
			case 'order':
				status.step = 'order';
				break;
		}
	};
</script>

<main class="mt-30 block">
	<Nav  />
	<slot />
</main>
