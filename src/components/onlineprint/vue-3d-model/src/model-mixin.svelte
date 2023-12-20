<script lang="ts">
	import { browser } from '$app/environment';
	import { createEventDispatcher, onDestroy, onMount, tick } from 'svelte';
	import * as THREE from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
	import { getCenter, getSize } from './utils';
	import { getArea, getVolume } from './get_model_info';
	import { addAxes } from './store';

	export let src: string;
	export let lights: { type: string; [key: string]: any }[] = [];
	export let fileName: string;
	export let loader: THREE.Loader; // 会被具体实现的组件覆盖
	export let getObject: Function;

	let container: HTMLDivElement;
	let canvas: HTMLCanvasElement;
	let position = new THREE.Vector3();
	let rotation = new THREE.Vector3();
	let scale = new THREE.Vector3(1, 1, 1);

	let cameraPosition = new THREE.Vector3(100, 100, 0);
	let cameraRotation = new THREE.Euler();

	let backgroundColor = '#f0f9ff';
	let backgroundAlpha = 1;
	let controlsOptions: Object;

	let result = {
		renderer: null as null | THREE.WebGLRenderer,
		object: null as null | THREE.Object3D,
		raycaster: new THREE.Raycaster(),
		mouse: new THREE.Vector2(),
		camera: new THREE.PerspectiveCamera(60, 1, 0.01, 100000),
		scene: new THREE.Scene(),
		wrapper: new THREE.Object3D(),
		controls: null as null | OrbitControls,
		allLights: [] as THREE.Light[],
		clock: typeof performance === 'undefined' ? Date : performance,
		reqId: null as null | number, // requestAnimationFrame id,
		info: {
			volume: 0,
			area: 0,
			objectSize: {
				x: 0,
				y: 0,
				z: 0,
			},
		},
	};

	let size = {
		width: 0,
		height: 0,
	};

	function load() {
		if (!src) return;
		result.wrapper.clear();
		loader.load(
			src,
			(...args: any) => {
				result.info.volume = getVolume(args[0]);
				result.info.area = getArea(args[0]);
				const object = (getObject as any)(...args);
				result.info.objectSize = getSize(object);
				addObject(object);
				dispatch('load');
			}, //  onLoad
			(event: ProgressEvent) => {
				dispatch('progress', event);
			},
			(event) => {
				dispatch('error', event);
			},
		);
	}
	function update() {
		updateRenderer();
		updateCamera();
		updateLights();
		updateControls();
	}

	$: {
		src;
		load();
		update();
	}
	$: {
		if (result.object) {
			result.object.rotation.set(rotation.x, rotation.y, rotation.z);
			result.object.position.set(position.x, position.y, position.z);
			result.object.scale.set(scale.x, scale.y, scale.z);
		}
	}
	$: {
		lights;
		updateLights();
	}

	$: {
		controlsOptions;
		updateControls();
	}
	$: {
		scale;
		if (result.renderer) {
			updateRenderer();
		}
	}
	$: {
		backgroundAlpha;
		backgroundColor;
		result.renderer && updateRenderer();
	}

	function animate() {
		if (browser) {
			result.reqId = requestAnimationFrame(animate);
		}
		result.controls!.update();
		result.renderer!.render(result.scene, result.camera);
	}
	function initScene() {
		// 设置大小
		size = {
			width: container.offsetWidth,
			height: container.offsetHeight,
		};
		console.log('[ 初始化size ] >', size);
		const options: THREE.WebGLRendererParameters = {
			antialias: true,
			alpha: true,
			canvas: canvas,
		};
		result.renderer = new THREE.WebGLRenderer(options);
		result.renderer.shadowMap.enabled = true;
		result.controls = new OrbitControls(
			result.camera,
			result.renderer.domElement,
		);
		result.scene.add(result.wrapper);
		// result.controls.type = 'orbit';
		addAxes(result.scene);
		load();
		update();
		window.addEventListener('resize', onResize, false);
		animate();
	}

	onMount(() => {
		initScene();
	});
	onDestroy(() => {
		if (browser) {
			cancelAnimationFrame(result.reqId!);
			result.renderer!.dispose();
			if (result.controls) {
				result.controls.dispose();
			}
			window.removeEventListener('resize', onResize, false);
		}
	});

	function pick(x: number, y: number) {
		if (result.object) return null;
		if (container as HTMLDivElement) return;
		const rect = container.getBoundingClientRect();
		x -= rect.left;
		y -= rect.top;
		result.mouse.x = (x / size.width!) * 2 - 1;
		result.mouse.y = -(y / size.height!) * 2 + 1;
		result.raycaster.setFromCamera(result.mouse, result.camera);
		const intersects = result.raycaster.intersectObject(
			result.object! as THREE.Object3D,
			true,
		);
		return (intersects && intersects.length) > 0 ? intersects[0] : null;
	}

	function updateModel() {
		if (!result.object) return;
		result.object.position.set(position.x, position.y, position.z);
		result.object.rotation.set(rotation.x, rotation.y, rotation.z);
		result.object.scale.set(scale.x, scale.y, scale.z);
	}
	function updateRenderer() {
		if (result.renderer) {
			result.renderer.setSize(size.width, size.height);
			result.renderer.setPixelRatio(window.devicePixelRatio || 1);
			result.renderer.setClearColor(
				new THREE.Color().set(backgroundColor).getHex(),
			);
			result.renderer.setClearAlpha(backgroundAlpha);
		}
	}
	function updateCamera() {
		result.camera.aspect = size.width / size.height;
		result.camera.updateProjectionMatrix();
		if (!result.object) return;
		const distance = getSize(result.object).length();
		result.camera.position.copy(cameraPosition);
		result.camera.rotation.copy(cameraRotation);
		result.camera.position.z = distance;
		result.camera.lookAt(new THREE.Vector3());
	}
	function updateLights() {
		result.scene.remove(...result.allLights);
		result.allLights = [];
		lights.forEach((item) => {
			if (!item.type) return;
			const type = item.type.toLowerCase();
			let light: null | THREE.Light = null;
			if (type === 'ambient' || type === 'ambientlight') {
				const color = item.color ?? 0x404040;
				const intensity = item.intensity ?? 1;
				light = new THREE.AmbientLight(color, intensity);
			} else if (type === 'point' || type === 'pointlight') {
				const color = item.color ?? 0xffffff;
				const intensity = item.intensity ?? 1;
				const distance = item.distance ?? 0;
				const decay = item.decay ?? 1;
				light = new THREE.PointLight(color, intensity, distance, decay);
				item.position && light.position.copy(item.position);
			} else if (type === 'directional' || type === 'directionallight') {
				const color = item.color ?? 0xffffff;
				const intensity = item.intensity ?? 1;
				light = new THREE.DirectionalLight(color, intensity);
				item.position && light.position.copy(item.position);
				item.target &&
					(light as THREE.DirectionalLight).target.copy(item.target);
			} else if (type === 'hemisphere' || type === 'hemispherelight') {
				const skyColor = item.skyColor ?? 0xffffff;
				const groundColor = item.groundColor ?? 0xffffff;
				const intensity = item.intensity ?? 1;
				light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
				item.position && light.position.copy(item.position);
			}
			if (light) {
				result.allLights.push(light);
				result.scene.add(light);
			}
		});
	}
	function updateControls() {
		if (controlsOptions) {
			Object.assign(result.controls!, controlsOptions);
		}
	}

	function addObject(object: THREE.Object3D) {
		result.wrapper.add(object);
		const center = getCenter(object);
		if (result.object) {
			// correct position
			result.wrapper.position.copy(
				result.wrapper.position.add(center.negate()),
			);
		}
		updateCamera();
		updateModel();
		result.object = object;
	}

	const dispatch = createEventDispatcher();
	function onResize() {
		tick().then(() => {
			size = {
				width: container.offsetWidth,
				height: container.offsetHeight,
			};
		});
	}
</script>

<div bind:this="{container}" class="relative m-0 h-full w-full border-0 p-0">
	<canvas bind:this="{canvas}" class="h-full w-full"></canvas>
	<div class="absolute top-0 border-t-3 p-3 text-sky-600">
		<p>名称:{fileName}</p>
		<p>体积:{result.info.volume}cm<sup>3</sup> </p>
		<p>表面积:{result.info.area} cm<sup>2</sup></p>
		<p>
			尺寸:{(result.info.objectSize.x / 1).toFixed(2)} &times; {(
				result.info.objectSize.y / 1
			).toFixed(2)}
			&times; {(result.info.objectSize.z / 1).toFixed(2)} cm
		</p>
	</div>
</div>
