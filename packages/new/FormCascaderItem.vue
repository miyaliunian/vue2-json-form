<template>
  <Col :span="config.span || 8">
    <FormItem
      :label="`${config.label}`"
      :prop="config.key"
      :style="{
        marginBottom: config.props.bottom ? `${config.props.bottom}px` : '10px',
      }"
      :rules="config.rule"
    >
      <Cascader
        :placeholder="config.placeholder"
        clearable
        filterable
        change-on-select
        :data="config.options"
        v-model="data[config.key]"
        :disabled="disabled"
        trigger="hover"
        @on-change="change"
      >
      </Cascader>
    </FormItem>
  </Col>
</template>
<script>
import { Cascader, FormItem } from "view-design"
export default {
  name: "FormCascaderItem",
  components: {
    Cascader,
    FormItem,
  },
  props: {
    config: {
      type: Object,
      default: () => {},
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      cvalus: [],
    }
  },
  computed: {
    cascadeModel: {
      get() {
        return [
          (
            Math.floor(this.data[this.config.key[0]] / 10000) * 10000
          ).toString(),
          this.data[this.config.key[0]],
          this.data[this.config.key[1]],
        ]
      },
      set(val) {
        this.data[this.config.key[0]] = val[1]
        this.data[this.config.key[1]] = val[2]
      },
    },
    disabled() {
      const { props = {} } = this.config
      if ("disabled" in props) {
        return props["disabled"]
      }
      return false
    },
  },
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
