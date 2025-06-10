import { pinia } from "@/stores/index"
import { defineStore } from 'pinia'
import {getLanguage,setLanguage,removeLanguage,getShopId,setShopId,removeShopId,getMerchantId,setMerchantId,removeMerchantId,setPageOneParams,getPageOneParams,removePageOneParams} from "@/utils/cache/cookies"
export const useCommonStore = defineStore("common", () => {
  const language = ref<string>(getLanguage() || 'zh-US')
  const shopId = ref<string>(getShopId() || '')
  const merchantId = ref<string>(getMerchantId() || '')
  const pageOneParams = ref<any>(getPageOneParams() || {})
  const setPageOneParamsFn = (value:any)=>{
    setPageOneParams(value)
    pageOneParams.value = {
      ...pageOneParams.value,
      ...value
    }
  }
  const resetPageOneParamsFn = () => {
    removePageOneParams()
    pageOneParams.value = {}
  }
  // 设置 Token
  const setLanguageFn = (value: string) => {
    setLanguage(value)
    language.value = value
  }
  const resetLanguageFn = () => {
    removeLanguage()
    language.value = ""
  }

  const setShopIdFn = (value:string)=>{
    setShopId(value)
    shopId.value = value
  }
  const removeShopIdFn = ()=>{
    removeShopId();
    shopId.value = ""
  }

  const setMerchantIdFn = (value:string)=>{
    setMerchantId(value)
    merchantId.value = value
  }
  const removeMerchantIdFn = ()=>{
    removeMerchantId();
    merchantId.value = ""
  }
  return { language,setLanguageFn,resetLanguageFn,shopId,setShopIdFn,removeShopIdFn,merchantId,setMerchantIdFn,removeMerchantIdFn,pageOneParams,setPageOneParamsFn,resetPageOneParamsFn }
})


/**
 * @description 在 SPA 应用中可用于在 pinia 实例被激活前使用 store
 * @description 在 SSR 应用中可用于在 setup 外使用 store
 */
export function useCommonStoreOutside() {
  return useCommonStore(pinia)
}