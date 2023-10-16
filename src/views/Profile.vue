<script setup>
import {useAuthStore} from "../stores/auth";
import {ROLE} from "../constant/role";

const {user} = useAuthStore()

</script>

<template>
  <div class="w-full">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-3 flex items-end">
        <img src="../assets/name.svg" alt="" width="25" class="mr-2">
        Name
      </div>
      <div class="col-span-9">{{ user.name }}</div>
      <div class="col-span-3 flex items-end">
        <img src="../assets/email.svg" alt="" width="25" class="mr-2">
        Email
      </div>
      <div class="col-span-9">{{ user.email }}</div>
      <div class="col-span-3 flex items-end">
        <img src="../assets/role.svg" alt="" width="30" class="mr-2">
        Roles
      </div>
      <div class="col-span-3">
        <input class="checkbox" type="checkbox" value="" id="flexCheckDisabled"
               :checked="user.roles.includes(ROLE.ADMIN)" disabled/>
        <label
            class="inline-block pl-[0.15rem] hover:pointer-events-none"
            for="flexCheckDisabled">
          Admin
        </label>
      </div>
      <div class="col-span-6">
        <input class="checkbox" type="checkbox" value="" id="flexCheckDisabled"
               :checked="user.roles.includes(ROLE.EDITOR)" disabled/>
        <label
            class="inline-block pl-[0.15rem] hover:pointer-events-none"
            for="flexCheckDisabled">
          Editor
        </label>
      </div>
      <div class="col-span-3 row-span-3 flex items-start">
        <img src="../assets/permission.svg" alt="" width="30" class="mr-2">
        Permissions
      </div>
      <template v-for="(permissionGroup, key) in user.permissions">
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
                    disabled/>
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
                  disabled/>
              <label
                  class="inline-block pl-[0.15rem] hover:pointer-events-none"
                  for="inlineCheckbox3"
              >{{ ucFirst(permission) }}</label>
            </div>
          </div>
        </div>
        <!--        <div :class="'col-span-'+5"></div>-->
      </template>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.checkbox {
  @apply relative float-left mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)]
}
</style>
