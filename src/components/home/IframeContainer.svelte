<!-- IframeContainer.svelte -->

<script lang="ts">
	import { Application } from '@splinetool/runtime';
	import { onMount } from 'svelte';
	onMount(() => {
		const canvas = document.getElementById('canvas3d') as HTMLCanvasElement;
		const app = new Application(canvas);
		app.load('spline/scene.splinecode');
	});
</script>

<div class="canvasDiv">
	<canvas id="canvas3d"></canvas>
</div>

<style>
	.canvasDiv {
		width: 100%;
		height: 100%;
	}
	canvas {
		display: block;
	}
</style>
