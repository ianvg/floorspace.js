import _ from 'lodash';
import { distanceBetweenPoints } from './../helpers';

export default function matchFaceGeometryToExistingGeometry({ vertices, edges }, geometry, spacing) {
  const replacementVertIds = _.chain(vertices)
    .map((vert) => {
      const existingVertex = _.find(
        geometry.vertices,
        candidate => distanceBetweenPoints(candidate, vert) < (spacing / 20),
      );
      if (!existingVertex || vert.id === existingVertex.id) return null;
      return [vert.id, existingVertex.id];
    })
    .compact()
    .fromPairs()
    .value();

  const matchedVertices = vertices.map(vertex => ({
    ...vertex,
    id: replacementVertIds[vertex.id] || vertex.id,
  }));
  const matchedEdges = edges.map((edge) => {
    const matchedEdge = {
      ...edge,
      v1: replacementVertIds[edge.v1] || edge.v1,
      v2: replacementVertIds[edge.v2] || edge.v2,
    };
    const existingEdge = geometry.edges.find(candidate => (
      candidate.v1 === matchedEdge.v1 && candidate.v2 === matchedEdge.v2
    )) || geometry.edges.find(candidate => (
      candidate.v2 === matchedEdge.v1 && candidate.v1 === matchedEdge.v2
    ));

    if (existingEdge && matchedEdge.id !== existingEdge.id) {
      matchedEdge.id = existingEdge.id;
      matchedEdge.reverse = existingEdge.v1 !== matchedEdge.v1;
    }
    return matchedEdge;
  });

  return { vertices: matchedVertices, edges: matchedEdges };
}
