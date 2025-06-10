<template>
    <div>
        <el-select v-model="value" filterable placeholder="+86" style="width: 2.3rem;" @change="changeCountry">
            <el-option v-for="item in options" :key="item.num" :label="item.num" :value="item.num">
                <div class="all-country">
                    <img :src="item.icon" alt="">
                    <span style="margin-left: 10px;">{{ item.name }}</span>
                    <span>({{ item.num }})</span>
                </div>
            </el-option>
        </el-select>
    </div>
</template>
<script setup lang="ts">
import countryJson from "@/utils/json"
import { onMounted,watch } from 'vue';
import { useCommonStore } from "@/stores/modules/common";
defineOptions({
    name: 'allCountryView'
})
import { ref } from 'vue'
const emits = defineEmits(['changeCountry'])
const commonStore = useCommonStore()
const value = ref('+86')
const options = ref<Array<{
    icon: string,
    name: string,
    num: string,
    code: string
}>>([])
const changeCountry = (e: string) => {
    console.log(e)
    emits('changeCountry', e)
}
const getData = async () => {
    const arr: Array<{
        icon: string,
        name: string,
        code: string,
        num: string
    }> = countryJson.map(item => {
        return {
            icon: item.flags.png,
            name: item.name.common,
            code: item.cca2,
            num: `${item.idd.root}${item.idd.suffixes.toString().replace(/,/g, '')}`
        }
    })
    const current = arr.find(item => item.code === commonStore.language.toUpperCase())
    if(current){
        value.value = current.num
        changeCountry(current.num)
    }else{
        value.value = '+86'
        changeCountry('+86')
    }
    options.value = arr
    console.log(arr)
}
onMounted(() => {
    getData()
})
watch(
    () => commonStore.language,
    (newVal) => {
        console.log("countryJson===>",newVal,options.value)
        const current = options.value.find(item => item.code === newVal.toUpperCase())
        if(current){
            value.value = current.num
            changeCountry(current.num)
        }else{
            value.value = '+86'
            changeCountry('+86')
        }

    },
    { immediate: true } // 关键选项
);
</script>
<style scoped lang="less">
.all-country {
        width: 400px;
        display: flex;
        align-items: center;
        justify-content: left;
        img {
            width: 15px;
            height: 15px;
        }

        >span {
            display: inline-block;
        }

        >span:first-child {
            display: inline-block;
        }
    }
</style>