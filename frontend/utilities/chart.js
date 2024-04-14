function drawChart(inputData) {
    new Chart(document.getElementById('myChart').getContext('2d'), {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Time vs Accuracy',
                data: inputData,
                backgroundColor: 'rgba(255, 99, 132, 1)'
            }]
        },
        options: {
            responsive: true,
            legend: {
                display: true,
                position: 'top',
                labels: {
                    fontColor: 'rgb(255, 255, 255)',
                    fontSize: 16
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Time (s)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Accuracy (%)'
                    }
                }
            }
        }
    });
}