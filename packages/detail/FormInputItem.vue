<template>
  <Col :span="config.span || 8" v-if="isShow">
    <FormItem
      :label="`${config.label}`"
      :prop="config.key"
      :rules="config.rule"
      :style="{
        marginBottom: config.props.bottom ? `${config.props.bottom}px` : '10px',
      }"
    >
      <Input
        v-model="data[config.key]"
        :type="inputType"
        :readonly="readOnly"
        :placeholder="config.placeholder"
        :border="border"
        :autosize="{ minRows: 4, maxRows: 6 }"
      />
    </FormItem>
  </Col>
</template>
<script>
import { Input, FormItem } from "view-design"
export default {
  name: "FormInputItem",
  components: {
    Input,
    FormItem,
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
    readOnly: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      validate: null,
    }
  },
  computed: {
    inputType() {
      const { extendType = "text" } = this.config
      return extendType
    },
  },
  methods: {
    initValidate(val) {},
  },
  watch: {
    config: {
      handler(val) {
        if (val.rule) this.initValidate(JSON.parse(JSON.stringify(val)))
      },
      deep: true,
    },
  },
}
</script>
<style lang="less">
@import "../assets/styles/theme.less";
</style>
