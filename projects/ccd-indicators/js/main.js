var getIndexIfObjWithOwnAttr = function(array, attr, value) {

    for(var i = 0; i < array.length; i++) {

        if(array[i].hasOwnProperty(attr) && array[i][attr] === value) {

            return i;
        }
    }
    return -1;
};

var getJSONData = function(source, index, chartType){
    //Make the container for the chart
    $('#outerContainer').append('<div id="container'+index+'"></div>');
    //Get the data for the chart
    $.getJSON('data/' + source, function(data) {
        console.log(data);
        var categories = [];
        var series;
        var colData = function(){
            var colSeries = {};
            var series = [];
            var names = [];
            for(i=0; i < data.variable.length; i++){
                if(!colSeries[data.variable[i]]){
                    colSeries[data.variable[i]] = {name:data.variable[i].replace(/\./g,' '), data:[]};
                    names.push(data.variable[i]);
                }
                colSeries[data.variable[i]].data.push(data.value[i]);
                if(categories.indexOf(data.OP_YEAR[i])<0){
                    categories.push(data.OP_YEAR[i]);
                }
            }
            for(i=0; i<names.length; i++){
                series.push(colSeries[names[i]]);
            }
            return series;
        }
        if (chartType == 'column'){
            series = colData();
        }
         /* =========================================
            =    Defining the Chart
            ===========================================*/
         function ChartObject(index, title, series) {
            //Figure out which data format to use
                this.chart = {
                    renderTo: 'container'+index,
                    type: 'column',
                    marginLeft: 90,
                    marginRight: 20,
                    marginBottom: 120,
                    height: 500,
                    zoomType: 'x'
                };
                this.title = {
                    text: title.replace('.json','').replace('f.', 'Figure ')
                };
                this.credits = {
                    enabled: false
                };
                this.exporting = {
                    buttons: {
                        contextButton: {
                            text: 'Export'
                        }
                    }
                };
                this.plotOptions = {
                    series: {
                        stacking: 'normal'
                    }
                };
                this.xAxis = {
                    categories: categories,
                    title: {
                        text: 'Year'
                    }
                };
                this.series = series
            }
            console.log(series);
            var chartObj = new ChartObject(index, source, series);
            var chartBuild = new Highcharts.Chart(chartObj);
    });
};


var mapper = function(source, index, version, year, myTitle){
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
            "code": 99
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
            "code": 99
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
            "code": 99
        },
 {
            "code3": "us-nm",
            "value": 9.2463,
            "code": 99
        },
 {
            "code3": "us-ny",
            "value": 6.426,
            "code": 99
        },
 {
            "code3": "us-nc",
            "value": 2.38,
            "code": 99
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
            "code": 99
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
            "code": 99
        },
 {
            "code3": "us-sc",
            "value": -6.061503,
            "code": 99
        },
 {
            "code3": "us-sd",
            "value": 17.272017,
            "code": 99
        },
 {
            "code3": "us-tn",
            "value": 1.878891,
            "code": 99
        },
 {
            "code3": "us-tx",
            "value": 7.248171,
            "code": 99
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
            "code": 0
        },
 {
            "code3": "us-wv",
            "value": 1.730855,
            "code": 0
        },
 {
            "code3": "us-wi",
            "value": 14.140056,
            "code": 0
        },
 {
            "code3": "us-wy",
            "value": 29.75,
            "code": 0
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
                            height: 400,
                            spacingLeft: 0,
                            spacingTop:100,
                            width:500,
                            zoomType: 'xy'
                        },
                        credits: {
                            enabled: false
                        },
                        title: {
                            text: 'Change in Length of Growing Season'
                        },
                        exporting: {
                            enabled: false
                        },
                        subtitle: {
                            text: null
                        },
                        xAxis: {
                            categories: years,
                            text: 'Year',
                            minTickInterval: 20
                        },
                        yAxis: {
                            title: 'Change in Length of Growing Season',
                            minTickInterval: 4
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
            title : {
                text: myTitle
            },

            credits: {
                enabled: false
            },
            subtitle: {
                text: 'Click on a state for a full record. Use the control button to select multiple states.'
            },

            mapNavigation: {
                enableButtons: true
            },

            colorAxis: {
                min: -10,
                max: 50,
                stops: [
                    [0, '#26466D'],
                    [0.25, '#ffffff'],
                    [1, '#a4463a']
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
                enabled: false
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
                    return '<div>'+this.point.name + '</div><span style="font-size: 10px">'+this.point.value.toFixed(2) +' day change in growing season. <br> </span><div>This trend is statistically significant.</div>'
                } else {
                    return '<div>'+this.point.name + '</div><span style="font-size: 10px">'+this.point.value.toFixed(2) +' day change in growing season. <br> </span><div>This trend is <strong>not</strong> statistically significant.</div>'

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

            allAreas: true,
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
        mapChart.get('us-al').select();
    });
};


// var mapperSenLength = function(source, index, version, year, myTitle){
//     $('#state-chart'+index).remove();
//     var cairStates = ['AL','AR','AZ','CA','CO','CT','DE','FL','GA','ID', 'IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
//     $('#outerContainer').append('<div id="container'+index+'" style="display:inline;float:left"></div>');
//     $('#outerContainer').append('<div id="state-chart'+index+'" style="display:inline;float:left"></div>');
//     $.getJSON('data/' + source, function (data) {
//         var states = [],
//             years = [],
//             series = [],
//             bubbleSeries = {},
//             stateChart,
//             bigSeries = {},
//             yearsArray = [];
//     var statetrend = [
//         {
//             "code3": "us-al",
//             "value": -6.751703,
//             "code": 1
//         },
//  {
//             "code3": "us-az",
//             "value": 48.383615,
//             "code": 99
//         },
//  {
//             "code3": "us-ar",
//             "value": 12.511541,
//             "code": 99
//         },
//  {
//             "code3": "us-ca",
//             "value": 45.98279,
//             "code": 99
//         },
//  {
//             "code3": "us-co",
//             "value": 13.936923,
//             "code": 99
//         },
//  {
//             "code3": "us-ct",
//             "value": 22.666644,
//             "code": 99
//         },
//  {
//             "code3": "us-fl",
//             "value": 15.435966,
//             "code": 99
//         },
//  {
//             "code3": "us-ga",
//             "value": -14.358421,
//             "code": 99
//         },
//  {
//             "code3": "us-id",
//             "value": 22.0864,
//             "code": 99
//         },
//  {
//             "code3": "us-il",
//             "value": 7.689185,
//             "code": 99
//         },
//  {
//             "code3": "us-in",
//             "value": 11.396511,
//             "code": 99
//         },
//  {
//             "code3": "us-ia",
//             "value": 9.063873,
//             "code": 99
//         },
//  {
//             "code3": "us-ks",
//             "value": 13.968339,
//             "code": 99
//         },
//  {
//             "code3": "us-ky",
//             "value": 8.814092,
//             "code": 99
//         },
//  {
//             "code3": "us-la",
//             "value": 13.957748,
//             "code": 99
//         },
//  {
//             "code3": "us-me",
//             "value": 12.931373,
//             "code": 99
//         },
//  {
//             "code3": "us-md",
//             "value": 18.180582,
//             "code": 99
//         },
//  {
//             "code3": "us-ma",
//             "value": 8.28478,
//             "code": 99
//         },
//  {
//             "code3": "us-mi",
//             "value": 13.255291,
//             "code": 99
//         },
//  {
//             "code3": "us-mn",
//             "value": 18.51759,
//             "code": 99
//         },
//  {
//             "code3": "us-ms",
//             "value": -0.396627,
//             "code": 1
//         },
//  {
//             "code3": "us-mo",
//             "value": 8.040949,
//             "code": 99
//         },
//  {
//             "code3": "us-mt",
//             "value": 12.57354,
//             "code": 99
//         },
//  {
//             "code3": "us-ne",
//             "value": 8.490769,
//             "code": 99
//         },
//  {
//             "code3": "us-nv",
//             "value": 29.75,
//             "code": 99
//         },
//  {
//             "code3": "us-nh",
//             "value": 17.9928,
//             "code": 99
//         },
//  {
//             "code3": "us-nj",
//             "value": 4.294353,
//             "code": 1
//         },
//  {
//             "code3": "us-nm",
//             "value": 9.2463,
//             "code": 99
//         },
//  {
//             "code3": "us-ny",
//             "value": 6.426,
//             "code": 1
//         },
//  {
//             "code3": "us-nc",
//             "value": 2.38,
//             "code": 1
//         },
//  {
//             "code3": "us-nd",
//             "value": 35.211267,
//             "code": 99
//         },
//  {
//             "code3": "us-oh",
//             "value": 13.712013,
//             "code": 99
//         },
//  {
//             "code3": "us-ok",
//             "value": 5.766978,
//             "code": 1
//         },
//  {
//             "code3": "us-or",
//             "value": 16.315019,
//             "code": 99
//         },
//  {
//             "code3": "us-pa",
//             "value": 15.583288,
//             "code": 99
//         },
//  {
//             "code3": "us-ri",
//             "value": -8.623216,
//             "code": 1
//         },
//  {
//             "code3": "us-sc",
//             "value": -6.061503,
//             "code": 1
//         },
//  {
//             "code3": "us-sd",
//             "value": 17.272017,
//             "code": 99
//         },
//  {
//             "code3": "us-tn",
//             "value": 1.878891,
//             "code": 1
//         },
//  {
//             "code3": "us-tx",
//             "value": 7.248171,
//             "code": 1
//         },
//  {
//             "code3": "us-ut",
//             "value": 31.535,
//             "code": 99
//         },
//  {
//             "code3": "us-vt",
//             "value": 14.28,
//             "code": 99
//         },
//  {
//             "code3": "us-va",
//             "value": 8.86669,
//             "code": 99
//         },
//  {
//             "code3": "us-wa",
//             "value": 32.388111,
//             "code": 99
//         },
//  {
//             "code3": "us-wv",
//             "value": 1.730855,
//             "code": 1
//         },
//  {
//             "code3": "us-wi",
//             "value": 14.140056,
//             "code": 99
//         },
//  {
//             "code3": "us-wy",
//             "value": 29.75,
//             "code": 99
//         },




