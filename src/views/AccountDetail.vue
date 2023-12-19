<script setup>
import {useAuthStore} from "../stores/auth";
import {ROLE} from "../constant/role";
import {onMounted, ref} from "vue";
import {Button, Validation, initTE, Input, Select} from "tw-elements";
import router from "../router";
import {useUserStore} from "../stores/user";
import {useAccountDetailStore} from "../stores/accountDetail";
import {useRoute} from "vue-router";

const route = useRoute()
const userStore = useUserStore();
const accountDetailStore = useAccountDetailStore()
const accountDetail = ref({
  name: null,
  email: null,
  roles: [2],
  permissions: {
    course: {
      view: true,
      update: true,
      create: true,
      approve: false
    },
    account: {
      cms: {
        view: false,
        update: false,
        create: false
      },
      client: {
        view: false,
        closure: false
      }
    }
  },
})
onMounted(async () => {
  initTE({Validation, Input, Select, Button}, {allowReinits: true});

  await accountDetailStore.getAccountDetail(route.params.id);
  Object.assign(accountDetail.value, accountDetailStore.accountDetail)
  const fullValidationForm = document.getElementById("formAccountAdd");
  const fullValidation = new Validation(fullValidationForm, {
    submitCallback: async (e, valid) => {
      if (valid) {
        try {
          await userStore.addAccount(accountDetail.value);
          await router.push({name: 'account_cms'})
        } catch (error) {
          let el = document.querySelector('#formEmailInputGroup span')
          el.innerHTML = error.response.data.message
          el.classList.add('text-[#dc4c64]')
          document.querySelectorAll('#formEmailInputGroup div div')[0].classList.add('border-[#dc4c64]', 'group-data-[te-input-focused]:shadow-[-1px_0_0_#dc4c64,_0_1px_0_0_#dc4c64,_0_-1px_0_0_#dc4c64]', 'group-data-[te-input-focused]:border-[#dc4c64]')
          document.querySelectorAll('#formEmailInputGroup div div')[1].classList.add('border-[#dc4c64]', 'group-data-[te-input-focused]:shadow-[0_1px_0_0_#dc4c64]', 'group-data-[te-input-focused]:border-[#dc4c64]')
          document.querySelectorAll('#formEmailInputGroup div div')[2].classList.add('border-[#dc4c64]', 'group-data-[te-input-focused]:shadow-[1px_0_0_#dc4c64,_0_-1px_0_0_#dc4c64,_0_1px_0_0_#dc4c64]', 'group-data-[te-input-focused]:border-[#dc4c64]')
        }
      } else {
      }
    },
  });
})

</script>

<template>
  <div class="w-full">
    <form id="formAccountAdd">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-3 flex">
        Name
      </div>
      <div class="col-span-7">
        <div class="relative" data-te-input-wrapper-init
             data-te-validate="input"
             data-te-validation-ruleset="isRequired"
        >
          <input
              type="text"
              v-model="accountDetail.name"
              placeholder="Name"
              class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="formInputName"/>
        </div>
      </div>
      <div class="col-span-3 flex">
        Email
      </div>
      <div class="col-span-7">
        <div class="relative"
             id="formEmailInputGroup"
             data-te-input-wrapper-init
             data-te-validate="input"
             data-te-validation-ruleset="isRequired|isEmail"
        >
          <input
              placeholder="Email address"
              type="text"
              v-model="accountDetail.email"
              class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="formInputEmail"/>
        </div>
      </div>
      <div class="col-span-3 flex items-end">
        Roles
      </div>
      <div class="col-span-3">
        <input class="checkbox cursor-pointer" type="checkbox" :value="ROLE.ADMIN" id="roleAdminCheckbox" v-model="accountDetail.roles"/>
        <label
            class="inline-block pl-[0.15rem] cursor-pointer"
            for="roleAdminCheckbox">
          Admin
        </label>
      </div>
      <div class="col-span-6">
        <input class="checkbox cursor-pointer" type="checkbox" :value="ROLE.EDITOR" id="roleEditorCheckbox" v-model="accountDetail.roles"/>
        <label
            class="inline-block pl-[0.15rem] cursor-pointer"
            for="roleEditorCheckbox">
          Editor
        </label>
      </div>
      <div class="col-span-3 row-span-3 flex items-start">
        Permissions
      </div>
      <template v-for="(permissionGroup, key) in accountDetail.permissions">
        <div class="col-span-1">{{ ucFirst(key) }}</div>
        <!--        <div class="col-span-7">{{ permissionGroup }}</div>-->
        <div class="col-span-8">
          <div v-if="key === 'account'" class="block">
            <div class="mb-2"
                 v-for="(permissionGroupChild, key2) in permissionGroup">
              <div class="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]"
                   v-for="(value, permission) in permissionGroupChild">
                <input
                    class="checkbox "
                    type="checkbox"
                    :checked="value"
                    id="inlineCheckbox3"
                />
                <label
                    class="inline-block pl-[0.15rem] hover:pointer-events-none"
                    for="inlineCheckbox3"
                >{{ ucFirst(permission) }}</label>
              </div>
            </div>
          </div>
          <div v-else class="flex">
            <div class="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]"
                 v-for="(value, permission) in permissionGroup">
              <input
                  class="checkbox "
                  type="checkbox"
                  :checked="value"
                  id="inlineCheckbox3"
              />
              <label
                  class="inline-block pl-[0.15rem] hover:pointer-events-none"
                  for="inlineCheckbox3"
              >{{ ucFirst(permission) }}</label>
            </div>
          </div>
        </div>
        <!--        <div :class="'col-span-'+5"></div>-->
      </template>
      <div class="col-span-12 flex justify-end">
        <button
            type="button"
            class="mr-4 rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            data-te-submit-btn-ref
        >
          Update
        </button>
        <button
            @click="router.go(-1)"
            type="button"
            class="rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]">
          Cancel
        </button>
      </div>
    </div>
    </form>
  </div>
</template>

<style scoped lang="postcss">
.checkbox {
  @apply relative float-left mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)]
}
</style>
