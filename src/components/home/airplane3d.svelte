<script lang="ts" type="module">
	import { Application } from './runtime';
	import { onMount } from 'svelte';

	onMount(() => {
		const canvas = document.getElementById('canvas3d');
		const app = new Application(canvas);
		app.load('./scene.splinecode');
	});
</script>

<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<style>
		body {
			margin: 0;
			overflow: hidden;
		}
		html,
		body {
			height: 100%;
		}
		canvas {
			display: block;
		}
		.logo {
			position: absolute;
			right: 16px;
			bottom: 16px;
			z-index: 2;
			background-image: url(https://app.spline.design/_assets/_icons/icon_favicon32x32.png);
			background-size: cover;
			width: 32px;
			height: 32px;
		}
		.logo:hover {
			opacity: 0.8;
		}
	</style>
</head>
<body>
	<canvas id="canvas3d"></canvas>
</body>
