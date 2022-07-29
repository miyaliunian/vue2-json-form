<template>
  <Col :span="config.span || 6">
    <label class="query-form-label">{{ config.label }} :</label>
    <Input
      class="query-form-element"
      clearable
      :placeholder="config.placeholder"
      v-model="rule[config.key]"
    />
  </Col>
</template>
<script>
import props from "../common/comPros"
import { Col, Input } from "view-design"
export default {
  name: "InputItem",
  components: {
    Col,
    Input
  },
  props
}
</script>
<style lang="less">
@import "../assets/styles/theme.less";
</style>
