<script setup>
import Checkbox from '../components/common/Checkbox.vue';
import InputError from '../components/common/InputError.vue';
import InputLabel from '../components/common/InputLabel.vue';
import PrimaryButton from '../components/common/PrimaryButton.vue';
import TextInput from '../components/common/TextInput.vue';
import auth from "../../api/auth";
import {ref} from 'vue';
import api from "../apis";
import {useAuthStore} from "../stores/auth";
import GuestLayout from "../layouts/GuestLayout.vue";

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
  password: '',
  remember: false,
});

const submit = () => {
  const authStore = useAuthStore();
  authStore.login(formData.value)
};
</script>

<template>
  <GuestLayout>
    <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
      {{ status }}
    </div>

    <form @submit.prevent="submit">
      <div>
        <InputLabel for="email" value="Email"/>

        <TextInput
            id="email"
            type="email"
            class="mt-1 block w-full"
            v-model="formData.email"
            required
            autofocus
            autocomplete="username"
        />

        <!--      <InputError class="mt-2" :message="formData.errors.email"/>-->
      </div>

      <div class="mt-4">
        <InputLabel for="password" value="Password"/>

        <TextInput
            id="password"
            type="password"
            class="mt-1 block w-full"
            v-model="formData.password"
            required
            autocomplete="current-password"
        />

        <!--      <InputError class="mt-2" :message="formData.errors.password"/>-->
      </div>

      <div class="block mt-4">
        <label class="flex items-center">
          <Checkbox name="remember" v-model:checked="formData.remember"/>
          <span class="ml-2 text-sm text-gray-600">Remember me</span>
        </label>
      </div>

      <div class="flex items-center justify-end mt-4">
        <RouterLink
            href="/"
            class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            to>
          Forgot your password?
        </RouterLink>

        <PrimaryButton class="ml-4">
          <!--                     :class="{ 'opacity-25': formData.processing }" :disabled="formData.processing">-->

          Log in
        </PrimaryButton>
      </div>
    </form>
  </GuestLayout>
</template>
