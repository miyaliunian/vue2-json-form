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
      <RadioGroup v-model="data[config.key]" :disabled="disabled">
        <Radio
          v-for="(options, index) in config.options"
          :label="options.value"
          :key="index"
          style="width: 230px; margin-bottom: 5px"
          >{{ options.label }}</Radio
        >
      </RadioGroup>
    </FormItem>
  </Col>
</template>
<script>
import { FormItem, Col, RadioGroup, Radio } from "view-design"
export default {
  name: "FormRadioItem",
  components: {
    FormItem,
    Col,
    RadioGroup,
    Radio,
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
  },
}
</script>
<style lang="less">
.ivu-modal-wrap .ivu-radio {
  margin-right: 10px;
}
</style>
