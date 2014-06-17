function Node(name) { this.name=name; this.neighbors = [] }
Node.prototype.neigh = function(node) { this.neighbors.push(node) }
Node.prototype.dotNodeLine = function() { return '"' + this.name + '"' }
Node.prototype.dotLine = function() {
  var lines = []
  for (var i=0; i<this.neighbors.length; i++)
    lines.push(this.dotNodeLine() + '->' + this.neighbors[i].dotNodeLine())
  return lines.join('\n')
}

function Graph() { this.nodes = [] }
Graph.prototype.addNode = function(node) { this.nodes.push(node); return node }
Graph.prototype.createNode = function(name) { return this.addNode(new Node(name)) }
Graph.prototype.toDot = function() {
  var lines = ['digraph a{']
  for(var i=0; i<this.nodes.length; i++)
    lines.push(this.nodes[i].dotLine())
  lines.push('}')
  return lines.join("\n")
}
Graph.prototype.findByName = function(name) {
  for(var i=0; i<this.nodes; i++) if(this.nodes[i].name == name) return this.nodes[i]
}
Graph.prototype.createEdge = function(node1name, node2name) {
  var n1 = this.findByName(node1name) || this.createNode(node1name)
  var n2 = this.findByName(node2name) || this.createNode(node2name)
  n1.neighbors.push(n2)
}
Graph.fromHash = function(hash) { // expects a hash of arrays
  var node, g = new Graph()
  for(var nodename in hash)
    for (var i=0; i<hash[nodename].length; i++)
      g.createEdge(nodename, hash[nodename][i])
  return g
}
Graph.fromArray = function(arr) { // expects an array of array pairs
  var g = new Graph()
  for(var i=0; i<arr.length; i++) g.createEdge(arr[i][0], arr[i][1])
  return g
}
Graph.fromGrid = function(arr) { // expects an array of arrays in a grid pattern
  var g = new Graph()
  var name = function(x,y,name) { return x+','+y+' '+name }
  for(var i=0; i<arr.length; i++)
    for(var j=0; j<arr[i].length; j++) {
      if(i>0)               g.createEdge(name(j,i,arr[i][j]), name(j,i-1,arr[i-1][j]))
      if(i<arr.length-1)    g.createEdge(name(j,i,arr[i][j]), name(j,i+1,arr[i+1][j]))
      if(j>0)               g.createEdge(name(j,i,arr[i][j]), name(j-1,i,arr[i][j-1]))
      if(j<arr[i].length-1) g.createEdge(name(j,i,arr[i][j]), name(j+1,i,arr[i][j+1]))
    }
  return g
}
Graph.fromGridString = function(str) {
  var grid = str.split("\n")
  for(var i=0; i<grid.length; i++) grid[i] = grid[i].split('')
  return Graph.fromGrid(grid)
}


module.exports = Graph
