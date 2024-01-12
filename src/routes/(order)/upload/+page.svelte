<script lang="ts">
	import RightPanel from '/@/components/onlineprint/right_panel/index.svelte';
	import ModelInput from '/@/routes/(order)/model_input.svelte';
	import { FileState } from '/@/routes/(order)/store';

	let fileState = new FileState();
</script>

<section class="mb-10 flex justify-center">
	<ModelInput
		uploadFiles="{async (e) => {
			await fileState.addFiles(e);
			fileState = fileState;
		}}"
		bind:fileState
	/>
	<RightPanel bind:fileState />
</section>
