<template>
  <Col :span="config.span || 8">
    <FormItem
      :label="`${config.label}`"
      :prop="config.key"
      v-if="isShow"
      :style="{
        marginBottom: config.props.bottom ? `${config.props.bottom}px` : '10px',
      }"
      :rules="config.rule"
    >
      <CheckboxGroup v-model="data[config.key]" :disabled="disabled">
        <Checkbox
          v-for="(options, index) in config.options"
          :label="options.value"
          :key="index"
          style="width: 230px; margin-bottom: 5px"
          >{{ options.label }}</Checkbox
        >
      </CheckboxGroup>
    </FormItem>
  </Col>
</template>
<script>
import { FormItem, Col, CheckboxGroup, Checkbox } from "view-design"
export default {
  name: "FormCheckboxItem",
  components: {
    FormItem,
    Col,
    CheckboxGroup,
    Checkbox,
  },
  props: {
    isShow: {
      type: Boolean,
      default: true,
    },
    config: {
      type: Object,
      default: () => {},
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    disabled() {
      const { props = {} } = this.config
      if ("disabled" in props) {
        return props["disabled"]
      }
      return false
    },
    renderConfig() {
      const { _ifShow = true } = this.config
      return _ifShow
    },
  },
}
</script>
<style lang="less">
.ivu-checkbox {
  margin-right: 10px;
}
</style>
