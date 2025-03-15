const data = {
    labels: ['Jun', 'Jul', 'Aug'],
    datasets: [
        {
            id: 1,
            label: 'Donation for project 1',
            data: [5, 6, 7],
        },
        {
            id: 2,
            label: 'Donation for project 2',
            data: [3, 2, 1],
        },
    ],
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1
};


export { data, options }