<script lang="ts">
	import type { FileState } from '/@/routes/onlineprint/store';
	import UploadButton from './upload_button.svelte';
	import FileList from './file_list.svelte';
	import PrintParam from './print_param.svelte';
	import Summary from './summary.svelte';

	export let fileState: FileState;
</script>

<div>
	<section class="w-80 bg-white py-2 text-base">
		<UploadButton
			uploadFiles="{async (e) => {
				await fileState.uploadFiles(e);
				fileState = fileState;
			}}"
		></UploadButton>
		<FileList bind:fileState></FileList>
		<PrintParam {fileState} />
	</section>
	<Summary {fileState}></Summary>
</div>

<style lang="scss" scoped>
</style>
