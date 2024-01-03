<script setup>
import { initTE, Datatable, Button } from 'tw-elements'
import { ref, onMounted, computed, watch } from 'vue'
import router from '../../router'
import { useLessonDetailsStore } from '../../stores/lessonDetails'
import { useRoute } from 'vue-router'
const route = useRoute()

const lessonDetailsStore = useLessonDetailsStore()
initTE({ Datatable, Button })
const lessonDetail = computed(() => {
  return lessonDetailsStore.lessonDetail
})
const lessonSeleted = computed(() => {
  return lessonDetailsStore.lessonSeleted
})

const data = ref({
  columns: [
    { label: 'STT', field: 'id' },
    { label: 'Lesson name', field: 'lesson_name' },
    { label: 'Title', field: 'title' },
    { label: 'Content', field: 'content' },
    { label: 'Position', field: 'position' },
    { label: 'Action', field: 'action', sort: false }
  ],
  rows: []
})

function renderTable() {
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
              class="add-details-btn inline-block rounded-full border-primary p-1.5 mr-1 uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </button>

            <button
              type="button"
              data-te-ripple-init
              data-te-ripple-color="dark"
              data-te-id=${row.id}
              class="update-btn inline-block rounded-full border-primary p-1.5 mr-1 uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </button>

            <button
              type="button"
              data-te-ripple-init
              data-te-ripple-color="light"
              data-te-id=${row.id}
              class="delete-btn inline-block rounded-full border-primary bg-primary text-white p-1.5 uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
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

watch(
  () => lessonDetail.value,
  () => {
    //set rows về mảng rỗng trước khi gán lại
    data.value.rows = []
    for (let i = 0; i < lessonDetail.value.length; i++) {
      const dataTemp = {
        ...lessonDetail.value[i],
        lesson_name: lessonSeleted.value.lesson_name
      }
      data.value.rows.push(dataTemp)
    }
  },
  { deep: true, immediate: true }
)

let customDatatable
watch(
  () => data.value.rows,
  () => {
    customDatatable.innerHTML = ''
    renderTable()
  },
  { deep: true }
)

onMounted(async () => {
  lessonDetailsStore.setLessonDetails(route.query?.idLesson)
  customDatatable = document.getElementById('datatable')
  const setActions = () => {
    document.querySelectorAll('.add-details-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.attributes['data-te-id'].value
        router.push({ name: 'exercises_view', query: {idLessonDetail: id, idLesson: route.query?.idLesson}, props: true })
      })
    })

    document.querySelectorAll('.update-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.attributes['data-te-id'].value
        router.push({
          name: 'lesson_update_details',
          query: { idLessonDetail: id, idLesson: route.query?.idLesson },
          props: true
        })
      })
    })

    document.querySelectorAll('.delete-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.attributes['data-te-id'].value
        lessonDetailsStore.deleteLessonDetail(id)
      })
    })
  }

  customDatatable.addEventListener('render.te.datatable', setActions)

  renderTable()
})
</script>

<template>
  <div class="text-xl">Lesson detail</div>
  <div class="flex justify-end">
    <RouterLink
      class="mt-2"
      :to="{ name: 'lesson_add_details', query: { idLesson: route.query?.idLesson } }"
    >
      <button
        type="button"
        class="flex flex-reverse rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
      >
        Add
      </button>
    </RouterLink>
  </div>
  <div
    id="datatable"
    data-te-striped="true"
    data-te-maxHeight="520"
    data-te-sort-field="position"
    data-te-sort-order="desc"
    entriesOptions="[5,10,25,50]"
  ></div>
</template>

<style scoped>
.error-msg {
  color: red;
}
</style>
