import service from '@/utils/request'

// @Tags ProjectStruct
// @Summary 创建ProjectStruct
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.ProjectStruct true "创建ProjectStruct"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /projectStruct/createProjectStruct [post]
export const createProjectStruct = (data) => {
  return service({
    url: '/projectStruct/createProjectStruct',
    method: 'post',
    data
  })
}

// @Tags ProjectStruct
// @Summary 删除ProjectStruct
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.ProjectStruct true "删除ProjectStruct"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /projectStruct/deleteProjectStruct [delete]
export const deleteProjectStruct = (data) => {
  return service({
    url: '/projectStruct/deleteProjectStruct',
    method: 'delete',
    data
  })
}

// @Tags ProjectStruct
// @Summary 删除ProjectStruct
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除ProjectStruct"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /projectStruct/deleteProjectStruct [delete]
export const deleteProjectStructByIds = (data) => {
  return service({
    url: '/projectStruct/deleteProjectStructByIds',
    method: 'delete',
    data
  })
}

// @Tags ProjectStruct
// @Summary 更新ProjectStruct
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.ProjectStruct true "更新ProjectStruct"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /projectStruct/updateProjectStruct [put]
export const updateProjectStruct = (data) => {
  return service({
    url: '/projectStruct/updateProjectStruct',
    method: 'put',
    data
  })
}

// @Tags ProjectStruct
// @Summary 用id查询ProjectStruct
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.ProjectStruct true "用id查询ProjectStruct"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /projectStruct/findProjectStruct [get]
export const findProjectStruct = (params) => {
  return service({
    url: '/projectStruct/findProjectStruct',
    method: 'get',
    params
  })
}

// @Tags ProjectStruct
// @Summary 分页获取ProjectStruct列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取ProjectStruct列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /projectStruct/getProjectStructList [get]
export const getProjectStructList = (params) => {
  return service({
    url: '/projectStruct/getProjectStructList',
    method: 'get',
    params
  })
}
// 获取项目树形结构
export const getProjectTreeApi = () => {
  return service({
    url: 'projectStruct/getProjectTree',
    method: 'get',
    donNotShowLoading: true
  })
}

// 获取省,市,县,乡,村 province city county town village
export const getPositionApi = (type, data) => {
  return service({
    url: '/positionApi/' + type,
    method: 'post',
    data,
    donNotShowLoading: true
  })
}

