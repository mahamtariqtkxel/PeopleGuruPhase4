//Area Chart
var areaOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    type: "area",
    height: "208",
    fontFamily: "Inter",
    stroke: {
      curve: "smooth",
    },
  },
  markers: {
    size: 0,
  },
  dataLabels: {
    enabled: false,
  },
  series: [
    {
      name: "Sales",
      data: [10, 25, 35, 20, 50],
    },
    {
      name: "Purchase",
      data: [30, 35, 25, 20, 30],
    },
  ],
  legend: {
    show: false,
  },
  colors: ["#095AA5", "#F5DFA5"],
  xaxis: {
    categories: ["Cafe", "FL1", "HQ", "ST1", "Abc", "Xyz"],
  },
};

var areaChart = new ApexCharts(
  document.querySelector("#areaChart"),
  areaOptions
);

areaChart.render();

//Column Chart
var columnOptions = {
  series: [
    {
      name: "Inflation",
      data: [7, 19, 12, 25],
    },
  ],
  chart: {
    fontFamily: "Inter",
    height: "100%",
    type: "bar",
  },
  plotOptions: {
    bar: {
      columnWidth: 22,
      borderRadius: 0,
      dataLabels: {
        position: "top", // top, center, bottom
      },
    },
  },
  dataLabels: {
    enabled: true,
    offsetY: -20,
    style: {
      fontSize: "12px",
      colors: ["#304758"],
    },
  },

  xaxis: {
    categories: ["CSM", "CSR", "IM", "Account"],
    position: "bottom",
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    crosshairs: {
      fill: {
        type: "gradient",
        gradient: {
          colorFrom: "#D8E3F0",
          colorTo: "#BED1E6",
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5,
        },
      },
    },
    tooltip: {
      enabled: false,
    },
  },
  yaxis: {
    axisBorder: {
      show: false,
    },
    max: 30,
    tickAmount: 2,
    min: 0,
    axisTicks: {
      show: false,
    },
    labels: {
      show: true,
    },
  },
  title: {
    floating: true,
    offsetY: -5,
    offsetX: -190,
    align: "center",
    style: {
      color: "#444",
    },
  },
};

var columnChart = new ApexCharts(
  document.querySelector("#columnChart"),
  columnOptions
);
columnChart.render();

//Donut Chart
var donutOptions = {
  series: [342, 678, 342],
  labels: ["Past Due", "Completed", "Pending"],
  chart: {
    type: "donut",
    width: "310",
    height: "100%",
    fontFamily: "Inter",
    radius: "10%",
  },
  colors: ["#EDA5A5", "#D0EABE", "#F6DEA5"],

  dataLabels: {
    enabled: false,
  },
  legend: {
    horizontalAlign: "right",
    position: "right",
    formatter: function (seriesName, opts) {
      return [
        seriesName,
        "  <strong> " + opts.w.globals.series[opts.seriesIndex] + "</strong>",
      ];
    },
    labels: {
      color: "#5F5F5F",
    },
    markers: {
      width: 6,
      height: 6,
    },
  },

  stroke: {
    width: 0,
  },

  plotOptions: {
    pie: {
      customScale: 1,
      donut: {
        size: "80%",
        labels: {
          show: true,
          name: {
            offsetY: 18,
          },
          total: {
            show: true,
            showAlways: true,
            label: "Total",
            fontFamily: "Inter",
            fontSize: "14",
            fontWeight: "400",
            color: "#5F5F5F",
          },
          value: {
            fontFamily: "Inter",
            fontSize: "20",
            fontWeight: "700",
            color: "#14192E",
            offsetY: -18,
          },
        },
      },
    },
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 144,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};

var donutChart = new ApexCharts(
  document.querySelector("#donutChart"),
  donutOptions
);
donutChart.render();

// paycheck docunt?

//Donut Chart

var donutOptionsPayCheck = {
  series: [342, 678, 342],
  labels: ["Past Due", "Completed", "Pending"],
  chart: {
    type: "donut",
    width: "180",
    height: "180",
    fontFamily: "Inter",
    radius: "10%",
    position: "center",
  },
  colors: ["#EDA5A5", "#D0EABE", "#F6DEA5"],

  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },

  stroke: {
    width: 0,
  },

  plotOptions: {
    pie: {
      customScale: 1,
      donut: {
        size: "80%",
        labels: {
          show: true,
          name: {
            offsetY: 18,
          },
          total: {
            show: true,
            showAlways: true,
            label: "NetCheck",
            fontFamily: "Inter",
            fontSize: "14",
            fontWeight: "600",
            color: "#5F5F5F",
          },
          value: {
            fontFamily: "Inter",
            fontSize: "20",
            fontWeight: "700",
            color: "#14192E",
            offsetY: -18,
          },
        },
      },
    },
  },
  responsive: [
    {
      breakpoint: 1100,
      options: {
        chart: {
          width: 144,
        },
      },
    },
  ],
};

