<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="设备编码:" prop="code">
          <el-input v-model="formData.code" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="备份型号:" prop="version">
          <el-input v-model="formData.version" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="设备名称:" prop="name">
          <el-input v-model="formData.name" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="所属项目:" prop="project_id">
          <el-input v-model.number="formData.project_id" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="所属管理员:" prop="admin_id">
          <el-input v-model.number="formData.admin_id" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="站点名称:" prop="station_name">
          <el-input v-model="formData.station_name" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="站点类型:" prop="station_type">
          <el-input v-model="formData.station_type" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="联网状态:" prop="network_status">
          <el-switch v-model="formData.network_status" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否" clearable ></el-switch>
        </el-form-item>
        <el-form-item label="运行状态:" prop="run_status">
          <el-switch v-model="formData.run_status" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否" clearable ></el-switch>
        </el-form-item>
        <el-form-item label="waterTotal:" prop="water_total">
          <el-input-number v-model="formData.water_total" :precision="2" :clearable="true"></el-input-number>
        </el-form-item>
        <el-form-item label="用电总量:" prop="electric_total">
          <el-input-number v-model="formData.electric_total" :precision="2" :clearable="true"></el-input-number>
        </el-form-item>
        <el-form-item label="经度:" prop="longitude">
          <el-input-number v-model="formData.longitude" :precision="2" :clearable="true"></el-input-number>
        </el-form-item>
        <el-form-item label="latitude:" prop="latitude">
          <el-input-number v-model="formData.latitude" :precision="2" :clearable="true"></el-input-number>
        </el-form-item>
        <el-form-item label="位置省份:" prop="position_province">
          <el-input v-model="formData.position_province" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="位置市:" prop="position_city">
          <el-input v-model="formData.position_city" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="位置区:" prop="position_county">
          <el-input v-model="formData.position_county" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="位置县:" prop="position_town">
          <el-input v-model="formData.position_town" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="位置村:" prop="position_village">
          <el-input v-model="formData.position_village" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="位置省编码:" prop="Position_province_code">
          <el-input v-model="formData.Position_province_code" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="位置市编码:" prop="Position_city_code">
          <el-input v-model="formData.Position_city_code" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="位置区域编码:" prop="Position_county_code">
          <el-input v-model="formData.Position_county_code" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="位置县编码:" prop="Position_town_code">
          <el-input v-model="formData.Position_town_code" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="位置村编码:" prop="Position_village_code">
          <el-input v-model="formData.Position_village_code" :clearable="true" placeholder="请输入" />
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
  name: 'DeviceStruct'
}
</script>

<script setup>
import {
  createDeviceStruct,
  updateDeviceStruct,
  findDeviceStruct
} from '@/api/deviceStruct'

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
            version: '',
            name: '',
            project_id: 0,
            admin_id: 0,
            station_name: '',
            station_type: '',
            network_status: false,
            run_status: false,
            water_total: 0,
            electric_total: 0,
            longitude: 0,
            latitude: 0,
            position_province: '',
            position_city: '',
            position_county: '',
            position_town: '',
            position_village: '',
            Position_province_code: '',
            Position_city_code: '',
            Position_county_code: '',
            Position_town_code: '',
            Position_village_code: '',
        })
// 验证规则
const rule = reactive({
               code : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
})

const elFormRef = ref()

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findDeviceStruct({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.redeviceStruct
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
               res = await createDeviceStruct(formData.value)
               break
             case 'update':
               res = await updateDeviceStruct(formData.value)
               break
             default:
               res = await createDeviceStruct(formData.value)
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
