<template>
  <div>
    <!-- 需要卡片包裹 -->
    <template v-if="cardWrapper">
      <Card class="smart-query-card">
        <Form ref="form" v-bind="$attrs" :model="formData" :label-colon="true">
          <Row :gutter="16" v-for="(row, index) in configForm" :key="index">
            <!-- 分割线 -->
            <template v-if="row.splitLine">
              <Divider orientation="left">{{ row.lineTitle || "" }}</Divider>
            </template>
            <!-- 行内容 -->
            <DynamicCell
              v-for="(col, index) in row.row"
              :key="index"
              :config="col"
              :data="formData"
              :readOnly="col.props.readOnly"
              :border="col.props.border"
              :isShow="col._ifShow"
              v-on="col.control"
            ></DynamicCell>
          </Row>
        </Form>
      </Card>
    </template>
    <!-- 不需要卡片包裹 -->
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
          <DynamicCell
            v-for="(col, index) in row.row"
            :key="index"
            :config="col"
            :data="formData"
            :readOnly="col.props.readOnly"
            :border="col.props.border"
            :isShow="col._ifShow"
            v-on="col.control"
          ></DynamicCell>
        </Row>
      </Form>
    </template>
  </div>
</template>
<script>
import { Form, Card, Divider, Row } from "view-design"
import { titleCase, isFunc, isObj } from "../libs/lib"
import { componentsMap } from "../mappings/formMapping.js"
import DynamicCell from "./DynamicCell.vue"
const dayJS = require("dayjs")

export default {
  name: "FormPanel",
  components: {
    Form,
    Card,
    Row,
    Divider,
    DynamicCell
  },
  props: {
    cardWrapper: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object,
      default: () => {},
      require: true
    },
    config: {
      type: Array,
      default: () => [],
      require: true
    }
  },
  data() {
    return {
      formData: {}
    }
  },
  computed: {
    // 配置初始化
    configForm() {
      return this.config.map((item) => this.formateItem(item, this.formData))
    }
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
            // formItem 组件联动
            if (
              Object.keys(column.control).find((key) => key === "hiddenOption")
            ) {
              const {
                control: { hiddenOption }
              } = column
              column._ifShow = isFunc(hiddenOption) ? hiddenOption(form) : true
            }

            // formItem 枚举值转换
            if (
              Object.keys(column.control).find((key) => key === "enumOption")
            ) {
              // console.log("是否处理枚举转换")
              const {
                control: { enumOption }
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
                control: { formatOption }
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
    }
  },
  watch: {
    data: {
      handler(val) {
        this.formData = JSON.parse(JSON.stringify(val))
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
<style lang="less">
@import "../assets/styles/theme.less";
</style>