//     ];


//     $.get('data.csv', function(data) {
//         // Split the lines
//         var years = {
//         chart: {
//             renderTo: 'container',
//             defaultSeriesType: 'column'
//         },
         
//         xAxis: {
//             categories: []
//         },
//         yAxis: {
//             title: {
//                 text: 'Units'
//             }
//         },
//         series: [] };

//         var lines = data.split('\n');
        
//         // Iterate over the lines and add categories or series
//         $.each(lines, function(lineNo, line) {
//             var items = line.split(',');
            
//             // header line containes categories
//             if (lineNo == 0) {
//                 $.each(items, function(itemNo, item) {
//                     if (itemNo > 0) years.xAxis.categories.push(item);
//                 });
//             }
            
//             // the rest of the lines contain data with their name in the first 
//             // position
//             else {
//                 var series = {
//                     data: []
//                 };
//                 $.each(items, function(itemNo, item) {
//                     if (itemNo == 0) {
//                         series.name = item;
//                     } else {
//                         series.data.push(parseFloat(item));
//                     }
//                 });
                
//                 years.series.push(series);
        
//             }
            
//         });
        

//     });
        
//             // for( i=0; i < data.STATE.length; i++){
//             //     if(states.indexOf(data.STATE[i]) < 0){
//             //         // var altColor = version == 'GROW' ? '#CFDCBA' : '#C2E0ED';
//             //         // var color = cairStates.indexOf(data.STATE[i]) <0 ? '#FBF8EC' : altColor ;
//             //         states.push(data.STATE[i]);
//             //         series.push({
//             //             name: data.STATE[i],
//             //             code3: 'us-'+data.STATE[i].toLowerCase(),
//             //             // color: color,
//             //             // value: [ -6.752, 12.512, 48.384, 45.983, 13.937, 22.667, 15.436, -14.358, 9.064, 22.086, 7.689, 11.397, 13.968, 8.814, 13.958, 8.285, 18.181, 12.931, 13.255, 18.518, 8.041, -0.397, 12.574, 2.380, 35.211, 8.491, 17.993, 4.294, 9.246, 29.750, 6.426, 13.712, 5.767, 16.315, 15.583, -8.623, -6.062, 17.272, 1.879, 7.248, 31.535, 8.867, 14.280, 32.388, 14.140, 1.731, 29.750 ]
//             //         });
//             //         bigSeries[data.STATE[i]] = {
//             //             name: data.STATE[i],
//             //             code3: 'us-'+data.STATE[i].toLowerCase(),
//             //             data: []
//             //         }
//             //     }
//             //     if(years.indexOf(data.OP_YEAR[i]) < 0){
//             //         years.push(data.OP_YEAR[i]);
//             //         yearsArray.push(data.OP_YEAR[i]);
//             //     }
//             //     try{
//             //         bubbleSeries[data.OP_YEAR[i]].push({
//             //             name: data.STATE[i],
//             //             code3: 'us-'+data.STATE[i].toLowerCase(),
//             //             z: parseFloat(data[version][i])
//             //         });
//             //     }
//             //     catch(e){
//             //         bubbleSeries[data.OP_YEAR[i]] = [];
//             //          bubbleSeries[data.OP_YEAR[i]].push({
//             //             name: data.STATE[i],
//             //             code3: 'us-'+data.STATE[i].toLowerCase(),
//             //             z: parseFloat(data[version][i])
//             //         });
//             //     }

//             //     bigSeries[data.STATE[i]].data.push(parseFloat(data[version][i]));
//             //     // series[getIndexIfObjWithOwnAttr(series, 'name', data.STATE[i])].data.push(parseFloat(data[version][i]));

//             // }
//             // Add lower case codes to the data set for inclusion in the tooltip.pointFormat
//             var mapData = Highcharts.geojson(Highcharts.maps['countries/us/us-all']);
//             $.each(mapData, function () {
//                 this.id = this.properties['hc-key']; // for Chart.get()
//             });

//             // Wrap point.select to get to the total selected points
//             Highcharts.wrap(Highcharts.Point.prototype, 'select', function (proceed) {

//                 proceed.apply(this, Array.prototype.slice.call(arguments, 1));

//                 var points = mapChart.getSelectedPoints();

//                 if (points.length) {
//                     //console.log(points);
//                     if (points.length === 1) {
//                         $('#info h2').html(points[0].name);
//                     } else {
//                         $('#info h2').html('Comparing States');

//                     }

//                     if (!stateChart) {
//                         stateChart = $('#state-chart'+index).highcharts({
//                             chart: {
//                                 height: 400,
//                                 spacingLeft: 0,
//                                 spacingTop:100,
//                                 width:500,
//                                 zoomType: 'xy'
//                             },
//                             credits: {
//                                 enabled: false
//                             },
//                             title: {
//                                 text: 'Deviation from Average in Days'
//                             },
//                             exporting: {
//                                 enabled: false
//                             },
//                             subtitle: {
//                                 text: null
//                             },
//                             xAxis: {
//                                 categories: years,
//                                 text: 'Year',
//                                 minTickInterval: 20
//                             },
//                             yAxis: {
//                                 title: 'Change in Length of Growing Season',
//                                 minTickInterval: 4
//                             },
//                             tooltip: {
//                                 shared: true
//                             },
//                             plotOptions: {
//                                 series: {
//                                     animation: {
//                                         duration: 0
//                                     },
//                                     marker: {
//                                         enabled: false
//                                     }
//                                 }
//                             }
//                         }).highcharts();
//                     }

//                     $.each(points, function (i) {
//                         // console.log(stateChart);
//                         // Update
//                         if (stateChart.series[i]) {

//                             /*$.each(countries[this.code3].data, function (pointI, value) {
//                                 stateChart.series[i].points[pointI].update(value, false);
//                             });*/
//                             stateChart.series[i].update({
//                                 name: this.name,
//                                 // data: years[this.id.replace('us-','').toUpperCase()].data,
//                                 type: points.length > 1 ? 'line' : 'line'
//                             }, false);
//                         } else {
//                             stateChart.addSeries({
//                                 name: this.name,
//                                 // data: years[this.id.replace('us-','').toUpperCase()].data,
//                                 type: points.length > 1 ? 'line' : 'line'
//                             }, false);
//                         }
//                     });
//                     while (stateChart.series.length > points.length) {
//                         stateChart.series[stateChart.series.length - 1].remove(false);
//                     }
//                     stateChart.redraw();

//                 } else {
//                     if (stateChart) {
//                         stateChart = stateChart.destroy();
//                     }
//                 }    

//             });
//             // console.log(bubbleSeries);
//             // Initiate the map chart
//             mapChart = $('#container'+index).highcharts('Map', {
//                 title : {
//                     text: myTitle
//                 },

//                 credits: {
//                     enabled: false
//                 },
//                 subtitle: {
//                     text: 'Click on a state for a full record. Use the control button to select multiple states.'
//                 },

//                 mapNavigation: {
//                     enableButtons: true
//                 },
               
//                 legend: {
//                     title: {
//                         text: 'Change in Length of Growing Season'
//                     },
//                  align: 'left',
//                 verticalAlign: 'middle',
//                 y: 150,
//                 floating: true
//                 },

