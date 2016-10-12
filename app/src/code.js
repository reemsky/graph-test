$(function(){ // on dom ready

$('#cy').cytoscape({
  layout: {
    name: 'cose',
    padding: 10,
    randomize: true
  },
  
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
      { data: { source: 's', target: 'g', faveColor: '#86B342', strength: 100, label: 'total = 100' } },
      
      { data: { source: 'g', target: 'j', faveColor: '#F5A45D', strength: 90 } }
    ]
  },
  
  ready: function(){
    window.cy = this;
    
    // giddy up
  }
});

}); // on dom ready

function update(){
  var eles = cy.add([
  { group: "nodes", data: { id: "n0", name: "John", faveColor: '#6FB1FC', faveShape: 'ellipse', weight: 100}},
  { group: "nodes", data: { id: "n1", name: "Jim", faveColor: '#6FB1FC', faveShape: 'ellipse', weight: 75}},
  { group: "nodes", data: { id: "n2", name: "William", faveColor: '#6FB1FC', faveShape: 'ellipse', weight: 70}},
  { group: "nodes", data: { id: "n3", name: "George", faveColor: '#6FB1FC', faveShape: 'ellipse', weight: 55}},
  { group: "nodes", data: { id: "n4", name: "Mary", faveColor: '#6FB1FC', faveShape: 'ellipse', weight: 75}},
  { group: "edges", data: { id: "e0", source: "n3", target: "n4", faveColor: '#EDA1ED', label: "sum=500", strength: 100} },
  { group: "edges", data: { id: "e1", source: "n2", target: "n3", faveColor: '#F5A45D', strength: 100} },
  { group: "edges", data: { id: "e2", source: "n1", target: "n3", faveColor: '#EDA1ED', strength: 50} },
  { group: "edges", data: { id: "e3", source: "n0", target: "n3", faveColor: '#86B342', strength: 90} },
  { group: "edges", data: { id: "e4", source: "n0", target: "n1", faveColor: '#86B342', strength: 85} }

]);


  cy.layout( { name: 'random'});
  //cy.fit();
}


function del(){
  var j = cy.$("*");
  cy.remove( j );
}