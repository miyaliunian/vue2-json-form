import { Col, FormItem, Upload, Icon, Message } from "view-design"
const ERROR = "error"
const SUCCESS = "success"
const FORMATE_ERROE = "formateError"
const REMOVE = "remove"
export default {
  name: "FormUploadItem",
  props: {
    config: {
      type: Object,
      default: () => {},
    },
    isShow: {
      type: Boolean,
      default: true,
    },
  },
  render(h) {
    const { config } = this
    return (
      <Col span={config.span || 24}>
        {this.isShow && (
          <FormItem label={config.label} prop={config.key}>
            <Upload
              ref="uploadItem"
              multiple={config.multiple || false}
              type="drag"
              headers={config.headers}
              action={config.action}
              format={config.formate}
              propsOnError={(error, file, fileList) =>
                this.error(error, file, fileList)
              }
              propsOnSuccess={(response, file, fileList) =>
                this.success(response, file, fileList)
              }
              propsOnFormatError={(file, fileList) =>
                this.formateError(file, fileList)
              }
              propsOnRemove={(file, fileList) => this.remove(file, fileList)}
            >
              <div style="padding: 20px 0;">
                <Icon
                  type="ios-cloud-upload"
                  size="52"
                  style="color: #3399ff"
                ></Icon>
                <p style="fontWeight:bolder">
                  {config.uploadTitle || "在此处单击或拖动文件以上传"}
                </p>
              </div>
            </Upload>
          </FormItem>
        )}
      </Col>
    )
  },
  methods: {
    clearFiles() {
      console.log("清空")
      this.$refs.uploadItem.clearFiles()
    },
    error(error, file, fileList) {
      const {
        config: { control },
      } = this
      if (control && ERROR in control) {
        control[ERROR](error, file, fileList, (res) => {
          console.log(res)
          this.$refs.uploadItem.clearFiles()
        })
      }
    },
    success(response, file, fileList) {
      const {
        config: { control },
      } = this
      if (control && SUCCESS in control) {
        control[SUCCESS](file, fileList, (res) => {
          console.log(res)
          this.$refs.uploadItem.clearFiles()
        })
      }
    },
    formateError(file, fileList) {
      const {
        config: { control },
      } = this
      Message.error("文件格式验证失败!")
      if (control && FORMATE_ERROE in control) {
        control[FORMATE_ERROE](file, fileList, (res) => {
          console.log(res)
          this.$refs.uploadItem.clearFiles()
        })
      }
    },
    remove(file, fileList) {
      const {
        config: { control },
      } = this
      console.log("remove被调用")
      if (control && REMOVE in control) {
        control[REMOVE](file, fileList, (res) => {
          console.log(res)
          this.$refs.uploadItem.clearFiles()
        })
      }
    },
  },
}
