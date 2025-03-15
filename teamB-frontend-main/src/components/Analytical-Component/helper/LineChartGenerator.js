

const dataGenerator = (data, dataLabel) => {
    if (data && data.length != 0) {
      
        let labelArr = []
        let dataArr = []
        console.log(data)
        try {
            for (let i = 0; i < data.length; i++) {
                labelArr.push(data[i].date)
                dataArr.push(data[i].count)
            }
            return {
                labels: labelArr,
                datasets: [
                    {
                        id: 1,
                        label: dataLabel,
                        data: dataArr,
                    },

                ],
            }
        }
        catch (error) {
            console.error(error)
        }
    }
};

const options = (aspectRatio) => {
    return {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: aspectRatio
    }
};

export default { dataGenerator, options }