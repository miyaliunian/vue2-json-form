<template>
  <Col :span="config.span || 8">
    <FormItem
      :label="`${config.label}`"
      :prop="config.key"
      v-if="isShow"
      :style="{
        marginBottom: config.props.bottom ? `${config.props.bottom}px` : '10px'
      }"
      :rules="config.rule"
    >
      <Input
        v-model="data[config.key]"
        :readonly="readonly"
        :type="inputType"
        :disabled="disabled"
        :maxlength="maxLength"
        :show-word-limit="inputType === 'textarea'"
        :autosize="{ minRows: 4, maxRows: 6 }"
        :placeholder="config.placeholder"
      />
    </FormItem>
  </Col>
</template>
<script>
import { Col, FormItem, Input } from "view-design"
export default {
  name: "FormInputItem",
  components: {
    Col,
    FormItem,
    Input
  },
  props: {
    isShow: {
      type: Boolean,
      default: true
    },
    config: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    inputType() {
      const { extendType = "text" } = this.config
      return extendType
    },

    disabled() {
      const { props = {} } = this.config
      if ("disabled" in props) {
        return props["disabled"]
      }
      return false
    },
    readonly() {
      const { props = {} } = this.config
      if ("readonly" in props) {
        return props["readonly"]
      }
      return false
    },
    maxLength() {
      const { props = {} } = this.config
      if ("maxlength" in props) {
        return props["maxlength"]
      }
      return null
    }
  }
}
</script>
<style lang="less">
@import "../assets/styles/theme.less";
</style>
