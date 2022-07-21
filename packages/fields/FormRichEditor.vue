<template>
  <Col :span="config.span || 24">
    <tinymce-editor
      v-if="isShow"
      v-model="data[config.key]"
      :height="config.height"
      :placeholder="config.placeholder"
    ></tinymce-editor>
  </Col>
</template>

<script>
import tinymceEditor from "../components/tinyEditor/FormTinyEditor.vue"
import { Col } from "view-design"

export default {
  name: "FormRichEditor",
  components: {
    Col,
    tinymceEditor,
  },
  props: {
    isShow: {
      type: Boolean,
      default: true,
    },
    data: {
      type: Object,
      default: () => {},
    },
    config: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    data: {
      handler: (oldV, newV) => {
        console.log(oldV)
      },
      deep: true,
    },
  },
}
</script>
