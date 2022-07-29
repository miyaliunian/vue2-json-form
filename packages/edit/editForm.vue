<template>
  <div>
    <ModelPanel v-bind="$attrs" v-on="$listeners" @cance-modal="cancel">
      <Form
        ref="editModel"
        v-bind="$attrs"
        :model="formData"
        :label-colon="true"
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
        <slot name="footer"></slot>
      </Row>
    </ModelPanel>
  </div>
</template>
<script>
import { Card, Form, Row, Button, Divider, Message } from "view-design"
import ModelPanel from "../fields/ModelItem.vue"
import { componentsMap } from "../mappings/formEditMapping"
import { titleCase, isFunc, isObj } from "../libs/lib"
import DynamicCell from "./DynamicCell.vue"
import EventBus from "../libs/EventBus"
import { syncOption } from "../libs/syncOption"

export default {
  name: "EditFormPanel",
  inheritAttrs: false,
  components: {
    Card,
    Form,
    Row,
    Divider,
    Button,
    ModelPanel,
    DynamicCell,
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
  data() {
    return {
      resetFlag: 0,
      orignForm: null,
    }
  },
  computed: {
    formData() {
      return this.data
    },
    // 配置初始化
    configForm() {
      this.mappkeys()
      return this.config.map((item) => this.formateItem(item, this.data))
    },
  },
  methods: {
    mappkeys() {
      console.log("mapkeys", this.data)
    },

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
        syncOption(column)
        return column
      })
      return { splitLine, row, lineTitle }
    },
    cancel() {
      this.$refs.editModel.resetFields()
      Object.keys(this.formData).forEach((key) => {
        this.formData[key] = this.orignForm[key]
      })
      this.resetFlag = 0
      setTimeout(() => {
        this.$emit("cancel")
      }, 0)
    },
    save() {
      this.$refs.editModel.validate((valid) => {
        if (valid) {
          let emitForm = JSON.parse(JSON.stringify(this.formData))
          this.resetFlag = 0
          // this.$refs["editModel"].resetFields()
          this.$emit("sumbit", emitForm, () => {
            this.$refs["editModel"].resetFields()
          })
        } else {
          Message.error("参数验证错误，请仔细填写表单数据!")
        }
      })
    },
  },
  watch: {
    formData: {
      handler(newValue, oldValue) {
        console.log("edith -> handler:", newValue)
        if (newValue.id === null || newValue.id === "") {
          this.resetFlag === 0
        } else {
          this.resetFlag += 1
        }
        if (this.resetFlag === 1) {
          this.orignForm = JSON.parse(JSON.stringify(newValue))
        }
        // this.config.map((item) => this.formateItem(item, newValue))
      },
      deep: true,
    },
  },
}
</script>
<style lang="less">
@import "../assets/styles/theme.less";
</style>
