var svgCanvas;
var width = 1200;
var height = 800;
var myData;
var myData2;
var i = 8;
var years = 1991;
var x = 0;
var labelData;

var firstTotal = [];
var secondTotal = [];

var min;
var max;
var min2;
var max2;

d3.csv("GreenhouseGas.csv", function(myData) {
    d3.csv("forestAreas.csv", function(myData2) {

        //console.log(myData, "i'm Greenhouse Gases");
        //console.log(myData2, "i'm Scientific Journals");

        // //Find min and max value from data
        // for (var z = 0; z < 21; z++) {
        //     firstTotal.push(myData[i][z]);
        //     //secondTotal.push(myData2[i]["2011"]);
        //   }
        //
        // min = d3.min(firstTotal)
        // max = d3.max(firstTotal)
        // //min2 = d3.min(secondTotal)
        // //max2 = d3.max(secondTotal)
        //
        // // if (min < min2) {min = min
        // // } else {min = min2}
        // // if (max > max2) {max = max
        // // } else {max = max2}
        //
        // console.log(min)
        // console.log(max)

        rScale = d3.scaleLinear()
            .domain([-80, 220])
            .range([10, 460])

        svgCanvas = d3.select("#visualContainer")
            .append("svg")
            .attr("width", "100%")
            .attr("height", 600);
        svgCanvas.append("circle")
            .attr("class","forestMin")
            .attr("cx", width/2)
            .attr("cy", height/2)
            .attr("r", rScale(0))
            .attr("fill", "none")
            .attr("stroke", "black")
            // .attr("stroke", "dashed")
            .attr("opacity", 0.3);

            $(document).keydown(function(e) {
                // $(this).hide();
                if (e.which == 38) {
                    //console.log("hey up");
                    //console.log(e.which);
                    x++;
                    console.log(x);
                    if(x==20){
                        x=0;
                    }
                    drawCircles(myData, x, "circle1");
                    drawCircles(myData2, x, "circle2");
                    drawLabels(myData, x);
                }
                if (e.which == 40) {
                    //console.log("hey down");
                    //console.log(e.which);
                    x--;
                    if(x==-1){
                        x=19;
                    }
                    drawCircles(myData, x, "circle1");
                    drawCircles(myData2, x, "circle2");
                    drawLabels(myData, x);
                }
                if (e.which == 39) {
                    //console.log("hey up");
                    //console.log(e.which);
                    i++;
                    if(i==193){
                        i=0;
                    }
                    drawCircles(myData, x, "circle1");
                    drawCircles(myData2, x, "circle2");
                    drawLabels(myData, x);
                    // console.log(x);
                    // // if(x==20){
                    // //     x=0;
                    // // }
                    // drawCircles(myData, x, "circle1");
                    // drawCircles(myData2, x, "circle2");
                    // drawLabels(myData, x);
                }
                if (e.which == 37) {
                    //console.log("hey down");
                    //console.log(e.which);
                    i--;
                    if(i==-1){
                        i=192;
                    }
                    drawCircles(myData, x, "circle1");
                    drawCircles(myData2, x, "circle2");
                    drawLabels(myData, x);
                    // if(x==-1){
                    //     x=19;
                    // // }
                    // drawCircles(myData, x, "circle1");
                    // drawCircles(myData2, x, "circle2");
                    // drawLabels(myData, x);
                }
            });

        drawCircles(myData, x, "circle1");
        drawCircles(myData2, x, "circle2");
        drawLabels(myData, x);
    })
})




function drawCircles(myData, x, className) {

    var t = d3.transition().duration(500);
    //console.log(x)
    var limitedData = [{
        "countryName": myData[i]["Country Name"],
        "oneYear": myData[i][(years + x).toString()]
    }];

    var myCircles = svgCanvas.selectAll("circle." + className)
        .data(limitedData, function(d) {
            //console.log(d)
            return d
        });

    // myCircles.exit()
    // 	// .attr("class", "exit");

    myCircles
        .transition(t)
        .attr("r", function(d) {
            //console.log("i'm in your circle, updating your r")
            // console.log(d.oneYear)
            // return 10
            return rScale(d.oneYear)
        })

    myCircles.enter()
        .append("circle")
        .attr("cx", 380)
        .attr("cy", 380)
        .attr("class", "greenhousegas " + className)
        // .attr("stroke-width", 15)
        // .attr("fill", "none")
        .attr("r", function(d) {
            return rScale(d.oneYear)
        });
}

function drawLabels(myData, x) {
    var limitedData = [{
        "countryName": myData[i]["Country Name"],
        "oneYear": myData[i][(years + x).toString()]
    }];

    labelData = [{
        "Country Name": myData[i]["Country Name"]
    }]

    // console.log(years+x);

    var labels = svgCanvas.selectAll("textLabels")
        .data(labelData)

    // labels.select("#country")
    //       .text(myData[i]["Country Name"])

    d3.selectAll(".textLabel").remove();
    d3.selectAll(".yearLabel").remove();
    d3.selectAll(".percentLabel").remove();
    d3.selectAll(".smallLabel").remove();

    labels.enter()
        .append("text")
        .attr("class", "textLabel")
        .attr("id", "country")
        .attr("x", "50%")
        .attr("y", "47%")
        .text(myData[i]["Country Name"]);

    labels.enter()
        .append("text")
        .attr("class", "yearLabel")
        .attr("id", "year")
        .attr("x", "50%")
        .attr("y", "55%")
        .text(years + x);

    labels.enter()
        .append("text")
        .attr("class", "smallLabel")
        .attr("id", "year")
        .attr("x", "61.5%")
        .attr("y", "50%")
        .attr("opacity", 0.35)
        .text("1990");

}