var donutChart = new ApexCharts(
  document.querySelector("#donutpayCheck"),
  donutOptionsPayCheck
);
donutChart.render();

//Donut Chart
var donutOptions = {
  series: [342, 678, 342],
  labels: ["Past Due", "Completed", "Pending"],
  chart: {
    type: "donut",
    width: "350",
    height: "300",
    fontFamily: "Inter",
    radius: "10%",
  },
  colors: ["#EDA5A5", "#D0EABE", "#F6DEA5"],

  dataLabels: {
    enabled: true,
  },
  legend: {
    horizontalAlign: "right",
    position: "right",
    formatter: function (seriesName, opts) {
      return [
        seriesName,
        "  <strong> " + opts.w.globals.series[opts.seriesIndex] + "</strong>",
      ];
    },
    labels: {
      color: "#5F5F5F",
    },
    markers: {
      width: 6,
      height: 6,
    },
  },

  stroke: {
    width: 0,
  },

  plotOptions: {
    pie: {
      customScale: 1,
      expandOnClick: true,

      donut: {
        size: "60%",
        labels: {
          show: false,
          name: {
            offsetY: 18,
          },
          total: {
            show: true,
            showAlways: true,
            label: "Total",
            fontFamily: "Inter",
            fontSize: "14",
            fontWeight: "400",
            color: "#5F5F5F",
          },
          value: {
            fontFamily: "Inter",
            fontSize: "20",
            fontWeight: "700",
            color: "#14192E",
            offsetY: -18,
          },
        },
      },
    },
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 144,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};

var donutChart = new ApexCharts(
  document.querySelector("#pg-app-compenstaiondonutChart"),
  donutOptions
);
donutChart.render();

// Survey Charts

var options = {
  series: [33.3, 23.36, 18.42, 15.38, 9.54], //constrol the size of colors
  labels: ["Search Engine", "Direct", "Email", "Union Ads", "Video Ads"],
  colors: ["#5470C6", "#91CC75", "#FAC858", "#EE6666", "#73C0DE"],
  chart: {
    type: "donut",
  },
  dataLabels: {
    enabled: true,
    formatter(val, opts) {
      const name = opts.w.globals.labels[opts.seriesIndex];
      return [name, `(${val.toFixed(1) + "%"})`];
    },
    textAnchor: "top",
    offsetX: 1,
    offsetY: 2,
    dropShadow: {
      enabled: false,
    },
    style: {
      colors: ["#333"],
      fontSize: "12px",
      fontWeight: "400",
    },
  }, // to hide or show the numbers/valuse in colors
  stroke: {
    show: false,
  },

  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 90,
      offsetY: 100,
      offsetX: 0,
      dataLabels: {
        offset: 90,
      },

      labels: {
        show: true,
        name: {
          show: true,
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  },

  grid: {
    padding: {
      bottom: -80,
    },
  },
  legend: {
    position: "top",
    floating: true,
    markers: {
      radius: 5,
      width: 25,
      height: 14,
    },
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 100,
        },
        legend: {
          position: "top",
          floating: true,
          markers: {
            radius: 50,
          },
        },
      },
    },
  ],
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

