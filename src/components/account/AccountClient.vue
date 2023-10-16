<script async setup>

import Course from "../../views/Course.vue";
import Table from "../common/Table.vue";
import {useCourseStore} from "../../stores/course";
import {mapCourseStatus} from "../../constant";
import {COURSE_STATUS} from "../../constant/course";

const courseStore = useCourseStore();

courseStore.getListApproved()
const data = courseStore.listApproved.map(function (course) {
  course.status = mapCourseStatus(course.status)
  return course
})


const colums = [
  {
    title: 'STT',
    dataIndex: 'stt',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Role',
    dataIndex: 'role',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Created At',
    dataIndex: 'created_at',
  },
]


const dataSource = []

const actions = ['edit']
</script>

<template>
  <Course>
    <Table
        :columns="colums"
        :dataSource="data"
        :actions="actions"
    />
  </Course>
</template>

<style scoped>

</style>