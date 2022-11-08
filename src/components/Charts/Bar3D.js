import React from "react"
import { GithubContext, useGlobalContext } from "../../context/context"
import ReactFC from "react-fusioncharts"
import FusionCharts from "fusioncharts"
import Bar2D from "fusioncharts/fusioncharts.charts"
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion"
ReactFC.fcRoot(FusionCharts, Bar2D, FusionTheme)

const Bar3D = () => {
  const { jsonForkStarData } = useGlobalContext()

  const chartConfigs = {
    type: "bar2d", // The chart type

    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Most Forked",
        xAxisName: "Repos",
        yAxisName: "Forks",
        divLineThickness: 2,
        divLineColor: "292723",
        showValues: 1,
        palettecolors: "5d62b5,29c3be,f2726f,f8ed62,783f04",
        theme: "fusion" //Set the theme for your chart
      },
      // Chart Data - from step 2
      data: jsonForkStarData
    }
  }

  return <ReactFC {...chartConfigs} />
}

export default Bar3D
