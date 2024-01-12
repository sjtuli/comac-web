<script lang="ts">
	import type { ChangeEventHandler } from 'svelte/elements';

	export let addFiles: ChangeEventHandler<HTMLInputElement>;
</script>

<div class="flex items-center justify-start">
	<label
		class=" w-70 cursor-pointer rounded bg-sky-400 p-1 text-center text-light-50 hover:bg-sky-500"
		for="file_upload"
	>
		<span class="iconfont icon-upload"></span>上传模型</label
	>
	<input
		id="file_upload"
		class="hidden"
		type="file"
		name="file_upload"
		accept=".stl,.3mf"
		multiple
		on:change="{addFiles}"
	/>
</div>
