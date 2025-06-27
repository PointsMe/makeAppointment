<template>
  <div class="index-view">
    <el-row>
      <el-col :span="24">
        <div class="col-content-right">
          <div class="top-logo">
            <img src="@/assets/logo.png" alt="" />
          </div>
          <div class="top-content">
            <el-row>
              <el-col :span="12">
                <div class="con">
                  <el-icon style="font-size: 0.55rem;" ><Calendar /></el-icon>
                  <span style="font-size: 0.5rem;" v-if="commonStore.pageOneParams?.word">
                    {{ commonStore.pageOneParams?.word.date }}
                  </span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="con">
                  <el-icon style="font-size: 0.5rem;"><Timer /></el-icon>
                  <span style="font-size: 0.5rem;" v-if="commonStore.pageOneParams?.word">
                    {{ commonStore.pageOneParams?.word.time }}
                  </span>
                </div>
              </el-col>
            </el-row>
          </div>
          <el-form
            ref="formRef1"
            :label-position="'left'"
            :model="formModel"
            :rules="formRules"
          >
          <el-form-item label="门店:">
              <div v-if="commonStore.pageOneParams?.word">
                {{ commonStore.pageOneParams?.word.stormName }}
              </div>
            </el-form-item>
            <div
              v-for="(item, index) in commonStore.pageOneParams?.word.list"
              :key="index"
            >
              <el-form-item label="类别:">
                <div>
                  {{ item.categoryList }}
                </div>
              </el-form-item>
              <el-form-item label="服务:">
                <div>
                  {{ item.productList }}
                </div>
              </el-form-item>
              <el-form-item label="员工:">
                <div>
                  {{ item.customerName }}
                </div>
              </el-form-item>
            </div>
          </el-form>
          <el-form
            ref="formRef"
            :label-position="'top'"
            :model="formModel"
            :rules="formRules"
          >
            <el-form-item label="姓名:" prop="name">
              <el-input v-model="formModel.name" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input
                v-model="formModel.phone"
                placeholder="请输入手机号"
                class="input-with-select"
                style="width: 73%"
                type="number"
              >
                <template #prepend>
                  <AllCountryView @changeCountry="changeCountry" />
                </template>
              </el-input>
              <span style="display: inline-block; width: 2%"></span>
              <el-button style="width: 25%" @click="sendCode">
                <span v-if="num === 0">发送验证码</span>
                <span v-else>({{ num }}s)</span>
              </el-button>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
              <el-input
                v-model="formModel.code"
                placeholder="请输入验证码"
                class="input-with-select"
                style="width: 100%"
                type="number"
              >
              </el-input>
            </el-form-item>
          </el-form>
          <div class="footer-btns">
            <el-row :gutter="24">
              <el-col :span="12" class="back-btn-col">
                <el-button class="back-btn" @click="back">返回</el-button>
              </el-col>
              <el-col :span="12" class="sure-btn-col">
                <el-button class="sure-btn" @click="submitFn"> 确认 </el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
  <VerifyView
    mode="pop"
    :explain="$t('explainWord')"
    captchaType="blockPuzzle"
    :imgSize="{ width: '330px', height: '155px' }"
    ref="verifyRef"
    @success="getVerificationCode"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AllCountryView from '@/components/AllCountryView.vue'
import { getRandomString } from '@/utils/index'
import { Calendar, Timer } from '@element-plus/icons-vue'
import { ElMessage, ElLoading } from 'element-plus'
import { useCommonStore } from '@/stores/modules/common'
import { getVerificationCodeApi, createReservationApi } from '@/apis/common'
import { cloneDeep, debounce } from 'lodash-es'
defineOptions({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'User'
})
const commonStore = useCommonStore()
const formRef = ref<any>(null)
const router = useRouter()
const countryCode = ref()
const verifyRef = ref()
const num = ref(0)
const timer = ref()
const formModel = ref({
  name: '',
  phone: '',
  code: ''
})
const formRules = computed(() => {
  return {
    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    phone: [
      {
        required: true,
        message: '请输入手机号',
        validator: (rule: any, value: any, callback: any) => {
          if (!value) {
            callback(new Error('请输入手机号'))
          } else {
            callback()
          }
        },
        trigger: 'blur'
      }
    ],
    code: [{ required: true, min: 4, max: 6, message: '请输入4-6位验证码', trigger: 'blur' }]
  }
})
const sendCode = () => {
  if (num.value > 0) {
    return false
  }
  if (!countryCode.value) {
    return ElMessage.error('请先选择手机区号！！')
  }
  if (!formModel.value.phone) {
    return ElMessage.error('请先输入手机号码！！')
  }
  verifyRef.value && verifyRef.value.show()
}

