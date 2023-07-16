<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="设备类型名称:" prop="name">
          <el-input v-model="formData.name" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="最新版本号:" prop="version">
          <el-input v-model="formData.version" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="软件更新地址:" prop="address">
          <el-input v-model="formData.address" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="版本号发型日期:" prop="date">
          <el-date-picker v-model="formData.date" type="date" placeholder="选择日期" :clearable="true"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button type="primary" @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeviceClassStruct'
}
</script>

<script setup>
import {
  createDeviceClassStruct,
  updateDeviceClassStruct,
  findDeviceClassStruct
} from '@/api/deviceClassStruct'

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
const route = useRoute()
const router = useRouter()

const type = ref('')
const formData = ref({
            name: '',
            version: '',
            address: '',
            date: new Date(),
        })
// 验证规则
const rule = reactive({
})

const elFormRef = ref()

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findDeviceClassStruct({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.re设备类型
        type.value = 'update'
      }
    } else {
      type.value = 'create'
    }
}

init()
// 保存按钮
const save = async() => {
      elFormRef.value?.validate( async (valid) => {
         if (!valid) return
            let res
           switch (type.value) {
             case 'create':
               res = await createDeviceClassStruct(formData.value)
               break
             case 'update':
               res = await updateDeviceClassStruct(formData.value)
               break
             default:
               res = await createDeviceClassStruct(formData.value)
               break
           }
           if (res.code === 0) {
             ElMessage({
               type: 'success',
               message: '创建/更改成功'
             })
           }
       })
}

// 返回按钮
const back = () => {
    router.go(-1)
}

</script>

<style>
</style>
