<template>
  <div class="index-view">
    <el-row>
      <el-col :span="9">
        <div class="col-content-left">
          <img src="@/assets/logo.png" alt="" />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="col-content-right">
          <div class="top-content">
            <el-row>
              <el-col :span="24">
                <div class="poin-suc">注册会员</div>
              </el-col>
            </el-row>
          </div>
          <el-form
            ref="formRefRegister"
            :model="formModal"
            :rules="formRules"
            :label-position="'left'"
          >
            <el-form-item label="姓名:">
              <div v-if="commonStore.pageOneParams?.word">
                {{ commonStore.pageOneParams?.word.name }}
              </div>
            </el-form-item>
            <el-form-item label="手机号:">
              <div v-if="commonStore.pageOneParams?.word">
                {{ commonStore.pageOneParams?.word.phone }}
              </div>
            </el-form-item>
            <el-form-item label="性别:" prop="sex">
              <el-radio-group v-model="formModal.sex">
                <el-radio :value="1">男</el-radio>
                <el-radio :value="0">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="生日:" prop="date">
              <el-date-picker
                v-model="formModal.date"
                type="date"
                placeholder="请选择生日"
              />
            </el-form-item>
            <el-form-item label="邮箱:" prop="email">
              <el-input v-model="formModal.email" placeholder="请输入邮箱" />
            </el-form-item>
            <el-form-item label="地址:" prop="address">
              <el-input v-model="formModal.address" placeholder="请输入地址" />
            </el-form-item>
          </el-form>

          <div class="footer-btns">
            <el-row :gutter="24">
              <el-col :span="12" class="back-btn-col">
                <el-button class="back-btn" @click="back">取消</el-button>
              </el-col>
              <el-col :span="12" class="sure-btn-col">
                <el-button class="sure-btn" @click="submit"> 完成 </el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElMessage, ElLoading } from "element-plus";
import { useCommonStore } from "@/stores/modules/common";
import { updateWaiterApi } from "@/apis/common";
import moment from "moment";
defineOptions({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "PoinSuccess",
});
const formRefRegister = ref();
const commonStore = useCommonStore();
const router = useRouter();
const formModal = ref({
  date: "",
  email: "",
  address: "",
  sex: "",
});
const formRules = computed(() => {
  return {
    sex: [{ required: true, message: "请选择性别", trigger: "change" }],
    date: [{ required: true, message: "请选择生日", trigger: "change" }],
    email: [{ required: true, message: "请输入邮箱", trigger: "change" }],
    address: [{ required: true, message: "请输入地址", trigger: "change" }],
  };
});
const submit = () => {
  console.log("===commonStore", commonStore.pageOneParams.word,formRefRegister.value);
  formRefRegister.value.validate(async (valid: any) => {
    if (valid) {
      const res: any = await updateWaiterApi({
        ...commonStore.pageOneParams.userInfo,
        id: commonStore.pageOneParams.word.newCustomeredId,
        username: commonStore.pageOneParams.word.name,
        mobile: commonStore.pageOneParams.word.phone,
        gender: formModal.value.sex,
        email: formModal.value.email,
        birthday: moment(formModal.value.date).format("YYYY-MM-DD"),
        address: formModal.value.address,
        enabled: commonStore.pageOneParams?.userInfo?.enabled ? true : false
      });
      if (res && res.code === 20000) {
        ElMessage.success("用户注册成功！！！");
        router.push("/");
      }
    }else{
      console.log("submit error")
    }
  });
};

const back = () => {
  router.back();
};
onMounted(() => {
  // console.log(commonStore.pageOneParams);
  // if (
  //   !commonStore.pageOneParams ||
  //   !commonStore.pageOneParams?.params ||
  //   !commonStore.pageOneParams?.word
  // ) {
  //   router.push("/index");
  // }
  // getData();
});
</script>

<style scoped lang="less">
.index-view {
  width: 100%;
  height: 100vh;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;
    .top-content {
      margin-bottom: 20px;
      .poin-suc {
        font-family: PingFang SC, PingFang SC;
        font-weight: 500;
        font-size: 24px;
        color: #8b68e6;
        text-align: center;
        margin-bottom: 40px;
      }
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
      // margin-bottom: 10px !important;
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
    .tips {
      margin-top: 20px;
      font-family: PingFang SC, PingFang SC;
      font-weight: 600;
      font-size: 23px;
      color: #8b68e6;
      text-align: center;
    }
    .footer-btns {
      width: 100%;
      margin-top: 100px;
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
