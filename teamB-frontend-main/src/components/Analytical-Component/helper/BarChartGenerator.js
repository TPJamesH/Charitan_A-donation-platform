

const dataGenerator = (data, dataLabel) => {
    if(data && data.length != 0){
    let labelArr = dataLabel || ["Categories", "Continents"];
    let dataArr = []
    console.log(data)
    let  index = 0;
    try{
    for( let i = 0; i < data.continents.length; i++ ){
      //  labelArr.push(data.continents[i].name)
        dataArr.push({
            id: index,
            label: "Total project and donation count in " + data.continents[i].name,
            data:[data.continents[i].projectCount,data.continents[i].donatedValue]
        })
        index++
    }

    for( let i = 0; i < data.categories.length; i++ ){
        //labelArr.push(data.categories[i].name)
        dataArr.push({
            id: index,
            label: "Total project and donation count in " + data.categories[i].name,
            data:[data.categories[i].projectCount,data.categories[i].donatedValue]
        })
        index++
    }

    return {
        labels: labelArr,
        datasets: dataArr,
    }
    
}
catch(error){
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