//                 colorAxis: {
//                     min: -10,
//                     max: 50,
//                     minColor: '#ffffff',
//                     maxColor: '#26466D'
//                 //     stops: [
//                 //         [-15, '#ffffff'],
//                 //         [0, '#990041']

//                 // ]
//             },
//                dataLabels: {
//                         enabled: true,
//                         // format: '{point.properties.postal}'
//                     },

//                 exporting: {
//                     enabled: false
//                 },
//                 plotOptions:{
//                     map: {
//                         borderColor: 'black'
//                     },
//                     mapbubble:{
//                     animation: false
//                     }
//                 },

//                 tooltip: {
//                     useHTML:true,
//                     formatter: function(e){

//                             if (this.point.code > 90 ) {
//                         return '<div>'+this.point.name + '</div><span style="font-size: 10px">'+this.point.value.toFixed(2) +' day change in length of growing season. <br> <div>This trend is statistically significant.</span></div>'
//                     } else {
//                         return '<div>'+this.point.name + '</div><span style="font-size: 10px">'+this.point.value.toFixed(2) +' day change in length of growing season. <br> <div>This trend is <strong>not</strong> statistically significant.</span></div>'

//                     }
//                     }
//                 },

//                 series : [{
//                     data : statetrend,
//                     mapData: mapData,
//                     joinBy: ['hc-key', 'code3'],
//                     // color: altColor,
//                     name: 'Change in Length of Growing Season',
//                     allowPointSelect: true,

//                 allAreas: false,
//                     cursor: 'pointer',
//                     states: {
//                         select: {
//                             color: '#a4edba',
//                             borderColor: 'black',
//                             dashStyle: 'shortdot'
//                         }
//                     }
//                 },{
//                     // data : bubbleSeries[year],
//                     // mapData: mapData,
//                     // joinBy: ['hc-key', 'code3'],
//                     // type: 'mapbubble',
//                     // allowPointSelect: true,
//                     // zMax: 2169100,
//                     // zMin:0,        
//                     // name: year+' '+ version.replace('_', ' ')
//                 }]
//             }).highcharts();

//             // Pre-select a state
//             mapChart.get('us-al').select();
//     });
// };

var mapperSenLengthBACKUP = function(source, index, version, year, myTitle){
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
                            height: 400,
                            spacingLeft: 0,
                            spacingTop:100,
                            width:500,
                            zoomType: 'x'
                        },
                        credits: {
                            enabled: true,
                            text: 'Source: Kunkel, 2014.',
                            href: 'https://www.epa.gov/climatechange/science/indicators/references.html#growing-season_fn2'
                        },
                        title: {
                            text: 'Deviation from Average in Days'
                        },
                        exporting: {
                            enabled: true
                        },
                        subtitle: {
                            text: null
                        },
                        xAxis: {
                            categories: years,
                            text: 'Year',
                            minTickInterval: 20
                        },
                        yAxis: {
                            title: 'Change in Length of Growing Season',
                            minTickInterval: 4
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
            title : {
                text: myTitle
            },
            exporting: {
                enabled: true,
                buttons: {
                    contextButton: {
                        align: 'left',
                        symbolSize: 240
                    }
                }
            },
            credits: {
                enabled: true,
                text: 'Source: Kunkel, 2014.',
                href: 'https://www.epa.gov/climatechange/science/indicators/references.html#growing-season_fn2'
            },
            subtitle: {
                text: 'Click on a state for a full record. Use the control button to select multiple states.'
            },

            mapNavigation: {
                enableButtons: true
            },
           
            legend: {
                title: {
                    text: 'Change in Length of Growing Season'
                },
             align: 'left',
            verticalAlign: 'middle',
            y: 150,
            floating: true
            },


            colorAxis: {
                min: -10,
                max: 50,
                // minColor: '#ffffff',
                // maxColor: '#26466D'
                stops: [
                    [0, '#26466D'],
                    [0.25, '#ffffff'],
                    [1, '#a4463a']
                                        ]
        },
           dataLabels: {
                    enabled: true,
                    // format: '{point.properties.postal}'
                },

            exporting: {
                enabled: false
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
                borderWidth: 4,
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
                        borderColor: 'black'
                    }
                }
            }
            // ,{
            //     data : bubbleSeries[year],
            //     mapData: mapData,
            //     joinBy: ['hc-key', 'code3'],
            //     type: 'mapbubble',
            //     allowPointSelect: true,
            //     zMax: 2169100,
            //     zMin:0,        
            //     name: year+' '+ version.replace('_', ' ')
            // }
            ]
        }).highcharts();

        // Pre-select a state
        mapChart.get('us-al').select();
    });
};

// var mapperSenFall = function(source, index, version, year, myTitle){
//     $('#state-chart'+index).remove();
//     var cairStates = ['AL','AR','AZ','CA','CO','CT','DE','FL','GA','ID', 'IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
//     $('#outerContainer').append('<div id="container'+index+'" style="display:inline;float:left"></div>');
//     $('#outerContainer').append('<div id="state-chart'+index+'" style="display:inline;float:left"></div>');
//     $.getJSON('data/' + source, function (data) {
//         var states = [],
//             years = [],
//             series = [],
//             bubbleSeries = {},
//             stateChart,
//             bigSeries = {},
//             yearsArray = [];


//     var statetrend = [
//         {
//             "code3": "us-al",
//             "value": null,
//             "code": 1
//         },
//  {
//             "code3": "us-az",
//             "value": 19.606678,
//             "code": 99
//         },
//  {
//             "code3": "us-ar",
//             "value": 8.206002,
//             "code": 99
//         },
//  {
//             "code3": "us-ca",
//             "value": 15.91625,
//             "code": 99
//         },
//  {
//             "code3": "us-co",
//             "value": 6.233339,
//             "code": 99
//         },
//  {
//             "code3": "us-ct",
//             "value": 10.199966,
//             "code": 99
//         },
//  {
//             "code3": "us-fl",
//             "value": null,
//             "code": 1
//         },
//  {
//             "code3": "us-ga",
//             "value": null,
//             "code": 1
//         },
//  {
//             "code3": "us-id",
//             "value": 10.313373,
//             "code": 99
//         },
//  {
//             "code3": "us-il",
//             "value": null,
//             "code": 1
//         },
//  {
//             "code3": "us-in",
//             "value": null,
//             "code": 1
//         },
//  {
//             "code3": "us-ia",
//             "value": null,
//             "code": 1
//         },
//  {
//             "code3": "us-ks",
//             "value": null,
//             "code": 1
//         },
//  {
//             "code3": "us-ky",
//             "value": null,
//             "code": 1
//         },
//  {
//             "code3": "us-la",
//             "value": 9.701118,
//             "code": 99
//         },
//  {
//             "code3": "us-me",
//             "value": 5.553373,
//             "code": 99
//         },
//  {
//             "code3": "us-md",
//             "value": 10.818171,
//             "code": 99
//         },
//  {
//             "code3": "us-ma",
//             "value": 5.173882,
//             "code": 99
//         },
//  {
//             "code3": "us-mi",
//             "value": 6.902,
//             "code": 99
//         },
//  {
//             "code3": "us-mn",
//             "value": 5.743059,
//             "code": 99
//         },
//  {
//             "code3": "us-ms",
//             "value": null,
//             "code": 1
//         },
//  {
//             "code3": "us-mo",
//             "value": null,
//             "code": 1
//         },
//  {
//             "code3": "us-mt",
//             "value": 8.596441,
//             "code": 99
//         },
//  {
//             "code3": "us-ne",
//             "value": null,
//             "code": 1
//         },
//  {
//             "code3": "us-nv",
//             "value": 13.883373,
//             "code": 99
//         },
//  {
//             "code3": "us-nh",
//             "value": 10.258633,
//             "code": 99
//         },
//  {
//             "code3": "us-nj",
//             "value": 5.595261,
//             "code": 99
//         },
//  {
//             "code3": "us-nm",
//             "value": 4.659921,
//             "code": 99
//         },
//  {
//             "code3": "us-ny",
//             "value": 5.549684,
//             "code": 99
//         },
//  {
//             "code3": "us-nc",
//             "value": null,
//             "code": 1
//         },
//  {
//             "code3": "us-nd",
//             "value": 16.036678,
//             "code": 99
//         },
//  {
//             "code3": "us-oh",
//             "value": 7.489979,
//             "code": 99
//         },
//  {
//             "code3": "us-ok",
//             "value": null,
//             "code": 1
//         },
//  {
//             "code3": "us-or",
//             "value": 8.6275,
//             "code": 99
//         },
//  {
//             "code3": "us-pa",
//             "value": 12.921972,
//             "code": 99
//         },
//  {
//             "code3": "us-ri",
//             "value": null,
//             "code": 1
//         },
//  {
//             "code3": "us-sc",
//             "value": null,
//             "code": 1
//         },
//  {
//             "code3": "us-sd",
//             "value": 5.820647,
//             "code": 99
//         },
//  {
//             "code3": "us-tn",
//             "value": null,
//             "code": 1
//         },
//  {
//             "code3": "us-tx",
//             "value": null,
//             "code": 1
//         },
//  {
//             "code3": "us-ut",
//             "value": 13.09,
//             "code": 99
//         },
//  {
//             "code3": "us-vt",
//             "value": 8.873949,
//             "code": 99
//         },
//  {
//             "code3": "us-va",
//             "value": null,
//             "code": 1
//         },
//  {
//             "code3": "us-wa",
//             "value": 13.204478,
//             "code": 99
//         },
//  {
//             "code3": "us-wv",
//             "value": null,
//             "code": 1
//         },
//  {
//             "code3": "us-wi",
//             "value": 5.173882,
//             "code": 99
//         },
//  {
//             "code3": "us-wy",
//             "value": 12.453469,
//             "code": 99
//         },

