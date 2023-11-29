<script lang="ts">
	import {
		EMAIL,
		MENULINKS,
		SOCIAL_LINKS,
		TYPED_STRINGS,
	} from '$lib/constants';
	import Typed from 'typed.js';
	import { gsap, Linear } from 'gsap';
	import Button from '../common/button.svelte';
	import { ButtonTypes } from '../common/button.store';
	import { onMount } from 'svelte';
	import IframeContainer from '../home/IframeContainer.svelte';

	let displayName = 'LandingHero';
	let htmlContent = '';

	let typedSpanElement: HTMLSpanElement;
	let targetSection: HTMLElement;

	const initTypeAnimation = (typedSpanElement: HTMLSpanElement): Typed => {
		return new Typed(typedSpanElement, {
			strings: TYPED_STRINGS,
			typeSpeed: 50,
			backSpeed: 50,
			backDelay: 8000,
			loop: true,
		});
	};

	const initRevealAnimation = (targetSection: HTMLElement): GSAPTimeline => {
		const revealTl = gsap.timeline({ defaults: { ease: Linear.easeNone } });
		revealTl
			.to(targetSection, { opacity: 1, duration: 2 })
			.from(
				targetSection.querySelectorAll('.seq'),
				{ opacity: 0, duration: 0.5, stagger: 0.5 },
				'<',
			);

		return revealTl;
	};

	onMount(async () => {
		const typed = initTypeAnimation(typedSpanElement);
		initRevealAnimation(targetSection);
		// return typed.destroy;
	});

	const { ref: heroSectionRef } = MENULINKS[0];
</script>

<section
	class="w-full flex md:items-center py-8 min-h-screen relative mb-24 section-container"
	id="{heroSectionRef}"
	bind:this="{targetSection}"
	style="opacity: 0"
>
	<!-- renderhreocontent -->
	<div class="font-medium flex flex-col pt-32 md:pt-0 select-none z-1">
		<div class="md:mb-4 mb-2">
			<h2 class="text-4xl seq">Hello 👋🏻</h2>
			<h1 class="text-3xl seq flex items-center">
				<span>这里是上海交通大学3d打印云平台</span>
			</h1>
		</div>
		<p class="mb-4">
			<span
				class="text-xl sm:text-2xl md:text-4xl seq set-font-color"
				bind:this="{typedSpanElement}"
			></span>
		</p>
		<div class="flex seq mb-5">
			{#each Object.keys(SOCIAL_LINKS) as el}
				<a
					href="{SOCIAL_LINKS[el]}"
					class="link hover:opacity-80 duration-300 md:mr-4 mr-2 icon_father"
					rel="noreferrer"
					target="_blank"
				>
					<img
						class="some_icon"
						src="{`/social/${el}.svg`}"
						alt="{`/social/${el}.svg`}"
						width="{40}"
						height="{40}"
					/>
				</a>
			{/each}
		</div>
		<div class="flex seq">
			<Button
				classes="mr-3"
				type="{ButtonTypes.OUTLINE}"
				name="官网"
				otherProps="{{
					target: '_blank',
					rel: 'noreferrer',
				}}"
				href="http://www.comac.cc/"
			></Button>
			<Button
				classes="ml-3 "
				type="{ButtonTypes.PRIMARY}"
				name="在线打印"
				href="https://zhaopin.comac.cc/"
				otherProps="{{
					target: '_blank',
					rel: 'noreferrer',
				}}"
			></Button>
		</div>
	</div>
	<div
		class="absolute hero-bg right-0 md:bottom-0 bottom-8 md:w-3/4 w-full scale-125 sm:scale-100 flex items-end"
		style="height: 650px; max-height: '650px'"
	>
		<!-- <Airplane3d /> -->
		<IframeContainer />
	</div>
</section>

<style scoped>
	.icon_father {
		overflow: hidden;
		& > .some_icon {
			transform: translate(0px, 100px);
			filter: drop-shadow(0px -100px);
		}
	}
	.set-font-color {
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-image: linear-gradient(0deg, #a6e4ff 0%, #f096ff 100%);
	}
</style>
