import { Drawer } from "view-design"
export default {
  name: "DrawerItem",
  props: {
    value: {
      type: Boolean
    },
    title: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      show: false
    }
  },
  render(h) {
    return (
      <Drawer
        title={this.title}
        closable={true}
        v-model={this.show}
        width="620"
        onInput={() => this.closed()}
      >
        {this.$scopedSlots.default()}
      </Drawer>
    )
  },
  methods: {
    closed() {
      this.$emit("input", this.show)
    }
  },
  watch: {
    value(newValue) {
      this.show = newValue
    }
  }
}
