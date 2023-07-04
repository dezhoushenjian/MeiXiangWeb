<template>
  <div>
    <div class="gva-search-box">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline" @keyup.enter="onSubmit">
        <el-form-item label="创建时间">
          <el-date-picker v-model="searchInfo.startCreatedAt" type="datetime" placeholder="开始时间" />
          —
          <el-date-picker v-model="searchInfo.endCreatedAt" type="datetime" placeholder="结束时间" />
        </el-form-item>

        <el-form-item label="项目名称" class="label-center-align">
          <el-input v-model="searchInfo.name" type="text" placeholder="请输入项目名称" clearable />
        </el-form-item>

        <el-form-item label="上级项目" class="label-center-align">
          <el-cascader
            v-model="searchInfo.pid"
            class="full-width-input"
            :options="pidOptions"
            clearable
            filterable
            :props="props0"
            placeholder="请选择上级项目"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
          <el-button icon="refresh" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button type="primary" icon="plus" @click="openDialog">新增</el-button>
        <el-popover v-model:visible="deleteVisible" placement="top" width="160">
          <p>确定要删除吗？</p>
          <div style="text-align: right; margin-top: 8px;">
            <el-button type="primary" link @click="deleteVisible = false">取消</el-button>
            <el-button type="primary" @click="onDelete">确定</el-button>
          </div>
          <template #reference>
            <el-button
              icon="delete"
              style="margin-left: 10px;"
              :disabled="!multipleSelection.length"
              @click="deleteVisible = true"
            >删除
            </el-button>
          </template>
        </el-popover>
      </div>
      <el-table
        ref="multipleTable"
        style="width: 100%"
        tooltip-effect="dark"
        :data="tableData"
        row-key="ID"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="50" />
        <el-table-column align="center" width="155" label="创建日期">
          <template #default="scope">{{ formatDate(scope.row.CreatedAt) }}</template>
        </el-table-column>
        <el-table-column align="center" label="状态" width="60" prop="pid">
          <template #default="scope">
            <span v-if="scope.row.enable!==1" style="color:red;">禁用</span>
            <span v-if="scope.row.enable===1" style="color:green;">启用</span>
          </template>
        </el-table-column>
        <el-table-column align="left" label="项目名称" width="150" prop="name" />
        <el-table-column align="left" label="上级项目" width="150" prop="pid">
          <template #default="scope">
            {{ getParentProject(scope.row.pid) }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="项目层级" width="150" prop="level">
          <template #default="scope">
            {{ scope.row.level===0?'根项目':scope.row.level+'级项目' }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="区域编码" width="150" prop="positionId">
          <template #default="scope">
            {{ getPositionId(scope.row) }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="区域名称" width="150" prop="positionName">
          <template #default="scope">
            <el-tooltip class="box-item" effect="dark" :content="getPositionName(scope.row).join(' / ')" placement="top">
              {{ getPositionName(scope.row)[ getPositionName(scope.row).length-1] }}
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column align="center" label="项目描述" prop="desc">
          <template #default="scope">{{ scope.row.desc }}</template>
        </el-table-column>
        <el-table-column align="center" label="按钮组" width="150" fixed="right">
          <template #default="scope">
            <el-button type="primary" link icon="edit" class="table-button" @click="updateProjectStructFunc(scope.row)">
              变更
            </el-button>
            <el-button type="primary" link icon="delete" @click="deleteRow(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="gva-pagination">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="page"
          :page-size="pageSize"
          :page-sizes="[10, 30, 50, 100]"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
    <el-dialog v-model="dialogFormVisible" :before-close="closeDialog" :title="type==='create'?'创建':'变更'">
      <el-form
        ref="elFormRef"
        :model="formData"
        :rules="rules"
        label-position="left"
        label-width="80px"
        @submit.prevent
      >
        <el-form-item label="项目名称" prop="name" class="required label-center-align">
          <el-input v-model="formData.name" type="text" placeholder="请输入项目名称" clearable />
        </el-form-item>
        <el-form-item label="上级项目" prop="pid" class="required label-center-align">
          <el-cascader
            v-model="formData.pid"
            class="full-width-input"
            :options="pidOptions"
            clearable
            filterable
            :props="props0"
            placeholder="请选择上级项目"
          />
        </el-form-item>
        <el-form-item label="项目区域" prop="positionId" class="required label-center-align">
          <el-cascader
            v-model="formData.positionId"
            class="full-width-input"
            :options="positionIdOptions"
            clearable
            filterable
            :props="props1"
            :placeholder="formData['positionDesc']"
          />
        </el-form-item>
        <el-form-item label="项目状态" prop="enable">
          <el-radio-group v-model="formData.enable">
            <el-radio v-for="(item, index) in enableOptions" :key="index" :label="item.value" style="{display: inline}">{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="项目描述" prop="desc">
          <el-input v-model="formData.desc" type="text" placeholder="请输入项目描述" clearable />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="enterDialog">确 定</el-button>
        </div>
      </template>
    </el-dialog>
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
  deleteProjectStruct,
  deleteProjectStructByIds,
  updateProjectStruct,
  findProjectStruct,
  getProjectStructList,
  getProjectTreeApi,
  getPositionApi
} from '@/api/projectStruct'

// 全量引入格式化工具 请按需保留
import { getDictFunc, formatDate, filterDict } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'

const props0 = {
  checkStrictly: true,
  value: 'Id',
  label: 'Name',
  children: 'Child',
}

const props1 = {
  value: 'code',
  label: 'name',
  children: 'children',
  checkStrictly: true,
  lazy: true,
  lazyLoad(node, resolve) {
    const { level } = node
    const code = node.data.code
    const typeDict = { '1': 'city', '2': 'county', '3': 'town', '4': 'village' }
    // 如果当前节点是村第5层则直接返回
    if (level > 4) return resolve()
    getPositionApi(typeDict[String(level)], { keyword: code }).then((res) => {
      if (res.code === 0) {
        node.data.children = res.data
        resolve(positionIdOptions.value)
      }
    })
  },
}

const enableOptions = [{ 'label': '启用', 'value': 1 }, { 'label': '禁用', 'value': 2 }]

const pidOptions = ref([])

const getProjectTree = async() => {
  pidOptions.value = []
  const res = await getProjectTreeApi()
  if (res.code === 0) {
    pidOptions.value = [res.data]
  }
}
// getProjectTree()

// 获取省地区信息
const getPosition = async(type, params) => {
  const res = await getPositionApi(type, params)
  if (res.code === 0) {
    res.data.map((item) => {
      item.children = []
    })
    positionIdOptions.value = res.data
    return res.data
  }
}
getPosition('province')

// 自动化生成的字典（可能为空）以及字段
const intOptions = ref([])
const formData = ref({
  name: '',
  pid: null,
  positionId: null,
  enable: 1,
  desc: null
})

const positionIdOptions = ref([])
// 验证规则
const rules = reactive({
  name: [{
    required: true,
    message: '项目名称不能为空',
    trigger: ['input', 'blur'],
  }],
  pid: [{
    required: true,
    message: '项目上级不能为空',
    trigger: ['input', 'blur'],
  }],
  positionId: [{
    required: true,
    message: '项目区域不能为空',
    trigger: ['input', 'blur'],
  }],
  enable: [{
    required: true,
    message: '项目状态不能为空',
    trigger: ['input', 'blur'],
  }],
})

const elFormRef = ref()

// =========== 表格控制部分 ===========
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
const searchInfo = ref({})

// 重置
const onReset = () => {
  searchInfo.value = {}
  getTableData()
}

// 搜索
const onSubmit = () => {
  page.value = 1
  pageSize.value = 10
  getTableData()
}

// 分页
const handleSizeChange = (val) => {
  pageSize.value = val
  getTableData()
}

// 修改页面容量
const handleCurrentChange = (val) => {
  page.value = val
  getTableData()
}

// 查询
const getTableData = async() => {
  const searchInfo2 = JSON.parse(JSON.stringify(searchInfo.value))
  if (searchInfo2.pid) searchInfo2.pid = searchInfo2.pid[searchInfo2.pid.length - 1]
  const table = await getProjectStructList({ page: page.value, pageSize: pageSize.value, ...searchInfo2 })
  if (table.code === 0) {
    tableData.value = table.data.list
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
    getProjectTree()
  }
}

getTableData()

const getParentProject = (val) => {
  const data = findParentProjectById(pidOptions.value, val)
  if (data) return data.Name
  return null
}

const findParentProjectById = (obj, id) => {
  // 检查当前对象是否为目标对象
  if (obj && obj['Id'] === id) {
    return obj
  }

  // 遍历当前对象的属性
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      // 如果属性的值是对象，则递归调用 findObjectById
      const result = findParentProjectById(obj[key], id)
      if (result) {
        return result
      }
    }
  }

  // 如果没有找到目标对象，则返回 null
  return null
}

const getPositionId = (val) => {
  const {
    positionVillageCode,
    positionTownCode,
    positionCountyCode,
    positionCityCode,
    positionProvinceCode
  } = val

  if (positionVillageCode) return positionVillageCode
  if (positionTownCode) return positionTownCode
  if (positionCountyCode) return positionCountyCode
  if (positionCityCode) return positionCityCode
  if (positionProvinceCode) return positionProvinceCode

  return null
}

const getPositionName = (val) => {
  const {
    positionVillage,
    positionTown,
    positionCounty,
    positionCity,
    positionProvince
  } = val

  const positionParts = []

  if (positionProvince) positionParts.push(positionProvince)
  if (positionCity) positionParts.push(positionCity)
  if (positionCounty) positionParts.push(positionCounty)
  if (positionTown) positionParts.push(positionTown)
  if (positionVillage) positionParts.push(positionVillage)

  return positionParts
}

// ============== 表格控制部分结束 ===============

// 获取需要的字典 可能为空 按需保留
const setOptions = async() => {
  intOptions.value = await getDictFunc('int')
}

// 获取需要的字典 可能为空 按需保留
setOptions()

// 多选数据
const multipleSelection = ref([])
// 多选
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

// 删除行
const deleteRow = (row) => {
  ElMessageBox.confirm('确定要删除吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteProjectStructFunc(row)
  })
}

