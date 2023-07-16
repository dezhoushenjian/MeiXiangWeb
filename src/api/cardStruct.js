import service from '@/utils/request'

// @Tags CardStruct
// @Summary 创建CardStruct
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.CardStruct true "创建CardStruct"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /cardStruct/createCardStruct [post]
export const createCardStruct = (data) => {
  return service({
    url: '/cardStruct/createCardStruct',
    method: 'post',
    data
  })
}

// @Tags CardStruct
// @Summary 删除CardStruct
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.CardStruct true "删除CardStruct"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /cardStruct/deleteCardStruct [delete]
export const deleteCardStruct = (data) => {
  return service({
    url: '/cardStruct/deleteCardStruct',
    method: 'delete',
    data
  })
}

// @Tags CardStruct
// @Summary 删除CardStruct
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除CardStruct"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /cardStruct/deleteCardStruct [delete]
export const deleteCardStructByIds = (data) => {
  return service({
    url: '/cardStruct/deleteCardStructByIds',
    method: 'delete',
    data
  })
}

// @Tags CardStruct
// @Summary 更新CardStruct
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.CardStruct true "更新CardStruct"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /cardStruct/updateCardStruct [put]
export const updateCardStruct = (data) => {
  return service({
    url: '/cardStruct/updateCardStruct',
    method: 'put',
    data
  })
}

// @Tags CardStruct
// @Summary 用id查询CardStruct
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.CardStruct true "用id查询CardStruct"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /cardStruct/findCardStruct [get]
export const findCardStruct = (params) => {
  return service({
    url: '/cardStruct/findCardStruct',
    method: 'get',
    params
  })
}

// @Tags CardStruct
// @Summary 分页获取CardStruct列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取CardStruct列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /cardStruct/getCardStructList [get]
export const getCardStructList = (params) => {
  return service({
    url: '/cardStruct/getCardStructList',
    method: 'get',
    params
  })
}
