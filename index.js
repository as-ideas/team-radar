import * as d3 from "d3";
import {randomBates} from "d3-random";
import {scaleLinear} from "d3-scale";
import {axisBottom} from "d3-axis";

import jsonFile from "./data.json";

const createExperienceGraph = (selector) => {
    var values = d3.range(250).map(randomBates(10));

// A formatter for counts.
    var formatCount = d3.format(",.0f");
    var barWidth = 10;
    var margin = {top: 10, right: 30, bottom: 30, left: 30},
        width = 960 - margin.left - margin.right,
        height = 100 - margin.top - margin.bottom;

    var x = scaleLinear()
        .domain([0, 1])
        .range([0, width]);

    var xAxis = axisBottom()
        .scale(x);

    var svg = d3.select(selector).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var bar = svg.selectAll(".bar")
        .data(values)
        .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function(d) { return "translate(" + x(d) + ",0)"; });


    bar.append("rect")
        .attr("x", -barWidth/2)
        .attr("width", barWidth )
        .attr("height", 50)
        .style("opacity", 0.1)

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
}

createExperienceGraph("#vis-experience");