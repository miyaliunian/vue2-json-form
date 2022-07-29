import { Tooltip, Icon } from "view-design"
import "./index.less"
export default {
  name: "TableOps",
  render(h) {
    const { isFullscreen } = this
    return (
      <div
        class="table-operate-right"
        style="display: flex;padding-right:20px;flex:1;justify-content: flex-end;height:32px;line-height:32px"
      >
        <Tooltip
          content={isFullscreen ? "退出全屏" : "全屏"}
          placement="bottom"
        >
          <Icon
            type={isFullscreen ? "md-contract" : "md-expand"}
            size="20"
            vOn:click_native={() => this.fullScreen()}
          />
        </Tooltip>
      </div>
    )
  },
  data() {
    return {
      isFullscreen: 0
    }
  },
  methods: {
    fullScreen() {
      let main = document.querySelector("#tablWrapper")
      if (this.isFullscreen) {
        document.exitFullscreen()
      } else {
        main.requestFullscreen()
      }
      this.isFullscreen = this.isFullscreen ? 0 : 1
    }
  }
}
