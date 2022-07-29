import QueryPanel from "./queryPanel/query.vue"
import TablesPanel from "./tablesPanel/tables.vue"
import FormPanel from "./form/form.vue"
import EditFormPanel from "./edit/editForm.vue"
import NewFormPanel from "./new/newForm.vue"
import DetailFormPanel from "./detail/detailForm.vue"

const comps = [
  QueryPanel,
  TablesPanel,
  FormPanel,
  EditFormPanel,
  NewFormPanel,
  DetailFormPanel
]
const install = (Vue) => {
  comps.forEach((comp) => {
    Vue.component(comp.name, comp)
  })
}

if (typeof window !== "undefined" && window.use) {
  install(window.use)
}

export default {
  install
}
