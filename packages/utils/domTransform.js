class TransForm {
  constructor(base, dom) {
    this.scale_base = base
    this.opt_dom = dom
    this.scaleOrigin()
  }

  scaleOrigin() {
    const setWidth = () => {
      const vW = document.body.offsetWidth
      // const scaleX = ((vW - 1366) / 1366).toFixed(1);
      const scaleX = ((vW - this.scale_base) / this.scale_base).toFixed(1)
      const content = document.querySelector(`.${this.opt_dom}`)
      const scaleFunc = `scale(${1 + Number(scaleX)})`
      content.style.transform = `${scaleFunc}`
      content.style.transformOrigin = "top left"
    }
    setWidth()
    window.onresize = () => setWidth()
  }
}

export default TransForm