// 批量删除控制标记
const deleteVisible = ref(false)

// 多选删除
const onDelete = async() => {
  const ids = []
  if (multipleSelection.value.length === 0) {
    ElMessage({
      type: 'warning',
      message: '请选择要删除的数据'
    })
    return
  }
  multipleSelection.value &&
  multipleSelection.value.map(item => {
    ids.push(item.ID)
  })
  const res = await deleteProjectStructByIds({ ids })
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    if (tableData.value.length === ids.length && page.value > 1) {
      page.value--
    }
    deleteVisible.value = false
    getTableData()
  }
}

// 行为控制标记（弹窗内部需要增还是改）
const type = ref('')

// 更新行
const updateProjectStructFunc = async(row) => {
  const res = await findProjectStruct({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) {
    formData.value = res.data.reprojectStruct
    formData.value.positionId = formatPositionId(formData.value)
    formData.value.positionDesc = formatPositionDesc(formData.value)

    dialogFormVisible.value = true
  }
}
const formatPositionId = (value) => {
  const { positionVillageCode, positionTownCode, positionCountyCode, positionCityCode, positionProvinceCode } = value

  const positionDescParts = []

  if (positionProvinceCode) positionDescParts.push(positionProvinceCode)
  if (positionCityCode) positionDescParts.push(positionCityCode)
  if (positionCountyCode) positionDescParts.push(positionCountyCode)
  if (positionTownCode) positionDescParts.push(positionTownCode)
  if (positionVillageCode) positionDescParts.push(positionVillageCode)
  return positionDescParts
}

const formatPositionDesc = (value) => {
  const { positionVillage, positionTown, positionCounty, positionCity, positionProvince } = value

  const positionDescParts = []

  if (positionProvince) positionDescParts.push(positionProvince)
  if (positionCity) positionDescParts.push(positionCity)
  if (positionCounty) positionDescParts.push(positionCounty)
  if (positionTown) positionDescParts.push(positionTown)
  if (positionVillage) positionDescParts.push(positionVillage)

  return positionDescParts.join(' / ')
}

// 删除行
const deleteProjectStructFunc = async(row) => {
  const res = await deleteProjectStruct({ ID: row.ID })
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    if (tableData.value.length === 1 && page.value > 1) {
      page.value--
    }
    getTableData()
  }
}