//    ];

//         for( i=0; i < data.STATE.length; i++){
//             if(states.indexOf(data.STATE[i]) < 0){
//                 // var altColor = version == 'GROW' ? '#CFDCBA' : '#C2E0ED';
//                 // var color = cairStates.indexOf(data.STATE[i]) <0 ? '#FBF8EC' : altColor ;
//                 states.push(data.STATE[i]);
//                 series.push({
//                     name: data.STATE[i],
//                     code3: 'us-'+data.STATE[i].toLowerCase(),
//                     // color: color,
//                     // value: [ -6.752, 12.512, 48.384, 45.983, 13.937, 22.667, 15.436, -14.358, 9.064, 22.086, 7.689, 11.397, 13.968, 8.814, 13.958, 8.285, 18.181, 12.931, 13.255, 18.518, 8.041, -0.397, 12.574, 2.380, 35.211, 8.491, 17.993, 4.294, 9.246, 29.750, 6.426, 13.712, 5.767, 16.315, 15.583, -8.623, -6.062, 17.272, 1.879, 7.248, 31.535, 8.867, 14.280, 32.388, 14.140, 1.731, 29.750 ]
//                 });
//                 bigSeries[data.STATE[i]] = {
//                     name: data.STATE[i],
//                     code3: 'us-'+data.STATE[i].toLowerCase(),
//                     data: []
//                 }
//             }
//             if(years.indexOf(data.OP_YEAR[i]) < 0){
//                 years.push(data.OP_YEAR[i]);
//                 yearsArray.push(data.OP_YEAR[i]);
//             }
//             try{
//                 bubbleSeries[data.OP_YEAR[i]].push({
//                     name: data.STATE[i],
//                     code3: 'us-'+data.STATE[i].toLowerCase(),
//                     z: parseFloat(data[version][i])
//                 });
//             }
//             catch(e){
//                 bubbleSeries[data.OP_YEAR[i]] = [];
//                  bubbleSeries[data.OP_YEAR[i]].push({
//                     name: data.STATE[i],
//                     code3: 'us-'+data.STATE[i].toLowerCase(),
//                     z: parseFloat(data[version][i])
//                 });
//             }

//             bigSeries[data.STATE[i]].data.push(parseFloat(data[version][i]));
//             // series[getIndexIfObjWithOwnAttr(series, 'name', data.STATE[i])].data.push(parseFloat(data[version][i]));

//         }
//         // Add lower case codes to the data set for inclusion in the tooltip.pointFormat
//         var mapData = Highcharts.geojson(Highcharts.maps['countries/us/us-all']);
//         $.each(mapData, function () {
//             this.id = this.properties['hc-key']; // for Chart.get()
//         });

//         // Wrap point.select to get to the total selected points
//         Highcharts.wrap(Highcharts.Point.prototype, 'select', function (proceed) {

//             proceed.apply(this, Array.prototype.slice.call(arguments, 1));

//             var points = mapChart.getSelectedPoints();

//             if (points.length) {
//                 //console.log(points);
//                 if (points.length === 1) {
//                     $('#info h2').html(points[0].name);
//                 } else {
//                     $('#info h2').html('Comparing States');

//                 }

//                 if (!stateChart) {
//                     stateChart = $('#state-chart'+index).highcharts({
//                         chart: {
//                             height: 400,
//                             spacingLeft: 0,
//                             spacingTop:100,
//                             width:500,
//                             zoomType: 'x'
//                         },
//                         credits: {
//                             enabled: false
//                         },
//                         title: {
//                             text: 'Days Later Fall'
//                         },
//                         exporting: {
//                             enabled: false
//                         },
//                         subtitle: {
//                             text: null
//                         },
//                         xAxis: {
//                             categories: years,
//                             text: 'Year'
//                         },
//                         yAxis: {
//                             title: 'Change in Length of Growing Season',
//                             minTickInterval: 4
//                         },
//                         tooltip: {
//                             shared: true,
//                             valueDecimals: 2
//                         },
//                         plotOptions: {
//                             series: {
//                                 animation: {
//                                     duration: 0
//                                 },
//                                 marker: {
//                                     enabled: false
//                                 }
//                             }
//                         }
//                     }).highcharts();
//                 }

//                 $.each(points, function (i) {
//                     // console.log(stateChart);
//                     // Update
//                     if (stateChart.series[i]) {

//                         /*$.each(countries[this.code3].data, function (pointI, value) {
//                             stateChart.series[i].points[pointI].update(value, false);
//                         });*/
//                         stateChart.series[i].update({
//                             name: this.name,
//                             data: bigSeries[this.id.replace('us-','').toUpperCase()].data,
//                             type: points.length > 1 ? 'line' : 'line'
//                         }, false);
//                     } else {
//                         stateChart.addSeries({
//                             name: this.name,
//                             data: bigSeries[this.id.replace('us-','').toUpperCase()].data,
//                             type: points.length > 1 ? 'line' : 'line'
//                         }, false);
//                     }
//                 });
//                 while (stateChart.series.length > points.length) {
//                     stateChart.series[stateChart.series.length - 1].remove(false);
//                 }
//                 stateChart.redraw();

//             } else {
//                 if (stateChart) {
//                     stateChart = stateChart.destroy();
//                 }
//             }    

//         });
//         // console.log(bubbleSeries);
//         // Initiate the map chart
//         mapChart = $('#container'+index).highcharts('Map', {
//             title : {
//                 text: myTitle
//             },

//             credits: {
//                 enabled: true,
//                 text: 'Source: Kunkel, 2014',
//                 href: 'https://www.epa.gov/climatechange/science/indicators/references.html#growing-season_fn2'
//             },
//             subtitle: {
//                 text: 'Click on a state for a full record. Use the control button to select multiples.'
//             },

//             mapNavigation: {
//                 enableButtons: true
//             },

//             legend: {
//                 title: {
//                     text: 'Days Change of Fall Frost'
//                 },
//              align: 'left',
//             verticalAlign: 'middle',
//             y: 150,
//             floating: true
//             },

//             colorAxis: {
//                 min: -5,
//                 max: 20,
//                 minColor: '#ffffff',
//                 maxColor: '#26466D'
//             //     stops: [
//             //         [-15, '#ffffff'],
//             //         [0, '#990041']

//             // ]
//         },
//            dataLabels: {
//                     enabled: true,
//                     // format: '{point.properties.postal}'
//                 },

//             exporting: {
//                 enabled: false
//             },
//             plotOptions:{
//                 map: {
//                     borderColor: 'black'
//                 },
//                 mapbubble:{
//                 animation: false
//                 }
//             },
//     function(a) if (this.point.code > 90 ) {
//                         tooltip: [
//                     valueDecimals: 3
//                                ]}
//                 else {
//                                     tooltip: [
//                     valueDecimals: 1
//                                ]

//                     },

//                 series : [{
//                     data : statetrend,
//                     mapData: mapData,
//                     joinBy: ['hc-key', 'code3'],
//                     // color: altColor,
//                     name: 'Change in Length of Growing Season',
//                     allowPointSelect: true,

//                 allAreas: false,
//                     cursor: 'pointer',
//                     states: {
//                         select: {
//                             color: function(hello){

//                             if (this.point.code < 90 ) {
//                         this.point.color = '#000000'
//                     } else {
//                         '#FFFFFF'

//                     }
//                     },


