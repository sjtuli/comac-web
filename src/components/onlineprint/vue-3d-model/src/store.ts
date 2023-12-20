import { type DispatchOptions, createEventDispatcher } from 'svelte';
import * as THREE from 'three';

export function addAxes(scene: THREE.Scene) {
	let axesHelper = new THREE.AxesHelper(100);
	scene.add(axesHelper);

	const helper = new THREE.GridHelper(250, 50);
	helper.position.set(0, -150, 0);
	// eslint-disable-next-line unicorn/number-literal-case
	scene.fog = new THREE.Fog(0xffffff, 0, 9000);
	scene.add(helper);

	axesHelper = new THREE.AxesHelper(250);
	axesHelper.position.set(-125, -150, -125);
	scene.add(axesHelper);
	const axisHelper2 = new THREE.AxesHelper(250);
	axisHelper2.position.set(125, -150, -125);
	axisHelper2.rotation.y = -70.6855;
	scene.add(axisHelper2);

	const axisHelper3 = new THREE.AxesHelper(250);
	axisHelper3.position.set(-125, -150, 125);
	axisHelper3.rotation.y = 70.6855;
	scene.add(axisHelper3);

	const axisHelper4 = new THREE.AxesHelper(250);
	axisHelper4.position.set(125, -150, 125);
	axisHelper4.rotation.y = 141.371;
	scene.add(axisHelper4);

	const axisHelper5 = new THREE.AxesHelper(250);
	axisHelper5.position.set(-125, 150, -125);
	axisHelper5.rotation.z = -70.6855;
	scene.add(axisHelper5);

	const axisHelper6 = new THREE.AxesHelper(250);
	axisHelper6.position.set(125, 150, -125);
	axisHelper6.rotation.y = -70.6855;
	axisHelper6.rotation.z = -70.6855;
	scene.add(axisHelper6);

	const axisHelper7 = new THREE.AxesHelper(250);
	axisHelper7.position.set(125, 150, 125);
	axisHelper7.rotation.y = -141.371;
	axisHelper7.rotation.z = -70.6855;
	scene.add(axisHelper7);

	const axisHelper8 = new THREE.AxesHelper(250);
	axisHelper8.position.set(-125, 150, 125);
	axisHelper8.rotation.y = 70.6855;
	axisHelper8.rotation.z = -70.6855;
	scene.add(axisHelper8);
}
