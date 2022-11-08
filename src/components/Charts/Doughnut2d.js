import React from "react"
import { GithubContext, useGlobalContext } from "../../context/context"
import ReactFC from "react-fusioncharts"
import FusionCharts from "fusioncharts"
import Doughnut3D from "fusioncharts/fusioncharts.charts"
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion"
ReactFC.fcRoot(FusionCharts, Doughnut3D, FusionTheme)

const Doughnut2d = () => {
  const { jsonStarsData } = useGlobalContext()

  const chartConfigs = {
    type: "doughnut2d", // The chart type

    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Stars per Language",
        showLegend: 1,
        showPercentValues: 1,
        showPercentInToolTip: 1,
        decimals: "0",
        theme: "fusion" //Set the theme for your chart
      },
      // Chart Data - from step 2
      data: jsonStarsData
    }
  }
  return <ReactFC {...chartConfigs} />
}

export default Doughnut2d
