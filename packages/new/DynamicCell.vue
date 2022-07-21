<script>
import FormUploadItem from "../fields/FormUploadItem"
import FormRichEditor from "../fields/FormRichEditor.vue"
import FormSelectItem from "../fields/FormSelectItem.vue"
import FormDatepickerItem from "../fields/FormDatePickerItem.vue"
import FormCheckboxItem from "../fields/FormCheckboxItem.vue"
import FormSwitchItem from "../fields/FormSwitchItem.vue"
import FormRadioItem from "../fields/FormRadioItem.vue"
import FormInputItem from "./FormInputItem.vue"
import FormCascaderItem from "./FormCascaderItem.vue"
import props from "../common/hocPros"
export default {
  name: "DynamicItem",
  components: {
    FormInputItem,
    FormRichEditor,
    FormSelectItem,
    FormCascaderItem,
    FormDatepickerItem,
    FormCheckboxItem,
    FormRadioItem,
    FormSwitchItem,
    FormUploadItem,
  },
  props,
  render(h) {
    const { config, data, isShow } = this
    const Comp = config.tag
    return h(Comp, {
      on: this.$listeners,
      attrs: { ...this.$attrs, ...config.attrs },
      props: {
        config,
        data,
        isShow,
      },
    })
  },
}
</script>
