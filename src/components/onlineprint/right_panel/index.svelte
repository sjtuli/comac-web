<script lang="ts">
	import { fetch } from '$lib/fetch';
	import type { FileState } from '../../../routes/(order)/store';
	import UploadButton from './upload_button.svelte';
	import FileList from './file_list.svelte';
	import PrintParam from './print_param.svelte';
	import Summary from './summary.svelte';
	import * as CryptoJS from 'crypto-js';
	import { onMount } from 'svelte';
	import { messageStore } from '/@/components/common/message/store';

	export let fileState: FileState;

	async function createOrder() {
		let res = await fileState.pushFiles();
		switch (res.status) {
			case 'success':
				$messageStore = [
					...$messageStore,
					{ type: res.status, msg: res.message },
				];
				break;
			case 'error':
				$messageStore = [
					...$messageStore,
					{ type: res.status, msg: res.message },
				];
				break;
		}

		const upload_files_info = fileState.files.map((item, idx) => {
			return { id: item.id, md5: item.md5 };
		});

		if (res.status === 'success') {
			const order_res = await fetch(`/thprint/createOrder`, {
				method: 'POST',
				body: JSON.stringify({ files: upload_files_info }),
				headers: { 'Content-Type': 'application/json' },
			});
			let res_json = await order_res.json();
			if (order_res.ok) {
				$messageStore = [
					...$messageStore,
					{ type: 'success', msg: res_json.message },
				];
			} else {
				$messageStore = [
					...$messageStore,
					{ type: 'error', msg: res_json.message },
				];
			}
			console.log('order_res', await order_res.json());
		}
	}
</script>

<div>
	<section class="w-screen-md bg-white py-2 text-base">
		<UploadButton
			addFiles="{async (e) => {
				await fileState.addFiles(e);
				fileState = fileState;
			}}"
		></UploadButton>
		<FileList bind:fileState></FileList>
		<PrintParam {fileState} />
	</section>
	<Summary {fileState}></Summary>
	<section class="w-screen-md bg-white py-2 text-base pl-4 flex justify-end">
		<button class="border p-2 rounded" on:click="{createOrder}">下一步</button>
	</section>
</div>
