<script setup>
import {useAuthStore} from "../stores/auth";
import {ROLE} from "../constant/role";
import {onMounted, ref} from "vue";
import {Button, Validation, initTE, Input, Select} from "tw-elements";
import router from "../router";
import {useUserStore} from "../stores/user";
import {useAccountDetailStore} from "../stores/accountDetail";
import {useRoute} from "vue-router";
import {USER_STATUS} from "../constant/user";

const route = useRoute()
const userStore = useUserStore();
const accountDetailStore = useAccountDetailStore()
const defaultPermissions = ref({
  login: {
    cms: true,
    client: false,
  },
  course: {
    view: false,
    update: false,
    create: false,
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
})
const editorPermissions = ref({
  login: {
    cms: true,
    client: false,
  },
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
})
const adminPermissions = ref({
  login: {
    cms: true,
    client: true,
  },
  course: {
    view: true,
    update: true,
    create: true,
    approve: true
  },
  account: {
    cms: {
      view: true,
      update: true,
      create: true
    },
    client: {
      view: true,
      closure: true
    }
  }
})
const accountDetail = ref({
  name: null,
  email: null,
  roles: [2],
  permissions: {
    login: {
      cms: true,
      client: true,
    },
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
const errors = ref({
  name: [],
  email: [],
  status: [],
  roles: [],
})
const defaultErrors = ref({
  name: [],
  email: [],
  status: [],
  roles: [],
})
onMounted(async () => {
  initTE({Input, Select, Button}, {allowReinits: true});
  await accountDetailStore.getAccountDetail(route.params.id);
  Object.assign(accountDetail.value, accountDetailStore.accountDetail)
})
const updateAccount = async () => {
  const data = await userStore.updateAccount(route.params.id, accountDetail.value);
  Object.assign(errors.value, data)
  if(!data){
    await router.push({name: 'account_cms'})
  }
}
const handlePermissionsByRole = () => {
  if (accountDetail.value.roles.includes(ROLE.ADMIN)) {
    accountDetail.value.permissions = {...adminPermissions.value}
  } else if (accountDetail.value.roles.includes(ROLE.EDITOR)) {
    accountDetail.value.permissions = {...editorPermissions.value}
  } else {
    accountDetail.value.permissions = {...defaultPermissions.value}
  }
}
</script>

<template>
  <div class="w-full">
    <form id="formAccountAdd">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-3 flex">
        Name
      </div>
      <div class="col-span-7">
        <div class="relative" data-te-input-wrapper-init>
          <input
              type="text"
              v-model="accountDetail.name"
              placeholder="Name"
              class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="formInputName"/>
        </div>
        <div class="mt-2 mb-2 text-sm text-red-600" v-show="errors.name.length > 0">
          {{ errors.name.toString() }}
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
        <div class="mt-2 mb-2 text-sm text-red-600" v-show="errors.email.length > 0">
          {{ errors.email.toString() }}
        </div>
      </div>
      <div class="col-span-3 flex">
        Status
      </div>
      <div class="col-span-3">
        <select data-te-select-init v-model="accountDetail.status">
          <option :value="value" v-for="(value,name) in USER_STATUS">{{ ucFirst(name) }}</option>
        </select>
        <div class="mt-2 mb-2 text-sm text-red-600" v-show="errors.status.length > 0">
          {{ errors.status.toString() }}
        </div>
      </div>
      <div class="col-span-3 col-start-1">
        Roles
      </div>
      <div class="col-span-3">
        <input class="checkbox cursor-pointer" type="checkbox" :value="ROLE.ADMIN" id="roleAdminCheckbox" v-model="accountDetail.roles" @change="handlePermissionsByRole"/>
        <label
            class="inline-block pl-[0.15rem] cursor-pointer"
            for="roleAdminCheckbox">
          Admin
        </label>
        <div class="mt-2 mb-2 text-sm text-red-600" v-show="errors.roles.length > 0">
          {{ errors.roles.toString() }}
        </div>
      </div>
      <div class="col-span-6">
        <input class="checkbox cursor-pointer" type="checkbox" :value="ROLE.EDITOR" id="roleEditorCheckbox" v-model="accountDetail.roles" @change="handlePermissionsByRole"/>
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
                    class="checkbox"
                    type="checkbox"
                    :checked="value"
                    v-model="accountDetail.permissions[key][key2][permission]"
                    id="permissionCheckbox"
                />
                <label
                    class="inline-block pl-[0.15rem] hover:pointer-events-none"
                    :for="permission + 'checkbox'"
                >{{ ucFirst(permission) }}</label>
              </div>
            </div>
          </div>
          <div v-else class="flex">
            <div class="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]"
                 v-for="(value, permission) in permissionGroup">
              <input
                  class="checkbox"
                  type="checkbox"
                  :checked="value"
                  v-model="accountDetail.permissions[key][permission]"
                  id="permissionCheckbox"
              />
              <label
                  class="inline-block pl-[0.15rem] hover:pointer-events-none"
                  :for="permission + 'checkbox'"
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
            @click="updateAccount"
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
