<script lang="ts">
  import { Linear, gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
  import {
    NO_MOTION_PREFERENCE_QUERY,
    isSmallScreen,
  } from '../../routes/store';
  import { onDestroy, onMount } from 'svelte';
  let quoteRef: HTMLDivElement;
  let targetSection: HTMLElement;
  let willChange = false;

  const initTextGradientAnimation = (
    targetSection: HTMLElement,
  ): ScrollTrigger => {
    const timeline = gsap.timeline({ defaults: { ease: Linear.easeNone } });
    timeline
      .from(quoteRef, { opacity: 0, duration: 2 })
      .to(quoteRef.querySelector('.text-strong'), {
        backgroundPositionX: '100%',
        duration: 1,
      });

    return ScrollTrigger.create({
      trigger: targetSection,
      start: 'center bottom',
      end: 'center center',
      scrub: 0,
      animation: timeline,
      onToggle: (self) => (willChange = self.isActive),
    });
  };

  const initSlidingTextAnimation = (targetSection: HTMLElement) => {
    const slidingTl = gsap.timeline({ defaults: { ease: Linear.easeNone } });
    slidingTl
      .to(targetSection.querySelector('.ui-left'), {
        xPercent: isSmallScreen() ? -500 : -150,
      })
      .from(
        targetSection.querySelector('.ui-right'),
        { xPercent: isSmallScreen() ? -500 : -150 },
        '<',
      );
    return ScrollTrigger.create({
      trigger: targetSection,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0,
      animation: slidingTl,
    });
  };
  let textBgAnimation: ScrollTrigger;
  let slidingAnimation: ScrollTrigger | undefined;

  onMount(() => {
    textBgAnimation = initTextGradientAnimation(targetSection);

    const { matches } = window.matchMedia(NO_MOTION_PREFERENCE_QUERY);

    if (matches) {
      slidingAnimation = initSlidingTextAnimation(targetSection);
    }
  });

  onDestroy(() => {
    textBgAnimation && textBgAnimation?.kill();
    slidingAnimation && slidingAnimation?.kill();
  });
</script>

<section
  class="w-full relative select-none tall:py-36 py-48 section-container flex flex-col"
  bind:this="{targetSection}"
>
  <p
    class="ui-left opacity-20 text-5xl md:text-7xl font-bold whitespace-nowrap"
  >
    {Array.from({ length: 5 })
      .fill(' User Interface Design  User Experience Design ')
      .reduce((str, el) => str.concat(el), '')}
  </p>
  <h1
    class:will-cahnge-opacity="{willChange}"
    bind:this="{quoteRef}"
    class="mt-6 md:mt-8 font-medium text-4xl md:text-5xl text-center"
  >
    Interested in <span class="text-strong font-bold">Collaboration</span>?
  </h1>
  <p
    class=" mt-6 md:mt-8 ui-right opacity-20 text-5xl md:text-7xl font-bold whitespace-nowrap"
  >
    {Array.from({ length: 5 })
      .fill(' Frontend Development  Motion Graphics ')
      .reduce((str, el) => str.concat(el), '')}
  </p>
</section>
