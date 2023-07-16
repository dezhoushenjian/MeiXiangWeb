<template>
  <div>
    <warning-bar title="注：右上角头像下拉可切换角色" />
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button type="primary" icon="plus" @click="addUser">新增用户</el-button>
      </div>
      <el-table
        :data="tableData"
        row-key="ID"
      >
        <!--        <el-table-column type="expand">-->
        <!--          <template #default="props">-->
        <!--            <div>123</div>-->
        <!--          </template>-->
        <!--        </el-table-column>-->

        <el-table-column align="left" label="头像" min-width="75">
          <template #default="scope">
            <CustomPic style="margin-top:8px" :pic-src="scope.row.headerImg" />
          </template>
        </el-table-column>
        <el-table-column align="left" label="ID" min-width="50" prop="ID" />
        <el-table-column align="left" label="用户名" min-width="150" prop="userName" />
        <el-table-column align="left" label="昵称" min-width="150" prop="nickName" />
        <el-table-column align="left" label="所属项目" width="150" prop="ProjectId">
          <template #default="scope">
            {{ getParentProject(scope.row.ProjectId) }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="用户角色" min-width="200">
          <template #default="scope">
            <el-cascader
              v-model="scope.row.authorityIds[0]"
              :options="authOptions"
              :show-all-levels="false"
              collapse-tags
              :props="{ multiple:false,checkStrictly: true,label:'authorityName',value:'authorityId',disabled:'disabled',emitPath:false}"
              :clearable="false"
              @visible-change="(flag)=>{changeAuthority(scope.row,flag,0)}"
              @remove-tag="(removeAuth)=>{changeAuthority(scope.row,false,removeAuth)}"
            />
          </template>
        </el-table-column>
        <el-table-column align="left" label="手机号" min-width="180" prop="phone" />
        <el-table-column align="left" label="邮箱" min-width="180" prop="email" />
        <el-table-column align="left" label="启用" min-width="150">
          <template #default="scope">
            <el-switch
              v-model="scope.row.enable"
              inline-prompt
              :active-value="1"
              :inactive-value="2"
              @change="()=>{switchEnable(scope.row)}"
            />
          </template>
        </el-table-column>

        <el-table-column label="操作" min-width="250" fixed="right">
          <template #default="scope">
            <el-popover v-model="scope.row.visible" placement="top" width="160">
              <p>确定要删除此用户吗</p>
              <div style="text-align: right; margin-top: 8px;">
                <el-button type="primary" link @click="scope.row.visible = false">取消</el-button>
                <el-button type="primary" @click="deleteUserFunc(scope.row)">确定</el-button>
              </div>
              <template #reference>
                <el-button type="primary" link icon="delete">删除</el-button>
              </template>
            </el-popover>
            <el-button type="primary" link icon="edit" @click="openEdit(scope.row)">编辑</el-button>
            <el-button type="primary" link icon="magic-stick" @click="resetPasswordFunc(scope.row)">重置密码</el-button>
          </template>
        </el-table-column>

      </el-table>
      <div class="gva-pagination">
        <el-pagination
          :current-page="page"
          :page-size="pageSize"
          :page-sizes="[10, 30, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
    <el-dialog
      v-model="addUserDialog"
      custom-class="user-dialog"
      title="用户"
      :show-close="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <div style="height:60vh;overflow:auto;padding:0 12px;">
        <el-form ref="userForm" :rules="rules" :model="userInfo" label-width="80px">
          <el-form-item v-if="dialogFlag === 'add'" label="用户名" prop="userName">
            <el-input v-model="userInfo.userName" />
          </el-form-item>
          <el-form-item v-if="dialogFlag === 'add'" label="密码" prop="password">
            <el-input v-model="userInfo.password" />
          </el-form-item>
          <el-form-item label="昵称" prop="nickName">
            <el-input v-model="userInfo.nickName" />
          </el-form-item>

          <el-form-item label="所属项目" prop="ProjectId">
            <el-cascader
              v-model="userInfo.ProjectId"
              style="width:100%"
              class="full-width-input"
              :options="projecOptions"
              clearable
              filterable
              :props="props0"
              placeholder="请选择所属项目"
            />
          </el-form-item>

          <el-form-item label="用户角色" prop="authorityId">
            <el-cascader
              v-model="userInfo.authorityIds[0]"
              style="width:100%"
              :options="authOptions"
              :show-all-levels="false"
              :props="{ multiple:false,checkStrictly: true,label:'authorityName',value:'authorityId',disabled:'disabled',emitPath:false}"
              :clearable="false"
              @visible-change="(flag)=>{changeAuthority2(userInfo,flag,0)}"
            />
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="userInfo.phone" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userInfo.email" />
          </el-form-item>

          <el-form-item label="启用" prop="disabled">
            <el-switch
              v-model="userInfo.enable"
              inline-prompt
              :active-value="1"
              :inactive-value="2"
            />
          </el-form-item>
          <el-form-item label="头像" label-width="80px">
            <div style="display:inline-block" @click="openHeaderChange">
              <img v-if="userInfo.headerImg" alt="头像" class="header-img-box" :src="(userInfo.headerImg && userInfo.headerImg.slice(0, 4) !== 'http')?path+userInfo.headerImg:userInfo.headerImg">
              <div v-else class="header-img-box">从媒体库选择</div>
            </div>
          </el-form-item>

        </el-form>

      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeAddUserDialog">取 消</el-button>
          <el-button type="primary" @click="enterAddUserDialog">确 定</el-button>
        </div>
      </template>
    </el-dialog>
    <ChooseImg ref="chooseImg" :target="userInfo" :target-key="`headerImg`" />
  </div>
</template>

<script>
export default {
  name: 'User',
}
</script>

<script setup>

import {
  getUserList,
  setUserAuthorities,
  register,
  deleteUser
} from '@/api/user'

import {
  getProjectTreeApi,
} from '@/api/projectStruct'

import { getAuthorityList } from '@/api/authority'
import CustomPic from '@/components/customPic/index.vue'
import ChooseImg from '@/components/chooseImg/index.vue'
import WarningBar from '@/components/warningBar/warningBar.vue'
import { setUserInfo, resetPassword } from '@/api/user.js'

import { nextTick, ref, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const path = ref(import.meta.env.VITE_BASE_API + '/')
// 初始化相关
const setAuthorityOptions = (AuthorityData, optionsData) => {
  AuthorityData &&
        AuthorityData.forEach(item => {
          if (item.children && item.children.length) {
            const option = {
              authorityId: item.authorityId,
              authorityName: item.authorityName,
              children: []
            }
            setAuthorityOptions(item.children, option.children)
            optionsData.push(option)
          } else {
            const option = {
              authorityId: item.authorityId,
              authorityName: item.authorityName
            }
            optionsData.push(option)
          }
        })
}
// 获取项目树 start----------------
const props0 = {
  checkStrictly: true,
  value: 'Id',
  label: 'Name',
  children: 'Child',
}
const projecOptions = ref([])
const getProjectTree = async() => {
  projecOptions.value = []
  const res = await getProjectTreeApi()
  if (res.code === 0) {
    projecOptions.value = [res.data]
  }
}
getProjectTree()

const getParentProject = (val) => {
  const data = findParentProjectById(projecOptions.value, val)
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
// 获取项目树 end---------------------

const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
// 分页
const handleSizeChange = (val) => {
  pageSize.value = val
  getTableData()
}

const handleCurrentChange = (val) => {
  page.value = val
  getTableData()
}

// 查询
const getTableData = async() => {
  const table = await getUserList({ page: page.value, pageSize: pageSize.value })
  if (table.code === 0) {
    tableData.value = table.data.list
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}

watch(() => tableData.value, () => {
  setAuthorityIds()
})

const initPage = async() => {
  getTableData()
  const res = await getAuthorityList({ page: 1, pageSize: 999 })
  setOptions(res.data.list)
}

initPage()

const resetPasswordFunc = (row) => {
  ElMessageBox.confirm(
    '是否将此用户密码重置为123456?',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async() => {
    const res = await resetPassword({
      ID: row.ID,
    })
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: res.msg,
      })
    } else {
      ElMessage({
        type: 'error',
        message: res.msg,
      })
    }
  })
}
const setAuthorityIds = () => {
  tableData.value && tableData.value.forEach((user) => {
    user.authorityIds = user.authorities && user.authorities.map(i => {
      return i.authorityId
    })
  })
}

const chooseImg = ref(null)
const openHeaderChange = () => {
  chooseImg.value.open()
}

const authOptions = ref([])
const setOptions = (authData) => {
  authOptions.value = []
  setAuthorityOptions(authData, authOptions.value)
}

const deleteUserFunc = async(row) => {
  const res = await deleteUser({ id: row.ID })
  if (res.code === 0) {
    ElMessage.success('删除成功')
    row.visible = false
    await getTableData()
  }
}

// 弹窗相关
const userInfo = ref({
  username: '',
  password: '',
  nickName: '',
  headerImg: '',
  authorityId: '',
  authorityIds: [],
  enable: 1,
  ProjectId: '',
  positionCity: '',
  positionCityCode: '',
  positionCounty: '',
  positionCountyCode: '',
  positionProvince: '',
  positionProvinceCode: '',
  positionTown: '',
  positionTownCode: '',
  positionVillage: '',
  positionVillageCode: ''

})

const rules = ref({
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, message: '最低5位字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入用户密码', trigger: 'blur' },
    { min: 6, message: '最低6位字符', trigger: 'blur' }
  ],
  nickName: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' }
  ],
  phone: [
    { pattern: /^1([38][0-9]|4[014-9]|[59][0-35-9]|6[2567]|7[0-8])\d{8}$/, message: '请输入合法手机号', trigger: 'blur' },
  ],
  email: [
    { pattern: /^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g, message: '请输入正确的邮箱', trigger: 'blur' },
  ],
  authorityId: [
    { required: true, message: '请选择用户角色', trigger: 'blur' }
  ],
  ProjectId: [
    { required: true, message: '所属项目不能为空', trigger: ['input', 'blur'] }
  ],
})
const userForm = ref(null)
const enterAddUserDialog = async() => {
  userInfo.value.authorityId = userInfo.value.authorityIds[0]
  userForm.value.validate(async valid => {
    if (valid) {
      const req = {
        ...userInfo.value
      }
      console.log(userInfo.value)
      if (dialogFlag.value === 'add') {
        // const res = await register(req)
        const createData = formatSubmitData(JSON.parse(JSON.stringify(req)))
        const res = await register(createData)
        if (res.code === 0) {
          ElMessage({ type: 'success', message: '创建成功' })
          await getTableData()
          closeAddUserDialog()
        }
      }
      if (dialogFlag.value === 'edit') {
        // const res = await setUserInfo(req)
        const updateData = formatSubmitData(JSON.parse(JSON.stringify(req)))
        const res = await setUserInfo(updateData)
        if (res.code === 0) {
          ElMessage({ type: 'success', message: '编辑成功' })
          await getTableData()
          closeAddUserDialog()
        }
      }
    }
  })
}

