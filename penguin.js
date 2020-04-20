console.log("hi")


var sortbyProperty = function(property)
    {
        return function(a,b)
        {
            if(a[property] == b[property])
                {return 0}
            else if (a[property] < b[property])
                {return 1}
            else
                {return -1}
        }
    }

var penguinPromise = d3.json("classData.json")
    penguinPromise.then(function(penguin)
        {
            console.log("worked", penguin);
        var getSVG=
            d3.select("#quizGrade")
        makeGraph(penguin,getSVG)
        
    
    },

        function(err)
            {console.log("failed",err);})  
                
    

var createLabels = function(screen,margins,graph,target)
{
    console.log("hi")
    var labels= 
        target.append("g")
        .classed("labels",true)
    
    labels.append("text")
        .text("Quiz Grades by Day")
        .classed("title",true)
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graph.width/2))
        .attr("y",margins.top)
    
    labels.append("text")
        .text("Day")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graph.width/2))
        .attr("y",screen.height)
    
    labels.append("g")
        .attr("transform","translate(20, "+(margins.top+(graph.height/2))+")")
        .append("text")
        .text("Quiz Grade")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("transform","rotate(90)")
    
    
}

var createAxes = function(screen,margins,graph,target,xScale,yScale)
{
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    
    var axes = 
        target.append("g")
    axes.append("g")
        .attr("transform","translate("+margins.left+","+(margins.top+graph.height)+")")
        .call(xAxis)
    axes.append("g")
        .attr("transform","translate("+margins.left+","+(margins.top)+")")
        .call(yAxis)
}


var drawLines = function(penguins,graph,target,xScale,yScale,gradeScale)
{
    var lineGenerator = d3.line()
        .x(function(quiz,i) { return xScale(i);})
        .y(function(quiz)   { return yScale(quiz.grade);})
    
    var lines = 
        target.select(".graph")
        .selectAll("g")
        .data(penguins)
        .enter()
        .append("g")
        .classed("line",true)
        .attr("fill","none")
        .attr("stroke",function(penguin) 
        { 
            return gradeScale(penguin.quiz);
        })
    
    .attr("stroke-width",2.5)
    .on("mouseover",function(penguin)
    { 
        if(! d3.select(this).classed("off"))

    d3.selectAll(".line").classed("fade",true);
    d3.select(this)
    .classed("fade",false)
    .raise();
    
    var xPosition = d3.event.pageX;
	        var yPosition = d3.event.pageY;
	            d3.select("#tooltip")
	                .style("right", xPosition + "px")
	                .style("top", yPosition+ "px")
	                .select("img")
	                .attr("src", "imgs/" + penguin.picture)
	                
	        
	        d3.select("#tooltip").classed("hidden",false)
})
    .on("mouseout",function(penguin)
    {
        if(! d3.select(this).classed("off"))
    {
        d3.selectAll(".line")
        .classed("fade",false)
        
              d3.select("#tooltip").classed("hidden",true)
    }
        })

    
    lines.append("path")
        .datum(function(penguin) 
            { return penguin.quizes;})
        .attr("d",lineGenerator); 

    
}
     


var makeGraph = function(penguin, target)
    {
        var screen = {width:500, height:400};
        var margins ={top:15,bottom:40,left:70, right:40}
        var graph = {
            width: screen.width-margins.left-margins.right,
            height:screen.height-margins.top-margins.bottom
        }
        
        
            target.attr("width",screen.width)
            target.attr("height",screen.height)
        
        var g = 
            target.append("g")
            .classed("graph",true)
            .attr("transform","translate("+margins.left+","+margins.top+")")
        
        
        var xScale = d3.scaleLinear()
            .domain([0,penguin[0].quizes.length-1])
            .range([0,graph.width])
        
        var highGrade = 10
        
        var yScale = d3.scaleLinear()
            .domain([0,highGrade])
            .range([graph.height,0])
        
        var gradeScale = d3.scaleOrdinal(d3.schemeCategory10)
        
        createLabels(screen,margins,graph,target)
        createAxes(screen,margins,graph,target,xScale,yScale)
        drawLines(penguin,graph,target,xScale,yScale,gradeScale)
 }
    

              
                       