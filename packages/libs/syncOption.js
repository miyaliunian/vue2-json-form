import Vue from "vue"
import { isFunc } from "./lib"
export const syncOption = (column) => {
  switch (column.type) {
    case "select": // select 组件判断options
      Vue.set(column, "selOptions", [])
      column.selOptions = column.options
        ? isFunc(column.options)
          ? column.options(form)
          : column.options
        : {}
      break
    case "cascader": //cascader 组件判断options
      Vue.set(column, "casOptions", [])
      column.casOptions = column.options
        ? isFunc(column.options)
          ? column.options(form)
          : column.options
        : {}
      break
    default:
      break
  }
}
