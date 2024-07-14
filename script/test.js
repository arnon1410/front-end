!(function () {
  var t = {
      551: function () {
        !(function () {
          const t = {
            init() {
              const t = {
                series: [50, 20, 25, 15],
                labels: [
                  "แก้ไขเสร็จแล้ว",
                  "รอการแก้สนับสนุน",
                  "เกินวันที่กำหนด",
                  "ยังไม่ได้รับเรื่อง"
                ],
                legend: { position: "bottom" },
                theme: { palette: "palette1" },
                chart: { type: "donut" },
                dataLabels: { enabled: !1 },
                plotOptions: {
                  pie: {
                    donut: {
                      labels: {
                        show: !0,
                        name: { fontSize: "22px", fontWeight: 600 },
                        value: {
                          fontSize: "16px",
                          fontWeight: 400,
                          formatter(t) {
                            // return "$ " + t + " หน่วย";
                            return t + " หน่วย";
                          },
                        },
                      },
                    },
                  },
                },
                tooltip: {
                  y: {
                    formatter(t) {
                      //return "$ " + t + " หน่วย";
                      return t + " หน่วย";
                    },
                  },
                },
              };
              new ApexCharts(
                document.querySelector("#bsb-chart-4"),
                t
              ).render();
            },
          };
          function e() {
            t.init();
          }
          "loading" === document.readyState
            ? document.addEventListener("DOMContentLoaded", e)
            : e(),
            window.addEventListener("load", function () {}, !1);
        })();
      },
    },
    e = {};
  function n(o) {
    var r = e[o];
    if (void 0 !== r) return r.exports;
    var i = (e[o] = { exports: {} });
    return t[o](i, i.exports, n), i.exports;
  }
  (n.n = function (t) {
    var e =
      t && t.__esModule
        ? function () {
            return t.default;
          }
        : function () {
            return t;
          };
    return n.d(e, { a: e }), e;
  }),
    (n.d = function (t, e) {
      for (var o in e)
        n.o(e, o) &&
          !n.o(t, o) &&
          Object.defineProperty(t, o, { enumerable: !0, get: e[o] });
    }),
    (n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (function () {
      "use strict";
      n(551);
    })();
})();
