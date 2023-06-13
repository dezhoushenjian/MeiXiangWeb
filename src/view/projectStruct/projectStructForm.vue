<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="名称:" prop="name">
          <el-input v-model="formData.name" :clearable="false" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="父id:" prop="pid">
          <el-select v-model="formData.pid" placeholder="请选择" :clearable="false">
            <el-option v-for="(item,key) in intOptions" :key="key" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="level:" prop="level">
          <el-select v-model="formData.level" placeholder="请选择" :clearable="false">
            <el-option v-for="(item,key) in intOptions" :key="key" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="位置编号:" prop="positionId">
          <el-select v-model="formData.positionId" placeholder="请选择" :clearable="false">
            <el-option v-for="(item,key) in intOptions" :key="key" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="位置名称:" prop="positionName">
          <el-input v-model="formData.positionName" :clearable="false" placeholder="请输入" />
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
  name: 'ProjectStruct'
}
</script>

<script setup>
import {
  createProjectStruct,
  updateProjectStruct,
  findProjectStruct
} from '@/api/projectStruct'

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
const route = useRoute()
const router = useRouter()

const type = ref('')
const intOptions = ref([])
const formData = ref({
            name: '',
            pid: undefined,
            level: undefined,
            positionId: undefined,
            positionName: '',
        })
// 验证规则
const rule = reactive({
               name : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               pid : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               level : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               positionId : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               positionName : [{
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
      const res = await findProjectStruct({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.reprojectStruct
        type.value = 'update'
      }
    } else {
      type.value = 'create'
    }
    intOptions.value = await getDictFunc('int')
}

init()
// 保存按钮
const save = async() => {
      elFormRef.value?.validate( async (valid) => {
         if (!valid) return
            let res
           switch (type.value) {
             case 'create':
               res = await createProjectStruct(formData.value)
               break
             case 'update':
               res = await updateProjectStruct(formData.value)
               break
             default:
               res = await createProjectStruct(formData.value)
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
