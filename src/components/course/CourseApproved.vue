<script setup>

import Course from "../../views/Course.vue";
import Table from "../common/Table.vue";
import {useCourseStore} from "../../stores/course";
import {mapCourseStatus} from "../../constant";

const courseStore = useCourseStore();

function ucfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

courseStore.getListApproved()
const dataSource = courseStore.listApproved.map(function (course) {
  course.status = mapCourseStatus(course.status)
  return course
})

const colums = [
  {
    title: 'STT',
    dataIndex: 'stt',
  },
  {
    title: 'Logo',
    dataIndex: 'logo',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Level',
    dataIndex: 'level',
  },
  {
    title: 'Point',
    dataIndex: 'point',
  },
  {
    title: 'Time Required',
    dataIndex: 'time_required',
  },
  {
    title: 'Created At',
    dataIndex: 'created_at',
  },
  {
    title: 'Updated At',
    dataIndex: 'updated_at',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
]
const actions = ['edit', 'delete']
</script>

<template>
    <Table
        :columns="colums"
        :dataSource="dataSource"
        :actions="actions"
    />
</template>

<style scoped>

</style>