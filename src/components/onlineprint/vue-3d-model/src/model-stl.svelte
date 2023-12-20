<script lang="ts">
	import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
	import { type BufferGeometry, Mesh, MeshPhongMaterial } from 'three';
	import ModelMixin from './model-mixin.svelte';

	export let src: string;
	export let fileName: string;

	let lights = [
		{
			type: 'HemisphereLight',
			position: { x: 0, y: 1, z: 0 },
			skyColor: 0xaaaaff,
			groundColor: 0x806060,
			intensity: 0.2,
		},
		{
			type: 'DirectionalLight',
			position: { x: 1, y: 1, z: 1 },
			color: 0xffffff,
			intensity: 0.8,
		},
	];
	let loader = new STLLoader();
	function getObject(geometry: BufferGeometry) {
		return new Mesh(geometry, new MeshPhongMaterial());
	}
</script>

<ModelMixin {lights} {loader} {src} {fileName} {getObject} />
