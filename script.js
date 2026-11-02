// Finance Revenue Trend Chart Configuration
const ctxRevenue = document.getElementById('revenueChart').getContext('2d');
const revenueChart = new Chart(ctxRevenue, {
    type: 'bar',
    data: {
        labels: ['Week 34', 'Week 35', 'Week 36', 'Week 37'],
        datasets: [
            {
                label: 'X-Series Revenue',
                data: [27220, 17560, 31054, 27205],
                backgroundColor: '#dc2626' // Red accent
            },
            {
                label: 'T-Series Revenue',
                data: [4817, 4908, 0, 5180],
                backgroundColor: '#334155' // Slate dark
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' }
        },
        scales: {
            y: { beginAtZero: true }
        }
    }
});

// Operations Swapping Chart Configuration
const ctxSwaps = document.getElementById('swapsChart').getContext('2d');
const swapsChart = new Chart(ctxSwaps, {
    type: 'line',
    data: {
        labels: ['Week 34', 'Week 35', 'Week 36', 'Week 37'],
        datasets: [{
            label: 'Total T-Series Swaps',
            data: [2919, 2868, 2871, 2890],
            borderColor: '#2563eb', // Blue
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            fill: true,
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' }
        },
        scales: {
            y: { beginAtZero: false }
        }
    }
});