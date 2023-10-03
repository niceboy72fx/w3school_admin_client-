<script setup>
import {
  Sidenav,
  Dropdown,
  Ripple,
  initTE,
} from "tw-elements";
import {onMounted} from "vue";

onMounted(async () => {
  initTE({Sidenav, Dropdown, Ripple}, {allowReinits: true});

  const sidenav2 = document.getElementById("sidenav-1");
  const sidenavInstance2 = Sidenav.getInstance(sidenav2);

  let innerWidth2 = null;

  const setMode2 = (e) => {
    // Check necessary for Android devices
    if (window.innerWidth === innerWidth2) {
      return;
    }

    innerWidth2 = window.innerWidth;

    if (window.innerWidth < sidenavInstance2.getBreakpoint("xl")) {
      sidenavInstance2.changeMode("over");
      sidenavInstance2.hide();
    } else {
      sidenavInstance2.changeMode("side");
      sidenavInstance2.show();
    }
  };

  if (window.innerWidth < sidenavInstance2.getBreakpoint("sm")) {
    setMode2();
  }

// Event listeners
  window.addEventListener("resize", setMode2);
})

import Navigation from "../components/navigation/Navigation.vue";
</script>

<template>
  <!--  <div class="min-h-screen bg-gray-100">-->
  <!--    <Navigation/>-->

  <!--    &lt;!&ndash; Page Heading &ndash;&gt;-->
  <!--    <header class="bg-white shadow" v-if="$slots.header">-->
  <!--      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">-->
  <!--        <slot name="header"/>-->
  <!--      </div>-->
  <!--    </header>-->
  <!--    &lt;!&ndash; Page Content &ndash;&gt;-->
  <!--    <main>-->
  <!--      <slot />-->
  <!--    </main>-->
  <!--  </div>-->
</template>

