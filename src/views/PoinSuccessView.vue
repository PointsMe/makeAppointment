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
                <div class="poin-suc">预约成功!</div>
              </el-col>
              <el-col :span="12">
                <div class="con">
                  <el-icon><Calendar /></el-icon>
                  <span v-if="commonStore.pageOneParams?.word">
                    {{ commonStore.pageOneParams?.word.date }}
                  </span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="con">
                  <el-icon><Timer /></el-icon>
                  <span v-if="commonStore.pageOneParams?.word">
                    {{ commonStore.pageOneParams?.word.time }}
                  </span>
                </div>
              </el-col>
            </el-row>
          </div>
          <el-form ref="formRef" :label-position="'left'">
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
          </el-form>
          <div class="tips" v-if="commonStore.pageOneParams?.word.newCustomered">
            <p>新用户？</p>
            <p>是否注册成为我们的会员？</p>
          </div>
          <div class="footer-btns" v-if="commonStore.pageOneParams?.word.newCustomered">
            <el-row :gutter="24">
              <el-col :span="12" class="back-btn-col">
                <el-button class="back-btn" @click="back">不,谢谢</el-button>
              </el-col>
              <el-col :span="12" class="sure-btn-col">
                <el-button class="sure-btn" @click="submit"> 好的 </el-button>
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
import { Calendar, Timer } from "@element-plus/icons-vue";
import { ElMessage, ElLoading } from "element-plus";
import { useCommonStore } from "@/stores/modules/common";
import { cloneDeep } from "lodash-es";
defineOptions({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "PoinSuccess",
});
const commonStore = useCommonStore();
const router = useRouter();

const submit = () => {
  router.push("/register");
};

const back = () => {
  router.push("/");
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
        color: #000000;
        text-align: center;
        margin-bottom: 40px;
      }
      .con {
        display: flex;
        align-items: center;
        justify-items: left;
        font-size: 16px;
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
