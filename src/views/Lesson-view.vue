<script setup>
import { onMounted, ref } from 'vue'
import { Datatable, Button, initTE } from 'tw-elements'
import router from '../router'
import { useLessonStore } from '../stores/lesson'
import { useLessonDetailsStore } from '../stores/lessonDetails'
import { topicData } from '../stores/data'

const lessonStore = useLessonStore()
const lessonDetailStore = useLessonDetailsStore()
const lesson = lessonStore.getListLesson()
const data = ref({
  columns: [
    { label: 'STT', field: 'id' },
    { label: 'Topic name', field: 'topic_name' },
    { label: 'Lesson name', field: 'lesson_name' },
    { label: 'Status', field: 'status' },
    { label: 'Position', field: 'position' },
    { label: 'Action', field: 'action', sort: false }
  ],
  rows: []
})

onMounted(async () => {
  initTE({ Button, Datatable })
  const customDatatable = document.getElementById('datatable')

  const setActions = () => {
    document.querySelectorAll('.add-details-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idLesson = btn.attributes['data-te-id'].value
        router.push({ name: 'lesson_view_details', query: {idLesson: idLesson}, props: true })
      })
    })

    document.querySelectorAll('.update-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        router.push({ name: 'lesson_update', params: {}, props: true })
      })
    })

    document.querySelectorAll('.delete-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.attributes['data-te-id'].value
        data.value.rows = data.value.rows.filter((item) => (item.id != id))
        // render table
        // reset table
        customDatatable.innerHTML = ""
        renderTable()
      })
    })
  }

  // Create a mapping between topicID and topicName
  const topicMapping = topicData.reduce((acc, topic) => {
    acc[topic.id] = topic.topic_name
    return acc
  }, {})

  function getTopicName(topicID) {
    return topicMapping[topicID]
  }

  for (let i = 0; i < lesson.length; i++) {
    if (lesson[i].status == 1) {
      lesson[i].status = 'Active'
    } else if (lesson[i].status == 0) {
      lesson[i].status = 'Inactive'
    }
    lesson[i].topic_name = getTopicName(lesson[i].topic_id)

    data.value.rows = lesson
  }

  function renderTable() {
    customDatatable.addEventListener('render.te.datatable', setActions)
    new Datatable(
      customDatatable,
      {
        columns: data.value.columns,
        rows: data.value.rows.map((row) => {
          return {
            ...row,
            action: `
            <button
              type="button"
              data-te-ripple-init
              data-te-ripple-color="dark"
              data-te-id=${row.id}
              class="add-details-btn inline-block rounded-full border border-primary p-1.5 mr-1 uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>

            <button
              type="button"
              data-te-ripple-init
              data-te-ripple-color="dark"
              data-te-id=${row.id}
              class="update-btn inline-block rounded-full border border-primary p-1.5 mr-1 uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </button>

            <button
              type="button"
              data-te-ripple-init
              data-te-ripple-color="light"
              data-te-id=${row.id}
              class="delete-btn inline-block rounded-full border border-primary bg-primary text-white p-1.5 uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>`
          }
        })
      },
      { hover: true }
    )
  }
  renderTable()
})

// TODO: Need update
function deleteItem(row) {
  console.log(row)
  console.log(this.data)
  const index = this.data.rows.indexOf(row)
  if (index !== -1) {
    this.data.rows.splice(index, 1)
  }
}
</script>

<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <RouterView></RouterView>
          <RouterLink :to="{ name: 'lesson_add' }">
            <button
              @click="addTopic"
              type="button"
              class="flex flex-reverse rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Add
            </button>
          </RouterLink>
          <div
            id="datatable"
            data-te-striped="true"
            data-te-maxHeight="520"
            entriesOptions="[5,10,25,50]"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.tab-link {
  @apply inline-block px-4 py-2;

  &:not(.active) {
    @apply text-gray-700 hover:text-black;
  }

  &.active {
    @apply border-b-2 border-indigo-600 text-indigo-600 font-semibold;
  }
}
</style>
