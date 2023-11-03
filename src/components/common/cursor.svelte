<script lang="ts" module>
  import { gsap, Linear } from 'gsap';
  import { onMount } from 'svelte';
  import { isSmallScreen } from '../../routes/store';

  export let isDesktop: boolean = true;

  let cursor: HTMLDivElement;
  let follower: HTMLDivElement;

  const onHover = () => {
    gsap.to(cursor, {
      scale: 0.5,
      duration: 0.3,
    });
    gsap.to(follower, {
      scale: 3,
      duration: 0.3,
    });
  };

  const onUnhover = () => {
    gsap.to(cursor, {
      scale: 1,
      duration: 0.3,
    });
    gsap.to(follower, {
      scale: 1,
      duration: 0.3,
    });
  };

  const moveCircle = (e: MouseEvent) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
      ease: Linear.easeNone,
    });
    gsap.to(follower, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.3,
      ease: Linear.easeNone,
    });
  };

  const initCursorAnimation = () => {
    follower.classList.remove('hidden_cursor');
    cursor.classList.remove('hidden_cursor');
    document.addEventListener('mousemove', moveCircle);
    document.querySelectorAll('.link').forEach((el) => {
      el.addEventListener('mouseenter', onHover);
      el.addEventListener('mouseleave', onUnhover);
    });
  };

  onMount(() => {
    if (isDesktop && !isSmallScreen()) {
      initCursorAnimation();
    }
  });
</script>

<div bind:this="{cursor}" class="cursor hidden_cursor"></div>
<div bind:this="{follower}" class="flower hidden_cursor"></div>

<style scoped>
  .cursor {
    @apply fixed  bg-white w-4 h-4 select-none pointer-events-none z-50;
    mix-blend-mode: difference;
    border-radius: 100%;
  }

  .flower {
    @apply fixed  h-8 w-8 select-none pointer-events-none z-50;
    top: -0.5rem;
    left: -0.5rem;
    will-change: transform;
    border-radius: 100%;
    background: rgba(0, 0, 0, 0.2);
  }
  .hidden_cursor {
    @apply hidden;
  }
</style>
