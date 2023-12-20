<script lang="ts">
	import ModelInput from './model_input.svelte';
	import Nav from '@/components/onlineprint/nav.svelte';
	import RightPanel from '/@/components/onlineprint/right_panel/index.svelte';
	import { FileState } from './store';

	let status = {
		step: 'upload',
	};

	let fileState = new FileState();

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
	<Nav />
	<section class="mb-10 flex justify-center">
		<ModelInput
			uploadFiles="{async (e) => {
				await fileState.uploadFiles(e);
				fileState = fileState;
			}}"
			bind:fileState
		/>
		<RightPanel bind:fileState />
	</section>
</main>
