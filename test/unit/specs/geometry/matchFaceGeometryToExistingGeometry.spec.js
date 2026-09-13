import _ from 'lodash';
import { assertEqual } from '../../test_helpers';
import matchFaceGeometryToExistingGeometry from '../../../../src/store/modules/geometry/actions/matchFaceGeometryToExistingGeometry';

describe('matchFaceGeometryToExistingGeometry', () => {
  it('replaces stale vertex and edge ids with the ids stored in the geometry', () => {
    const geometry = {
      vertices: [
        { id: 'stored-a', x: 0, y: 0 },
        { id: 'stored-b', x: 5, y: 0 },
      ],
      edges: [{ id: 'stored-edge', v1: 'stored-a', v2: 'stored-b' }],
    };
    const faceGeometry = {
      vertices: [
        { id: 'stale-a', x: 0, y: 0 },
        { id: 'stale-b', x: 5, y: 0 },
      ],
      edges: [{ id: 'stale-edge', v1: 'stale-b', v2: 'stale-a' }],
    };

    const matched = matchFaceGeometryToExistingGeometry(faceGeometry, geometry, 1);

    assertEqual(_.map(matched.vertices, 'id'), ['stored-a', 'stored-b']);
    assertEqual(matched.edges, [{
      id: 'stored-edge',
      v1: 'stored-b',
      v2: 'stored-a',
      reverse: true,
    }]);
  });
});
