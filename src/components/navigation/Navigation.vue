<script setup>
import {useAuthStore} from "../../stores/auth";
const {user, logout} = useAuthStore();
import {Sidenav, Dropdown, initTE} from "tw-elements";
import {onMounted} from "vue";

onMounted( () => {
  initTE({Sidenav, Dropdown}, {allowReinits: true});

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
</script>

<template>
  <header>
    <!-- Sidenav -->
    <nav
        id="sidenav-1"
        class="text-primary font-bold fixed left-0 top-0 z-[1] h-screen w-60 -translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] dark:bg-zinc-800 xl:data-[te-sidenav-hidden='false']:translate-x-0"
        data-te-sidenav-init
        data-te-sidenav-hidden="false"
        data-te-sidenav-mode-breakpoint-over="0"
        data-te-sidenav-mode-breakpoint-side="xl"
        data-te-sidenav-content="#content"
        data-te-sidenav-accordion="true">
      <RouterLink
          class="mb-3 flex items-center justify-center py-6 outline-none"
          :to="{name:'dashboard'}">
        <img
            id="te-logo"
            class="mr-4 w-8"
            src="../../assets/w3schools.svg"
            alt="W3school cms logo"
            draggable="false"/>
        <span>W3School CMS</span>
      </RouterLink>

      <ul
          class="relative m-0 list-none px-[0.2rem]"
          data-te-sidenav-menu-ref>
        <li class="relative">
          <a
              class="group flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-primary-400/10 hover:text-primary-600 hover:outline-none focus:bg-primary-400/10 focus:text-primary-600 focus:outline-none active:bg-primary-400/10 active:text-primary-600 active:outline-none data-[te-sidenav-state-active]:text-primary-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
              href="/"
              data-te-sidenav-link-ref>
            <span
                class="mr-4 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:fill-gray-700 [&>svg]:transition [&>svg]:duration-300 [&>svg]:ease-linear group-hover:[&>svg]:fill-primary-600 group-focus:[&>svg]:fill-primary-600 group-active:[&>svg]:fill-primary-600 group-[te-sidenav-state-active]:[&>svg]:fill-primary-600 motion-reduce:[&>svg]:transition-none dark:[&>svg]:fill-gray-300 dark:group-hover:[&>svg]:fill-gray-300 ">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                <path
                    d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm96 288H448c17.7 0 32-14.3 32-32V251.8c0-7.6-2.7-15-7.7-20.8l-65.8-76.8c-12.1-14.2-33.7-15-46.9-1.8l-21 21c-10 10-26.4 9.2-35.4-1.6l-39.2-47c-12.6-15.1-35.7-15.4-48.7-.6L135.9 215c-5.1 5.8-7.9 13.3-7.9 21.1v84c0 17.7 14.3 32 32 32z"/>
              </svg>
            </span>
            <span>Dashboard</span></a
          >
        </li>
      </ul>
    </nav>
    <!-- Sidenav -->

    <!-- Navbar -->
    <nav
        id="main-navbar"
        class="fixed left-0 right-0 top-0 flex w-full flex-nowrap items-center justify-between bg-white py-[0.6rem] text-gray-500 shadow-lg hover:text-gray-700 focus:text-gray-700 dark:bg-zinc-700 lg:flex-wrap lg:justify-start xl:pl-60"
        data-te-navbar-ref>
      <!-- Container wrapper -->
      <div
          class="flex w-full flex-wrap items-center justify-between xl:justify-end px-4">
        <!-- Toggler -->
        <button
            data-te-sidenav-toggle-ref
            data-te-target="#sidenav-1"
            class="block border-0 bg-transparent px-2.5 text-gray-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 xl:hidden"
            aria-controls="#sidenav-1"
            aria-haspopup="true">
          <span class="block [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-white">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-5 w-5">
              <path
                  fill-rule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clip-rule="evenodd"/>
            </svg>
          </span>
        </button>

        <!-- Right links -->
        <ul class="relative flex items-center">
          <!-- Avatar -->
          <li class="relative" data-te-dropdown-ref>
            <a
                class="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-te-dropdown-toggle-ref
                aria-expanded="false">
              <img
                  src="https://tecdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
                  class="rounded-full"
                  style="height: 22px; width: 22px"
                  alt="Avatar"
                  loading="lazy"/>
              Vinh
              <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
              >
                <path
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                />
              </svg>
            </a>
            <ul
                class="absolute left-auto right-0 z-[1000] float-left m-0 mt-1 hidden min-w-[10rem] list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-zinc-700 [&[data-te-dropdown-show]]:block"
                aria-labelledby="dropdownMenuButton2"
                data-te-dropdown-menu-ref>
              <li>
                <RouterLink
                    class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-gray-700 hover:bg-gray-100 active:text-zinc-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-gray-400 dark:text-gray-200 dark:hover:bg-white/30"
                    :to="{name: 'profile'}"
                    data-te-dropdown-item-ref
                >Profile</RouterLink
                >
              </li>
              <li>
                <RouterLink
                    class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-gray-700 hover:bg-gray-100 active:text-zinc-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-gray-400 dark:text-gray-200 dark:hover:bg-white/30"
                    to="/"
                    data-te-dropdown-item-ref
                >Settings</RouterLink
                >
              </li>
              <li>
                <RouterLink
                    class="block cursor-pointer w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-gray-700 hover:bg-gray-100 active:text-zinc-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-gray-400 dark:text-gray-200 dark:hover:bg-white/30"
                    @click="logout"
                    to="/"
                    data-te-dropdown-item-ref
                >Logout</RouterLink
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- Container wrapper -->
    </nav>
    <!-- Navbar -->
  </header>
</template>

<style scoped lang="postcss">
</style>
