 
 var createMap = (function(filename, containername) {

                                                                                              // --- 0. Initial setup: creates containers for charts
                                                                                              $(containername).append('<div id="map" style="display: inline; float: left"><br></div>')
                                                                                                                   .append('<div id="chart" style="display: inline; float: left"></div>');

                                                                                              // --- 1. Gets data from data file and formats data
                                                                                              $.get('data/' + filename, function(data) {

                                                                                                var metaArray = [], // temporary array split from csv data
                                                                                                    divider,        // index of divider text in csv data
                                                                                                    dataArray = [], // temporary array split from csv data
                                                                                                     metadata = {}, // formatted object
                                                                                                      dataset = {}; // formatted object

                                                                                                // split the data into rows
                                                                                                var rowsArray = data.split('\n');

                                                                                                // iterate over the rows
                                                                                                for (var row = 0; row < rowsArray.length; row++) {
                                                                                                  // find the divider text
                                                                                                  if ( (/^\#DATA/).test(rowsArray[row]) ) {
                                                                                                    divider = row;
                                                                                                  }
                                                                                                  // create new arrays using the divider
                                                                                                  metaArray = rowsArray.slice(0, divider);
                                                                                                  dataArray = rowsArray.slice(divider + 1);
                                                                                                }

                                                                                                // iterate over the metaArray
                                                                                                for (var i = 0; i < metaArray.length; i++) {
                                                                                                  var metaArrayRow = metaArray[i].split('""",'); // split on """, since there might be commas in the text

                                                                                                  // set key and value to first and second item of each row
                                                                                                  var   key = metaArrayRow[0].substr(3), // removes opening double quote
                                                                                                      value = metaArrayRow[1].substr(3); // removes extra opening double quote

                                                                                                  // build metadata object
                                                                                                  metadata[key] = value;
                                                                                                }
                                                                                                // can now get metadata by key (ex. metadata.graph_title returns "Days Change Growing Season")
                                                                                                window.console.info('Metadata:');
                                                                                                window.console.dir(metadata);

                                                                                                // iterate over the dataArray
                                                                                                for (var row = 0; row < dataArray.length; row++) {
                                                                                                  var dataArrayRow = dataArray[row].split(',');

                                                                                                  // headerRow is the first row
                                                                                                  if (row === 0) {
                                                                                                    var dataHeaderRow = dataArrayRow;
                                                                                                  // all other rows
                                                                                                  } else {

                                                                                                    // set keys and values of the dataset object
                                                                                                    var state = dataArrayRow[0],
                                                                                                        trend = dataArrayRow[1],
                                                                                                        significance = dataArrayRow[2],
                                                                                                           yearsData = [],
                                                                                                          chartYears = [];

                                                                                                    // iterate over the dataHeaderRow (years start with 4th item)
                                                                                                    for (var item = 3; item < dataHeaderRow.length; item++) {
                                                                                                      var year = dataHeaderRow[item];
                                                                                                      yearsData.push(parseFloat(dataArrayRow[item]));
                                                                                                      chartYears.push(dataHeaderRow[item]);
                                                                                                    }

                                                                                                    dataset[state] = {
                                                                                                      id: state,
                                                                                                      trend: parseFloat(trend),
                                                                                                      significant: (significance === '1') ? true : false,
                                                                                                      years: yearsData
                                                                                                    };

                                                                                                  }
                                                                                                }
                                                                                                // can now get dataset by key (ex. dataset["us-al"] returns Alabama object)
                                                                                                window.console.info("Dataset:");
                                                                                                window.console.dir(dataset);

                                                                                                // --- 2. Sets map options
                                                                                                var unitedStatesMap = Highcharts.geojson(Highcharts.maps['countries/us/us-all']);
                                                                                                // need to translate dataset into format Highcharts uses (array of objects)
                                                                                                var datasetArray = [],
                                                                                                    datasetYearsArray = [];

                                                                                                // iterate through dataset object
                                                                                                for (var state in dataset) {
                                                                                                  datasetArray.push({
                                                                                                    id: dataset[state].id,
                                                                                                    value: dataset[state].trend,
                                                                                                    significant: dataset[state].significant,
                                                                                                    years: dataset[state].years
                                                                                                  });
                                                                                                }
                                                                                                window.console.info("Highcharts dataset:")
                                                                                                window.console.dir(datasetArray)
                                                                                                // datasetArray is now in format Highcharts uses

                                                                                                var mapOptions = {
                                                                                                  chart: {
                                                                                                    renderTo: 'map',
                                                                                                    width: 500,
                                                                                                    height: 450,
                                                                                                    zoomType: 'xy',
                                                                                                    style: {
                                                                                                      fontFamily: 'sans-serif'
                                                                                                    }
                                                                                                  },
                                                                                                  title: {
                                                                                                    text: metadata.map_title
                                                                                                  },
                                                                                                  subtitle: {
                                                                                                    text: metadata.map_subtitle
                                                                                                  },
                                                                                                  legend: {
                                                                                                    title: {
                                                                                                      text: metadata.map_legend_title
                                                                                                    }
                                                                                                  },
                                                                                                  colorAxis: {
                                                                                                    min: metadata.map_legend_min,
                                                                                                    max: metadata.map_legend_max,
                                                                                                    stops: [
                                                                                                        [0, '#A52A2A'],
                                                                                                        [0.333, '#ffffff'],
                                                                                                        [1, '#008000']
                                                                                                        ]

                                                                                                  },
                                                                                                  mapNavigation: {
                                                                                                    enableButtons: true,
                                                                                                    enableMouseWheelZoom: true,
                                                                                                    enableTouchZoom: true
                                                                                                  },
                                                                                                  plotOptions: {
                                                                                                    series: {
                                                                                                      mapData: unitedStatesMap, // US map from Highmaps map collection
                                                                                                      joinBy: ['hc-key', 'id'],
                                                                                                      cursor: 'pointer',
                                                                                                      allAreas: false, // removes states not included in dataset
                                                                                                      allowPointSelect: true,
                                                                                                      animation: false
                                                                                                    },
                                                                                                    map: {
                                                                                                      borderColor: 'black',
                                                                                                      nullColor: 'white',

                                                                                                    },
                                                                                                  },
                                                                                                  tooltip: {
                                                                                                    useHTML:true,
                                                                                                    formatter: function(e){
                                                                                                        if (this.point.value < metadata.map_break ){ 
                                                                                                                                                                                                        
                                                                                                                return '<div style="font-weight: bold;">' + this.point.name + '</div>' +
                                                                                                             '<div style="font-size: 10px;">' + this.point.value.toFixed(2) + ' ' + metadata.map_tooltip_lessthan + '<br>' +
                                                                                                             'This trend is ' + (this.point.significant ? '' : '<strong>not</strong> ') +
                                                                                                             'statistically significant.</div>'
                                                                                                           
                                                                                                     }
                                                                                                      else {
                                                                                                        if (this.point.value > metadata.map_break )
                                                                                                                        { 
                                                                                                                            return '<div style="font-weight: bold;">' + this.point.name + '</div>' +
                                                                                                             '<div style="font-size: 10px;">' + this.point.value.toFixed(2) + ' ' + metadata.map_tooltip_greater + '<br>' +
                                                                                                             'This trend is ' + (this.point.significant ? '' : '<strong>not</strong> ') +
                                                                                                             'statistically significant.</div>'
                                                                                                                            }
                                                                                                                            else{
                                                                                                        return '<div style="font-weight: bold;">' + this.point.name + '</div>' +
                                                                                                                             '<div style="font-size: 10px;">' + metadata.map_tooltip_nodata + '</div>'
                                                                                                                    
                                                                                                      
                                                                                                                             }
                                                                                                            }
                                                                                                        }
                                                                                                  },
                                                                                                  credits: {
                                                                                                    text: metadata.map_source,
                                                                                                    href: metadata.map_source_url
                                                                                                  },
                                                                                                  series: [{
                                                                                                    name: metadata.map_legend_title,
                                                                                                    data: datasetArray
                                                                                                  }]
                                                                                                };

                                                                                                // --- 3. Create the map
                                                                                                var mapChart = new Highcharts.Map(mapOptions);

                                                                                                // sets each state's 'id' value (doesn't initially exist) to equal its 'properties['hc-key']' value
                                                                                                // this value is also dataset's keys (will be used to initially select state, and dynamically update linechart)
                                                                                                for (var state = 0; state < unitedStatesMap.length; state++) {
                                                                                                  unitedStatesMap[state].id = unitedStatesMap[state].properties['hc-key'];
                                                                                                };

                                                                                                // --- 4. Wrap Highcharts.Point.select to create the line chart
                                                                                                // Highcharts.wrap() – http://www.highcharts.com/docs/extending-highcharts/extending-highcharts
                                                                                                // The wrap function accepts the parent object as the first argument, the name of the function to wrap as the second, and a callback replacement function as the third. The original function is passed as the first argument to the replacement function, and original arguments follow after that.
                                                                                                Highcharts.wrap(Highcharts.Point.prototype, 'select', function(proceed) {
                                                                                                  // Apply the original function with the original arguments, which are sliced off this function's arguments
                                                                                                  proceed.apply(this, Array.prototype.slice.call(arguments, 1));
                                                                                                  // Everything that follows now happens after the original Highcharts.Point.select function runs

                                                                                                  var selectedPointsArray = mapChart.getSelectedPoints(), // contains an array of the selected points
                                                                                                      lineChart;                                          // will become the line chart on first select

                                                                                                  // if the line chart is undefined (it will be initially), so initiation only occurs on the first select
                                                                                                  if (!lineChart) {
                                                                                                    // Initiate the line chart
                                                                                                    lineChart = $('#chart').highcharts({
                                                                                                      chart: {
                                                                                                        type: 'line',
                                                                                                        width: 450,
                                                                                                        height: 400,
                                                                                                        zoomType: 'xy'
                                                                                                      },
                                                                                                      title: {
                                                                                                        text: metadata.chart_title
                                                                                                      },
                                                                                                      subtitle: {
                                                                                                        text: metadata.chart_subtitle
                                                                                                      },
                                                                                                      xAxis: {
                                                                                                        title: {
                                                                                                          text: metadata.chart_xaxis_label
                                                                                                        },
                                                                                                        categories: chartYears,
                                                                                                        //type: 'datetime',
                                                                                                        //tickInterval: 1000 * 60 * 60 *24 * 365 // one year
                                                                                                        minTickInterval: 20 // <---------------------------------------- TODO:  x-axis type should be datetime
                                                                                                      },
                                                                                                      yAxis: {
                                                                                                        title: {
                                                                                                          text: metadata.chart_yaxis_label
                                                                                                        }
                                                                                                      },
                                                                                                      plotOptions: {
                                                                                                        line: {
                                                                                                          lineWidth: 1.5,
                                                                                                          states: {
                                                                                                            hover: {
                                                                                                              lineWidthPlus: 0
                                                                                                            }
                                                                                                          }
                                                                                                        }
                                                                                                      },
                                                                                                      tooltip: {
                                                                                                        // set to shared because the chart is small when multiple datasets are shown
                                                                                                        shared: true
                                                                                                      },
                                                                                                      credits: {
                                                                                                        text: metadata.chart_source,
                                                                                                        href: metadata.chart_source_url
                                                                                                      },
                                                                                                      // series will populated with data from selected items on mapChart
                                                                                                      series: []
                                                                                                    }).highcharts();
                                                                                                  };

                                                                                                  // iterate through selected items in selectedPointsArray
                                                                                                  for (var item = 0; item < selectedPointsArray.length; item++) {
                                                                                                    var selectedItem = selectedPointsArray[item];

                                                                                                    // populate barChart series with name and data
                                                                                                    lineChart.addSeries({
                                                                                                      // 'name' property of the object from the Highmaps map collection
                                                                                                      name: selectedItem.name,
                                                                                                      // selectedItem.id acts as a hook to the object itself since they have the same value
                                                                                                      data: dataset[selectedItem.id].years,
                                                                                                    }, false); // chart.addSeries's second argument is redraw
                                                                                                  };

                                                                                                  // redraw seems to be faster here than after each series is added above
                                                                                                  lineChart.redraw();

                                                                                                }); // end Highcharts.wrap() of Highcharts.Point.select 

                                                                                                // --- 5. Initially select a state
                                                                                                mapChart.get('us-ak').select(); // Chart.get() takes an ID

                                                                                              }, "text"); // end $.get

                                                                                            })(jQuery);
