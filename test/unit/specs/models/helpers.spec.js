import { assertEqual, refute } from '../../test_helpers';
import helpers from '../../../../src/store/modules/models/helpers';

describe('model helpers', () => {
  it('updates cloned story component references to cloned geometry ids', () => {
    const idMap = {
      edge_1: 'edge_2',
      face_1: 'face_2',
      vertex_1: 'vertex_2',
    };
    const story = {
      doors: [{ id: 'door_1', edge_id: 'edge_1' }],
      windows: [{ id: 'window_1', edge_id: 'edge_1' }],
      spaces: [{
        id: 'space_1',
        name: 'Office',
        handle: 'old-handle',
        face_id: 'face_1',
        daylighting_controls: [{
          id: 'control_1',
          name: 'Control',
          vertex_id: 'vertex_1',
        }],
      }],
      shading: [],
    };

    const { clonedStory } = helpers.replaceIdsUpdateInfoForCloning(story, idMap);

    refute(clonedStory.doors[0].id === 'door_1');
    refute(clonedStory.windows[0].id === 'window_1');
    refute(clonedStory.spaces[0].id === 'space_1');
    assertEqual(clonedStory.doors[0].edge_id, 'edge_2');
    assertEqual(clonedStory.windows[0].edge_id, 'edge_2');
    assertEqual(clonedStory.spaces[0].face_id, 'face_2');
    assertEqual(clonedStory.spaces[0].handle, null);
    assertEqual(clonedStory.spaces[0].name, '');
    assertEqual(clonedStory.spaces[0].daylighting_controls[0].vertex_id, 'vertex_2');
    assertEqual(clonedStory.spaces[0].daylighting_controls[0].name, '');
  });
});
