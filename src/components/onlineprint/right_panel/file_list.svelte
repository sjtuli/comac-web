<script lang="ts">
	import type { FileState } from '../../../routes/(order)/store';

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
	<fieldset class=" border-r">
		<div class="my-2 text-center text-base">
			{#if fileState.files.length === 0}
				<p class="py-2">还没有文件</p>
			{:else}
				<table class="text-left">
					<thead>
						<tr>
							<th class="text-center">文件名</th>
							<th class="text-center"><label for="number">数量</label></th>
							<th class="text-center"><label for="scale">缩放</label></th>
							<th class="text-center"> <label for="dropdown">颜色</label> </th>
							<th class="text-center">积分</th>
							<th class="text-center">删除</th>
						</tr>
					</thead>
					<tbody>
						{#each fileState.files as { file, fileNum }, idx (idx)}
							<tr
								class=" {fileState.selectedFileId === idx ? 'bg-sky-50' : ''}"
							>
								<td>
									<button
										class="w-36 cursor-pointer truncate border pl-3 transition-all duration-300 hover:bg-light-500 hover:pl-0 hover:font-medium"
										on:click="{() => {
											fileState.selectedFileId = idx;
										}}"
									>
										{file.name}
									</button>
								</td>
								<td>
									<fieldset class="block flex items-center justify-between">
										<div class="flex items-center">
											<button
												class="border text-light-50 w-6 leading-6 bg-blue-400 text-center align-middle rounded-l-1 hover:bg-blue-600"
												on:click="{() => changeNumber(idx, 'down')}"
											>
												-
											</button>
											<input
												id="number"
												class="text-sm align-middle m-auto w-6 h-6 border-transparent"
												bind:value="{fileNum}"
												type="number"
												on:input="{(event) => changeNumber(idx, event)}"
											/>
											<button
												class="border text-light-50 w-6 leading-6 bg-blue-400 text-center rounded-r-1 hover:bg-blue-600"
												on:click="{() => changeNumber(idx, 'up')}"
											>
												+
											</button>
										</div>
									</fieldset>
								</td>
								<td>
									<div class="flex">
										<input id="scale" class="w-10" type="text" />%
									</div>
								</td>
								<td>
									<select id="dropdown" name="dropdown">
										<option value="option1">选项1</option>
										<option value="option2">选项2</option>
										<!-- 其他选项 -->
									</select>
								</td>
								<td> 123123 </td>
								<td>
									<button
										class="text-gray-600 hover:text-sky-600 w-10"
										on:click="{() => fileState.delFile(idx)}"
									>
										<span class="iconfont icon-shanchu text-xl"></span>
									</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
		</div>
	</fieldset>
</div>

<style lang="scss" scoped>
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}
	input[type='number'] {
		-moz-appearance: textfield;
	}

	table {
		border-collapse: collapse;
		width: 100%;
	}

	th,
	td {
		border: 1px solid #ddd;
		padding: 8px;
		text-align: center;
	}

	th {
		background-color: #f2f2f2;
	}

	tr:nth-child(even) {
		background-color: #f2f2f2;
	}

	tr:hover {
		background-color: #f5f5f5;
	}

	.responsive-table {
		@apply block sm:table;
	}
</style>
