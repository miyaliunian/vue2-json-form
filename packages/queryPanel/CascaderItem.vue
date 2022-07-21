<template>
  <Col :span="config.span || 6">
    <label class="query-form-label">{{ config.label }} :</label>
    <Cascader
      v-model="rule[config.key]"
      :data="config.casOptions"
      clearable
      change-on-select
      filterable
      :placeholder="config.placeholder"
      class="query-form-element"
      trigger="hover"
      @on-change="change"
    >
    </Cascader>
  </Col>
</template>
<script>
import props from "../common/comPros"
import { Col, Cascader } from "view-design"
export default {
  name: "CascaderItem",
  components: {
    Col,
    Cascader,
  },
  props,
  methods: {
    change(...arges) {
      this.$emit("change", { ...arges })
    },
  },
}
</script>
<style lang="less">
@import "../assets/styles/theme.less";
</style>
