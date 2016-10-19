var layoutOptions = {
   name: 'cose',
   padding: 10,
   randomize: true
};

$(function(){ // on dom ready

$('#cy').cytoscape({
  layout: layoutOptions,
  
  style: cytoscape.stylesheet()
    .selector('node')
      .css({
        'shape': 'data(faveShape)',
        'width': 'mapData(weight, 40, 80, 20, 60)',
        'content': 'data(name)',
        'text-valign': 'center',
        'text-outline-width': 2,
        'text-outline-color': 'data(faveColor)',
        'background-color': 'data(faveColor)',
        'color': '#fff'
      })
    .selector(':selected')
      .css({
        'border-width': 3,
        'border-color': '#333'
      })
    .selector('edge')
      .css({
        'curve-style': 'bezier',
        'opacity': 0.666,
        'width': 'mapData(strength, 70, 100, 2, 6)',
        'target-arrow-shape': 'triangle',
        'source-arrow-shape': 'circle',
        'line-color': 'data(faveColor)',
        'source-arrow-color': 'data(faveColor)',
        'target-arrow-color': 'data(faveColor)',
        'label': 'data(label)'
      })
    .selector('edge.questionable')
      .css({
        'line-style': 'dotted',
        'target-arrow-shape': 'diamond'
      })
    .selector('.faded')
      .css({
        'opacity': 0.25,
        'text-opacity': 0
      }),
  
  elements: {
    nodes: [
      { data: { id: 'j', name: 'Vladimirs', weight: 100, faveColor: '#6FB1FC', faveShape: 'ellipse' } },
      { data: { id: 'e', name: 'Aleksandrs', weight: 75, faveColor: '#EDA1ED', faveShape: 'ellipse' } },
      { data: { id: 'k', name: 'Aleksejs', weight: 75, faveColor: '#86B342', faveShape: 'ellipse' } },
      { data: { id: 'g', name: 'Natalija', weight: 70, faveColor: '#F5A45D', faveShape: 'ellipse' } },
      { data: { id: 's', name: 'Sergejs', weight: 70, faveColor: '#F5A45D', faveShape: 'ellipse' } },
    ],
    edges: [
      { data: { source: 'j', target: 'e', faveColor: '#6FB1FC', strength: 90 } },
      { data: { source: 'j', target: 'k', faveColor: '#6FB1FC', strength: 70 } },
      { data: { source: 'j', target: 'g', faveColor: '#6FB1FC', strength: 80 } },
     
      { data: { source: 'e', target: 'j', faveColor: '#EDA1ED', strength: 95 } },
      { data: { source: 'e', target: 'k', faveColor: '#EDA1ED', strength: 60 }, classes: 'questionable' },
      
      { data: { source: 'k', target: 'j', faveColor: '#86B342', strength: 100 } },
      { data: { source: 'k', target: 'e', faveColor: '#86B342', strength: 100 } },
      { data: { source: 'k', target: 'g', faveColor: '#86B342', strength: 100 } },
      { data: { source: 's', target: 'g', faveColor: '#86B342', strength: 100, label: '300' } },
      
      { data: { source: 'g', target: 'j', faveColor: '#F5A45D', strength: 90 } }
    ]
  },
  
  ready: function(){
    window.cy = this; 
    // giddy up
  }
});

}); // on dom ready

function getRandomName(){
  var names = ['Aleksandrs', 'Sergejs', 'Jelena', 'Dmitrijs', 'Baiba', 'Guna', 'Dzintra', 'Aelita', 'Gatis', 'Janis', 'Peteris', 'Arturs'];
  names = ['Callie Bednarz',
'Krissy Haro',
'Vanessa Kettering',
'Sylvester Spearman',
'Luetta Koll',
'Jacinda Cassady',
'Elene Richeson',
'Nick Napier',
'Meta Remley',
'Danette Zayac',
'Miyoko Hajduk',
'Alta Leggett',
'Argentina Hauck',
'Maricruz Faulkner',
'Ardelle Mckey',
'Darline Smalling',
'Marti Merlos',
'Marilu Kurth',
'Milan Sester',
'Alayna Hazelrigg',
'Arlinda Callas',
'Hisako Finnerty',
'Shana Moffet',
'Kelley Choy',
'Twanda Vanantwerp',
'Gennie Brian',
'Emile Goley',
'Zena Dunklin',
'Shondra Woodall',
'Terresa Fuentes'];

  return names[Math.floor(Math.random()*names.length)];
}

function getRandomColor(){
  var colors = [ '#EDA1ED', '#F5A45D', '#86B342' ];
  return colors[Math.floor(Math.random()*colors.length)];
}

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len;
    }
    return result;
}


function getRandomNodes(count){
  var nodes = [];
  for (i = 0; i < count; i++) { 
    nodes[i] = { group: "nodes", data: { id: "n" + i, name: getRandomName(), faveColor: '#6FB1FC', faveShape: 'ellipse', weight: 100}};
  }

  return nodes;
}

function getRandomEdges(nodes){
  var nodesIDs = [];
  var count = 0;
  var result = [];
  var copy = [];
  var index = -1;
  var edges = [];
  var edge = {};
  var currentNode = '';
  var edgeID = 0;
  var edgeFactor = 2;
  for (i = 0; i < nodes.length; i++) {
    nodesIDs[i] = nodes[i].data.id;
  }
  console.log(nodesIDs);
  
  
  for (i = 0; i < nodesIDs.length; i++) {
    currentNode = nodesIDs[i];
    count = Math.floor(1 + Math.random()* edgeFactor);
    console.log("processing node:" + currentNode + " edges count " + count);
    
    copy = nodesIDs.slice();
    index = copy.indexOf(currentNode);
    if(index != -1){
      copy.splice( index, 1 );
    }
    result = getRandom(copy, count);
    console.log(result);
    for (z = 0; z < result.length; z++){
      console.log(currentNode + "->" + result[z]);
        edge = { group: "edges", data: { id: "e" + edgeID, source: currentNode, target: result[z], faveColor: getRandomColor(), label: getRandom([500, 300, 200, 100], 1), strength: 100} };
        edges[edgeID] = edge;
        edgeID ++;
    }
  }
  console.log (edges);

  return edges;
}

function getRandomGraph(count){
  var nodes = getRandomNodes(count);
  var edges = getRandomEdges(nodes);  
  return nodes.concat(edges);
}
  
function update(){
  var count = ($('#graph_nodes').val());
  var eles = cy.add(getRandomGraph(count));
  cy.layout(layoutOptions);
}

function del(){
  var j = cy.$("*");
  cy.remove( j );
}
function filter(){
  var filter = ($('#filter_value').val());  
  var eles = cy.edges("[label<" + filter + "]");
  cy.remove(eles);
  
  var allNodes = cy.nodes("*");
  var edges = cy.edges("*");
  var nodesWithEdges = edges.connectedNodes();
  var diffNodes = allNodes.difference(nodesWithEdges);
  cy.remove(diffNodes);
//  cy.layout(layoutOptions);
}

function loadJSONFile(){
  $.getJSON("data.json", function(json) {
    //console.log(json); // this will show the info it in firebug console
    var eles = cy.add(json);
    cy.layout(layoutOptions);
});
}
