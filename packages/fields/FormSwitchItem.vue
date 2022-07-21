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
      <i-switch v-model="data[config.key]" :disabled="disabled" />
    </FormItem>
  </Col>
</template>
<script>
import { Col, FormItem, Switch } from "view-design"
export default {
  name: "FormSwitchItem",
  components: {
    Col,
    FormItem,
    "i-switch": Switch,
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
  methods: {
    topStatusChange(e) {
      // console.log("topStatusChange=", e);
    },
  },
}
</script>
<style></style>
