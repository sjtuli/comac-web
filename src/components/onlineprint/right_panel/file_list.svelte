<script lang="ts">
	import type { FileState } from '/@/routes/onlineprint/store';

	export let fileState: FileState;

	function changeNumber(
		idx: number,
		event: string | (Event & { currentTarget: EventTarget & HTMLInputElement }),
	) {
		if (typeof event === 'string') {
			if (event === 'up') {
				fileState.files[idx].fileNum += 1;
			} else if (event === 'down') {
				fileState.files[idx].fileNum -= 1;
			}
		} else if (event.type === 'change') {
			fileState.files[idx].fileNum = event.target! as unknown as number;
		}
		if (fileState.files[idx].fileNum <= 1) {
			fileState.files[idx].fileNum = 1;
		}
	}
</script>

<div class="mb-2 flex-none">
	<fieldset>
		<div class="my-2 border-y border-r text-center text-base">
			{#if fileState.files.length === 0}
				<p class="py-2">还没有文件</p>
			{:else}
				<div class="text-left">
					{#each fileState.files as item, idx (idx)}
						<div
							class="flex items-center justify-between {fileState.selectedFileId ===
							idx
								? 'bg-sky-50'
								: ''}"
						>
							<button
								class="w-36 cursor-pointer truncate border-b py-2 pl-3 transition-all duration-300 hover:bg-light-500 hover:pl-0 hover:font-medium"
								on:click="{() => {
									fileState.selectedFileId = idx;
									fileState = fileState;
								}}"
							>
								{item.file.name}</button
							>
							<fieldset class="block w-30 flex items-center justify-between">
								<div class="btn-group" role="group" aria-label="...">
									<button
										class="btn"
										on:click="{() => changeNumber(idx, 'down')}">-</button
									>
									<input
										bind:value="{fileState.files[idx].fileNum}"
										type="number"
										on:input="{(event) => changeNumber(idx, event)}"
									/>
									<button class="btn" on:click="{() => changeNumber(idx, 'up')}"
										>+</button
									>
								</div>
								<button
									class="text-gray-600 hover:text-sky-600"
									on:click="{(event) => {
										fileState.delFile(idx, event);
										fileState = fileState;
									}}"
								>
									<span class="iconfont icon-shanchu text-xl"></span>
								</button>
							</fieldset>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</fieldset>
</div>

<style lang="scss" scoped>
	.btn-group {
		@apply flex items-center block;

		.btn {
			margin-left: -1px;
			@apply border text-light-50 w-6 leading-6 bg-blue-400 text-center align-middle hover:bg-blue-600;
		}

		input {
			@apply align-middle m-auto w-10 h-8 border-transparent;
		}

		input::-webkit-outer-spin-button,
		input::-webkit-inner-spin-button {
			-webkit-appearance: none;
		}

		input[type='number'] {
			-moz-appearance: textfield;
		}

		.btn:first-child {
			@apply rounded-l-lg ml-0;
		}

		.btn:last-child {
			@apply rounded-r-lg ml-0;
		}
	}
</style>
