
<script setup>
import {
  Ripple,
  Input,
  initTE
} from "tw-elements";
import {onMounted, reactive} from "vue";
import {useRoute} from "vue-router";
import router from "../../router";
import { useTopicDetailStore } from "../../stores/topicDetail";
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

const route = useRoute()
const topicDetailStore = useTopicDetailStore()

const isEdit = true;
const topicDetail = reactive({
  id: '',
  name: '',
  position: '',
  course_id: ''
})


const rules = {
  name: {
    required: helpers.withMessage('This field cannot be empty', required)
  },
  position: {
    required: helpers.withMessage('This field cannot be empty', required)
  },
  course_id: {
    required: helpers.withMessage('This field cannot be empty', required)
  }
}
const v$ = useVuelidate(rules, topicDetail)

onMounted( async () => {
    //initTE({Ripple, Input });
  await topicDetailStore.getTopicDetail(route.params.id);
  Object.assign(topicDetail, topicDetailStore.topicDetail)
})

const updateTopic = async () => {
  const result = await v$.value.$validate()
  if (result) {
    await topicDetailStore.updateTopic(route.params.id, topicDetail)
    router.go(-1)
  }
}

</script>

<template>
<div
  class="block max-w-sm rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
  <form>
    <!--Topic name input-->
    <div class="relative mb-6" data-te-input-wrapper-init>
        <label
        for="topicNameInput"
        class="pointer-events-none "
        >Topic name</label
      >
      <div :class="{ error: v$.name.$errors.length }">
      <input
        type="text"
        class="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        id="topicNameInput"
        placeholder="Enter topic name" 
        v-model="topicDetail.name"/>
        <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
      </div>
    </div>

    <!--Topic position input-->
    <div class="relative mb-6" data-te-input-wrapper-init>
        <label
        for="topicPositionInput"
        class="pointer-events-none "
        >Topic position</label
      >
      <div :class="{ error: v$.position.$errors.length }">
      <input
        type="number"
        class="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        id="topicPositionInput"
        placeholder="Topic position" 
        v-model="topicDetail.position"/>
        <div class="input-errors" v-for="error of v$.position.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
      </div>
    </div>

    <!--Course ID input-->
    <div class="mb-6 px-3 fw" data-te-input-wrapper-init>
      <div :class="{ error: v$.course_id.$errors.length }">
        <label
        class="pointer-events-none left-3 mr-4 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
        >Course ID</label
      >
        <select 
        data-te-select-init
        v-model="topicDetail.course_id">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
        <div class="input-errors" v-for="error of v$.course_id.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
      </div>
    </div>
    
    <!--Sign in button-->
    <div class="flex space-x-3">
        <button
        @click="updateTopic"
        type="button"
        class="dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]] inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        data-te-ripple-init
        data-te-ripple-color="light">
        Update
        </button>
        <button
        @click="resetData"
        type="button"
        class="dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]] inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        data-te-ripple-init
        data-te-ripple-color="light">
        Reset
        </button>
    </div>
  </form>
</div>
</template>

<style scoped>
.error-msg {
  color: red;
}
</style>
