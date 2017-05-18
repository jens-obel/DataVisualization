var circleStart = 100;

d3.csv("greenhousegas.csv", function(myData) {

  console.log(myData);

  var limitedData = [{ "Country Name":myData[1]["Country Name"], "1991":myData[1]["1991"], "2011":myData[1]["2011"], }];

  var twotwelve = myData[1]["2011"];
  console.log(twotwelve)

  svgCanvas = d3.select("#visualContainer")
    .append("svg")
    .attr("width", "100%")
    .attr("height", 600);

  // var oneCircle = svgCanvas.append("circle")
  //   .attr("cx", 380)
  //   .attr("cy", 280)
  //   .attr("r", 200)
  //   .attr("stroke", "gray", 20)
  //   .attr("stroke-width", 15)
  //   .attr("fill", "none");
  //
  // var twoCircle = svgCanvas.append("circle")
  //   .attr("cx", 380)
  //   .attr("cy", 280)
  //   .attr("r", 100)
  //   .attr("fill", "pink");

  var myCircles = svgCanvas.selectAll("circle")
    .data(myData)
    .enter()
      .append("circle")
        .attr("class", "dataCircle")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("fill", "none")
        .attr("r", function(d){
          return ((d["1991"]*10) + circleStart)
        })

}) //Closes the whole thing
