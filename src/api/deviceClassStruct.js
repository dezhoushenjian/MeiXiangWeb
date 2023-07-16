import service from '@/utils/request'

// @Tags DeviceClassStruct
// @Summary 创建DeviceClassStruct
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.DeviceClassStruct true "创建DeviceClassStruct"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /设备类型/createDeviceClassStruct [post]
export const createDeviceClassStruct = (data) => {
  return service({
    url: '/设备类型/createDeviceClassStruct',
    method: 'post',
    data
  })
}

// @Tags DeviceClassStruct
// @Summary 删除DeviceClassStruct
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.DeviceClassStruct true "删除DeviceClassStruct"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /设备类型/deleteDeviceClassStruct [delete]
export const deleteDeviceClassStruct = (data) => {
  return service({
    url: '/设备类型/deleteDeviceClassStruct',
    method: 'delete',
    data
  })
}

// @Tags DeviceClassStruct
// @Summary 删除DeviceClassStruct
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除DeviceClassStruct"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /设备类型/deleteDeviceClassStruct [delete]
export const deleteDeviceClassStructByIds = (data) => {
  return service({
    url: '/设备类型/deleteDeviceClassStructByIds',
    method: 'delete',
    data
  })
}

// @Tags DeviceClassStruct
// @Summary 更新DeviceClassStruct
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.DeviceClassStruct true "更新DeviceClassStruct"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /设备类型/updateDeviceClassStruct [put]
export const updateDeviceClassStruct = (data) => {
  return service({
    url: '/设备类型/updateDeviceClassStruct',
    method: 'put',
    data
  })
}

// @Tags DeviceClassStruct
// @Summary 用id查询DeviceClassStruct
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.DeviceClassStruct true "用id查询DeviceClassStruct"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /设备类型/findDeviceClassStruct [get]
export const findDeviceClassStruct = (params) => {
  return service({
    url: '/设备类型/findDeviceClassStruct',
    method: 'get',
    params
  })
}

// @Tags DeviceClassStruct
// @Summary 分页获取DeviceClassStruct列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取DeviceClassStruct列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /设备类型/getDeviceClassStructList [get]
export const getDeviceClassStructList = (params) => {
  return service({
    url: '/设备类型/getDeviceClassStructList',
    method: 'get',
    params
  })
}
