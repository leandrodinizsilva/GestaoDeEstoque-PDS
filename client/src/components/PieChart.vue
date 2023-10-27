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
            backgroundColor: [
              "#3876BF",
              "#192655",
              "#E1AA74",
              "#F3F0CA",
            ],
          },
        ],
      },
    });
  },
};
</script>

<style></style>
