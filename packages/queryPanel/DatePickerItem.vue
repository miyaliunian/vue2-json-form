<template>
  <Col :span="config.span || 6">
    <label class="query-form-label">{{ config.label }} :</label>
    <DatePicker
      v-model="rule[config.key]"
      format="yyyy-MM-dd"
      clearable
      placement="bottom-end"
      :placeholder="config.placeholder"
      :type="datePickerType"
      class="query-form-element"
      :options="options"
      split-panels
    >
    </DatePicker>
  </Col>
</template>
<script>
import { Col, DatePicker } from "view-design"
export default {
  name: "DatePickerItem",
  components: {
    DatePicker,
    Col,
  },
  props: ["config", "rule"],
  computed: {
    datePickerType() {
      return this.config.extendType || "date"
    },
    options() {
      const {
        config: { props = {} },
      } = this
      if ("disabledDate" in props) {
        return {
          disabledDate: props["disabledDate"],
        }
      }
      return null
    },
  },
}
</script>
<style lang="less">
@import "../assets/styles/theme.less";
</style>
