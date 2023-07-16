<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="设备编号:" prop="code">
          <el-input v-model="formData.code" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="water_yield:" prop="water_yield">
          <el-input-number v-model="formData.water_yield" :precision="2" :clearable="true"></el-input-number>
        </el-form-item>
        <el-form-item label="电量:" prop="electricity_yield">
          <el-input-number v-model="formData.electricity_yield" :precision="2" :clearable="true"></el-input-number>
        </el-form-item>
        <el-form-item label="经度:" prop="longitude">
          <el-input-number v-model="formData.longitude" :precision="2" :clearable="true"></el-input-number>
        </el-form-item>
        <el-form-item label="纬度:" prop="latitude">
          <el-input-number v-model="formData.latitude" :precision="2" :clearable="true"></el-input-number>
        </el-form-item>
        <el-form-item label="水压:" prop="water_pressure">
          <el-input v-model="formData.water_pressure" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="水位:" prop="water_level">
          <el-input v-model="formData.water_level" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="信号强度:" prop="singal_intensity">
          <el-input v-model="formData.singal_intensity" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="计费模式:" prop="billing_model">
          <el-input v-model="formData.billing_model" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="数据来源:" prop="source">
          <el-input v-model.number="formData.source" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="土壤详情1:" prop="soil_details_1">
          <el-input v-model="formData.soil_details_1" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="土壤详情2:" prop="soil_details_2">
          <el-input v-model="formData.soil_details_2" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="土壤详情3:" prop="soil_details_3">
          <el-input v-model="formData.soil_details_3" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="土壤详情4:" prop="soil_details_4">
          <el-input v-model="formData.soil_details_4" :clearable="true" placeholder="请输入" />
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
  name: 'DeviceRecordStruct'
}
</script>

<script setup>
import {
  createDeviceRecordStruct,
  updateDeviceRecordStruct,
  findDeviceRecordStruct
} from '@/api/deviceRecordStruct'

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
const route = useRoute()
const router = useRouter()

const type = ref('')
const formData = ref({
            code: '',
            water_yield: 0,
            electricity_yield: 0,
            longitude: 0,
            latitude: 0,
            water_pressure: '',
            water_level: '',
            singal_intensity: '',
            billing_model: '',
            source: 0,
            soil_details_1: '',
            soil_details_2: '',
            soil_details_3: '',
            soil_details_4: '',
        })
// 验证规则
const rule = reactive({
})

const elFormRef = ref()

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findDeviceRecordStruct({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.redeviceRecordStruct
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
               res = await createDeviceRecordStruct(formData.value)
               break
             case 'update':
               res = await updateDeviceRecordStruct(formData.value)
               break
             default:
               res = await createDeviceRecordStruct(formData.value)
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
