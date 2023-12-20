<script lang="ts">
	import type { FileState } from '/@/routes/onlineprint/store';

	export let fileState: FileState;
</script>

<section class="mt-3 w-80 bg-white p-4">
	<div> 合计 </div>
	{#each fileState.files as item, idx}
		<div class="flex items-end justify-between pt-2">
			<p>{item.file.name}</p>
			<p class="text-end">&times;{fileState.files[idx].fileNum}</p>
		</div>
		<div class="outItem w-full flex justify-between">
			<p class="w-1/2 self-end text-base text-slate-600">总价:</p>
			<span class=" text-red-500"
				>{item.volume * item.fileNum * 1.2} <span class="text-xl">元</span>
			</span>
		</div>
	{/each}
</section>
