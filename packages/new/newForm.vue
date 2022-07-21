<template>
  <ModelPanel v-bind="$attrs" v-on="$listeners" @cance-modal="cancel">
    <Form ref="form" v-bind="$attrs" :model="formData" :label-colon="true">
      <Row :gutter="16" v-for="(row, index) in configForm" :key="index">
        <!-- 分割线 -->
        <template v-if="row.splitLine">
          <Divider orientation="left">{{ row.lineTitle || "" }}</Divider>
        </template>
        <DynamicCell
          v-for="(col, index) in row.row"
          :key="index"
          :config="col"
          :data="formData"
          :isShow="col._ifShow"
          v-on="col.control"
        ></DynamicCell>
      </Row>
    </Form>
    <template v-if="!$slots.footer">
      <Row class="code-row-bg" justify="end" type="flex">
        <Button @click="cancel" style="margin-right: 10px">取消</Button>
        <Button @click="save" type="primary">保存</Button>
      </Row>
    </template>
    <Row class="code-row-bg" justify="end" type="flex">
      <slot name="footer" :data="formData"></slot>
    </Row>
  </ModelPanel>
</template>
<script>
import { Form, Row, Button, Divider, Message } from "view-design"
import ModelPanel from "../fields/ModelItem.vue"
import { componentsMap } from "../mappings/formEditMapping"
import { titleCase, isFunc, isObj } from "../libs/lib"
import DynamicCell from "./DynamicCell.vue"
import Vue from "vue"
export default {
  name: "NewFormPanel",
  inheritAttrs: false,
  components: {
    Form,
    Row,
    Divider,
    Button,
    ModelPanel,
    DynamicCell,
    Message,
  },
  props: {
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
  computed: {
    formData() {
      console.log("wefwef")
      return this.data
    },
    // 配置初始化
    configForm() {
      return this.config.map((item) => this.formateItem(item, this.data))
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
            if (Object.keys(column.control).find((key) => key === "handle")) {
              const {
                control: { handle },
              } = column
              column._ifShow = isFunc(handle) ? handle(form) : true
            }
          }
        }
        switch (column.type) {
          case "select": // select 组件判断options
            Vue.set(column, "selOptions", [])
            column.selOptions = column.options
              ? isFunc(column.options)
                ? column.options(form)
                : column.options
              : {}
            break
          case "cascader": //cascader 组件判断options
            Vue.set(column, "casOptions", [])
            column.casOptions = column.options
              ? isFunc(column.options)
                ? column.options(form)
                : column.options
              : {}
            break
          default:
            break
        }

        return column
      })
      return { splitLine, row, lineTitle }
    },
    cancel() {
      this.$refs.form.resetFields()
      this.$emit("cancel")
    },
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let emitForm = JSON.parse(JSON.stringify(this.data))
          this.$refs["form"].resetFields()
          this.$emit("sumbit", emitForm)
        } else {
          Message.error("参数验证错误，请仔细填写表单数据!")
        }
      })
    },
  },
  watch: {
    formData: {
      handler(newValue) {
        console.log("new -> watch:", newValue)
        // this.config.map((item) => this.formateItem(item, val))
      },
      deep: true,
    },
  },
}
</script>
<style lang="less">
@import "../assets/styles/theme.less";
</style>
