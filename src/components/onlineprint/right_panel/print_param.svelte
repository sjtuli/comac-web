<script lang="ts">
	import type { FileState } from "../../../routes/(order)/store";

	export let fileState: FileState;
</script>

<div class="inputItem">
	<p class="w-1/2 self-end pl-4 text-base text-slate-600"> 打印类型: </p>
	<fieldset>
		<div class="choiceItem">
			<input
				id="fdm"
				bind:value="{fileState.printType}"
				class="hidden"
				type="radio"
				name="printType"
				checked
			/>
			<label
				class="choice {fileState.printType === 'fdm' && 'selected'}"
				for="fdm">FDM</label
			>
		</div>
		<div class="choiceItem">
			<input
				id="sla"
				bind:value="{fileState.printType}"
				class="hidden"
				type="radio"
				name="printType"
			/>
			<label
				class="choice {fileState.printType === 'sla' && 'selected'}"
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
				bind:value="{fileState.consumables}"
				class="hidden"
				type="radio"
				name="consumables"
			/>
			<label
				class="choice {fileState.consumables === 'pla_' && 'selected'}"
				for="pla">PLA</label
			>
		</div>
		<div class="choiceItem">
			<input
				id="abs"
				bind:value="{fileState.consumables}"
				class="hidden"
				type="radio"
				name="Consumables"
			/>
			<label
				class="choice {fileState.consumables === 'abs' && 'selected'}"
				for="abs">ABS</label
			>
		</div>
	</fieldset>
</div>

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
</style>
