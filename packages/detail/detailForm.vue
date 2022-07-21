<template>
  <div>
    <!-- 弹窗 -->
    <div v-if="displayed === 'model'">
      <!-- 弹窗显示 -->
      <ModelPanel v-bind="$attrs" v-on="$listeners">
        <Form ref="form" v-bind="$attrs" :model="formData" :label-colon="true">
          <Row :gutter="16" v-for="(row, index) in configForm" :key="index">
            <!-- 分割线 -->
            <template v-if="row.splitLine">
              <Divider orientation="left">{{ row.lineTitle || "" }}</Divider>
            </template>
            <!-- 行内容 -->
            <component
              :is="col.tag"
              v-for="(col, index) in row.row"
              :key="index"
              :config="col"
              :data="formData"
              :readOnly="col.props.readOnly"
              :disabled="col.props.disabled"
              :border="col.props.border"
              :isShow="col._ifShow"
            >
            </component>
          </Row>
        </Form>
      </ModelPanel>
    </div>
    <!-- 面板显示 -->
    <template v-else-if="displayed === 'panel'">
      <!-- 是否有卡片包裹 -->
      <template v-if="cardWrapper">
        <Card class="smart-query-card">
          <Form
            ref="form"
            :label-width="130"
            :model="formData"
            :label-colon="true"
          >
            <Row :gutter="16" v-for="(row, index) in configForm" :key="index">
              <!-- 分割线 -->
              <template v-if="row.splitLine">
                <Divider orientation="left">{{ row.lineTitle || "" }}</Divider>
              </template>
              <!-- 行内容 -->
              <component
                :is="col.tag"
                v-for="(col, index) in row.row"
                :key="index"
                :config="col"
                :data="formData"
                :readOnly="col.props.readOnly"
                :border="col.props.border"
                :isShow="col._ifShow"
              >
              </component>
            </Row>
          </Form>
        </Card>
      </template>
      <template v-else>
        <Form
          ref="form"
          :label-width="130"
          :model="formData"
          :label-colon="true"
          style="margin-top: 12px"
        >
          <Row :gutter="16" v-for="(row, index) in configForm" :key="index">
            <!-- 分割线 -->
            <template v-if="row.splitLine">
              <Divider orientation="left">{{ row.lineTitle || "" }}</Divider>
            </template>
            <!-- 行内容 -->
            <component
              :is="col.tag"
              v-for="(col, index) in row.row"
              :key="index"
              :config="col"
              :data="formData"
              :readOnly="col.props.readOnly"
              :border="col.props.border"
            >
            </component>
          </Row>
        </Form>
      </template>
    </template>
    <!-- 抽屉显示 -->
    <template v-else-if="displayed === 'drawer'">
      <DrawerItem v-bind="$attrs" v-on="$listeners">
        <Form
          ref="form"
          :label-width="130"
          :model="formData"
          :label-colon="true"
          style="margin-top: 12px"
        >
          <Row :gutter="16" v-for="(row, index) in configForm" :key="index">
            <!-- 分割线 -->
            <template v-if="row.splitLine">
              <Divider orientation="left">{{ row.lineTitle || "" }}</Divider>
            </template>
            <!-- 行内容 -->
            <component
              :is="col.tag"
              v-for="(col, index) in row.row"
              :key="index"
              :config="col"
              :data="formData"
              :readOnly="col.props.readOnly"
              :border="col.props.border"
            >
            </component>
          </Row>
        </Form>
      </DrawerItem>
    </template>
  </div>
</template>
<script>
import { Form, Card, Divider, Row } from "view-design"
import FormSelectItem from "../fields/FormSelectItem.vue"
import DrawerItem from "../fields/DrawerItem"
import FormDatepickerItem from "../fields/FormDatePickerItem.vue"
import FormAvatarItem from "../fields/FormAvatarItem.vue"
import FormCheckboxItem from "../fields/FormCheckboxItem.vue"
import FormRadioItem from "../fields/FormRadioItem.vue"
import FormSwitchItem from "../fields/FormSwitchItem.vue"
import ModelPanel from "../fields/ModelItem.vue"
import FormInputItem from "./FormInputItem.vue"
import FormCascaderItem from "./FormCascaderItem.vue"
import { titleCase, isFunc, isObj } from "../libs/lib"
import { componentsMap } from "../mappings/formMapping.js"
const dayJS = require("dayjs")

export default {
  name: "DetailFormPanel",
  inheritAttrs: false,
  components: {
    Form,
    Card,
    Row,
    Divider,
    ModelPanel,
    FormInputItem,
    FormSelectItem,
    FormCascaderItem,
    FormDatepickerItem,
    FormCheckboxItem,
    FormRadioItem,
    FormSwitchItem,
    FormAvatarItem,
    DrawerItem,
  },
  props: {
    displayed: {
      // 组件展现形式 model:弹窗 panel: 平面
      type: String,
      default: "model",
    },
    cardWrapper: {
      type: Boolean,
      default: true,
    },
    data: {
      type: Object,
      default: () => {},
      require: true,
    },
    config: {
      type: Array,
      default: () => [],
      require: true,
    },
  },
  data() {
    return {
      formData: {},
    }
  },
  computed: {
    // 配置初始化
    configForm() {
      return this.config.map((item) => this.formateItem(item, this.formData))
    },
  },
  methods: {
    formateItem(item, form) {
      const { row, splitLine, lineTitle } = item
      row.map((column) => {
        let type = column.type || "input"
        let def = componentsMap[titleCase(type)]
        column.tag = def.component
        column.props = Object.assign({}, def.props, column.props)
        if (isObj(form) && form.hasOwnProperty(column.key)) {
          if ("control" in column) {
            // 组件联通
            if (
              Object.keys(column.control).find((key) => key === "hiddenOption")
            ) {
              const {
                control: { hiddenOption },
              } = column
              column._ifShow = isFunc(hiddenOption) ? hiddenOption(form) : true
            }

            // formItem 枚举值转换
            if (
              Object.keys(column.control).find((key) => key === "enumOption")
            ) {
              // console.log("是否处理枚举转换")
              const {
                control: { enumOption },
              } = column
              if (isObj(enumOption) && enumOption.hasOwnProperty("type")) {
                // console.log("可以处理枚举转换", form, column)
                form[column.key] = this.$enum.getDescByValue(
                  enumOption.type,
                  form[column.key]
                )
              }
            }
            // formItem 日期格式化
            if (
              Object.keys(column.control).find((key) => key === "formatOption")
            ) {
              // console.log("是否处理日期格式化")
              const {
                control: { formatOption },
              } = column
              if (
                isObj(formatOption) &&
                formatOption.hasOwnProperty("format")
              ) {
                // console.log("可以处理日期转换", form, column)
                form[column.key] = form[column.key]
                  ? dayJS(form[column.key]).format(formatOption.format)
                  : ""
              }
            }
          }
        }
        return column
      })
      return { splitLine, row, lineTitle }
    },
  },
  watch: {
    data: {
      handler(val) {
        this.formData = JSON.parse(JSON.stringify(val))
      },
      immediate: true,
      deep: true,
    },
  },
}
</script>
<style lang="less">
@import "../assets/styles/theme.less";
</style>
