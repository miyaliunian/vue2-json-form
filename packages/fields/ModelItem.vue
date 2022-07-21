<template>
  <div>
    <Modal
      :footer-hide="true"
      :width="850"
      :title="title"
      v-model="childValue"
      @input="backFn"
      draggable
      :styles="{ top: '20px' }"
      @on-cancel="cancel"
    >
      <Form :label-width="130" :label-colon="true">
        <slot></slot>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { Modal, Form } from "view-design"
export default {
  name: "ModelPanel",
  components: {
    Modal,
    Form,
  },
  props: {
    title: {
      type: String,
      default: null,
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      childValue: false,
    }
  },
  watch: {
    value(newValue) {
      this.childValue = newValue
    },
  },
  methods: {
    cancel() {
      this.$emit("cance-modal")
    },
    backFn() {
      this.$emit("input", this.childValue)
    },
  },
}
</script>
<style lang="less">
@import "../assets/styles/theme.less";
</style>