//                             borderColor: 'black',
//                             dashStyle: 'shortdot'
//                         }
//                     }
//                 },{
//                     // data : bubbleSeries[year],
//                     // mapData: mapData,
//                     // joinBy: ['hc-key', 'code3'],
//                     // type: 'mapbubble',
//                     // allowPointSelect: true,
//                     // zMax: 2169100,
//                     // zMin:0,        
//                     // name: year+' '+ version.replace('_', ' ')
//                 }]
//             }).highcharts();

//             // Pre-select a state
//             mapChart.get('us-al').select();
//     });
// };


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
            "value": null,
            "code": 1
        },
 {
            "code3": "us-az",
            "value": 19.606678,
            "code": 99
        },
 {
            "code3": "us-ar",
            "value": 8.206002,
            "code": 99
        },
 {
            "code3": "us-ca",
            "value": 15.91625,
            "code": 99
        },
 {
            "code3": "us-co",
            "value": 6.233339,
            "code": 99
        },
 {
            "code3": "us-ct",
            "value": 10.199966,
            "code": 99
        },
 {
            "code3": "us-fl",
            "value": null,
            "code": 1
        },
 {
            "code3": "us-ga",
            "value": null,
            "code": 1
        },
 {
            "code3": "us-id",
            "value": 10.313373,
            "code": 99
        },
 {
            "code3": "us-il",
            "value": null,
            "code": 1
        },
 {
            "code3": "us-in",
            "value": null,
            "code": 1
        },
 {
            "code3": "us-ia",
            "value": null,
            "code": 1
        },
 {
            "code3": "us-ks",
            "value": null,
            "code": 1
        },
 {
            "code3": "us-ky",
            "value": null,
            "code": 1
        },
 {
            "code3": "us-la",
            "value": 9.701118,
            "code": 99
        },
 {
            "code3": "us-me",
            "value": 5.553373,
            "code": 99
        },
 {
            "code3": "us-md",
            "value": 10.818171,
            "code": 99
        },
 {
            "code3": "us-ma",
            "value": 5.173882,
            "code": 99
        },
 {
            "code3": "us-mi",
            "value": 6.902,
            "code": 99
        },
 {
            "code3": "us-mn",
            "value": 5.743059,
            "code": 99
        },
 {
            "code3": "us-ms",
            "value": null,
            "code": 1
        },
 {
            "code3": "us-mo",
            "value": null,
            "code": 1
        },
 {
            "code3": "us-mt",
            "value": 8.596441,
            "code": 99
        },
 {
            "code3": "us-ne",
            "value": null,
            "code": 1
        },
 {
            "code3": "us-nv",
            "value": 13.883373,
            "code": 99
        },
 {
            "code3": "us-nh",
            "value": 10.258633,
            "code": 99
        },
 {
            "code3": "us-nj",
            "value": 5.595261,
            "code": 99
        },
 {
            "code3": "us-nm",
            "value": 4.659921,
            "code": 99
        },
 {
            "code3": "us-ny",
            "value": 5.549684,
            "code": 99
        },
 {
            "code3": "us-nc",
            "value": null,
            "code": 1
        },
 {
            "code3": "us-nd",
            "value": 16.036678,
            "code": 99
        },
 {
            "code3": "us-oh",
            "value": 7.489979,
            "code": 99
        },
 {
            "code3": "us-ok",
            "value": null,
            "code": 1
        },
 {
            "code3": "us-or",
            "value": 8.6275,
            "code": 99
        },
 {
            "code3": "us-pa",
            "value": 12.921972,
            "code": 99
        },
 {
            "code3": "us-ri",
            "value": null,
            "code": 1
        },
 {
            "code3": "us-sc",
            "value": null,
            "code": 1
        },
 {
            "code3": "us-sd",
            "value": 5.820647,
            "code": 99
        },
 {
            "code3": "us-tn",
            "value": null,
            "code": 1
        },
 {
            "code3": "us-tx",
            "value": null,
            "code": 1
        },
 {
            "code3": "us-ut",
            "value": 13.09,
            "code": 99
        },
 {
            "code3": "us-vt",
            "value": 8.873949,
            "code": 99
        },
 {
            "code3": "us-va",
            "value": null,
            "code": 1
        },
 {
            "code3": "us-wa",
            "value": 13.204478,
            "code": 99
        },
 {
            "code3": "us-wv",
            "value": null,
            "code": 1
        },
 {
            "code3": "us-wi",
            "value": 5.173882,
            "code": 99
        },
 {
            "code3": "us-wy",
            "value": 12.453469,
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
                            height: 400,
                            spacingLeft: 0,
                            spacingTop:100,
                            width:500,
                            zoomType: 'xy'
                        },
                        credits: {
                            enabled: false
                        },
                        title: {
                            text: 'Days Later Fall'
                        },
                        exporting: {
                            enabled: false
                        },
                        subtitle: {
                            text: null
                        },
                        xAxis: {
                            categories: years,
                            text: 'Year',
                            minTickInterval: 20
                        },
                        yAxis: {
                            title: 'Change in Length of Growing Season',
                            minTickInterval: 4
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
            title : {
                text: myTitle
            },

            credits: {
                enabled: false
            },
            subtitle: {
                text: 'Click on a state for a full record. Use the control button to select multiple states.'
            },

            mapNavigation: {
                enableButtons: true
            },

            legend: {
                title: {
                    text: 'Days Change of Fall Frost'
                },
             align: 'left',
            verticalAlign: 'middle',
            y: 150,
            floating: true
            },

            colorAxis: {
                min: -5,
                max: 20,
                stops: [
                    [0, '#26466D'],
                    [0.15, '#ffffff'],
                    [1, '#a4463a']
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
                enabled: false
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
                    return '<div>'+this.point.name + '</div><span style="font-size: 10px">'+this.point.value.toFixed(2) +' day change in timing of first fall frost. <br> <div>This trend is statistically significant.</span></div>'
                } else {
                    return '<div>'+this.point.name + '</div>'

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
        mapChart.get('us-al').select();
    });
};