const formatSubmitData = (data) => {
  if (Array.isArray(data.ProjectId)) data.ProjectId = data.ProjectId[data.ProjectId.length - 1]
  // eslint-disable-next-line no-case-declarations
  if (Array.isArray(data.positionId)) {
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
  }
  delete data.positionId
  return data
}

const addUserDialog = ref(false)
const closeAddUserDialog = () => {
  userForm.value.resetFields()
  userInfo.value.headerImg = ''
  userInfo.value.authorityIds = []
  addUserDialog.value = false
}

const dialogFlag = ref('add')

const addUser = () => {
  dialogFlag.value = 'add'
  addUserDialog.value = true
}

const tempAuth = {}
const changeAuthority = async(row, flag, removeAuth) => {
  if (Array.isArray(row.authorityIds)) {
    row.authorityIds = [row.authorityIds[row.authorityIds.length - 1]]
  } else {
    row.authorityIds = [row.authorityIds]
  }

  if (flag) {
    if (!removeAuth) {
      tempAuth[row.ID] = [...row.authorityIds]
    }
    return
  }
  await nextTick()
  console.log(row.authorityIds)

  const res = await setUserAuthorities({
    ID: row.ID,
    authorityIds: row.authorityIds
  })
  if (res.code === 0) {
    ElMessage({ type: 'success', message: '角色设置成功' })
  } else {
    if (!removeAuth) {
      row.authorityIds = [...tempAuth[row.ID]]
      delete tempAuth[row.ID]
    } else {
      row.authorityIds = [removeAuth, ...row.authorityIds]
    }
  }
}
const changeAuthority2 = async(row, flag, removeAuth) => {
  if (Array.isArray(row.authorityIds)) {
    row.authorityIds = [row.authorityIds[row.authorityIds.length - 1]]
  } else {
    row.authorityIds = [row.authorityIds]
  }
}

const openEdit = (row) => {
  dialogFlag.value = 'edit'
  userInfo.value = JSON.parse(JSON.stringify(row))
  addUserDialog.value = true
}

const switchEnable = async(row) => {
  userInfo.value = JSON.parse(JSON.stringify(row))
  await nextTick()
  const req = {
    ...userInfo.value
  }
  const res = await setUserInfo(req)
  if (res.code === 0) {
    ElMessage({ type: 'success', message: `${req.enable === 2 ? '禁用' : '启用'}成功` })
    await getTableData()
    userInfo.value.headerImg = ''
    userInfo.value.authorityIds = []
  }
}

</script>

<style lang="scss">
.user-dialog {
  .header-img-box {
  width: 200px;
  height: 200px;
  border: 1px dashed #ccc;
  border-radius: 20px;
  text-align: center;
  line-height: 200px;
  cursor: pointer;
}
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
.nickName{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.pointer{
  cursor: pointer;
  font-size: 16px;
  margin-left: 2px;
}
</style>
