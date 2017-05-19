var circleStart = 100;
var row = 22;
var limitedData;
var countryName;
var currentYear;
var myCircles;
var myCirclesTwo;
var text;
var rScale;

var firstTotal = [];
var secondTotal = [];

d3.csv("greenhousegas.csv", function(myData) {
    d3.csv("ScientificJournals-PercentFrom1991.csv", function(myData2) {
        //Find min and max value from data
        for (var i = 0; i < myData.length; i++) {
            firstTotal.push(myData[i]["1991"]);
            secondTotal.push(myData[i]["2011"]);
        }

        min = d3.min(firstTotal)
        max = d3.max(firstTotal)
        min2 = d3.min(secondTotal)
        max2 = d3.max(secondTotal)

        if (min < min2) {
            min = min
        } else {
            min = min2
        }
        if (max > max2) {
            max = max
        } else {
            max = max2
        }

        // rScale = d3.scaleLinear()
        //   .domain([min, max])
        //   .range([2, 200])

        //Data
        limitedData = [{
            "Country Name": myData[row]["Country Name"],
            "1991": myData[row]["1991"],
            "2011": myData[row]["2011"],
        }];

        countryName = myData[row]["Country Name"];
        currentYear = myData[row]["2011"];

        console.log(myData);
        console.log(countryName);
        console.log(currentYear);

        drawCircle();

        //Click event
        $(document).on("click", function(event) {
            row++;
            console.log("Row:" + row);
            changeData(row);
        });

        function changeData(row) {
            limitedData = [{
                "Country Name": myData[row]["Country Name"],
                "1991": myData[row]["1991"],
                "2011": myData[row]["2011"],
            }];
            countryName = myData[row]["Country Name"];
            currentYear = myData[row]["2011"];
            changeCircle();
        }

        function drawCircle() {
            var t = d3.transition().duration(500);
            svgCanvas = d3.select("#visualContainer")
                .append("svg")
                .attr("width", "100%")
                .attr("height", 600);

            text = svgCanvas.selectAll("countryName")
                .data(limitedData)
                .enter()
                .append("text")
                .attr("class", "textLabel")
                .attr("x", "50%")
                .attr("y", 100)
                .text(countryName)
                .exit()

            myCircles = svgCanvas.selectAll("ge1990")
                .data(limitedData)
                .enter()
                .append("circle")
                .attr("class", "ge1990")
                .attr("stroke", "black")
                .attr("stroke-width", 2)
                .attr("fill", "none")
                .attr("r", function(d) {
                    return ((d["1991"] * 2) + circleStart)
                })
                .exit()

            myCirclesTwo = svgCanvas.selectAll("ge2011")
                .data(limitedData)
                .enter()
                .append("circle")
                .attr("class", "ge2011")
                .attr("stroke", "black")
                .attr("opacity", "0.1")
                .attr("fill", "black")
                .attr("r", function(d) {
                    return ((d["2011"] * 2) + circleStart)
                })
                .exit()
        }

        function changeCircle() {
            // myCircles.transition()
            //   .attr("r",0)
            var t = d3.transition().duration(500);

            d3.selectAll(".textLabel").remove();
            d3.selectAll(".ge1990").remove();
            d3.selectAll(".ge2011").remove();
            // myCirclesTwo.remove();
            // text.remove();

            text = svgCanvas.selectAll("countryName")
                .data(limitedData)
                .enter()
                .append("text")
                .attr("class", "textLabel")
                .attr("x", "50%")
                .attr("y", 100)
                .text(countryName)

            myCircles = svgCanvas.selectAll("ge1990")
                .data(limitedData)
                .enter()
                .append("circle")
                .attr("class", "ge1990")
                .attr("stroke", "black")
                .attr("stroke-width", 2)
                .attr("fill", "none")
                .attr("r", function(d) {
                    return ((d["1991"] * 2) + circleStart)
                })

            myCirclesTwo = svgCanvas.selectAll("ge2011")
                .data(limitedData)
                .enter()
                .append("circle")
                .attr("class", "ge2011")
                .attr("stroke", "black")
                .attr("opacity", "0.1")
                .attr("fill", "black")
                .attr("r", function(d) {
                    return ((d["2011"] * 2) + circleStart)
                })
        }
    })
}) //Closes data function