var mapperSenSpring = function(source, index, version, year, myTitle){
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
            "value": 2.975,
            "code": 1
        },
 {
            "code3": "us-az",
            "value": -27.526604,
            "code": 99
        },
 {
            "code3": "us-ar",
            "value": -4.068491,
            "code": 1
        },
 {
            "code3": "us-ca",
            "value": -27.712839,
            "code": 99
        },
 {
            "code3": "us-co",
            "value": -6.274513,
            "code": 99
        },
 {
            "code3": "us-ct",
            "value": -11.9,
            "code": 99
        },
 {
            "code3": "us-fl",
            "value": -6.61283,
            "code": 1
        },
 {
            "code3": "us-ga",
            "value": 10.021109,
            "code": 99
        },
 {
            "code3": "us-id",
            "value": -10.679536,
            "code": 99
        },
 {
            "code3": "us-il",
            "value": -6.948053,
            "code": 99
        },
 {
            "code3": "us-in",
            "value": -7.630042,
            "code": 99
        },
 {
            "code3": "us-ia",
            "value": -7.064078,
            "code": 99
        },
 {
            "code3": "us-ks",
            "value": -8.207906,
            "code": 99
        },
 {
            "code3": "us-ky",
            "value": -3.612483,
            "code": 1
        },
 {
            "code3": "us-la",
            "value": -4.745958,
            "code": 1
        },
 {
            "code3": "us-me",
            "value": -7.4375,
            "code": 99
        },
 {
            "code3": "us-md",
            "value": -9.255582,
            "code": 99
        },
 {
            "code3": "us-ma",
            "value": -1.676115,
            "code": 1
        },
 {
            "code3": "us-mi",
            "value": -6.525365,
            "code": 99
        },
 {
            "code3": "us-mn",
            "value": -11.86073,
            "code": 99
        },
 {
            "code3": "us-ms",
            "value": 1.653505,
            "code": 1
        },
 {
            "code3": "us-mo",
            "value": -5.583837,
            "code": 99
        },
 {
            "code3": "us-mt",
            "value": -4.226047,
            "code": 1
        },
 {
            "code3": "us-ne",
            "value": -4.76,
            "code": 1
        },
 {
            "code3": "us-nv",
            "value": -18.511164,
            "code": 99
        },
 {
            "code3": "us-nh",
            "value": -6.611164,
            "code": 99
        },
 {
            "code3": "us-nj",
            "value": 0.370685,
            "code": 1
        },
 {
            "code3": "us-nm",
            "value": -4.435487,
            "code": 1
        },
 {
            "code3": "us-ny",
            "value": -1.897098,
            "code": 1
        },
 {
            "code3": "us-nc",
            "value": -2.115582,
            "code": 1
        },
 {
            "code3": "us-nd",
            "value": -19.698784,
            "code": 99
        },
 {
            "code3": "us-oh",
            "value": -8.500051,
            "code": 99
        },
 {
            "code3": "us-ok",
            "value": -2.488171,
            "code": 1
        },
 {
            "code3": "us-or",
            "value": -7.559951,
            "code": 99
        },
 {
            "code3": "us-pa",
            "value": -4.896374,
            "code": 1
        },
 {
            "code3": "us-ri",
            "value": 8.500051,
            "code": 99
        },
 {
            "code3": "us-sc",
            "value": 2.54779,
            "code": 1
        },
 {
            "code3": "us-sd",
            "value": -10.730468,
            "code": 99
        },
 {
            "code3": "us-tn",
            "value": -0.489209,
            "code": 1
        },
 {
            "code3": "us-tx",
            "value": -4.213195,
            "code": 1
        },
 {
            "code3": "us-ut",
            "value": -17.629017,
            "code": 99
        },
 {
            "code3": "us-vt",
            "value": -5.250042,
            "code": 1
        },
 {
            "code3": "us-va",
            "value": -2.484601,
            "code": 1
        },
 {
            "code3": "us-wa",
            "value": -20.279623,
            "code": 99
        },
 {
            "code3": "us-wv",
            "value": 2.288489,
            "code": 1
        },
 {
            "code3": "us-wi",
            "value": -8.592157,
            "code": 99
        },
 {
            "code3": "us-wy",
            "value": -19.161023,
            "code": 99
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
                            height: 400,
                            spacingLeft: 0,
                            spacingTop:100,
                            width:500,
                            zoomType: 'xy'
                        },
                        credits: {
                            enabled: false
                        },
                        title: {
                            text: 'Days Earlier Spring'
                        },
                        exporting: {
                            enabled: false
                        },
                        subtitle: {
                            text: null
                        },
                        xAxis: {
                            categories: years,
                            text: 'Year',
                            minTickInterval: 20
                        },
                        yAxis: {
                            title: 'Change in Length of Growing Season',
                            minTickInterval: 4
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
            title : {
                text: myTitle
            },

            credits: {
                enabled: false
            },
            subtitle: {
                text: 'Click on a state for a full record. Use the control button to select multiple states.'
            },

            mapNavigation: {
                enableButtons: true
            },
            
            legend: {
                title: {
                    text: 'Days Change of Spring Frost'
                },
             align: 'left',
            verticalAlign: 'middle',
            y: 150,
            floating: true
            },

            colorAxis: {
                min: -28,
                max: 10,
                stops: [
                    [0, '#a4463a'],
                    [0.7, '#ffffff'],
                    [1, '#26466D']
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
                enabled: false
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
                    return '<div>'+this.point.name + '</div><span style="font-size: 10px">'+this.point.value.toFixed(2) +' day change in timing of last spring frost.</span></div>'
                } else {
                    return '<div>'+this.point.name + '</div>'
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
        mapChart.get('us-al').select();
    });
};


