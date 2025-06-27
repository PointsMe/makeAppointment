import type * as Types from "@/apis/type"
import { request } from "@/http/axios"
import Qs from "qs"
/**
 * 
 * @returns 获取门店
 */
export function getShopListApi() {
  return request<Types.countryResponseData>({
    url: "/shop/findNoToken",
    method: "post"
  })
}
/**
 * 
 * @returns 获取类别
 */
export function getCategoryListApi() {
  return request<Types.countryResponseData>({
    url: "/category/findNoToken",
    method: "post"
  })
}
/**
 * 
 * @returns 获取产品
 */
export function getProductListApi() {
  return request<Types.countryResponseData>({
    url: "/product/findNoToken",
    method: "post"
  })
}
/**
 * 
 * @returns 获取员工
 */
export function getWaiterListApi(data:any) {
  return request<Types.countryResponseData>({
    url: "/waiter/findNoToken",
    method: "post",
    data:data
  })
}
/**
 * 
 * @returns 更新员工信息
 */
export function updateWaiterApi(data:any) {
  return request<Types.countryResponseData>({
    url: "/customer/updateNoToken",
    method: "post",
    data:data
  })
}
/**
 * 
 * @returns 创建预约
 */
export function createReservationApi(data:any) {
  return request<Types.CurrentUserResponseData>({
    url: "/reservation/createNoToken",
    method: "post",
    data:data
  })
}
/** 获取图形验证码 */
export function getCaptchaApi(data: any) {
  return request<Types.CurrentUserResponseData>({
    url: "/verification_code/getCaptcha",
    method: "post",
    data: data
  })
}
/** 验证图形验证码 */
export function checkCaptchaApi(data: any) {
  return request<Types.CurrentUserResponseData>({
    url: "/verification_code/checkCaptcha",
    method: "post",
    data: data
  })
}
/** 获取验证码 */
export function getVerificationCodeApi(data: Types.verificationCodeType) {
  return request<ApiResponseData<string | null>>({
    url: "/verification_code/send",
    method: "post",
    data: data
  })
}
/**
 * 
 * @returns 创建预约
 */
export function getSettingDetailApi() {
  return request<any>({
    url: "/reservation/setting/detailNoToken",
    method: "post",
  })
}
export function getCodeDetailApi(data:any) {
  return request<any>({
    url: "/shop/code/find",
    method: "post",
    data:data
  })
}