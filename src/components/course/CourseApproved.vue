<script setup>

import Course from "../../views/Course.vue";
import Table from "../common/Table.vue";
import {useCourseStore} from "../../stores/course";

const courseStore = useCourseStore();
courseStore.getListApproved();
console.log(courseStore.listApproved)

</script>

<template>
  <Course>
    <Table
        :data-header="{checkbox:true, thead: ['id','logo','name','level','point', 'time_required', 'created_at', 'updated_at', 'status'], action: ['edit','delete']}"
        :data="courseStore.listApproved"></Table>
  </Course>
</template>

<style scoped>

</style>