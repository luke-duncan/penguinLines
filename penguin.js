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
                       {console.log("worked", penguin);},
                          function(err)
                        {console.log("failed",err);})

var makeGraph = function(target, penguins)
    {
        var screen = {width:500, height:400};
        var margins ={top:15,bottom:40,left:70, right:40}
        var graph = {
            width: screen.width-margins.left-margins.right,
            height:screen.height-margins.top-margins.bottom,}
        
        d3.select(target)
            .attr("width",screen.width)
            .attr("height",screen.height)
        
        var g = d3.select(target)
            .append("g")
            .classed("graph",true)
            .attr("transform","translate")
        }
    
                       
                       