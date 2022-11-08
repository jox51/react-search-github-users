import React from "react"
import { GithubContext, useGlobalContext } from "../../context/context"
import ReactFC from "react-fusioncharts"
import FusionCharts from "fusioncharts"
import Column2D from "fusioncharts/fusioncharts.charts"
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion"
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme)

const Column3D = () => {
  const { jsonReposData } = useGlobalContext()

  const chartConfigs = {
    type: "column2d", // The chart type

    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Most Popular",
        xAxisName: "Repos",
        yAxisName: "Stars",
        divLineThickness: 2,
        divLineColor: "292723",
        showAlternateHGridColor: 1,
        alternateHGridColor: "8c853a",
        showValues: 1,
        palettecolors: "5d62b5,29c3be,f2726f,f8ed62,783f04",
        theme: "fusion" //Set the theme for your chart
      },
      // Chart Data - from step 2
      data: jsonReposData
    }
  }
  return <ReactFC {...chartConfigs} />
}

export default Column3D