const submit = () => {
  formRef.value.validate(async (valid: any) => {
    if (valid) {
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      // Validate all dynamically generated forms
      console.log('请求参数：', commonStore.pageOneParams.params)
      const obj = {
        mobile: `${countryCode.value.replace('+', '')}-${formModel.value.phone}`,
        username: formModel.value.name,
        verificationCode: formModel.value.code
      }
      const lastParams = Object.assign(cloneDeep(commonStore.pageOneParams.params), obj)
      try {
        const res: any = await createReservationApi({
          ...lastParams
        })
        if (res && res.code === 20000) {
          loading.close()
          commonStore.setPageOneParamsFn({
            ...commonStore.pageOneParams,
            word: {
              ...commonStore.pageOneParams.word,
              name: formModel.value.name,
              phone: `${countryCode.value.replace('+', '')}-${formModel.value.phone}`,
              newCustomered: res.data.newCustomered,
              newCustomeredId: res.data.id
            },
            userInfo: {
              ...res.data
            }
          })
          router.push('/poinSuccess')
        } else {
          loading.close()
          ElMessage.error(res.message)
        }
      } catch (error) {
        loading.close()
      }
    } else {
      console.log('error submit!!')
    }
  })
}
const submitFn = debounce(submit, 500)
const changeCountry = (e: string) => {
  countryCode.value = e
}
// 发送短信验证码
const getVerificationCode = async (token: string) => {
  console.log('aaaaa', countryCode.value)
  if (num.value) return false
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  try {
    await getVerificationCodeApi({
      mobile: `${countryCode.value.replace('+', '')}-${formModel.value.phone}`,
      captcha: token
    })
    loading.close()
    num.value = 60
    timer.value = setInterval(() => {
      if (num.value) {
        num.value = num.value - 1
      } else {
        clearInterval(timer.value)
      }
    }, 1000)
  } catch (e) {
    loading.close()
  }
}
const back = () => {
  router.back()
}
onMounted(() => {
  console.log(commonStore.pageOneParams)
  if (
    !commonStore.pageOneParams ||
    !commonStore.pageOneParams?.params ||
    !commonStore.pageOneParams?.word
  ) {
    router.push('/')
  }
  // getData();
})
</script>

<style scoped lang="less">
.index-view {
  width: 100%;
  height: 100vh;
  background-image: url("@/assets/bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  .el-row {
    height: 100%;
  }
  .el-col {
    // display: flex;
    // flex-direction: column;
  }
  .col-content-left {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    > img {
      width: 200px;
      height: 40px;
    }
  }
  .col-content-right {
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    height: 90vh;
    overflow-y: auto;
    width: 90%;
    margin: auto;
    margin-top: 5vh;
    background-color: #fff;
    border-radius: 5px;
    padding: 0 15px;
    font-size: 16px;
    .top-logo {
      width: 100%;
      height: 10%;
      display: flex;
      align-items: center;
      justify-content: center;
      > img {
        width: 80%;
        // height: 100%;
      }
    }
    .top-content {
      margin-bottom: 20px;
      .con {
        display: flex;
        align-items: center;
        justify-items: left;
      }
    }
    .add-server-select {
      width: 100%;
      position: relative;
      .add-server-icon {
        cursor: pointer;
        font-size: 25px;
        position: absolute;
        right: -30px;
        top: 50%;
        transform: translateY(-50%);
        color: black;
      }
    }
    :deep(.el-input-group__prepend) {
      background-color: #fff !important;
      .el-select__wrapper {
        box-shadow: none !important;
      }
    }
    :deep(.el-form-item) {
      margin-bottom: 10px !important;
    }
    :deep(.el-form-item--label-top .el-form-item__label) {
      margin-bottom: 0px !important;
    }
    .add-type {
      .back-btn-col-del {
        display: flex;
        justify-content: right;
        align-items: center;
        width: 100%;
        height: 100%;
        .el-icon {
          cursor: pointer;
          font-size: 30px;
          color: #eb7da1;
        }
      }
      .back-btn-col {
        width: 100%;
        height: 40px;
        .back-btn {
          width: 100%;
          height: 100%;
          border-radius: 3px 3px 3px 3px;
          background: #eb7da1;
          color: #ffffff;
          border: 1px solid #eb7da1;
        }
      }
    }
    .footer-btns {
      width: 100%;
      margin-top: 40px;
      padding-bottom: 20px;
      .back-btn-col {
        width: 100%;
        height: 40px;
        .back-btn {
          width: 100%;
          height: 100%;
          border: 1px solid #8b68e6;
          border-radius: 3px 3px 3px 3px;
          background: #ffffff;
          color: #8b68e6;
        }
      }
      .sure-btn-col {
        width: 100%;
        height: 40px;
        color: #fff;
        .sure-btn {
          width: 100%;
          height: 100%;
          border: 1px solid #8b68e6;
          border-radius: 3px 3px 3px 3px;
          background: #8b68e6;
          color: #fff;
        }
      }
    }
  }
}
</style>
