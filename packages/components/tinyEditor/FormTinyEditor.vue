<template>
  <div class="tinymce-editor">
    <editor
      ref="timyEditor"
      v-model="myValue"
      :init="init"
      :disabled="disabled"
    >
    </editor>
  </div>
</template>

<script>
import tinymce from "tinymce/tinymce"
import Editor from "@tinymce/tinymce-vue"

import "tinymce/themes/silver/theme" // 编辑器主题s
import "tinymce/icons/default/icons" // 编辑器图标
import "tinymce/plugins/image" // 插入上传图片插件
import "tinymce/plugins/media" // 插入视频插件
import "tinymce/plugins/table" // 插入表格插件
import "tinymce/plugins/link" //超链接插件
import "tinymce/plugins/code" //代码块插件
import "tinymce/plugins/lists" // 列表插件
import "tinymce/plugins/contextmenu" //右键菜单插件
import "tinymce/plugins/wordcount" // 字数统计插件
import "tinymce/plugins/colorpicker" //选择颜色插件
import "tinymce/plugins/textcolor" //文本颜色插件
import "tinymce/plugins/fullscreen" //全屏
import "tinymce/plugins/help" // 帮助
import "tinymce/plugins/charmap"
import "tinymce/plugins/paste"
import "tinymce/plugins/print" //打印
import "tinymce/plugins/preview" // 预览
import "tinymce/plugins/hr" // 水平线
import "tinymce/plugins/anchor"
import "tinymce/plugins/pagebreak"
import "tinymce/plugins/spellchecker"
import "tinymce/plugins/searchreplace"
import "tinymce/plugins/visualblocks"
import "tinymce/plugins/visualchars"
import "tinymce/plugins/insertdatetime"
import "tinymce/plugins/nonbreaking"
import "tinymce/plugins/autosave"
import "tinymce/plugins/fullpage"
import "tinymce/plugins/toc"
import "tinymce/plugins/advlist"
import "tinymce/plugins/autolink"
import "tinymce/plugins/codesample"
import "tinymce/plugins/directionality"
import "tinymce/plugins/imagetools"
import "tinymce/plugins/noneditable"
import "tinymce/plugins/save"
import "tinymce/plugins/tabfocus"
import "tinymce/plugins/textpattern"
import "tinymce/plugins/template"

export default {
  name: "FormRichEditor",
  components: {
    Editor,
  },
  props: {
    //传入一个value，使组件支持v-model绑定
    value: {
      type: String,
      default: "",
    },
    height: {
      type: Number,
      default: 400,
    },
    placeholder: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    plugins: {
      type: [String, Array],
      default: "lists image  table textcolor wordcount contextmenu preview",
    },
    toolbar: {
      type: [String, Array],
      default:
        "undo redo |  formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image  table | removeformat table",
    },
  },
  data() {
    return {
      init: {
        placeholder: this.placeholder || "在这里输入文字",
        language_url: "/tinymce/langs/zh_CN.js",
        language: "zh_CN",
        skin_url: "/tinymce/skins/ui/oxide",
        content_css: "/tinymce/skins/content/default/content.css",
        height: this.height,
        // end_container_on_empty_block: true,
        // powerpaste_word_import: "clean",
        // advlist_bullet_styles: "square",
        // advlist_number_styles: "default",
        // default_link_target: "_blank",
        // link_title: false,
        // media_live_embeds: true,
        // menubar: true,
        menubar: false,
        default_link_target: "_blank",
        toolbar_drawer: "sliding",
        elementpath: false,
        content_style: "img {max-width:100%;}", //直接自定义可编辑区域的css样式
        plugins:
          " anchor  autosave code codesample colorpicker  contextmenu directionality  fullscreen hr image imagetools insertdatetime link lists  nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount",
        //toolbar:'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat | table',
        toolbar: [
          "searchreplace bold italic underline strikethrough fontselect fontsizeselect  alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample",
          "hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen",
        ],
        font_formats:
          "微软雅黑='微软雅黑';宋体='宋体';黑体='黑体';仿宋='仿宋';楷体='楷体';隶书='隶书';幼圆='幼圆';Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings",
        branding: false,
        file_picker_types: "media",
        paste_data_images: true,
        resize: "both",
      },
      myValue: this.value,
    }
  },
  mounted() {
    tinymce.init({})
  },

  methods: {
    clear() {
      this.myValue = ""
    },
    reset() {
      tinymce.init({})
    },
  },
  watch: {
    value(newValue) {
      this.myValue = newValue
    },
    myValue(newValue) {
      this.$emit("input", newValue)
    },
  },
}
</script>
