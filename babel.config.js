module.exports = {
  presets: ["@vue/cli-plugin-babel/preset", "@vue/babel-preset-jsx"],
  plugins: [
    [
      "import",
      {
        libraryName: "view-design",
        libraryDirectory: "src/components"
      }
    ]
  ]
}