// 弹窗控制标记
const dialogFormVisible = ref(false)

// 打开弹窗
const openDialog = () => {
  type.value = 'create'
  dialogFormVisible.value = true
}

// 关闭弹窗
const closeDialog = () => {
  dialogFormVisible.value = false
  formData.value = {
    name: '',
    pid: null,
    positionId: null,
    enable: 1,
    desc: null
  }
}
// 弹窗确定
const enterDialog = async() => {
  elFormRef.value?.validate(async(valid) => {
    if (!valid) return
    let res
    switch (type.value) {
      case 'create':
        // eslint-disable-next-line no-case-declarations
        const createData = formatSubmitData(JSON.parse(JSON.stringify(formData.value)))
        res = await createProjectStruct(createData)
        break
      case 'update':
        // eslint-disable-next-line no-case-declarations
        const updateData = formatSubmitData(JSON.parse(JSON.stringify(formData.value)))
        res = await updateProjectStruct(updateData)
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
      closeDialog()
      getTableData()
    }
  })
}

const formatSubmitData = (data) => {
  if (Array.isArray(data.pid)) data.pid = data.pid[data.pid.length - 1]
  // eslint-disable-next-line no-case-declarations
  const [positionProvince, positionCity, positionCounty, positionTown, positionVillage] = data.positionId
  // eslint-disable-next-line no-case-declarations
  const positionProvinceData = positionIdOptions.value.find((item) => item['code'] === positionProvince)
  data.positionProvince = positionProvinceData['name']
  data.positionProvinceCode = positionProvinceData['code']
  if (positionCity) {
    const positionCityData = positionProvinceData['children'].find((item) => item['code'] === positionCity)
    data.positionCity = positionCityData['name']
    data.positionCityCode = positionCityData['code']
    if (positionCounty) {
      const positionCountyData = positionCityData['children'].find((item) => item['code'] === positionCounty)
      data.positionCounty = positionCountyData['name']
      data.positionCountyCode = positionCountyData['code']
      if (positionTown) {
        const positionTownData = positionCountyData['children'].find((item) => item['code'] === positionTown)
        data.positionTown = positionTownData['name']
        data.positionTownCode = positionTownData['code']
        if (positionVillage) {
          const positionVillageData = positionTownData['children'].find((item) => item['code'] === positionVillage)
          data.positionVillage = positionVillageData['name']
          data.positionVillageCode = positionVillageData['code']
        }
      }
    }
  }
  delete data.positionId
  return data
}

