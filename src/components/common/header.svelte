<script lang="ts">
  import Menu from './menu.svelte';

  let menuVisible = false;
  function setmenuVisible(i: boolean) {
    menuVisible = i;
  }
</script>

<template>
  <header
    class="pointer-events-none w-full fixed top-0 py-8 select-none z-50 bg-gradient-to-b dark:from-gray-900 to-transparent from-[#50B0EC]"
  >
    <div class="flex justify-between section-container pointer-events-auto">
      <a href="#home" class="link">
        <img
          src="/logo.png"
          alt="Logo - Ayush Singh"
          width="{400}"
          height="{22}"
        />
      </a>
      <div class="{`outer-menu ${menuVisible ? 'menu-visible' : ''}`}">
        <button
          class="hamburger w-6 h-6 flex items-center justify-center link relative"
          on:click="{() => {
            menuVisible = !menuVisible;
          }}"
        >
          <div
            class="relative flex-none w-full bg-white duration-300 flex items-center justify-center"
          ></div>
        </button>
        <Menu {setmenuVisible} />
      </div>
    </div>
  </header>
</template>

<style>
  /* your styles go here */
</style>
