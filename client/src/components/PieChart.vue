<template>
  <canvas id="myPieChart"></canvas>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "PieChart",
  props: {
    labels: null,
    data: null,
    label: null,
  },
  methods: {},
  mounted() {
    const ctx = document.getElementById("myPieChart");

    new Chart(ctx, {
      type: "pie",
      data: {
        labels: this.labels,
        datasets: [
          {
            label: this.label,
            data: this.data,
            borderWidth: 1,
          },
        ],
      },
    });
  },
};
</script>

<style></style>