</script>

<style lang="scss">
.el-input-number.full-width-input,
.el-cascader.full-width-input {
  width: 100% !important;
}

.el-form-item--medium {
  .el-radio {
    line-height: 36px !important;
  }

  .el-rate {
    margin-top: 8px;
  }
}

.el-form-item--small {
  .el-radio {
    line-height: 32px !important;
  }

  .el-rate {
    margin-top: 6px;
  }
}

.el-form-item--mini {
  .el-radio {
    line-height: 28px !important;
  }

  .el-rate {
    margin-top: 4px;
  }
}

.clear-fix:before,
.clear-fix:after {
  display: table;
  content: "";
}

.clear-fix:after {
  clear: both;
}

.float-right {
  float: right;
}

</style>

<style lang="scss" scoped>
div.table-container {
  table.table-layout {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;

    td.table-cell {
      display: table-cell;
      height: 36px;
      border: 1px solid #e1e2e3;
    }
  }
}

div.tab-container {
}

.label-left-align :deep(.el-form-item__label) {
  text-align: left;
}

.label-center-align :deep(.el-form-item__label) {
  text-align: center;
}

.label-right-align :deep(.el-form-item__label) {
  text-align: right;
}

.custom-label {
}

.static-content-item {
  min-height: 20px;
  display: flex;
  align-items: center;

  :deep(.el-divider--horizontal) {
    margin: 0;
  }
}
:deep(.el-form--label-left .el-form-item__label){
  justify-content:flex-end
}

</style>
