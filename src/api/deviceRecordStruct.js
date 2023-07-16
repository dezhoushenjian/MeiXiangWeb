import service from '@/utils/request'

// @Tags DeviceRecordStruct
// @Summary 创建DeviceRecordStruct
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.DeviceRecordStruct true "创建DeviceRecordStruct"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /deviceRecordStruct/createDeviceRecordStruct [post]
export const createDeviceRecordStruct = (data) => {
  return service({
    url: '/deviceRecordStruct/createDeviceRecordStruct',
    method: 'post',
    data
  })
}

// @Tags DeviceRecordStruct
// @Summary 删除DeviceRecordStruct
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.DeviceRecordStruct true "删除DeviceRecordStruct"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /deviceRecordStruct/deleteDeviceRecordStruct [delete]
export const deleteDeviceRecordStruct = (data) => {
  return service({
    url: '/deviceRecordStruct/deleteDeviceRecordStruct',
    method: 'delete',
    data
  })
}

// @Tags DeviceRecordStruct
// @Summary 删除DeviceRecordStruct
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除DeviceRecordStruct"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /deviceRecordStruct/deleteDeviceRecordStruct [delete]
export const deleteDeviceRecordStructByIds = (data) => {
  return service({
    url: '/deviceRecordStruct/deleteDeviceRecordStructByIds',
    method: 'delete',
    data
  })
}

// @Tags DeviceRecordStruct
// @Summary 更新DeviceRecordStruct
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.DeviceRecordStruct true "更新DeviceRecordStruct"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /deviceRecordStruct/updateDeviceRecordStruct [put]
export const updateDeviceRecordStruct = (data) => {
  return service({
    url: '/deviceRecordStruct/updateDeviceRecordStruct',
    method: 'put',
    data
  })
}

// @Tags DeviceRecordStruct
// @Summary 用id查询DeviceRecordStruct
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.DeviceRecordStruct true "用id查询DeviceRecordStruct"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /deviceRecordStruct/findDeviceRecordStruct [get]
export const findDeviceRecordStruct = (params) => {
  return service({
    url: '/deviceRecordStruct/findDeviceRecordStruct',
    method: 'get',
    params
  })
}

// @Tags DeviceRecordStruct
// @Summary 分页获取DeviceRecordStruct列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取DeviceRecordStruct列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /deviceRecordStruct/getDeviceRecordStructList [get]
export const getDeviceRecordStructList = (params) => {
  return service({
    url: '/deviceRecordStruct/getDeviceRecordStructList',
    method: 'get',
    params
  })
}
