<script lang="ts">
	import { NO_MOTION_PREFERENCE_QUERY } from '../../routes/store';
	import { onMount } from 'svelte';
	let progress = 0;

	const calculateProgress = () => {
		const winScroll =
			document.body.scrollTop || document.documentElement.scrollTop;
		const height =
			document.documentElement.scrollHeight -
			document.documentElement.clientHeight;
		const scrolled = winScroll / height;
		progress = scrolled;
	};

	onMount(() => {
		const { matches } = window.matchMedia(NO_MOTION_PREFERENCE_QUERY);
		matches && window.addEventListener('scroll', calculateProgress);
		return () => window.removeEventListener('scroll', calculateProgress);
	});
</script>

<template>
	<div class="progress w-full fixed top-0 z-50">
		<div class="progress-bar" style="{` transform: scaleX(${progress})`}"></div>
	</div>
</template>
