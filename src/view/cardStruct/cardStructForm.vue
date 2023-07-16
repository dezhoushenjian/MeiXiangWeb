<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="卡片号码:" prop="card_no">
          <el-input v-model="formData.card_no" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="农户id:" prop="farmer_id">
          <el-input v-model.number="formData.farmer_id" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="卡片余额:" prop="balance">
          <el-input-number v-model="formData.balance" :precision="2" :clearable="true"></el-input-number>
        </el-form-item>
        <el-form-item label="所属终端:" prop="terminal">
          <el-input v-model="formData.terminal" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="卡片类型:" prop="type">
          <el-input v-model="formData.type" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-switch v-model="formData.status" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否" clearable ></el-switch>
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
  name: 'CardStruct'
}
</script>

<script setup>
import {
  createCardStruct,
  updateCardStruct,
  findCardStruct
} from '@/api/cardStruct'

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
const route = useRoute()
const router = useRouter()

const type = ref('')
const formData = ref({
            card_no: '',
            farmer_id: 0,
            balance: 0,
            terminal: '',
            type: '',
            status: false,
        })
// 验证规则
const rule = reactive({
})

const elFormRef = ref()

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findCardStruct({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.recardStruct
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
               res = await createCardStruct(formData.value)
               break
             case 'update':
               res = await updateCardStruct(formData.value)
               break
             default:
               res = await createCardStruct(formData.value)
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
