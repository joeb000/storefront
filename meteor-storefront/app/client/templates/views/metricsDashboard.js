/**
Template Controllers

@module Templates
*/

/**
The view3 template

@class [template] views_view3
@constructor
*/

Template['views_metrics'].onCreated(function() {
	  Meta.setSuffix(TAPi18n.__("Metrics Dashboard"));
});


function updateChart() {
    $('#myChart').replaceWith('<canvas class="chart" id="myChart"></canvas>');
    var data = new dataForChart();
    new drowChart(data);
};
