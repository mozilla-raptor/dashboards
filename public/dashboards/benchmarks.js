/* global _ */

// accessible variables in this scope
var window, document, ARGS, $, jQuery, moment, kbn;

var handler = function(callback) {

  var templates = ['benchmark', 'benchmarkDevice'];
  var requires = ['base']
    .concat(templates)
    .map(function(r) {
      return 'public/dashboards/src/' + r + '.js';
    });

  require(requires, function($dashboard, $benchmark, $benchmarkDevice) {
    var dashboard = $dashboard();

    dashboard.title = dashboard.originalTitle = "Benchmarks";
    dashboard.templating.list = [$benchmark(), $benchmarkDevice()];
    dashboard.annotations.list = [];
    dashboard.time.from = 'now-7d';
    dashboard.rows.push({
      "collapse": false,
      "editable": true,
      "height": "500",
      "panels": [
        {
          "aliasColors": {},
          "bars": false,
          "datasource": "raptor",
          "editable": true,
          "error": false,
          "fill": 1,
          "grid": {
            "leftLogBase": 1,
            "leftMax": null,
            "leftMin": 0,
            "rightLogBase": 1,
            "rightMax": null,
            "rightMin": null,
            "threshold1": null,
            "threshold1Color": "rgba(216, 200, 27, 0.27)",
            "threshold2": null,
            "threshold2Color": "rgba(234, 112, 112, 0.22)"
          },
          "height": "300",
          "id": 1,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "links": [],
          "minSpan": 6,
          "nullPointMode": "connected",
          "percentage": false,
          "pointradius": 1,
          "points": true,
          "renderer": "flot",
          "repeat": "context",
          "scopedVars": {},
          "seriesOverrides": [],
          "span": 12,
          "stack": false,
          "steppedLine": true,
          "targets": [
            {
              "alias": "wat",
              "groupByTags": [],
              "measurement": "benchmarks",
              "query": 'SELECT value FROM benchmarks WHERE "device" = \'$device\' AND "bench-name" = \'$benchmarkSet\' AND $timeFilter GROUP BY "name"',
              "rawQuery": true
            }
          ],
          "timeFrom": null,
          "timeShift": null,
          "title": "Benchmarks",
          "tooltip": {
            "shared": true,
            "value_type": "cumulative"
          },
          "type": "graph",
          "x-axis": true,
          "y-axis": true,
          "y_formats": [
            "none",
            "none"
          ]
        }
      ],
      "title": "Benchmarks"
    });

    callback(dashboard);
  });

};

return handler;
