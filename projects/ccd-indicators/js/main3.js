

var mapperSenFallBACKUP = function(source, index, version, year, myTitle){
    $('#state-chart'+index).remove();
    var cairStates = ['AL','AR','AZ','CA','CO','CT','DE','FL','GA','ID', 'IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
    $('#outerContainer').append('<div id="container'+index+'" style="display:inline;float:left"></div>');
    $('#outerContainer').append('<div id="state-chart'+index+'" style="display:inline;float:left"></div>');
    $.getJSON('data/' + source, function (data) {
        var states = [],
            years = [],
            series = [],
            bubbleSeries = {},
            stateChart,
            bigSeries = {},
            yearsArray = [];


var statetrend = [
        {
            "code3": "us-al",
            "value": -6.751703,
            "code": 1
        },
 {
            "code3": "us-az",
            "value": 48.383615,
            "code": 99
        },
 {
            "code3": "us-ar",
            "value": 12.511541,
            "code": 99
        },
 {
            "code3": "us-ca",
            "value": 45.98279,
            "code": 99
        },
 {
            "code3": "us-co",
            "value": 13.936923,
            "code": 99
        },
 {
            "code3": "us-ct",
            "value": 22.666644,
            "code": 99
        },
 {
            "code3": "us-fl",
            "value": 15.435966,
            "code": 99
        },
 {
            "code3": "us-ga",
            "value": -14.358421,
            "code": 99
        },
 {
            "code3": "us-id",
            "value": 22.0864,
            "code": 99
        },
 {
            "code3": "us-il",
            "value": 7.689185,
            "code": 99
        },
 {
            "code3": "us-in",
            "value": 11.396511,
            "code": 99
        },
 {
            "code3": "us-ia",
            "value": 9.063873,
            "code": 99
        },
 {
            "code3": "us-ks",
            "value": 13.968339,
            "code": 99
        },
 {
            "code3": "us-ky",
            "value": 8.814092,
            "code": 99
        },
 {
            "code3": "us-la",
            "value": 13.957748,
            "code": 99
        },
 {
            "code3": "us-me",
            "value": 12.931373,
            "code": 99
        },
 {
            "code3": "us-md",
            "value": 18.180582,
            "code": 99
        },
 {
            "code3": "us-ma",
            "value": 8.28478,
            "code": 99
        },
 {
            "code3": "us-mi",
            "value": 13.255291,
            "code": 99
        },
 {
            "code3": "us-mn",
            "value": 18.51759,
            "code": 99
        },
 {
            "code3": "us-ms",
            "value": -0.396627,
            "code": 1
        },
 {
            "code3": "us-mo",
            "value": 8.040949,
            "code": 99
        },
 {
            "code3": "us-mt",
            "value": 12.57354,
            "code": 99
        },
 {
            "code3": "us-ne",
            "value": 8.490769,
            "code": 99
        },
 {
            "code3": "us-nv",
            "value": 29.75,
            "code": 99
        },
 {
            "code3": "us-nh",
            "value": 17.9928,
            "code": 99
        },
 {
            "code3": "us-nj",
            "value": 4.294353,
            "code": 1
        },
 {
            "code3": "us-nm",
            "value": 9.2463,
            "code": 99
        },
 {
            "code3": "us-ny",
            "value": 6.426,
            "code": 1
        },
 {
            "code3": "us-nc",
            "value": 2.38,
            "code": 1
        },
 {
            "code3": "us-nd",
            "value": 35.211267,
            "code": 99
        },
 {
            "code3": "us-oh",
            "value": 13.712013,
            "code": 99
        },
 {
            "code3": "us-ok",
            "value": 5.766978,
            "code": 1
        },
 {
            "code3": "us-or",
            "value": 16.315019,
            "code": 99
        },
 {
            "code3": "us-pa",
            "value": 15.583288,
            "code": 99
        },
 {
            "code3": "us-ri",
            "value": -8.623216,
            "code": 1
        },
 {
            "code3": "us-sc",
            "value": -6.061503,
            "code": 1
        },
 {
            "code3": "us-sd",
            "value": 17.272017,
            "code": 99
        },
 {
            "code3": "us-tn",
            "value": 1.878891,
            "code": 1
        },
 {
            "code3": "us-tx",
            "value": 7.248171,
            "code": 1
        },
 {
            "code3": "us-ut",
            "value": 31.535,
            "code": 99
        },
 {
            "code3": "us-vt",
            "value": 14.28,
            "code": 99
        },
 {
            "code3": "us-va",
            "value": 8.86669,
            "code": 99
        },
 {
            "code3": "us-wa",
            "value": 32.388111,
            "code": 99
        },
 {
            "code3": "us-wv",
            "value": 1.730855,
            "code": 1
        },
 {
            "code3": "us-wi",
            "value": 14.140056,
            "code": 99
        },
 {
            "code3": "us-wy",
            "value": 29.75,
            "code": 99
        },
         {
            "code3": "us-de",
            "value": null,
            "code": null
        },
         {
            "code3": "us-dc",
            "value": null,
            "code": null
        },



    ];

        for( i=0; i < data.STATE.length; i++){
            if(states.indexOf(data.STATE[i]) < 0){
                // var altColor = version == 'GROW' ? '#CFDCBA' : '#C2E0ED';
                // var color = cairStates.indexOf(data.STATE[i]) <0 ? '#FBF8EC' : altColor ;
                states.push(data.STATE[i]);
                series.push({
                    name: data.STATE[i],
                    code3: 'us-'+data.STATE[i].toLowerCase(),
                    // color: color,
                    // value: [ -6.752, 12.512, 48.384, 45.983, 13.937, 22.667, 15.436, -14.358, 9.064, 22.086, 7.689, 11.397, 13.968, 8.814, 13.958, 8.285, 18.181, 12.931, 13.255, 18.518, 8.041, -0.397, 12.574, 2.380, 35.211, 8.491, 17.993, 4.294, 9.246, 29.750, 6.426, 13.712, 5.767, 16.315, 15.583, -8.623, -6.062, 17.272, 1.879, 7.248, 31.535, 8.867, 14.280, 32.388, 14.140, 1.731, 29.750 ]
                });
                bigSeries[data.STATE[i]] = {
                    name: data.STATE[i],
                    code3: 'us-'+data.STATE[i].toLowerCase(),
                    data: []
                }
            }
            if(years.indexOf(data.OP_YEAR[i]) < 0){
                years.push(data.OP_YEAR[i]);
                yearsArray.push(data.OP_YEAR[i]);
            }
            try{
                bubbleSeries[data.OP_YEAR[i]].push({
                    name: data.STATE[i],
                    code3: 'us-'+data.STATE[i].toLowerCase(),
                    z: parseFloat(data[version][i])
                });
            }
            catch(e){
                bubbleSeries[data.OP_YEAR[i]] = [];
                 bubbleSeries[data.OP_YEAR[i]].push({
                    name: data.STATE[i],
                    code3: 'us-'+data.STATE[i].toLowerCase(),
                    z: parseFloat(data[version][i])
                });
            }

            bigSeries[data.STATE[i]].data.push(parseFloat(data[version][i]));
            // series[getIndexIfObjWithOwnAttr(series, 'name', data.STATE[i])].data.push(parseFloat(data[version][i]));

        }
        // Add lower case codes to the data set for inclusion in the tooltip.pointFormat
        var mapData = Highcharts.geojson(Highcharts.maps['countries/us/us-all']);
        $.each(mapData, function () {
            this.id = this.properties['hc-key']; // for Chart.get()
        });

        // Wrap point.select to get to the total selected points
        Highcharts.wrap(Highcharts.Point.prototype, 'select', function (proceed) {

            proceed.apply(this, Array.prototype.slice.call(arguments, 1));

            var points = mapChart.getSelectedPoints();

            if (points.length) {
                //console.log(points);
                if (points.length === 1) {
                    $('#info h2').html(points[0].name);
                } else {
                    $('#info h2').html('Comparing States');

                }

                if (!stateChart) {
                    stateChart = $('#state-chart'+index).highcharts({
                        chart: {
                            height: 300,
                            spacingLeft: 0,
                            spacingTop:10,
                            width: 500,
                            zoomType: 'xy'
                        },
                        credits: {
                            enabled: true,
                            text: 'Source: Kunkel, 2014.',
                            href: 'https://www.epa.gov/climatechange/science/indicators/references.html#growing-season_fn2'
                        },
                        title: {
                            text: 'Days Change Growing Season'
                        },
                        exporting: {
                            enabled: true
                        },
                        subtitle: {
                            text: 'This is my subtitle.'
                        },
                        xAxis: {
                            categories: years,
                            minTickInterval: 20,
                            title: {
                                text: 'Years'
                            }
                        },
                        yAxis: {
                            minTickInterval: 4,
                             title: {
                                text: 'Days deviation from average.'
                            }
                        },
                        tooltip: {
                            shared: true,
                            valueDecimals: 2
                        },
                        plotOptions: {
                            series: {
                                animation: {
                                    duration: 0
                                },
                                marker: {
                                    enabled: false
                                }
                            }
                        }
                    }).highcharts();
                }

                $.each(points, function (i) {
                    // console.log(stateChart);
                    // Update
                    if (stateChart.series[i]) {

                        /*$.each(countries[this.code3].data, function (pointI, value) {
                            stateChart.series[i].points[pointI].update(value, false);
                        });*/
                        stateChart.series[i].update({
                            name: this.name,
                            data: bigSeries[this.id.replace('us-','').toUpperCase()].data,
                            type: points.length > 1 ? 'line' : 'line'
                        }, false);
                    } else {
                        stateChart.addSeries({
                            name: this.name,
                            data: bigSeries[this.id.replace('us-','').toUpperCase()].data,
                            type: points.length > 1 ? 'line' : 'line'
                        }, false);
                    }
                });
                while (stateChart.series.length > points.length) {
                    stateChart.series[stateChart.series.length - 1].remove(false);
                }
                stateChart.redraw();

            } else {
                if (stateChart) {
                    stateChart = stateChart.destroy();
                }
            }    

        });
        // console.log(bubbleSeries);
        // Initiate the map chart
        mapChart = $('#container'+index).highcharts('Map', {
            chart: {
                width: 500,
                height: 580,
                spacingBottom: 75

            },
            title: {
                text: myTitle
            },

            credits: {
                            enabled: true,
                            text: 'Source: Kunkel, 2014.',
                            href: 'https://www.epa.gov/climatechange/science/indicators/references.html#growing-season_fn2'
            },
            subtitle: {
                text: 'Click a state (or Ctrl click multiple states) to see a graph of data over time.'
            },

            mapNavigation: {
                enableButtons: true
            },

            legend: {
                title: {
                    text: 'Days Change of Length of Growing Season'
                },
             align: 'left',
            verticalAlign: 'middle',
            y: 205,
            floating: true
            },

            colorAxis: {
                min: -15,
                max: 50,
                stops: [
                    [0, '#A52A2A'],
                    [0.333, '#ffffff'],
                    [1, '#008000']
                    ]
            //     stops: [
            //         [-15, '#ffffff'],
            //         [0, '#990041']

            // ]
        },
           dataLabels: {
                    enabled: true,
                    // format: '{point.properties.postal}'
                },

            exporting: {
                enabled: true
            },
            plotOptions:{
                map: {
                    borderColor: 'black'
                },
                mapbubble:{
                animation: false
                }
            },

            tooltip: {
                useHTML:true,
                formatter: function(e){

                        if (this.point.code > 90 ) {
                    return '<div>'+this.point.name + '</div><span style="font-size: 10px">'+this.point.value.toFixed(2) +' day change in length of growing season. <br> <div>This trend is statistically significant.</span></div>'
                } else {
                    return '<div>'+this.point.name + '</div><span style="font-size: 10px">'+this.point.value.toFixed(2) +' day change in length of growing season. <br> <div>This trend is <strong>not</strong> statistically significant.</span></div>'

                }
                }
            },

            series : [{
                data : statetrend,
                mapData: mapData,
                joinBy: ['hc-key', 'code3'],
                // color: altColor,
                name: 'Change in Length of Growing Season',
                allowPointSelect: true,

            allAreas: false,
                cursor: 'pointer',
                states: {
                    select: {
                        color: '#a4edba',
                        borderColor: 'black',
                        dashStyle: 'shortdot'
                    }
                }
            },{
                // data : bubbleSeries[year],
                // mapData: mapData,
                // joinBy: ['hc-key', 'code3'],
                // type: 'mapbubble',
                // allowPointSelect: true,
                // zMax: 2169100,
                // zMin:0,        
                // name: year+' '+ version.replace('_', ' ')
            }]
        }).highcharts();

        // Pre-select a state
        mapChart.get();
    });
};

