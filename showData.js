function showData(data) {
    // Remove the old svg if it exists
    d3.select("#chart").select("svg").remove();

    // Set the dimensions and margins of the graph
    let margin = {top: 20, right: 20, bottom: 70, left: 40},
        width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    // Set the ranges
    let x = d3.scaleBand().range([0, width]).padding(0.1);
    let y = d3.scaleLinear().range([height, 0]);

    // Append the svg object to the div
    let svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Scale the range of the data in the domains
    x.domain(data.map(function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    // Append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.date); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); })
        .style("fill", "#3F51B5") // Use a Material Design color
        .style("filter", "url(#drop-shadow)") // Add a drop shadow
        .on("mouseover", function(d) { // Add interactivity
            d3.select(this).style("fill", "#303F9F"); // Darken the bar
            tooltip.style("visibility", "visible"); // Show the tooltip
            tooltip.text(dateTransform(d.date).getMonth() + ", " + dateTransform(d.date).getDay() + ": " + d.value + " " + d.unit); // Set the tooltip text
        })
        .on("mousemove", function() { // Move the tooltip with the mouse
            tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
        })
        .on("mouseout", function() { // Reset the bar and hide the tooltip
            d3.select(this).style("fill", "#3F51B5");
            tooltip.style("visibility", "hidden");
        });

    // Add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%d/%m"))); // Format the dates as DD/MM

    // Add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

    // Define the drop shadow filter
    let defs = svg.append("defs");
    let filter = defs.append("filter")
        .attr("id", "drop-shadow")
        .attr("height", "130%");
    filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 5)
        .attr("result", "blur");
    filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", 2)
        .attr("dy", 2)
        .attr("result", "offsetBlur");
    let feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode")
        .attr("in", "offsetBlur");
    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");

    // Define the tooltip
    let tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("background", "#FFFFFF")
        .style("border", "1px solid #DDDDDD")
        .style("border-radius", "5px")
        .style("padding", "5px")
        .style("box-shadow", "2px 2px 5px #BBBBBB");

    // Define the date format
    let formatDate = d3.timeFormat("%A %d %B");
}
