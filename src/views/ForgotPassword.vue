<script setup>
import {ref} from 'vue';
import {useAuthStore} from "../stores/auth";
import {onMounted} from "vue";
import {Input, Ripple, initTE} from "tw-elements";
import GuestLayout from "../layouts/GuestLayout.vue";

onMounted(() => {
  initTE({Input, Ripple}, {allowReinits: true});
});
defineProps({
  canResetPassword: {
    type: Boolean,
  },
  status: {
    type: String,
  },
});

const formData = ref({
  email: '',
});

const submit = () => {
  // const authStore = useAuthStore();
  // authStore.login(formData.value)
};
</script>

<template>
  <GuestLayout>
    <div class="h-full flex flex-col items-center justify-center">
      <div class="mb-8 text-xl text-gray-600 w-full text-center">
        If the account exists, we'll email you instructions to reset the password.
      </div>
      <!-- Right column container with form -->
      <div class="w-5/12 md:w-8/12 lg:ml-6 lg:w-5/12">
        <form @submit.prevent="submit">
          <!-- Email input -->
          <div class="relative mb-6" data-te-input-wrapper-init>
            <input
                v-model="formData.email"
                type="text"
                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="formEmailInput2"
                placeholder="Email address"/>
            <label
                for="formEmailInput2"
                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
            >Email address
            </label>
          </div>
          <!-- Submit button -->
          <button
              class="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              data-te-ripple-init
              data-te-ripple-color="light">
            Email Password Reset Link
          </button>
          <div class="mt-3 flex justify-center">
            <RouterLink
                class="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                :to="{name: 'login'}">
              Return to login
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  </GuestLayout>
</template>
