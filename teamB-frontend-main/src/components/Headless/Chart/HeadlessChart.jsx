import React, {useState, useEffect} from 'react';

const HeadlessChart = ({data, options, children})=>{
    const [chartData, setChartData] = useState(data);
    const [chartOptions, setChartOptions] = useState(options);
    useEffect(() =>{
      
        setChartData(data);
        setChartOptions(options)
        
    },[data,options])

    return children({
        chartData,
        chartOptions,
        updateData: setChartData,
        updateOptions:setChartOptions
    })
}

export default HeadlessChart