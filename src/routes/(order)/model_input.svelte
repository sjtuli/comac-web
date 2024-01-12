<script lang="ts">
	import { onMount } from 'svelte';
	import ModelStl from '@/components/onlineprint/vue-3d-model/src/model-stl.svelte';
	import type { FileState } from './store';

	export let fileState: FileState;
	export let uploadFiles: (event: any) => void;
	let fileArea: HTMLFieldSetElement;

	onMount(() => {
		fileArea.addEventListener('dragenter', (e) => {
			e.preventDefault();
		});
		fileArea.addEventListener('dragover', (e) => {
			e.preventDefault();
		});
		fileArea.addEventListener('drop', function (event) {
			event.preventDefault();
			// 将类数组对象 转换成数组
			var fileList = Array.from(event.dataTransfer!.files);
			console.log(fileList);
		});
	});
</script>

{#if fileState.files.length === 0}
	<fieldset bind:this="{fileArea}" class="h-90 w-screen-sm border-none">
		<input
			id="file_upload"
			class="hidden"
			type="file"
			name="file_upload"
			accept=".stl,.3mf"
			multiple
			on:change="{uploadFiles}"
		/>
		<label
			for="file_upload"
			class="w-full h-full bg-sky-50 border border-2 border-slate-400 border-dashed flex flex-col text-slate-400 cursor-pointer items-center justify-center rounded-md hover:border-blue-600 hover:text-blue-600"
		>
			<span class="iconfont icon-upload text-5xl"></span>
			<span class="text-base text-black">拖拽模型到此或点击上传</span>
			<p class="rounded-md bg-sky-400 p-1 text-white">上传模型</p>
		</label>
	</fieldset>
{:else}
	<div class="h-90 w-screen-sm shadow-sm">
		<ModelStl
			bind:src="{fileState.files[fileState.selectedFileId].fileUrl}"
			fileName="{fileState.files[fileState.selectedFileId]?.file.name}"
		></ModelStl>
	</div>
{/if}
