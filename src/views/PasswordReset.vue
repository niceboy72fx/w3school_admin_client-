<script setup>
import {ref} from 'vue';
import {useAuthStore} from "../stores/auth";
import {onMounted} from "vue";
import {Input, Validation, Ripple, initTE} from "tw-elements";
import GuestLayout from "../layouts/GuestLayout.vue";
import {useRoute} from 'vue-router'
import router from "../router";

const route = useRoute()
onMounted(() => {
  initTE({Input, Validation, Ripple}, {allowReinits: true});

  const fullValidationForm = document.getElementById("form-0");

  const fullValidation = new Validation(fullValidationForm, {
    customRules: {
      isSame: () => {
        return formData.value.password === formData.value.password_confirmation
            ? true
            : 'The password field confirmation does not match.';
      },
    },
    submitCallback: async (e, valid) => {
      if (valid) {
        try {
          const authStore = useAuthStore();
          await authStore.resetPassword(formData.value)
          status.value = true
          setInterval(() => {
            count.value -= 1
          }, 1000)
          setTimeout(() => {
            router.push({name: 'login'})
          }, count.value * 1000);
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
const formData = ref({
  token: route.params.token,
  email: route.query.email,
  password: '',
  password_confirmation: '',
});

const count = ref(10)

</script>

<template>
  <GuestLayout>
    <div class="h-full flex flex-col items-center justify-center">
      <div class="mb-8 text-xl text-gray-600 w-full text-center">
        <template v-if="status">
          Reset password success. You'll back to login page in {{ count }} seconds
        </template>
        <template v-else>
          Password Reset
        </template>
      </div>
      <div class="w-5/12 md:w-8/12 lg:ml-6 lg:w-5/12">
        <div class="flex justify-center" v-if="status">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-1/4" viewBox="0 0 512 512" fill="#14a14d">
            <path
                d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/>
          </svg>
        </div>
        <form v-else id="form-0" data-te-active-validation="true">
          <div class="relative mb-6" data-te-input-wrapper-init>
            <input v-model="formData.email" type="text" class="input peer" id="formEmailInput" disabled
                   placeholder="Email address"/>
            <label for="formEmailInput" class="label">Email address</label>
          </div>
          <div class="relative mb-6"
               data-te-input-wrapper-init
               data-te-validate="input"
               data-te-validation-ruleset="isRequired|isLongerThan(7)"
               data-te-invalid-feedback="The password field must be at least 8 characters.">
            <input v-model="formData.password" type="password" class="input peer" id="formPasswordInput"
                   placeholder="Password"/>
            <label for="formPasswordInput" class="label">Password
            </label>
          </div>
          <div class="relative mb-6"
               data-te-input-wrapper-init
               data-te-validate="input"
               data-te-validation-ruleset="isRequired|isSame()"
          >
            <input v-model="formData.password_confirmation" type="password" class="input peer"
                   id="formPasswordConfirmInput" placeholder="Confirm password"/>
            <label for="formPasswordConfirmInput" class="label">Confirm password</label>
          </div>
          <button class="button" data-te-ripple-init data-te-ripple-color="light" data-te-submit-btn-ref type="button">
            Reset Password
          </button>
          <div class="mt-3 flex justify-center">
            <RouterLink
                class="router-link"
                :to="{name: 'login'}">
              Return to login
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  </GuestLayout>
</template>

<style scoped>
.input {
  @apply block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0
}

.label {
  @apply pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary
}

.button {
  @apply inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
}

.router-link {
  @apply text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600
}
</style>
