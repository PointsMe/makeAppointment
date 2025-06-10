
export const setLanguage = (value: string)=>{
    return window.localStorage.setItem('language',value)
}

export const getLanguage = ()=>{
    return window.localStorage.getItem('language')
}

export const removeLanguage = ()=>{
    return window.localStorage.removeItem('language')
}

export const setShopId = (value: string)=>{
    return window.localStorage.setItem('shopId',value)
}

export const getShopId = ()=>{
    return window.localStorage.getItem('shopId')
}

export const removeShopId = ()=>{
    return window.localStorage.removeItem('shopId')
}

export const setMerchantId = (value: string)=>{
    return window.localStorage.setItem('merchantId',value)
}

export const getMerchantId = ()=>{
    return window.localStorage.getItem('merchantId')
}

export const removeMerchantId = ()=>{
    return window.localStorage.removeItem('merchantId')
}

export const setPageOneParams = (value: any)=>{
    return window.localStorage.setItem('pageOneParams',JSON.stringify(value))
}

export const getPageOneParams = ()=>{
    return JSON.parse(window.localStorage.getItem('pageOneParams') || '{}')
}

export const removePageOneParams = ()=>{
    return window.localStorage.removeItem('pageOneParams')
}