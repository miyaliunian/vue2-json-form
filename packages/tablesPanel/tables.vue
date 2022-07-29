<template>
  <Card class="warp-card" id="tablWrapper">
    <!-- 分割线 -->
    <template v-if="showDivider">
      <Divider orientation="left" style="margin: 0 !important">{{
        showDividerTitle || ""
      }}</Divider>
    </template>
    <!-- 按钮区 -->
    <Row class="marginBottom10 marginTop10">
      <div
        class="table-operate-left"
        style="display: flex; flex: 2; justify-content: flex-start"
      >
        <template v-if="showHeaderBtn">
          <slot>
            <template v-for="(key, index) in defBtns">
              <Button
                @click="newAction"
                icon="md-add"
                type="primary"
                v-if="key === 0"
                >新建
              </Button>
              <Button
                @click="batchDeleteAction"
                class="marginLeft10"
                icon="ios-trash-outline"
                v-if="key === 1"
                type="error"
                >批量删除
              </Button>
              <Button
                @click="allExportAction"
                class="marginLeft10 float-right"
                icon="ios-cloud-download-outline"
                v-if="key === 2"
                type="info"
                >导出全部
              </Button>
              <Button
                @click="batchExportAction"
                class="marginLeft10 float-right"
                icon="ios-download-outline"
                v-if="key === 3"
                type="info"
                >批量导出
              </Button>
            </template>
          </slot>
        </template>
        <template v-else>
          <template v-for="(btn, index) in headerBtns">
            <HeaderBtnOptions
              :option="btn"
              :key="index"
              :tableRef="$refs.tablesMain"
            />
          </template>
        </template>
      </div>
      <!-- tabl - setting -->
      <TableOps></TableOps>
    </Row>
    <!-- table -->
    <Table
      ref="tablesMain"
      :data="insideTableData"
      :columns="insideColumns"
      stripe
      :border="border"
      :show-header="showHeader"
      :width="width"
      :height="height"
      :loading="loading"
      :disabled-hover="disabledHover"
      :highlight-row="highlightRow"
      :row-class-name="rowClassName"
      :size="size"
      :no-data-text="`<div class='noDataWrapper'>
                          <img src=${noDataText} class='noDataIcon'>
                        </div>`"
      :no-filtered-data-text="noFilteredDataText"
      @on-current-change="onCurrentChange"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-selection-change="onSelectionChange"
      @on-sort-change="onSortChange"
      @on-filter-change="onFilterChange"
      @on-row-click="onRowClick"
      @on-row-dblclick="onRowDblclick"
      @on-expand="onExpand"
      @on-drag-drop="changeOrder"
    >
    </Table>
    <!-- page -->
    <template v-if="pageShow">
      <Page
        :current="pageNumber"
        :page-size="pageSize"
        :page-size-opts="pageOpts"
        :total="pageTotal"
        class="smart-query-table-page"
        @on-change="onChangePageNum"
        @on-page-size-change="onChangePageSize"
        show-elevator
        show-sizer
        :show-total="showTotal"
      />
    </template>
  </Card>
</template>

<script>
import TablesEdit from "./edit.vue"
import noDataText from "./icon_no_data.png"
import "./index.less"
import tableAction from "../libs/table-action"
import HeaderBtnOptions from "./header-btn-options.js"
import {
  Card,
  Divider,
  Row,
  Page,
  Table,
  Button,
  Switch,
  Avatar,
  Icon,
  Tooltip
} from "view-design"
import dayjs from "dayjs"
import TableOps from "../components/tableOps"

export default {
  name: "TablePanel",
  inheritAttrs: false,
  components: {
    HeaderBtnOptions,
    Card,
    Row,
    Page,
    Table,
    Button,
    Switch,
    Divider,
    Icon,
    Tooltip,
    TableOps
  },
  props: {
    // 是否显示总页数
    showTotal: {
      type: Boolean,
      default: false
    },
    // 开启多选
    multi: {
      type: Boolean,
      default: true
    },
    // 顶部按钮操作区配置
    panelConfig: {
      type: Object,
      default: () => {}
    },
    // table 表格数据 集合类型
    value: {
      type: Array,
      default() {
        return []
      }
    },
    // 是否显示页码
    pageShow: {
      type: Boolean,
      default: true
    },
    // 表头
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    pageTotal: {
      type: Number,
      default: 0
    },
    // 显示电梯，可以快速切换到某一页
    showElevator: {
      type: Boolean,
      default: true
    },
    // table页码
    pageNumber: {
      type: Number,
      default: 1
    },
    // 每页显示条数
    pageSize: {
      type: Number,
      default: 10
    },
    // 显示分页，用来改变page-size
    showSizer: {
      type: Boolean,
      default: true
    },
    // 显示总数
    showTotal: {
      type: Boolean,
      default: true
    },
    // 表格尺寸，可选值为 large、small、default 或者不填
    size: {
      type: String,
      default: null
    },
    // 表格宽度，单位 px
    width: {
      type: [Number, String]
    },
    // 表格高度，单位 px，设置后，如果表格内容大于此值，会固定表头
    height: {
      type: [Number, String]
    },
    // 是否显示间隔斑马纹
    stripe: {
      type: Boolean,
      default: false
    },
    // 是否显示纵向边框
    border: {
      type: Boolean,
      default: false
    },
    // 是否显示表头
    showHeader: {
      type: Boolean,
      default: true
    },
    // 是否支持高亮选中的行，即单选
    highlightRow: {
      type: Boolean,
      default: false
    },
    // 行的 className 的回调方法，传入参数：row：当前行数据 ,index：当前行的索引
    rowClassName: {
      type: Function,
      default() {
        return ""
      }
    },
    // 筛选数据为空时显示的提示内容
    noFilteredDataText: {
      type: String,
      default: ""
    },
    // 禁用鼠标悬停时的高亮
    disabledHover: {
      type: Boolean
    },
    // 表格是否加载中
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * @description 全局设置是否可编辑
     */
    editable: {
      type: Boolean,
      default: false
    },
    /**
     * @description 是否可搜索
     */
    searchable: {
      type: Boolean,
      default: false
    },
    /**
     * @description 搜索控件所在位置，'top' / 'bottom'
     */
    searchPlace: {
      type: String,
      default: "top"
    }
  },
  /**
   * Events
   * @on-start-edit 返回值 {Object} ：同iview中render函数中的params对象 { row, index, column }
   * @on-cancel-edit 返回值 {Object} 同上
   * @on-save-edit 返回值 {Object} ：除上面三个参数外，还有一个value: 修改后的数据
   */
  data() {
    return {
      //是否显示分割线
      showDivider: false,
      //分割线标题
      showDividerTitle: "",
      // 默认显示顶部 新建 批量删除 批量导出 全部导出
      showHeaderBtn: true,
      headerBtns: [],
      // 没有数据时默认显示图标
      noDataText,
      // 分页时每页数量选择
      pageOpts: [10, 20, 30, 50, 100],
      // pageSize: 20,
      // 表格 每列的配置 如名称，宽度
      insideColumns: [],
      // 表格数据
      insideTableData: [],
      // 正在编辑的单元格id
      edittingCellId: "",
      // 编辑内容
      edittingText: "",
      // 搜索内容
      searchValue: "",
      // 搜索关键词
      searchKey: "",
      // 删除时标注是否有选中的数据
      selectRows: 0,
      // 默认显示哪些按钮
      defBtns: [],
      // 是否能全屏
      isFullscreen: 0
    }
  },
  watch: {
    columns(columns) {
      this.handleColumns(columns)
      this.setDefaultSearchKey()
    },
    value(val) {
      this.handleTableData()
      if (this.searchable) this.handleSearch()
    },
    panelConfig(options) {
      this.handleHeaderBtnOPtions()
    }
  },
  mounted() {
    this.handleColumns(this.columns)
    this.setDefaultSearchKey()
    this.handleTableData()
    this.handleHeaderBtnOPtions(this.panelConfig)
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
    },
    changeOrder(oldIndex, newIndex) {
      oldIndex = parseInt(oldIndex)
      newIndex = parseInt(newIndex)
      let oldData = this.insideTableData[oldIndex]
      this.insideTableData.splice(oldIndex, 1, this.insideTableData[newIndex])
      this.insideTableData.splice(newIndex, 1, oldData)
    },
    handleHeaderBtnOPtions(options) {
      const {
        show,
        options: vmBtn = [],
        splitLine = false,
        lineTitle = "",
        defBtns = []
      } = options
      // 分割线
      this.showDivider = splitLine
      this.showDividerTitle = lineTitle
      // 按钮
      this.showHeaderBtn = show

      // 默认显示哪个按钮
      this.defBtns = defBtns

      if (!show) {
        this.headerBtns = vmBtn
      }
    },
    // 页码改变
    pageChange(e) {
      this.$emit("on-change", e)
    },
    // 每页条数改变
    pageSizeChange(e) {
      this.$emit("on-page-size-change", e)
    },
    suportEdit(item, index) {
      item.render = (h, params) =>
        h(TablesEdit, {
          props: {
            params,
            value: this.insideTableData[params.index][params.column.key],
            edittingCellId: this.edittingCellId,
            editable: this.editable
          },
          on: {
            input: (val) => {
              this.edittingText = val
            },
            "on-start-edit": (params) => {
              this.edittingCellId = `editting-${params.index}-${params.column.key}`
              this.$emit("on-start-edit", params)
            },
            "on-cancel-edit": (params) => {
              this.edittingCellId = ""
              this.$emit("on-cancel-edit", params)
            },
            "on-save-edit": (params) => {
              this.value[params.row.initRowIndex][params.column.key] =
                this.edittingText
              this.$emit("input", this.value)
              this.$emit(
                "on-save-edit",
                Object.assign(params, { value: this.edittingText })
              )
              this.edittingCellId = ""
            }
          }
        })
      return item
    },

    surportHandle(item) {
      const options = item.options || []
      item.render = (h, params) => {
        options.map(
          (btn) => (
            (btn.action = () => btn.onClick(params.row)),
            (btn.disabled = btn.hidden
              ? () => btn.hidden(params.row)
              : () => {})
          )
        )
        return tableAction(h, options)
      }
      return item
    },
    // 设置表格列头
    handleColumns(columns) {
      // 自动填充选项
      if (this.multi) {
        if (columns.length > 0 && columns[0].type !== "selection") {
          columns.unshift({
            type: "selection",
            width: 30,
            align: "center"
          })
        }
      }

      this.insideColumns = columns.map((item, index) => {
        const res = item
        // 可编辑状态
        // TODO
        // 正常处理
        // 处理枚举
        if (res.type && res.type === "enum") {
          res.render = (h, params) => {
            const disabled = this.$enum.getDescByValue(
              res.enumKey,
              params.row[res.key]
            )
              ? this.$enum.getDescByValue(res.enumKey, params.row[res.key])
              : params.row[res.key]
            return h("span", disabled)
          }
        }
        // 头像处理
        if (res.type && res.type === "avatar") {
          res.render = (h, params) => {
            return h(Avatar, {
              props: {
                src: params.row[res.key],
                icon: "ios-person",
                shape: "square",
                disabled: true
              }
            })
          }
        }
        // switch处理
        if (res.type && res.type === "switch") {
          res.render = (h, params) => {
            return h(Switch, {
              props: {
                value: params.row[res.key],
                disabled: true
              }
            })
          }
        }
        //  日期格式处理
        if (res.formate) {
          res.render = (h, params) => {
            let dateTemp = null
            dateTemp =
              dayjs(params.row[res.key]).format(res.formate) !== "Invalid Date"
                ? dayjs(params.row[res.key]).format(res.formate)
                : ""
            return h("span", dateTemp)
          }
        }

        // toolTip处理
        if (res.type && res.type === "tip") {
          res.render = (h, params) => {
            return h(
              Tooltip,
              {
                props: {
                  maxWidth: "200",
                  placement: "right",
                  content: params.row[res.key]
                }
              },
              [params.row[res.key]]
            )
          }
        }
        // 处理操作
        if (res.type && res.type === "handle") {
          this.surportHandle(res)
        }
        return res
      })
    },
    // 设置默认搜索关键词
    setDefaultSearchKey() {
      this.searchKey =
        this.columns[0].key !== "handle"
          ? this.columns[0].key
          : this.columns.length > 1
          ? this.columns[1].key
          : ""
    },

    handleClear(e) {
      if (e.target.value === "") this.insideTableData = this.value
    },

    handleSearch() {
      this.insideTableData = this.value.filter(
        (item) => item[this.searchKey].indexOf(this.searchValue) > -1
      )
    },

    handleTableData() {
      this.insideTableData = this.value.map((item, index) => {
        const res = item
        res.initRowIndex = index
        return res
      })
    },
    exportCsv(params) {
      this.$refs.tablesMain.exportCsv(params)
    },
    clearCurrentRow() {
      this.$refs.talbesMain.clearCurrentRow()
    },
    onCurrentChange(currentRow, oldCurrentRow) {
      this.$emit("on-current-change", currentRow, oldCurrentRow)
    },
    onSelect(selection, row) {
      this.$emit("on-select", selection, row)
    },
    onSelectCancel(selection, row) {
      this.$emit("on-select-cancel", selection, row)
    },
    onSelectAll(selection) {
      this.$emit("on-select-all", selection)
    },
    onSelectionChange(selection) {
      this.$emit("on-selection-change", selection)
    },
    onSortChange(column, key, order) {
      this.$emit("on-sort-change", column, key, order)
    },
    onFilterChange(row) {
      this.$emit("on-filter-change", row)
    },
    onRowClick(row, index) {
      this.$emit("on-row-click", row, index)
    },
    onRowDblclick(row, index) {
      this.$emit("on-row-dblclick", row, index)
    },
    onExpand(row, status) {
      this.$emit("on-expand", row, status)
    },
    onChangePageNum(pageNum) {
      this.$emit("onChangePageNum", pageNum)
    },
    onChangePageSize(pageSize) {
      this.$emit("onChangePageSize", pageSize)
    },
    // 顶部操作项配置
    newAction() {
      this.$emit("newAction")
    },
    // 批量删除
    batchDeleteAction() {
      const selectRows = this.$refs.tablesMain.getSelection()
      if (selectRows.length < 1) {
        this.$Notice.error({
          desc: "请选择至少一条数据"
        })
        return
      }
      this.$emit("batchDeleteAction", { rows: selectRows })
    },
    // 导出全部
    allExportAction() {
      this.$emit("allExportAction")
    },
    // 批量导出
    batchExportAction() {
      const selectRows = this.$refs.tablesMain.getSelection()
      if (selectRows.length < 1) {
        this.$Notice.error({
          desc: "请选择至少一条数据"
        })
        return
      }
      this.$emit("batchExportAction", { rows: selectRows })
    }
  }
}
</script>
<style lang="less">
@import "./table.less";
</style>
