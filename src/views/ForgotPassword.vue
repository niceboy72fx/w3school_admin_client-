<script setup>
import {ref} from 'vue';
import {useAuthStore} from "../stores/auth";
import {onMounted} from "vue";
import {Input, Validation, Ripple, initTE} from "tw-elements";
import GuestLayout from "../layouts/GuestLayout.vue";

onMounted(() => {
  initTE({Input, Validation, Ripple}, {allowReinits: true});
  const fullValidationForm = document.getElementById("formForgotPassword");
  const fullValidation = new Validation(fullValidationForm, {
    submitCallback: async (e, valid) => {
      if (valid) {
        try {
          await authStore.forgotPassword(formData.value)
          status.value = true
        } catch (error) {
          let el = document.querySelector('#formEmailInputGroup span')
          el.innerHTML = error.response.data.message
          el.classList.add('text-[#dc4c64]')
          document.querySelector('#formEmailInputGroup label').classList.add('!text-[#dc4c64]')
          document.querySelectorAll('#formEmailInputGroup div div')[0].classList.add('border-[#dc4c64]', 'group-data-[te-input-focused]:shadow-[-1px_0_0_#dc4c64,_0_1px_0_0_#dc4c64,_0_-1px_0_0_#dc4c64]', 'group-data-[te-input-focused]:border-[#dc4c64]')
          document.querySelectorAll('#formEmailInputGroup div div')[1].classList.add('border-[#dc4c64]', 'group-data-[te-input-focused]:shadow-[0_1px_0_0_#dc4c64]', 'group-data-[te-input-focused]:border-[#dc4c64]')
          document.querySelectorAll('#formEmailInputGroup div div')[2].classList.add('border-[#dc4c64]', 'group-data-[te-input-focused]:shadow-[1px_0_0_#dc4c64,_0_-1px_0_0_#dc4c64,_0_1px_0_0_#dc4c64]', 'group-data-[te-input-focused]:border-[#dc4c64]')
        }
      } else {
      }
    },
  });
});
const status = ref(false)
const authStore = useAuthStore();
const formData = ref({
  email: '',
});
</script>

<template>
  <GuestLayout>
    <div class="h-full flex flex-col items-center justify-center">
      <div class="mb-8 text-xl text-gray-600 w-full text-center">
        <template v-if="status">
          We’ve sent an email to <span class="text-primary font-bold">{{ formData.email }}</span> with instructions.
        </template>
        <template v-else>
          If the account exists, we'll email you instructions to reset the password.
        </template>
      </div>
      <div class="w-5/12 md:w-8/12 lg:ml-6 lg:w-5/12">
        <div class="flex justify-center" v-if="status">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-1/4" viewBox="0 0 640 512" fill="#416eb4">
            <path
                d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0l57.4-43c23.9-59.8 79.7-103.3 146.3-109.8l13.9-10.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176V384c0 35.3 28.7 64 64 64H360.2C335.1 417.6 320 378.5 320 336c0-5.6 .3-11.1 .8-16.6l-26.4 19.8zM640 336a144 144 0 1 0 -288 0 144 144 0 1 0 288 0zm-76.7-43.3c6.2 6.2 6.2 16.4 0 22.6l-72 72c-6.2 6.2-16.4 6.2-22.6 0l-40-40c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L480 353.4l60.7-60.7c6.2-6.2 16.4-6.2 22.6 0z"/>
          </svg>
        </div>
        <form id="formForgotPassword" v-else>
          <!-- Email input -->
          <div id="formEmailInputGroup"
               class="relative mb-6"
               data-te-input-wrapper-init
               data-te-validate="input"
               data-te-validation-ruleset="isRequired|isEmail"
          >
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
              type="button"
              class="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              data-te-ripple-init
              data-te-submit-btn-ref
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
