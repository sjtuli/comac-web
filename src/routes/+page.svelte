<script lang="ts">
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	import ProgressIndicator from '../components/common/progress-indicator.svelte';
	import HeroSection from '../components/home/hero.svelte';
	import AboutSection from '../components/home/about.svelte';
	import ProjectsSection from '../components/home/projects.svelte';
	import QuoteSection from '../components/home/quote.svelte';
	import SkillsSection from '../components/home/skills.svelte';
	import TimelineSection from '../components/home/timeline.svelte';
	import CollaborationSection from '../components/home/collaboration.svelte';
	import Footer from '../components/common/footer.svelte';

	import { onMount, onDestroy } from 'svelte';
	import { DEBOUNCE_TIME } from './store';

	gsap.registerPlugin(ScrollTrigger);
	gsap.config({ nullTargetWarn: true });

	let isDesktop = true;
	let timer: string | number | NodeJS.Timeout | undefined | null = null;

	const debouncedDimensionCalculator = () => {
		clearTimeout(timer!);
		timer = setTimeout(() => {
			const isDesktopResult =
				typeof window.orientation === 'undefined' &&
				navigator.userAgent.indexOf('IEMobile') === -1;
			window.history.scrollRestoration = 'manual';
			isDesktop = isDesktopResult;
		}, DEBOUNCE_TIME);
	};

	onMount(() => {
		debouncedDimensionCalculator();
		window.addEventListener('resize', debouncedDimensionCalculator);
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', debouncedDimensionCalculator);
		}
	});
</script>

<ProgressIndicator />
<!-- <Cursor {isDesktop} /> -->
<main class="flex-col flex">
	<HeroSection />
	<AboutSection />
	<ProjectsSection {isDesktop} />
	<QuoteSection />
	<SkillsSection />
	<TimelineSection {isDesktop} />
	<CollaborationSection />
	<Footer />
</main>
