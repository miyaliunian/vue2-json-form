<template>
  <div class="imgWrappre">
    <div
      style="
        height: 30px;
        background-color: #2d8cf0;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        font-weight: bold;
        color: #fff;
        width: 100%;
      "
    >
      {{ config.label }}
    </div>

    <img
      v-if="srcOrig"
      :src="baseForm"
      alt="没有图片地址"
      style="width: 100%; height: 238px; object-fit: contain"
    />
    <Avatar v-else shape="square" icon="ios-person" size="240" />
  </div>
</template>

<script>
import { FormItem, Col, Avatar } from "view-design"
export default {
  name: "FormAvatarItem",
  components: {
    FormItem,
    Col,
    Avatar
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
    },
    baseForm() {
      return `data:image/png;base64,${this.data[this.config.key]}`
    },

    srcOrig() {
      return this.data[this.config.key]
        ? this.data[this.config.key].length > 0
          ? true
          : false
        : false
    },
    renderConfig() {
      const { _ifShow = true } = this.config
      return _ifShow
    }
  }
}
</script>

<style>
.imgWrappre {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px 15px;
}
</style>
