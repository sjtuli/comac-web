<script lang="ts">
	// import { ModelStl } from './vue-3d-model/src';
	import Nav from '../../components/onlineprint/nav.svelte';

	let modelRef = {
		info: {
			volume: Number(),
			area: Number(),
		},
	};

	let state = {
		printType: 'fdm',
		Consumables: 'pla',
		moduleNumber: 1,
		files: new Array<File>(),
		filesNum: new Array<number>(),
		fileUrl: [],
		selectedFileId: 0,
	};

	function uploadFiles(event) {
		// if ('type' in event && event.type === 'change') {
		// 	// 模型文件
		// 	state.files = [...state.files, ...Array.from(event.target.files)];
		// 	const newFileNum = Array.from(
		// 		{ length: event.target.files.length },
		// 		(e, a) => {
		// 			return 1;
		// 		},
		// 	);
		// 	// 模型数量
		// 	state.filesNum = [...state.filesNum, ...newFileNum];
		// 	// 模型Url
		// 	const newFileUrl = Array.from(event.target.files).map((val, idx) => {
		// 		return window.URL.createObjectURL(val);
		// 	});
		// 	state.fileUrl = [...state.fileUrl, ...newFileUrl];
		// }
		// if (state.filesNum.length === Array.from(event.target.files).length) {
		// 	modelRef.value.onResize();
		// }
	}

	function delFile(idx, event) {
		if ('type' in event && event.type === 'click') {
			const confirMsg = confirm('确认删除吗?');
			if (confirMsg === true) {
				state.files.splice(idx, 1);
				state.filesNum.splice(idx, 1);
				state.fileUrl.splice(idx, 1);
			}
		}
	}

	let status = {
		step: 'upload',
	};

	function changeNumber(idx, event) {
		if (event === 'up') {
			state.filesNum[idx] += 1;
		} else if (event === 'down') {
			state.filesNum[idx] -= 1;
		} else if ('target' in event && event.type === 'change') {
			state.filesNum[idx] = event.target.value;
		}
		if (state.filesNum[idx] <= 1) {
			state.filesNum[idx] = 1;
		}
	}

	// watch(
	// 	() => state.selectedFileId,
	// 	(oldVal, newVal) => {},
	// 	{ deep: true, immediate: true },
	// );

	const selectli = (name) => {
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
		{#if state.files.length === 0}
			<fieldset class="h-120 w-screen-md border-none">
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
					<p class="rounded-e-md bg-sky-400 p-1 text-white">上传模型</p>
				</label>
			</fieldset>
		{/if}
		{#if state.files.length > 0}
			<div class="h-120 w-screen-md shadow-sm">
				<!-- <model-stl
					ref="modelRef"
					:src="state.fileUrl[state.selectedFileId]"
					:file-name="state.files[state.selectedFileId]?.name"
				></model-stl> -->
			</div>
		{/if}

		<div>
			<section class="w-80 bg-white py-2 text-base">
				<div class="flex items-center justify-center">
					<label
						class="w-20 w-70 cursor-pointer rounded-md bg-sky-400 p-1 text-center text-light-50 hover:bg-sky-500"
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
						on:change="{uploadFiles}"
					/>
				</div>
				<div class="mb-2 flex-none">
					<fieldset>
						<div class="my-2 border-y border-r text-center text-base">
							{#if state.files.length === 0}
								<p class="py-2">还没有文件</p>
							{:else}
								<div class="text-left">
									{#each state.files as file, idx}
										<div
											class="{`flex items-center justify-between ${
												state.selectedFileId === idx ? 'bg-sky-50' : ''
											}`}"
										>
											<p
												class="w-36 cursor-pointer truncate border-b py-2 pl-3 transition-all duration-300 hover:bg-light-500 hover:pl-0 hover:font-medium"
												on:click="{() => {
													state.selectedFileId = idx;
												}}"
											>
												name</p
											>
											<fieldset
												class="block w-30 flex items-center justify-between"
											>
												<div class="btn-group" role="group" aria-label="...">
													<button
														class="btn"
														on:click="{() => changeNumber(idx, 'down')}"
														>-</button
													>
													<input
														bind:value="{state.filesNum[idx]}"
														type="number"
														on:input="{() => changeNumber(idx, event)}"
													/>
													<button
														class="btn"
														on:click="{() => changeNumber(idx, 'up')}">+</button
													>
												</div>
												<button
													class="text-gray-600 hover:text-sky-600"
													on:click="{() => delFile(idx, event)}"
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
				<div class="inputItem">
					<p class="w-1/2 self-end pl-4 text-base text-slate-600">
						打印类型:
					</p>
					<fieldset>
						<div class="choiceItem">
							<input
								id="fdm"
								bind:value="{state.printType}"
								class="hidden"
								type="radio"
								name="printType"
								checked
							/>
							<label
								class="{`choice ${
									state.printType === 'fdm' ? 'selected' : ''
								}`}"
								for="fdm">FDM</label
							>
						</div>
						<div class="choiceItem">
							<input
								id="sla"
								bind:value="{state.printType}"
								class="hidden"
								type="radio"
								name="printType"
							/>
							<label
								class="{`choice ${
									state.printType === 'sla' ? 'selected' : ''
								}`}"
								for="sla">光固化</label
							>
						</div>
					</fieldset>
				</div>
				<div class="inputItem">
					<p class="w-1/2 self-end pl-4 text-base text-slate-600">耗材:</p>
					<fieldset class="w-full flex items-center">
						<div class="choiceItem">
							<input
								id="pla"
								bind:value="{state.Consumables}"
								class="hidden"
								type="radio"
								name="Consumables"
							/>
							<label
								class="{`choice ${
									state.Consumables === 'pla' ? 'selected' : ''
								}`}"
								for="pla">PLA</label
							>
						</div>
						<div class="choiceItem">
							<input
								id="abs"
								bind:value="{state.Consumables}"
								class="hidden"
								type="radio"
								name="Consumables"
							/>
							<label
								class="{`choice ${
									state.Consumables === 'abs' ? 'selected' : ''
								}`}"
								for="abs">ABS</label
							>
						</div>
					</fieldset>
				</div>
			</section>
			<section class="mt-3 w-80 bg-white p-4">
				<div> 合计 </div>
				{#each state.files as file, idx}
					<div class="flex items-end justify-between pt-2">
						<p>name</p>
						<p class="text-end">&times;{state.filesNum[idx]}</p>
					</div>
					<div class="outItem w-full flex justify-between">
						<p class="w-1/2 self-end text-base text-slate-600">总价:</p>
						<span class="text-3xl text-red-500"
							>0 <span class="text-xl">元</span>
						</span>
					</div>
				{/each}
			</section>
		</div>
	</section>
</main>

<style lang="scss" scoped>
	.selected {
		@apply bg-sky-50 text-sky-500;
	}

	fieldset {
		@apply border-none;
	}

	.inputItem {
		@apply flex mb-2;

		fieldset {
			@apply w-full items-center flex;

			.choiceItem {
				@apply mr-2;
			}

			.choice {
				@apply cursor-pointer p-1 hover:text-sky-500;
			}
		}
	}

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
