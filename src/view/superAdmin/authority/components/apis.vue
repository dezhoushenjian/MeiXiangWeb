<template>
  <div>
    <div class="clearfix sticky-button">
      <el-input v-model="filterText" class="fitler" placeholder="筛选" />
      <el-button class="fl-right" type="primary" @click="authApiEnter">确 定</el-button>
    </div>
    <div class="tree-content">
      <el-tree
        ref="apiTree"
        :data="apiTreeData"
        :default-checked-keys="apiTreeIds"
        :props="apiDefaultProps"
        default-expand-all
        highlight-current
        node-key="onlyId"
        show-checkbox
        :filter-node-method="filterNode"
        @check="nodeChange"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Apis',
}
</script>

<script setup>

import { useUserStore } from '@/pinia/modules/user'
import { getAllApis } from '@/api/api'
import { UpdateCasbin, getPolicyPathByAuthorityId } from '@/api/casbin'
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
const props = defineProps({
  row: {
    default: function() {
      return {}
    },
    type: Object
  }
})

const userStore = useUserStore()
const apiDefaultProps = ref({
  children: 'children',
  label: 'description'
})
const filterText = ref('')
const apiTreeData = ref([])
const apiTreeIds = ref([])
const activeUserId = ref('')
const init = async() => {
  const res2 = await getAllApis()
  let apis = res2.data.apis
  // apiTreeData.value = buildApiTree(apis)
  if (userStore.userInfo.authority.authorityId === 888) {
    apiTreeData.value = buildApiTree(apis)
  }

  const res = await getPolicyPathByAuthorityId({
    authorityId: props.row.authorityId
    // authorityId: userStore.userInfo.authority.authorityId
  })
  // 如果不是超级管理员则只能查看设置自己当前账号拥有的API权限
  if (userStore.userInfo.authority.authorityId !== 888) {
    const re = await getPolicyPathByAuthorityId({
      authorityId: userStore.userInfo.authority.authorityId
    })
    const apiArray = []
    re.data.paths.map((item) => { apiArray.push(item) })

    apis = apis.filter((item) => {
      for (let i = 0; i < apiArray.length; i++) {
        if (apiArray[i].path === item.path && apiArray[i].method === item.method) {
          return item
        }
      }
    })
    apiTreeData.value = buildApiTree(apis)
  }
  activeUserId.value = props.row.authorityId
  apiTreeIds.value = []
  res.data.paths && res.data.paths.forEach(item => {
    apiTreeIds.value.push('p:' + item.path + 'm:' + item.method)
  })
}

init()

const needConfirm = ref(false)
const nodeChange = () => {
  needConfirm.value = true
}
// 暴露给外层使用的切换拦截统一方法
const enterAndNext = () => {
  authApiEnter()
}

// 创建api树方法
const buildApiTree = (apis) => {
  const apiObj = {}
  apis &&
        apis.forEach(item => {
          item.onlyId = 'p:' + item.path + 'm:' + item.method
          if (Object.prototype.hasOwnProperty.call(apiObj, item.apiGroup)) {
            apiObj[item.apiGroup].push(item)
          } else {
            Object.assign(apiObj, { [item.apiGroup]: [item] })
          }
        })
  const apiTree = []
  for (const key in apiObj) {
    const treeNode = {
      ID: key,
      description: key + '组',
      children: apiObj[key]
    }
    apiTree.push(treeNode)
  }
  return apiTree
}

// 关联关系确定
const apiTree = ref(null)
const authApiEnter = async() => {
  const checkArr = apiTree.value.getCheckedNodes(true)
  var casbinInfos = []
  checkArr && checkArr.forEach(item => {
    var casbinInfo = {
      path: item.path,
      method: item.method
    }
    casbinInfos.push(casbinInfo)
  })
  const res = await UpdateCasbin({
    authorityId: activeUserId.value,
    casbinInfos
  })
  if (res.code === 0) {
    ElMessage({ type: 'success', message: 'api设置成功' })
  }
}

defineExpose({
  needConfirm,
  enterAndNext
})

const filterNode = (value, data) => {
  if (!value) return true
  return data.description.indexOf(value) !== -1
}
watch(filterText, (val) => {
  apiTree.value.filter(val)
})

</script>

<style lang="scss" scoped>
@import "@/style/button.scss";
</style>