var mapperOLSLength = function(source, index, version, year, myTitle){
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
            "value": -6.54435593220338,
            "code": 0.103483803025312
        },
 {
            "code3": "us-az",
            "value": 45.1029491525424,
            "code": 1.75068098176203E-18
        },
 {
            "code3": "us-ar",
            "value": 11.9243220338983,
            "code": 0.00119070897701542
        },
 {
            "code3": "us-ca",
            "value": 44.6723050847458,
            "code": 7.85678862494988E-14
        },
 {
            "code3": "us-co",
            "value": 12.9901271186441,
            "code": 0.000065680361921655
        },
 {
            "code3": "us-ct",
            "value": 24.0743961892059,
            "code": 5.30808988197929E-05
        },
 {
            "code3": "us-fl",
            "value": 15.3232203389831,
            "code": 0.0428339181338678
        },
 {
            "code3": "us-ga",
            "value": -13.7893389830508,
            "code": 0.0037350115877913
        },
 {
            "code3": "us-id",
            "value": 21.3459830508475,
            "code": 3.17091867678193E-07
        },
 {
            "code3": "us-il",
            "value": 8.04531355932204,
            "code": 0.0100396611240701
        },
 {
            "code3": "us-in",
            "value": 12.0673644067797,
            "code": 7.74500886431232E-05
        },
 {
            "code3": "us-ia",
            "value": 9.09235593220339,
            "code": 0.00426664163441216
        },
 {
            "code3": "us-ks",
            "value": 14.2330169491525,
            "code": 0.000010641247056799
        },
 {
            "code3": "us-ky",
            "value": 10.0550169491525,
            "code": 0.00309963536058733
        },
 {
            "code3": "us-la",
            "value": 10.8650677966102,
            "code": 0.060430831186454
        },
 {
            "code3": "us-me",
            "value": 13.6160677966102,
            "code": 7.18401851025433E-07
        },
 {
            "code3": "us-md",
            "value": 19.3257104487006,
            "code": 1.03006540174621E-07
        },
 {
            "code3": "us-ma",
            "value": 6.57457627118644,
            "code": 0.0568444689716979
        },
 {
            "code3": "us-mi",
            "value": 12.8782457627119,
            "code": 7.04865383215651E-06
        },
 {
            "code3": "us-mn",
            "value": 18.0674406779661,
            "code": 1.20730705092266E-08
        },
 {
            "code3": "us-ms",
            "value": -0.334364406779661,
            "code": 0.938693610010319
        },
 {
            "code3": "us-mo",
            "value": 8.76029661016949,
            "code": 0.00465300947866512
        },
 {
            "code3": "us-mt",
            "value": 12.1850677966102,
            "code": 0.000833004549312557
        },
 {
            "code3": "us-ne",
            "value": 8.6184406779661,
            "code": 0.00413469314116322
        },
 {
            "code3": "us-nv",
            "value": 32.3171932085746,
            "code": 0.000110345373084698
        },
 {
            "code3": "us-nh",
            "value": 16.3562627118644,
            "code": 1.52210579706656E-05
        },
 {
            "code3": "us-nj",
            "value": 4.76676271186441,
            "code": 0.157046883047452
        },
 {
            "code3": "us-nm",
            "value": 9.54670338983051,
            "code": 0.00347439624220875
        },
 {
            "code3": "us-ny",
            "value": 6.97651694915254,
            "code": 0.0250014516719552
        },
 {
            "code3": "us-nc",
            "value": 3.07064406779661,
            "code": 0.323945308117361
        },
 {
            "code3": "us-nd",
            "value": 35.161779661017,
            "code": 7.01867838027955E-17
        },
 {
            "code3": "us-oh",
            "value": 15.1896355932203,
            "code": 3.2903484207358E-06
        },
 {
            "code3": "us-ok",
            "value": 5.60786440677967,
            "code": 0.113855994739493
        },
 {
            "code3": "us-or",
            "value": 17.2285677966102,
            "code": 4.74067632987328E-05
        },
 {
            "code3": "us-pa",
            "value": 17.2710338983051,
            "code": 6.40980534576272E-07
        },
 {
            "code3": "us-ri",
            "value": -12.1815955195569,
            "code": 0.0262118907204902
        },
 {
            "code3": "us-sc",
            "value": -5.39364406779661,
            "code": 0.20882428928143
        },
 {
            "code3": "us-sd",
            "value": 17.4996949152542,
            "code": 3.36611724787434E-07
        },
 {
            "code3": "us-tn",
            "value": 3.33951694915255,
            "code": 0.311510911847137
        },
 {
            "code3": "us-tx",
            "value": 6.61339830508475,
            "code": 0.121015824651251
        },
 {
            "code3": "us-ut",
            "value": 30.3294152542373,
            "code": 9.80282392627469E-17
        },
 {
            "code3": "us-vt",
            "value": 13.6356525423729,
            "code": 0.000387846809989371
        },
 {
            "code3": "us-va",
            "value": 7.36473728813559,
            "code": 0.0379395849735082
        },
 {
            "code3": "us-wa",
            "value": 33.2303474576271,
            "code": 3.94807908772177E-13
        },
 {
            "code3": "us-wv",
            "value": 3.09374169957584,
            "code": 0.443364478294926
        },
 {
            "code3": "us-wi",
            "value": 13.6056949152542,
            "code": 2.11139084463068E-05
        },
 {
            "code3": "us-wy",
            "value": 31.1799633394776,
            "code": 2.82588126481176E-07
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
                            height: 400,
                            spacingLeft: 0,
                            spacingTop:100,
                            width:500,
                            zoomType: 'xy'
                        },
                        credits: {
                            enabled: false
                        },
                        title: {
                            text: 'Deviation from Average in Days'
                        },
                        exporting: {
                            enabled: false
                        },
                        subtitle: {
                            text: null
                        },
                        xAxis: {
                            categories: years,
                            text: 'Year',
                            minTickInterval: 20
                        },
                        yAxis: {
                            title: 'Change in Length of Growing Season',
                            minTickInterval: 4
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
            title : {
                text: myTitle
            },

            credits: {
                enabled: false
            },
            subtitle: {
                text: 'Click on a state for a full record. Use the control button to select multiple states.'
            },

            mapNavigation: {
                enableButtons: true
            },

            legend: {
                title: {
                    text: 'Change in Length of Growing Season'
                },
             align: 'left',
            verticalAlign: 'middle',
            y: 150,
            floating: true
            },

            colorAxis: {
                min: -10,
                max: 50,
                stops: [
                    [0, '#26466D'],
                    [0.25, '#ffffff'],
                    [1, '#a4463a']
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
                enabled: false
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

                        if (this.point.code > 0.05 ) {
                    return '<div>'+this.point.name + '</div><span style="font-size: 10px">'+this.point.value.toFixed(2) +' day change in the length of growing season. <br> </span><div>This trend is has a p-value of '+this.point.code +', which is <strong>not</strong> statistically significant.</div>'
                } else {
                    return '<div>'+this.point.name + '</div><span style="font-size: 10px">'+this.point.value.toFixed(2) +' day change in the length of growing season. <br> </span><div>This trend is has a p-value of '+this.point.code +', which is statistically significant.</div>'
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
        mapChart.get('us-al').select();
    });
};


var mapperOLSFall = function(source, index, version, year, myTitle){
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
            "value": null,
            "code": 0.234935922880879
        },
 {
            "code3": "us-az",
            "value": 18.3216525423729,
            "code": 6.09367224592928E-11
        },
 {
            "code3": "us-ar",
            "value": 8.48008474576271,
            "code": 0.00022857645893387
        },
 {
            "code3": "us-ca",
            "value": 17.1692372881356,
            "code": 1.3803836086635E-07
        },
 {
            "code3": "us-co",
            "value": 6.62943220338983,
            "code": 0.00261189931991803
        },
 {
            "code3": "us-ct",
            "value": 12.2374020934019,
            "code": 0.00110705997342846
        },
 {
            "code3": "us-fl",
            "value": null,
            "code": 0.123671296463695
        },
 {
            "code3": "us-ga",
            "value": null,
            "code": 0.0881517928066839
        },
 {
            "code3": "us-id",
            "value": 9.73805084745763,
            "code": 0.000253633450230988
        },
 {
            "code3": "us-il",
            "value": null,
            "code": 0.634637976871082
        },
 {
            "code3": "us-in",
            "value": null,
            "code": 0.081833812867668
        },
 {
            "code3": "us-ia",
            "value": null,
            "code": 0.51623595188078
        },
 {
            "code3": "us-ks",
            "value": 4.58947457627119,
            "code": 0.0488884735242829
        },
 {
            "code3": "us-ky",
            "value": 5.83673728813559,
            "code": 0.0163127472248084
        },
 {
            "code3": "us-la",
            "value": null,
            "code": 0.090374963584501
        },
 {
            "code3": "us-me",
            "value": 6.19485593220339,
            "code": 0.000563303900907941
        },
 {
            "code3": "us-md",
            "value": 10.7140787037376,
            "code": 3.91086394524206E-06
        },
 {
            "code3": "us-ma",
            "value": 4.93474576271186,
            "code": 0.029237663205901
        },
 {
            "code3": "us-mi",
            "value": 6.97063559322033,
            "code": 0.000740440104186604
        },
 {
            "code3": "us-mn",
            "value": 6.13205084745762,
            "code": 0.0018670199449962
        },
 {
            "code3": "us-ms",
            "value": null,
            "code": 0.591129024958128
        },
 {
            "code3": "us-mo",
            "value": null,
            "code": 0.257306567307016
        },
 {
            "code3": "us-mt",
            "value": 8.63588983050847,
            "code": 0.000324876724879992
        },
 {
            "code3": "us-ne",
            "value": null,
            "code": 0.140484639341274
        },
 {
            "code3": "us-nv",
            "value": 14.3431045531887,
            "code": 0.00144801175017187
        },
 {
            "code3": "us-nh",
            "value": 10.4389152542373,
            "code": 9.50295686361695E-06
        },
 {
            "code3": "us-nj",
            "value": 6.52143220338983,
            "code": 0.00372388417081652
        },
 {
            "code3": "us-nm",
            "value": 5.18691525423729,
            "code": 0.00805559210002227
        },
 {
            "code3": "us-ny",
            "value": 5.93233898305085,
            "code": 0.00287696262728403
        },
 {
            "code3": "us-nc",
            "value": null,
            "code": 0.660509097464039
        },
 {
            "code3": "us-nd",
            "value": 16.065779661017,
            "code": 6.09461221237078E-11
        },
 {
            "code3": "us-oh",
            "value": 7.08922033898305,
            "code": 0.00170076067617628
        },
 {
            "code3": "us-ok",
            "value": null,
            "code": 0.177739810347294
        },
 {
            "code3": "us-or",
            "value": 9.27791525423729,
            "code": 0.000268929658141629
        },
 {
            "code3": "us-pa",
            "value": 13.258,
            "code": 4.3740945430629E-08
        },
 {
            "code3": "us-ri",
            "value": null,
            "code": 0.345915104386223
        },
 {
            "code3": "us-sc",
            "value": null,
            "code": 0.268268739055974
        },
 {
            "code3": "us-sd",
            "value": 6.3377372881356,
            "code": 0.00300209545799543
        },
 {
            "code3": "us-tn",
            "value": null,
            "code": 0.233855306747694
        },
 {
            "code3": "us-tx",
            "value": null,
            "code": 0.361955405031706
        },
 {
            "code3": "us-ut",
            "value": 13.5216779661017,
            "code": 1.30522786254156E-11
        },
 {
            "code3": "us-vt",
            "value": 8.61529661016949,
            "code": 0.000164066308277512
        },
 {
            "code3": "us-va",
            "value": 5.08922881355932,
            "code": 0.0322948085964361
        },
 {
            "code3": "us-wa",
            "value": 12.6905508474576,
            "code": 1.70853875006237E-06
        },
 {
            "code3": "us-wv",
            "value": null,
            "code": 0.0810495902319269
        },
 {
            "code3": "us-wi",
            "value": 4.16400847457627,
            "code": 0.0449386922753803
        },
 {
            "code3": "us-wy",
            "value": 12.3912729831845,
            "code": 0.000207264008115057
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
                            height: 400,
                            spacingLeft: 0,
                            spacingTop:100,
                            width:500,
                            zoomType: 'xy'
                        },
                        credits: {
                            enabled: false
                        },
                        title: {
                            text: 'Days Later Fall'
                        },
                        exporting: {
                            enabled: false
                        },
                        subtitle: {
                            text: null
                        },
                        xAxis: {
                            categories: years,
                            text: 'Year',
                            minTickInterval: 20
                        },
                        yAxis: {
                            title: 'Days Later Fall',
                            minTickInterval: 4
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
            title : {
                text: myTitle
            },

            credits: {
                enabled: false
            },
            subtitle: {
                text: 'Click on a state for a full record. Use the control button to select multiple states.'
            },

            mapNavigation: {
                enableButtons: true
            },

            legend: {
                title: {
                    text: 'Days Change of Fall Frost'
                },
             align: 'left',
            verticalAlign: 'middle',
            y: 150,
            floating: true
            },

            colorAxis: {
                min: -5,
                max: 20,
                stops: [
                    [0, '#26466D'],
                    [0.15, '#ffffff'],
                    [1, '#a4463a']
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
                enabled: false
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

                        if (this.point.code > 0.05 ) {
                    return '<div>'+this.point.name + '</div><span style="font-size: 10px">No statistically significant trend.</span></div>'
                } else {
                    return '<div>'+this.point.name + '</div><span style="font-size: 10px">'+this.point.value.toFixed(2) +' day change in the length of growing season. </span></div>'
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
        mapChart.get('us-al').select();
    });
};

var mapperOLSSpring = function(source, index, version, year, myTitle){
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
            "value": 3.48255084745763,
            "code": 0.191450829735747
        },
 {
            "code3": "us-az",
            "value": -26.7825338983051,
            "code": 1.87586320368211E-14
        },
 {
            "code3": "us-ar",
            "value": -3.44269491525424,
            "code": 0.184414586111775
        },
 {
            "code3": "us-ca",
            "value": -27.5037881355932,
            "code": 1.05001415645494E-09
        },
 {
            "code3": "us-co",
            "value": -6.35857627118644,
            "code": 0.00416443641614871
        },
 {
            "code3": "us-ct",
            "value": -11.836994095804,
            "code": 0.00274469184904408
        },
 {
            "code3": "us-fl",
            "value": -6.93998305084746,
            "code": 0.0805844055226613
        },
 {
            "code3": "us-ga",
            "value": 8.87272033898305,
            "code": 0.00332389677700297
        },
 {
            "code3": "us-id",
            "value": -11.6091779661017,
            "code": 0.000132437048665566
        },
 {
            "code3": "us-il",
            "value": -6.9201186440678,
            "code": 0.00202354938266607
        },
 {
            "code3": "us-in",
            "value": -8.04564406779661,
            "code": 0.000496892256348399
        },
 {
            "code3": "us-ia",
            "value": -7.53972033898305,
            "code": 0.0027231020001562
        },
 {
            "code3": "us-ks",
            "value": -9.64301694915254,
            "code": 6.75030814884769E-05
        },
 {
            "code3": "us-ky",
            "value": -4.21989830508475,
            "code": 0.0901065321630733
        },
 {
            "code3": "us-la",
            "value": -3.76821186440678,
            "code": 0.320881629510176
        },
 {
            "code3": "us-me",
            "value": -7.42137288135593,
            "code": 0.000341831504143465
        },
 {
            "code3": "us-md",
            "value": -8.611631744963,
            "code": 0.000753019776612622
        },
 {
            "code3": "us-ma",
            "value": -1.63983050847457,
            "code": 0.448067175861569
        },
 {
            "code3": "us-mi",
            "value": -5.90854237288135,
            "code": 0.00312766437905291
        },
 {
            "code3": "us-mn",
            "value": -11.9348220338983,
            "code": 1.33423505849693E-06
        },
 {
            "code3": "us-ms",
            "value": 1.85800847457627,
            "code": 0.498599719677806
        },
 {
            "code3": "us-mo",
            "value": -6.13484745762712,
            "code": 0.00767815123341809
        },
 {
            "code3": "us-mt",
            "value": -3.54783050847458,
            "code": 0.123539880556424
        },
 {
            "code3": "us-ne",
            "value": -5.32199152542373,
            "code": 0.0268332372342527
        },
 {
            "code3": "us-nv",
            "value": -17.9740886553859,
            "code": 0.00890299198533216
        },
 {
            "code3": "us-nh",
            "value": -5.91800847457627,
            "code": 0.0172346941302805
        },
 {
            "code3": "us-nj",
            "value": 1.75622881355932,
            "code": 0.460657930561012
        },
 {
            "code3": "us-nm",
            "value": -4.35872033898305,
            "code": 0.0863181900838395
        },
 {
            "code3": "us-ny",
            "value": -1.04427118644068,
            "code": 0.596532058474622
        },
 {
            "code3": "us-nc",
            "value": -2.24551694915254,
            "code": 0.337498486378542
        },
 {
            "code3": "us-nd",
            "value": -19.0956186440678,
            "code": 4.26393106996773E-12
        },
 {
            "code3": "us-oh",
            "value": -8.10279661016948,
            "code": 0.000684990077597952
        },
 {
            "code3": "us-ok",
            "value": -1.87504237288136,
            "code": 0.482069815291229
        },
 {
            "code3": "us-or",
            "value": -7.95033898305085,
            "code": 0.0054564294753505
        },
 {
            "code3": "us-pa",
            "value": -4.01329661016949,
            "code": 0.0788901485693067
        },
 {
            "code3": "us-ri",
            "value": 8.73143093130131,
            "code": 0.0199999259795032
        },
 {
            "code3": "us-sc",
            "value": 2.36755084745763,
            "code": 0.439676853320375
        },
 {
            "code3": "us-sd",
            "value": -11.1611271186441,
            "code": 1.51502633621926E-05
        },
 {
            "code3": "us-tn",
            "value": -0.355915254237289,
            "code": 0.875575632008189
        },
 {
            "code3": "us-tx",
            "value": -3.8848813559322,
            "code": 0.195069923607709
        },
 {
            "code3": "us-ut",
            "value": -16.807813559322,
            "code": 8.61574363771691E-10
        },
 {
            "code3": "us-vt",
            "value": -5.02008474576271,
            "code": 0.0673838607958065
        },
 {
            "code3": "us-va",
            "value": -2.27617796610169,
            "code": 0.36687156961231
        },
 {
            "code3": "us-wa",
            "value": -20.5425847457627,
            "code": 5.79180330140155E-11
        },
 {
            "code3": "us-wv",
            "value": 1.87174989030276,
            "code": 0.55471424797643
        },
 {
            "code3": "us-wi",
            "value": -9.43788983050848,
            "code": 0.000055132608294925
        },
 {
            "code3": "us-wy",
            "value": -18.7886903562931,
            "code": 6.57653009015706E-06
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
                            height: 400,
                            spacingLeft: 0,
                            spacingTop:100,
                            width:500,
                            zoomType: 'xy'
                        },
                        credits: {
                            enabled: false
                        },
                        title: {
                            text: 'Days Earlier Spring'
                        },
                        exporting: {
                            enabled: false
                        },
                        subtitle: {
                            text: null
                        },
                        xAxis: {
                            categories: years,
                            text: 'Year',
                            minTickInterval: 20
                        },
                        yAxis: {
                            title: 'Change in Length of Growing Season',
                            minTickInterval: 4
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
            title : {
                text: myTitle
            },

            credits: {
                enabled: false
            },
            subtitle: {
                text: 'Click on a state for a full record. Use the control button to select multiple states.'
            },

            mapNavigation: {
                enableButtons: true
            },

            legend: {
                title: {
                    text: 'Days Change of Spring Frost'
                },
             align: 'left',
            verticalAlign: 'middle',
            y: 150,
            floating: true
            },

            colorAxis: {
                min: -25,
                max: 10,
                stops: [
                    [0, '#a4463a'],
                    [0.7, '#ffffff'],
                    [1, '#26466D']
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
                enabled: false
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

                           if (this.point.code > 0.05 ) {
                    return '<div>'+this.point.name + '</div><span style="font-size: 10px">No statistically significant trend</span></div>'
                } else {
                    return '<div>'+this.point.name + '</div><span style="font-size: 10px">'+this.point.value.toFixed(2) +' day change in the length of growing season.</span></div>'
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
        mapChart.get('us-al').select();
    });
};


// var mapperSenLengthTest = function(source, index, version, year, myTitle){
//     $.get('data/' + source, function (data) {
//         //Split each line of the file
//         var lines = data.split('\n');

//         // Iterate over the lines and 
//         $.each(lines, function(lineNo,line) {
//             var items = line.split(',');

//             // header line contains categories
//             if (lineNo == 0) {
//                 $.each(items, function(itemNo, item) {
//                     if (itemNo > 0) options.xAxis.categories.push(item);
//                 });
//             }

//             // the rest of the lines contain data with their name in the first position
//             else {
//                 var series = {
//                     data: []
//                 };
//                 $.each(items, function(itemNo, item) {
//                     if (itemNo == 0) {
//                         series.name = item;
//                     } else {
//                         series.data.push(parseFloat(item));
//                     }
//                 });
//                 options.series.push(series);
//             }
//         });

//         // Create the chart

//         for( i=0; i < data.STATE.length; i++){
//             if(states.indexOf(data.STATE[i]) < 0){
//                 // var altColor = version == 'GROW' ? '#CFDCBA' : '#C2E0ED';
//                 // var color = cairStates.indexOf(data.STATE[i]) <0 ? '#FBF8EC' : altColor ;
//                 states.push(data.STATE[i]);
//                 series.push({
//                     name: data.STATE[i],
//                     code3: 'us-'+data.STATE[i].toLowerCase(),
//                     // color: color,
//                     // value: [ -6.752, 12.512, 48.384, 45.983, 13.937, 22.667, 15.436, -14.358, 9.064, 22.086, 7.689, 11.397, 13.968, 8.814, 13.958, 8.285, 18.181, 12.931, 13.255, 18.518, 8.041, -0.397, 12.574, 2.380, 35.211, 8.491, 17.993, 4.294, 9.246, 29.750, 6.426, 13.712, 5.767, 16.315, 15.583, -8.623, -6.062, 17.272, 1.879, 7.248, 31.535, 8.867, 14.280, 32.388, 14.140, 1.731, 29.750 ]
//                 });
//                 bigSeries[data.STATE[i]] = {
//                     name: data.STATE[i],
//                     code3: 'us-'+data.STATE[i].toLowerCase(),
//                     data: []
//                 }
//             }

//         var chart = new Highcharts.Chart (options);

//         mapChart = $('#container'+index).highcharts('Map', {
