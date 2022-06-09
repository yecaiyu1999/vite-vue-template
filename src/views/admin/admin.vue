<script lang="ts" setup="setup" name="admin">
import { ref } from 'vue'
import { test } from '/@/service/test'
const tableData = ref([])

test().then((res) => {
  tableData.value = res
})
</script>

<template>
  <div class="wrapper h-screen w-screen text-center p-10">
    <div class="front w-96 mx-auto p-5 rounded border border-gray-300">
      <div class="font-bold text-lg text-gray-700">Admin Page</div>
    </div>
    <div class="front mt-4 w-96 mx-auto p-5 rounded border border-gray-300">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="姓名" min-width="100" />
        <el-table-column prop="sex" label="性别" min-width="50" />
        <el-table-column prop="age" label="年龄" min-width="50" />
      </el-table>
    </div>
    <div class="router mt-4 w-96 mx-auto p-5 rounded border border-gray-300">
      <p>
        <el-button type="primary" size="small" @click="$router.push({ name: 'Home' })">
          To Home
        </el-button>
      </p>
    </div>
  </div>
</template>

<style lang="scss"></style>
