var circleStart = 100;
var row = 33;

d3.csv("greenhousegas.csv", function(myData) {

    var limitedData = [{
        "Country Name": myData[row]["Country Name"],
        "1991": myData[row]["1991"],
        "2011": myData[row]["2011"],
    }];
    var countryName = myData[row]["Country Name"];
    var currentYear = myData[row]["2011"];

    console.log(myData);
    console.log(countryName);
    console.log(currentYear);

    svgCanvas = d3.select("#visualContainer")
        .append("svg")
        .attr("width", "100%")
        .attr("height", 600);

    var text = svgCanvas.selectAll("countryName")
        .data(limitedData)
        .enter()
        .append("text")
        .attr("class", "textLabel")
        .attr("x", "50%")
        .attr("y", 100)
        .text(countryName)

    var myCircles = svgCanvas.selectAll("ge1990")
        .data(limitedData)
        .enter()
        .append("circle")
        .attr("class", "dataCircle")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("fill", "none")
        .attr("r", function(d) {
            return ((d["1991"] * 2) + circleStart)
        })

    var myCirclesTwo = svgCanvas.selectAll("ge2011")
        .data(limitedData)
        .enter()
        .append("circle")
        .attr("class", "dataCircle")
        .attr("stroke", "black")
        .attr("opacity", "0.1")
        .attr("fill", "black")
        .attr("r", function(d) {
            return ((d["2011"] * 2) + circleStart)
        })

    


}) //Closes the whole thing
