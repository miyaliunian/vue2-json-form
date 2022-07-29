import { Button } from "view-design"

export default {
  name: "HeaderBtnOptions",
  function: true,
  props: {
    option: {
      type: Object,
      default: () => {}
    },
    tableRef: {
      type: Object,
      default: () => {}
    }
  },
  render(h, ctx) {
    // console.log(this.option.multiple)
    // console.log(typeof this.tableRef)
    return h(
      Button,
      {
        props: {
          type: this.option.type ? this.option.type : "primary",
          icon: this.option.icon,
          disabled: this.option.disabled || false
        },
        style: {
          marginLeft: "7px"
        },
        attrs: {
          title: ""
        },
        directives: this.option.directives,
        on: {
          click: this.option.multiple
            ? () => this.option.multiClick(this.tableRef.getSelection())
            : () => this.option.click()
        }
      },
      this.option.title
    )
  }
}
