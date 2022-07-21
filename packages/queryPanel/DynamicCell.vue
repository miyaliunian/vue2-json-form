<script>
import CascaderItem from "./CascaderItem.vue"
import SelectItem from "./SelectItem.vue"
import InputItem from "./InputItem.vue"
import DatePickerItem from "./DatePickerItem.vue"
export default {
  name: "DynamicItem",
  components: {
    CascaderItem,
    SelectItem,
    InputItem,
    DatePickerItem,
  },
  props: {
    config: Object,
    rule: Object,
  },
  render(h) {
    const { config, rule } = this
    const Comp = config.tag
    return h(Comp, {
      on: this.$listeners,
      attrs: { ...this.$attrs, ...config.attrs },
      props: {
        config,
        rule,
      },
    })
  },
}
</script>
