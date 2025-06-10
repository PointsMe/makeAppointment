<template>
  <div class="index-view">
    <el-row>
      <!-- <el-col :span="9">
        <div class="col-content-left">
          <img src="@/assets/logo.png" alt="" />
        </div>
      </el-col> -->
      <el-col :span="24">
        <div class="col-content-right">
          <div class="top-logo">
            <img src="@/assets/logo.png" alt="" />
          </div>
          <el-form
            ref="formRef"
            :label-position="'top'"
            :model="formModel"
            :rules="formRules"
          >
            <el-form-item label="门店" prop="storeName">
              <el-select
                v-model="formModel.storeName"
                placeholder="Select"
                @change="changeStore"
              >
                <el-option
                  v-for="item in storeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="日期与时间" prop="date">
              <el-date-picker
                v-model="formModel.date"
                value-format="YYYY-MM-DD"
                style="width: 100%"
                type="date"
                 :editable="false"
                placeholder="Pick a day"
              />
            </el-form-item>
            <el-form-item label="" prop="time">
              <el-time-select
                v-model="formModel.time"
                start="08:30"
                step="00:15"
                end="18:30"
                  :editable="false"
                placeholder="Select time"
              />
            </el-form-item>
          </el-form>
          <div v-for="(item, index) in formList" :key="index">
            <el-form
              :ref="()=>{
                item.ref = formRef
              }"
              :label-position="'top'"
              :model="item.model"
              :rules="item.rules"
            >
              <el-form-item
                v-for="(iv, inIndex) in item.itemList"
                :key="inIndex"
                :label="iv.label"
                :prop="['type','server', 'customer'].includes(iv.value) ? iv.value : ''"
              >
              <!-- :prop="['type', 'server', 'customer'].includes(iv.value) ? iv.value : ''" -->
                <div class="add-server-select" v-if="iv.value.indexOf('server') !== -1">
                  <el-cascader
                    style="width: 100%"
                    v-model="item.model[iv.value]"
                    :options="iv.optionsData"
                    @change="(e:any)=>changeServer(e,item.id, iv.id)"
                  />
                  <el-icon
                    class="add-server-icon"
                    v-if="iv.value === 'server' && iv.label !== ''"
                    @click="addServer(item.id)"
                    ><CirclePlus
                  /></el-icon>
                  <el-icon
                    class="add-server-icon"
                    v-else
                    @click="delServer(item.id, iv.id)"
                    ><Delete
                  /></el-icon>
                </div>
                <el-select
                  :defaultValue="''"
                  v-else
                  v-model="item.model[iv.value]"
                  placeholder="Select"
                  @change="(e:any)=>changeType(e,item.id, iv.value,item)"
                >
                  <el-option
                    v-for="item in iv.optionsData"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-form>
            <div class="add-type">
              <el-row :gutter="24">
                <el-col :span="12" class="back-btn-col">
                  <el-button class="back-btn" @click="addType">添加类别</el-button>
                </el-col>
                <el-col :span="12">
                  <div class="back-btn-col-del">
                    <el-icon class="add-server-icon" @click="delType(item.id)"
                      ><Delete
                    /></el-icon>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="footer-btns">
            <el-row :gutter="24">
              <el-col :span="12" class="back-btn-col">
                <el-button class="back-btn" @click="back">返回</el-button>
              </el-col>
              <el-col :span="12" class="sure-btn-col">
                <el-button class="sure-btn" @click="submit">确认</el-button>
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
import {
  getShopListApi,
  getCategoryListApi,
  getProductListApi,
  getWaiterListApi,
} from "@/apis/common";
import { getRandomString } from "@/utils/index";
import { CirclePlus, Delete } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { useCommonStore } from "@/stores/modules/common";
import cloneDeep from "lodash-es/cloneDeep";
import moment from "moment";
defineOptions({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Index",
});
const defaultFormList = [
  {
    ref: null,
    id: getRandomString(4),
    itemList: [
      {
        id: getRandomString(4),
        label: "类别",
        value: "type",
        optionsData: [],
      },
      {
        id: getRandomString(4),
        label: "服务",
        value: "server",
        optionsData: [],
      },
      {
        id: getRandomString(4),
        label: "员工",
        value: "customer",
        optionsData: [],
      },
    ],
    model: {
      customer: "",
      type: "",
      server: "",
    },
    rules: {
      type: [{ required: true, message: "请选择类别", trigger: "change" }],
      server: [{ required: true, message: "请选择服务", trigger: "change" }],
      customer: [{ required: true, message: "请选择员工", trigger: "change" }],
    },
  },
];
const commonStore = useCommonStore();
const formRef = ref<any>(null);
const storeList = ref<any>([]);
const categoryList = ref<any>([]);
const productList = ref<any>([]);
const waiterList = ref<any>([]);
const router = useRouter();
const formModel = ref({
  storeName: "",
  date: "",
  time: "",
});
const formRules = computed(() => {
  return {
    storeName: [{ required: true, message: "请选择门店", trigger: "change" }],
    date: [{ required: true, message: "请选择日期", trigger: "change" }],
    time: [{ required: true, message: "请选择时间", trigger: "change" }],
  };
});
const formList = ref<any>(cloneDeep(defaultFormList));
const addType = () => {
  let status = false;
  for (let i = 0; i < formList.value.length; i++) {
    Object.keys(formList.value[i].model).forEach((key) => {
      console.log(key, formList.value[i].model[key]);
      if (!formList.value[i].model[key]) {
        status = true;
      }
    });
  }
  if (status) {
    return ElMessage.error("请填写完整信息!!!");
  }
  const arr = cloneDeep(defaultFormList).map((item: any) => {
    item.itemList = item.itemList.map((iv: any) => {
      if (iv.value === "type") {
        iv.optionsData = categoryList.value;
      }
      if (iv.value === "customer") {
        iv.optionsData = waiterList.value;
      }
      // if (iv.value.indexOf("server") !== -1) {
      //   iv.optionsData = productList.value;
      // }
      return {
        ...iv,
      };
    });
    return {
      ...item,
      id: getRandomString(4),
    };
  });

  formList.value = formList.value.concat(arr);
  console.log("addType===>", formList.value);
};
const delType = (id: string) => {
  if (formList.value.length === 1) {
    return false;
  }
  formList.value = formList.value.filter((iv: any) => iv.id !== id);
};
const addServer = (id: string) => {
  formList.value = formList.value.map((iv: any) => {
    if (iv.id === id) {
      const idServer = getRandomString(4);
      const serverKey = `server_${idServer}`;
      iv.itemList.splice(iv.itemList.length - 1, 0, {
        id: idServer,
        label: "",
        value: serverKey,
        optionsData: productList.value.filter(
          (it: any) => it.categoryId === iv.model.type
        ),
      });
      iv.model[serverKey] = "";
      // iv.rules[serverKey] = [{ required: true, message: "", trigger: "change" }];
    }
    return {
      ...iv
    }
  });
  console.log(formList.value);
};
const delServer = (id: string, id2: string) => {
  formList.value = formList.value.map((iv: any) => {
    if (iv.id === id) {
      iv.itemList = iv.itemList.filter((iv2: any) => iv2.id !== id2);
      delete iv.model[`server_${id2}`];
    }
    return {
      ...iv
    }
  });
  console.log(formList.value);
};
const changeServer = (e: any, id: any, id2: any) => {
  console.log("changeServer===>", e, id, id2,formList.value);
  let duration = 0;
  const productIds:any = [];
  formList.value.forEach((iv: any) => {
    if(iv.id === id){
      Object.keys(iv.model).forEach((key: any) => {
        if(key.indexOf("server") !== -1){
          const product = productList.value.find(((it:any) => it.value === iv.model[key][0]));
          if(product && product.duration){
            duration += product.duration;
            productIds.push(product.value);
          }
        }
      })
    }
  })
  const startedAt = `${formModel.value.date} ${formModel.value.time}`;
  const endedAt = moment(startedAt).add(duration, 'minutes').format('YYYY-MM-DD HH:mm:ss');
  console.log("duration===>",duration, productIds, formModel.value,new Date(startedAt), new Date(endedAt));
  getWaiterList({
    "startedAt":new Date(startedAt).getTime(),
    "endedAt": new Date(endedAt).getTime(),
    "productIds": productIds
  }).then((res:any) => {

    formList.value = formList.value.map((iv:any) => {
      if(iv.id === id){
        console.log("res===>", res);
        iv.itemList = iv.itemList.map((iv2:any) => {
          if(iv2.value === "customer"){
            console.log("customer===>", res);
            iv2.optionsData = res.map((it:any) => {
              return {
                ...it,
                name: it.username
              }
            });
          }
          return {
            ...iv2
          }
        })
      }
      return {
        ...iv
      }
    })

    console.log("formList.value===>", formList.value);
  })
}
const submit = () => {
  formRef.value.validate((valid: any) => {
    if (valid) {
      // Validate all dynamically generated forms
      const formRefs = formList.value.map((item: any) => item.ref && item.ref);
      const promises = formRefs.map((ref: any) => {
        return new Promise((resolve: any) => {
          // const form = formRefs.find((f:any) => f === ref);
          // console.log(form)
          if (ref) {
            ref.validate((isValid: any) => {
              resolve(isValid);
            });
          } else {
            resolve(false);
          }
        });
      });
      Promise.all(promises).then((results) => {
        const allValid = results.every((result) => result === true);
        console.log("allValid===>", allValid);
        if (allValid) {
          console.log("allValid", formList.value, formModel.value);
          const arr: any = [];
          cloneDeep(formList.value).map((item: any) => {
            Object.keys(item.model).forEach(function (key) {
              if (key.indexOf("server") !== -1) {
                if (item.model[key].length === 1) {
                  arr.push({
                    productId: item.model[key][0],
                    brandId: "",
                    employeeId: item.model.customer,
                  });
                }
                if (item.model[key].length === 2) {
                  arr.push({
                    productId: item.model[key][0],
                    brandId: item.model[key][1],
                    employeeId: item.model.customer,
                  });
                }
              }
            });
          });
          const params = {
            params: {
              predictArrivalAt: new Date(
                `${formModel.value.date} ${formModel.value.time}`
              ).getTime(),
              productList: arr,
            },
            word: {
              stormName: storeList.value.find(
                (it: any) => it.id === formModel.value.storeName
              )?.name,
              date: formModel.value.date,
              time: formModel.value.time,
              list: formList.value.map((item: any) => {
                let allServerNames: any = [];
                Object.keys(item.model).forEach(function (key) {
                  if (key.indexOf("server") !== -1) {
                    console.log("key", key, item.model[key]);
                    if (item.model[key] && item.model[key].length === 1) {
                      allServerNames.push(
                        `${
                          productList.value.find(
                            (iv1: any) => iv1.value === item.model[key][0]
                          )?.label
                        }`
                      );
                    }
                    if (item.model[key] && item.model[key].length === 2) {
                      allServerNames.push(
                        `${
                          productList.value.find(
                            (iv1: any) => iv1.value === item.model[key][0]
                          )?.label
                        }/${
                          productList.value
                            .find((iv2: any) => iv2.value === item.model[key][0])
                            ?.children.find(
                              (iv3: any) => iv3.value === item.model[key][1]
                            )?.label
                        }`
                      );
                    }
                  }
                });
                return {
                  categoryList: categoryList.value.find(
                    (iv: any) => iv.id === item.model.type
                  )?.name,
                  productList: allServerNames.join(),
                  customerName: waiterList.value.find(
                    (it: any) => it.id === item.model.customer
                  )?.name,
                };
              }),
            },
          };
          console.log("请求参数：", formList.value, formModel.value, params);
          commonStore.setPageOneParamsFn(params);
          router.push("/User");
        } else {
          console.log("Some forms are invalid");
        }
      });
    } else {
      console.log("error submit!!");
    }
  });
};
const back = () => {
  console.log(formList.value);
};
const changeType = (e: any, id: any, type: any, item: any) => {
  if (type === "type") {
    console.log("changeType===>", e, id, type, item);
    formList.value = formList.value.map((item: any) => {
      if (item.id === id) {
        item.itemList = item.itemList.map((iv: any) => {
          if (iv.value.indexOf("server") !== -1) {
            iv.optionsData = productList.value.filter((it: any) => it.categoryId === e);
          }
          return {
            ...iv,
          };
        });
        Object.keys(item.model).forEach(function (key) {
          if (key.indexOf("server") !== -1) {
            item.model[key] = "";
          }
        });
      }
      return {
        ...item,
      };
    });
  }
};
const changeStore = (e: string) => {
  // formList.value = cloneDeep(defaultFormList);
  commonStore.setShopIdFn(e);
  Promise.all([getCategoryList(), getProductList()]).then((res) => {
    console.log(res);
    formList.value = formList.value.map((item: any) => {
      item.itemList = item.itemList.map((iv: any) => {
        if (iv.value === "type") {
          iv.optionsData = categoryList.value;
        }
        if (iv.value === "customer") {
          iv.optionsData = waiterList.value;
        }
        // if (iv.value.indexOf("server") !== -1) {
        //   iv.optionsData = productList.value;
        // }
        return {
          ...iv,
        };
      });
      return {
        ...item,
      };
    });
    console.log("formList.value===>", formList.value);
  });
};
const getCategoryList = async () => {
  const { data } = await getCategoryListApi();
  categoryList.value = data;
  return data;
};
const getProductList = async () => {
  const { data } = await getProductListApi();
  const arr = data.map((item: any) => {
    return {
      value: item.id,
      label: `${item.name}(€${item.price})`,
      categoryId: item?.category?.id,
      duration: item?.duration,
      children:
        item.brandList && item.brandList.length > 0
          ? item.brandList.map((iv: any) => {
              return {
                value: iv.id,
                label: `${iv.name}(€${iv.price})`,
              };
            })
          : null,
    };
  });
  productList.value = arr;
  return data;
};
const getWaiterList = async (params: any) => {
  const { data } = await getWaiterListApi(params);
  const arr = data.map((item: any) => {
    return {
      ...item,
      name: item.username,
    };
  });
  waiterList.value = arr;
  return data;
};
const getData = async () => {
  const { data } = await getShopListApi();
  storeList.value = data;
};
onActivated(() => {
  console.log("onActivated===>");
});
onMounted(() => {
  const merchantId = router.currentRoute.value?.query?.merchantId as string;
  console.log("onMounted====>", router.currentRoute.value?.query);
  if (merchantId) {
    commonStore.setMerchantIdFn(merchantId);
    getData();
  }
});
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

  .col-content-right {
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;
    height: 90vh;
    overflow-y: auto;
    width: 80%;
    margin: auto;
    margin-top: 40px;
    padding: 0 35px;
    background-color: #fff;
    border-radius: 5px;
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
