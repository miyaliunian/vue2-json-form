<script>
import FormRichEditor from "../fields/FormRichEditor.vue"
import FormSelectItem from "../fields/FormSelectItem.vue"
import FormDatepickerItem from "../fields/FormDatePickerItem.vue"
import FormCheckboxItem from "../fields/FormCheckboxItem.vue"
import FormRadioItem from "../fields/FormRadioItem.vue"
import FormSwitchItem from "../fields/FormSwitchItem.vue"
import FormInputItem from "./FormInputItem.vue"
import FormCascaderItem from "./FormCascaderItem.vue"
export default {
  name: "DynamicItem",
  components: {
    FormRichEditor,
    FormInputItem,
    FormSelectItem,
    FormCascaderItem,
    FormDatepickerItem,
    FormCheckboxItem,
    FormRadioItem,
    FormSwitchItem
  },
  props: {
    config: Object,
    data: Object,
    readOnly: Boolean,
    border: Boolean,
    isShow: Boolean
  },
  render(h) {
    const { config, data, readOnly, border, isShow } = this
    const Comp = config.tag
    return h(Comp, {
      on: this.$listeners,
      attrs: { ...this.$attrs, ...config.attrs },
      props: {
        config,
        data,
        readOnly,
        border,
        isShow
      }
    })
  }
}
</script>
