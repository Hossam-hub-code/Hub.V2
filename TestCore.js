//Global Variables
let heads = [];
let Categories1Sheet1 = [];
let Categories1Sheet2 = [];
let Categories1Sheet3 = [];
let Categories1Sheet4 = [];
let Categories1Sheet5 = [];
let arr1sheet1 = [];
let arr2sheet1 = [];
let arr1sheet2 = [];
let arr1sheet3 = [];
let arr1sheet4 = [];
let arr1sheet5 = [];
let arr2sheet5 = [];
let sumTotalATM = 0;
let firstChart = document.getElementById("container1");
let secondChart = document.getElementById("container2");
let chartVisableCount = 60;
let contaniers = document.querySelectorAll('[id^="container"]');
let repeat = 0;

//Animation Function

Math.easeOutBounce = (pos) => {
  if (pos < 1 / 2.75) {
    return 7.5625 * pos * pos;
  } else if (pos < 2 / 2.75) {
    return 7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75;
  } else if (pos < 2.5 / 2.75) {
    return 7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375;
  } else {
    return 7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375;
  }
};

//Start Uploading files
document.getElementById("btn-submit").addEventListener("click", () => {
  let upload = document.getElementById("file");
  //Sheet 1 importing
  readXlsxFile(upload.files[0], { sheet: "installed VS removed" }).then(
    (data) => {
      heads.push(data[0]);
      data.forEach((r) => {
        if (r[0] != "Customer") {
          Categories1Sheet1.push(r[0]);
          arr1sheet1.push(r[2]);
          arr2sheet1.push(r[3]);
        }
      });
    }
  );
  //Sheet 2 importing
  readXlsxFile(upload.files[0], { sheet: "Installed base YTD" }).then(
    (data) => {
      data.forEach((r) => {
        if (r[0] != "Customer") {
          Categories1Sheet2.push(r[0]);
          sumTotalATM += r[1];
          arr1sheet2.push(r[1]);
        }
      });
    }
  );
  //Sheet 3 importing
  readXlsxFile(upload.files[0], { sheet: "Installed base Weekly" }).then(
    (data) => {
      data.forEach((r) => {
        if (r[0] != "Weeks") {
          Categories1Sheet3.push(r[0]);
          arr1sheet3.push(r[1]);
        }
      });
    }
  );
  //Sheet 4 importing
  readXlsxFile(upload.files[0], { sheet: "Installed base Quarterly" }).then(
    (data) => {
      data.forEach((r) => {
        if (r[0] != "Quarter(s)") {
          Categories1Sheet4.push(r[0]);
          arr1sheet4.push(r[1]);
        }
      });
    }
  );
  //Sheet 5 importing
  readXlsxFile(upload.files[0], { sheet: "TRX VS Installed Base" }).then(
    (data) => {
      data.forEach((r) => {
        if (r[0] != "Bank") {
          Categories1Sheet5.push(r[0]);
          arr1sheet5.push(Math.floor(r[5] * 100));
          arr2sheet5.push(Math.floor(r[6] * 100));
        }
      });
    }
  );
  //End Uploading files
  upload.value = "";
});

//Start Button

document.getElementById("btn-start").addEventListener("click", AllChart);

function AllChart() {
  //Animation list
  document.getElementById("controller").style.zIndex = -10;
  document.getElementById("controller").style.opacity = 0;

  // animation();

  // function animation() {
  //   contaniers.forEach((r, index) => {
  //     let containCount = r.getAttribute("index");
  //     if (index == 0) {
  //       r.style.animation = `fading-In 0.5s linear ${11}.5s backwards , fading-Out 0.5s linear ${
  //         chartVisableCount * containCount
  //       }.5s forwards`;
  //     } else {
  //       r.style.animation = `fading-In 0.5s linear ${
  //         chartVisableCount * index + 1
  //       }.5s backwards , fading-Out 0.5s linear ${
  //         chartVisableCount * containCount
  //       }.5s forwards`;
  //     }
  //   });
  // }

  let chart = Highcharts.chart("container1", {
    chart: {
      type: "column",
    },
    title: {
      text: "TRX VS Installed Base",
      align: "center",
    },
    plotOptions: {
      series: {
        grouping: false,
        borderWidth: 0,
      },
    },
    tooltip: {
      shared: true,
      headerFormat:
        '<span style="font-size: 15px; font-weight: bold">{point.x}</span><br/>',
      pointFormat:
        '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y} %</b><br/>',
    },
    xAxis: {
      categories: Categories1Sheet5,
      labels: {
        format:
          '<span style="font-size: 16px; font-weight: bold">{text}</span>',
      },
    },
    yAxis: [
      {
        title: {
          text: "Percentage %",
          style: {
            fontSize: "15px",
            fontWeight: "bold",
            letterSpacing: "5px",
          },
        },
      },
    ],
    series: [
      {
        name: "Transactions",
        data: arr2sheet5,
        color: "#05bacada",
        pointPlacement: -0.3,
        animation: {
          defer: 5000,
          duration: 2500,
        },
        dataLabels: [
          {
            format: `{point.y}%`,
            enabled: true,
            inside: false,
            style: {
              fontSize: "9px",
            },
            x: -4,
          },
        ],
      },
      {
        name: "Installed Base",
        data: arr1sheet5,
        animation: {
          defer: 5000,
          duration: 1500,
        },
        color: "#ff153f",
        dataLabels: [
          {
            format: "{point.y} %",
            enabled: true,
            inside: false,
            style: {
              fontSize: "14px",
            },
          },
        ],
      },
    ],
  });

  // let chart2 = Highcharts.chart("container2", {
  //   title: {
  //     text: "Installed base YTD",
  //     align: "center",
  //   },

  //   credits: false,

  //   xAxis: {
  //     categories: Categories1Sheet2,
  //   },
  //   yAxis: {
  //     title: {
  //       text: "ATMs",
  //     },
  //   },
  //   tooltip: {
  //     valueSuffix: " ATM",
  //   },
  //   series: [
  //     {
  //       type: "column",
  //       name: heads[0][1],
  //       color: "#8085e9",
  //       data: arr1sheet2,
  //       dataLabels: {
  //         enabled: true,
  //       },
  //       animation: {
  //         defer: chartVisableCount * 1000 + 1500,
  //         duration: 1500,
  //       },
  //     },
  //     {
  //       type: "pie",
  //       name: "Total",
  //       data: [
  //         {
  //           name: "Total ATM",
  //           y: sumTotalATM,
  //           color: "#f7a35c", // 2020 color
  //           dataLabels: {
  //             color: "black",
  //             enabled: true,
  //             distance: -85,
  //             format: "{point.total}",
  //             style: {
  //               fontSize: "25px",
  //             },
  //           },
  //         },
  //       ],
  //       animation: {
  //         defer: chartVisableCount * 1000 + 1500,
  //         duration: 1500,
  //       },
  //       center: [550, 100],
  //       size: 150,
  //       innerSize: "70%",
  //       showInLegend: true,
  //       dataLabels: {
  //         enabled: false,
  //       },
  //     },
  //   ],
  // });
}
//End Charts
