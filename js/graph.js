
var w = 1000;
var h = 600;
var linkDistance=400;

const boxWidth = 110;
const boxHeight = 80;

var svg = d3.select("body").append("svg").attr({"width":w,"height":h})
.call(d3.behavior.zoom().on("zoom", function () {
  svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
})).append("g");


let nodeData = dataset.nodes.slice(0);
let edgeData = [];

dataset.edges.forEach( edge => {
  let target = nodeData.findIndex(function(el) {
    return el.name == edge.target;
  });
  if(target == -1) console.log(edge.target + " not found.");

  let source = nodeData.findIndex(function(el) {
    return el.name == edge.source;
  });
  if(source == -1) console.log(edge.source + " not found.");
 
  if(edge.label) {
    let i = nodeData.length;
    nodeData[i] = {text: edge.label, isLabel: true};
  
    if(source != -1) {
      edgeData[edgeData.length] = {source:source, target:i};
    }
  
    if(target != -1) {
      edgeData[edgeData.length] = {source:i, target:target};
    }
  } else if (source != -1 && target != -1) {
    edgeData[edgeData.length] = {source:source, target:target};
  }
});

console.log(nodeData, edgeData);

var force = d3.layout.force()
    .nodes(nodeData)
    .links(edgeData)
    .size([w,h])
    .linkDistance([linkDistance])
    .charge([-2000])
    .theta(0.1)
    .gravity(0.05)
    .start();

var edges = svg.selectAll("line")
  .data(edgeData)
  .enter()
  .append("line")
  .attr("id",function(d,i) {return 'edge'+i})
  .attr('marker-end','url(#arrowhead)')
  .style("stroke","#ccc")
  .style("pointer-events", "none");

var nodes = svg.selectAll("rect")
  .data(nodeData)
  .enter()
  .append("rect")
  .attr({"width":boxWidth, "height":(d)=>{return d.isLabel?boxHeight/3:boxHeight}})
  .style("fill",function(d){
    if(d.startNode) return "AAFFAA";
    if(d.isLabel) return "lightgrey";
    if(d.isEnd) return "FFAAAA";
    return "grey";
  })
  .call(force.drag)

var nodelabels = svg.selectAll(".nodelabel") 
    .data(nodeData).enter()
    .append("foreignObject")
    .attr({"x":function(d){return d.x - boxWidth/2;},
          "y":function(d){return d.y - boxHeight/2;},
          "width":boxWidth,
          "height":boxHeight})
    .text(function(d){return d.text;})
    .on("click", function(d){ speak(d.text) });

var edgepaths = svg.selectAll(".edgepath")
    .data(edgeData)
    .enter()
    .append('path')
    .attr({'d': function(d) {return 'M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y},
            'class':'edgepath',
            'fill-opacity':0,
            'stroke-opacity':0,
            'fill':'blue',
            'stroke':'red',
            'id':function(d,i) {return 'edgepath'+i}})
    .style("pointer-events", "none");

var edgelabels = svg.selectAll(".edgelabel")
    .data(edgeData)
    .enter()
    .append('text')
    .style("pointer-events", "none")
    .attr({'class':'edgelabel',
            'id':function(d,i){return 'edgelabel'+i},
            'dx':80,
            'dy':0,
            'font-size':12,
            'fill':'#555'});

edgelabels.append('textPath')
    .attr('xlink:href',function(d,i) {return '#edgepath'+i})
    .style("pointer-events", "none")
    .text(function(d,i){return d.label});


svg.append('defs').append('marker')
    .attr({'id':'arrowhead',
            'viewBox':'-0 -5 10 10',
            'refX':70,
            'refY':0,
            'orient':'auto',
            'markerWidth':10,
            'markerHeight':10,
            'xoverflow':'visible'})
    .append('svg:path')
        .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
        .attr('fill', '#ccc')
        .attr('stroke','#ccc');
  

force.on("tick", function(){

  nodes.attr({"x":function(d){return d.x-boxWidth/2;},
              "y":function(d){return d.y-boxHeight/2;} });
  nodelabels.attr("x", function(d) { return d.x  - boxWidth/2; }) 
            .attr("y", function(d) { return d.y  - boxHeight/2; });

    edges.attr({"x1": function(d){return d.source.x;},
                "y1": function(d){return d.source.y;},
                "x2": function(d){return d.target.x;},
                "y2": function(d){return d.target.y;}
    });

    edgepaths.attr('d', function(d) { var path='M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y;
                                        //console.log(d)
                                        return path});       

    edgelabels.attr('transform',function(d,i){
        if (d.target.x<d.source.x){
            bbox = this.getBBox();
            rx = bbox.x+bbox.width/2;
            ry = bbox.y+bbox.height/2;
            return 'rotate(180 '+rx+' '+ry+')';
            }
        else {
            return 'rotate(0)';
            }
    });
});


