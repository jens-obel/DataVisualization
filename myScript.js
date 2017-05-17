d3.csv("Greenhousegas.csv", function(myData) {

  console.log(myData);

  //var countryName = myData[1]["Country Name"];
  //var firstValue = myData[1]["1991"];

  //console.log(countryName);
  //console.log(firstValue);

  var limitedData = [{"Country Name":myData[1]["Country Name"], "1991":myData[1]["1991"]}];

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
          .attr("class", "greenhousegas")
          .attr("stroke", "gray", 20)
          .attr("stroke-width", 5)
          .attr("fill", "none")
          .attr("cx", "50%")
          .attr("cy", "50%")
          .attr("r", function(d){
            return 100+(d["1991"]*10)
          })
          
}) //Closes the whole thing
