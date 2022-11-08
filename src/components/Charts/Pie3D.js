import React from "react"
import { GithubContext, useGlobalContext } from "../../context/context"
import ReactFC from "react-fusioncharts"
import FusionCharts from "fusioncharts"
import Pie2D from "fusioncharts/fusioncharts.charts"
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion"
ReactFC.fcRoot(FusionCharts, Pie2D, FusionTheme)

const Pie3D = () => {
  const { jsonObj, counts } = useGlobalContext()
  //const dataObj = JSON.parse(jsonData)
  // const dataObj = JSON.parse(counts)

  const chartConfigs = {
    type: "pie2d", // The chart type

    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Languages", //Set the chart caption
        decimals: "0",
        showPercentValues: 1,
        showPercentInToolTip: 1,
        theme: "fusion" //Set the theme for your chart
      },
      // Chart Data - from step 2
      data: jsonObj
    }
  }
  return <ReactFC {...chartConfigs} />
}

export default Pie3D
