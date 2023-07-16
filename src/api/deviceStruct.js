import service from '@/utils/request'

// @Tags DeviceStruct
// @Summary 创建DeviceStruct
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.DeviceStruct true "创建DeviceStruct"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /deviceStruct/createDeviceStruct [post]
export const createDeviceStruct = (data) => {
  return service({
    url: '/deviceStruct/createDeviceStruct',
    method: 'post',
    data
  })
}

// @Tags DeviceStruct
// @Summary 删除DeviceStruct
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.DeviceStruct true "删除DeviceStruct"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /deviceStruct/deleteDeviceStruct [delete]
export const deleteDeviceStruct = (data) => {
  return service({
    url: '/deviceStruct/deleteDeviceStruct',
    method: 'delete',
    data
  })
}

// @Tags DeviceStruct
// @Summary 删除DeviceStruct
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除DeviceStruct"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /deviceStruct/deleteDeviceStruct [delete]
export const deleteDeviceStructByIds = (data) => {
  return service({
    url: '/deviceStruct/deleteDeviceStructByIds',
    method: 'delete',
    data
  })
}

// @Tags DeviceStruct
// @Summary 更新DeviceStruct
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.DeviceStruct true "更新DeviceStruct"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /deviceStruct/updateDeviceStruct [put]
export const updateDeviceStruct = (data) => {
  return service({
    url: '/deviceStruct/updateDeviceStruct',
    method: 'put',
    data
  })
}

// @Tags DeviceStruct
// @Summary 用id查询DeviceStruct
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.DeviceStruct true "用id查询DeviceStruct"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /deviceStruct/findDeviceStruct [get]
export const findDeviceStruct = (params) => {
  return service({
    url: '/deviceStruct/findDeviceStruct',
    method: 'get',
    params
  })
}

// @Tags DeviceStruct
// @Summary 分页获取DeviceStruct列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取DeviceStruct列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /deviceStruct/getDeviceStructList [get]
export const getDeviceStructList = (params) => {
  return service({
    url: '/deviceStruct/getDeviceStructList',
    method: 'get',
    params
  })
}
