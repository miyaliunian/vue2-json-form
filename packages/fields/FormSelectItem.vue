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
      <Select
        v-model="data[config.key]"
        :placeholder="config.placeholder"
        :disabled="disabled"
        @on-change="change"
        filterable
        :multiple="config.multiple"
      >
        <Option
          v-for="(option, index) in config.selOptions"
          :value="option.value"
          :key="index"
          >{{ option.label }}
        </Option>
      </Select>
    </FormItem>
  </Col>
</template>
<script>
import { Col, FormItem, Select, Option } from "view-design"

export default {
  name: "FormSelectItem",
  components: {
    Col,
    FormItem,
    Select,
    Option
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
    disabled() {
      const { props = {} } = this.config
      if ("disabled" in props) {
        return props["disabled"]
      }
      return false
    }
  },
  watch: {
    config: {
      handler: (oldV, newV) => {},
      deep: true
    }
  },
  methods: {
    change(event) {
      this.$emit("change", event)
    }
  }
}
</script>
<style lang="less">
@import "../assets/styles/theme.less";
</style>
