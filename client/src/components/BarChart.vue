<template>
    <canvas id="myChart"></canvas>
</template>

<script>
import Chart from 'chart.js/auto';

    export default {
        name: 'BarChart',
        props:{
            labels: null,
            data: null,
            label: null
        },
        methods: {
            
        },
        mounted(){
            const ctx = document.getElementById('myChart');

            new Chart(ctx, {
                type: 'bar',
                data: {
                labels: this.labels,
                datasets: [{
                    label: this.label,
                    data: this.data,
                    borderWidth: 1
                }]
                },
                options: {
                scales: {
                    y: {
                    beginAtZero: true
                    }
                }
                }
            });
        }
    }
</script>

<style>
  
</style>