// Bar chart

var surveyBarChart = {
  series: [
    {
      data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200],
    },
  ],
  chart: {
    type: "bar",
    height: "492px",
  },
  plotOptions: {
    show: false,
    bar: {
      barHeight: "40px",
      barWidth: "81px",
      distributed: true,
      horizontal: true,
      dataLabels: {
        position: "top",
      },
    },
  },
  colors: [
    "#B3C25A",
    "#67B580",
    "#86BA71",
    "#FEB041",
    "#FD7E55",
    "#EECB3C",
    "#FEA147",
    "#FFC936",
    "#FD7F55",
  ],
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
  dataLabels: {
    enabled: false,
    style: {
      colors: ["#fff"],
    },
    formatter: function (val, opt) {
      return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
    },
    offsetX: 0,
    dropShadow: {
      enabled: false,
    },
  },
  legend: {
    show: false,
  },
  stroke: {
    width: 3,
    colors: ["#fff"],
  },
  xaxis: {
    labels: {
      show: true,
    },
    categories: [
      "Walnut Brownie",
      "Lemon Juice",
      "Orange Juice",
      "Tea",
      "Matcha Cocoa",
      "Cheese Brownie",
      "Cheese Cocoa",
      "Milk Tea",
      "Matcha Latte",
    ],
  },
  yaxis: {
    labels: {
      show: true,
    },
  },

  tooltip: {
    theme: "dark",
    x: {
      show: false,
    },
    y: {
      title: {
        formatter: function () {
          return "";
        },
      },
    },
  },
};

var chart = new ApexCharts(
  document.querySelector("#surveyBarChart"),
  surveyBarChart
);
chart.render();
const unsortedValues = [400, 430, 448, 470, 540, 580, 690, 1100, 1200]; // Example values (must be sorted low to high)
const unsortedColors = [
  "#B3C25A",
  "#67B580",
  "#86BA71",
  "#FEB041",
  "#FD7E55",
  "#EECB3C",
  "#FEA147",
  "#FFC936",
  "#FD7F55",
]; // Example colors

const valueColorPairs = unsortedValues.map((value, index) => ({
  value,
  color: unsortedColors[index],
}));
valueColorPairs.sort((a, b) => a.value - b.value);

// Separate sorted values and colors into separate arrays
const values = valueColorPairs.map((pair) => pair.value);
const colors = valueColorPairs.map((pair) => pair.color);

const totalValue = values.reduce((sum, value) => sum + value, 0);
// Function to update the progress bar based on values
function updateProgressBar() {
  const progressBar = document.getElementById("progress-bar");
  let cumulativePercentage = 0;
  let gradientStops = "";
  for (let i = 0; i < values.length; i++) {
    const stopPercentage = (values[i] / totalValue) * 100;
    gradientStops += `${colors[i]} ${cumulativePercentage}% ${
      cumulativePercentage + stopPercentage
    }%,`;
    cumulativePercentage += stopPercentage;
  }

  progressBar.style.background = `linear-gradient(to right, ${gradientStops.slice(
    0,
    -1
  )})`;
}

// Call the updateProgressBar function to initialize the progress bar
updateProgressBar();

// Column Chart

var surveyColumnChart = {
  series: [
    {
      name: "2015",
      data: [44, 55, 57, 35],
    },
    {
      name: "2016",
      data: [76, 85, 101, 56],
    },
    {
      name: "2017",
      data: [35, 41, 36, 39],
    },
  ],

  chart: {
    type: "bar",
    height: 518,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "75%",
      endingShape: "rounded",
    },
  },
  colors: ["#5470C6", "#91CC75", "#FAC858"],
  legend: {
    position: "top",
    floating: true,
    markers: {
      radius: 5,
      width: 16,
      height: 10,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    categories: ["Matcha Latte", "Milk Tea", "Cheese Cocoa", "Walnut Brownie"],
  },
};

var chart = new ApexCharts(
  document.querySelector("#surveyColumnChart"),
  surveyColumnChart
);
chart.render();
