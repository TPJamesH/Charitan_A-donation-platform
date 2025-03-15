const dataGenerator = (data) => {
    if (data && data.length != 0) {

        let datasets_active = data.activeCount || 1
        let datasets_complete = data.completedCount || 1
        try {
            return {
                labels: ['Total active projects', 'Total completed projects'],
                datasets: [
                    {
                        data: [datasets_active, datasets_complete]
                    },

                ],
            }
        } catch (error) {
            console.error(error)
        }
    };
}
const options = (aspectRatio) => {
    return {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: aspectRatio
    }
};

export default { dataGenerator, options }