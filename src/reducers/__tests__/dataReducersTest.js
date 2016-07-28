import test from 'ava';
import Immutable from 'immutable';

import * as reducers from '../dataReducers';
import constants from '../../constants';

test('sets data', test => {
  const reducedState = reducers.GRIDDLE_LOADED_DATA(new Immutable.Map(),
    { type: 'GRIDDLE_LOADED_DATA', data: [
      {name: "one"},
      {name: "two"}
    ]}
  );

  test.deepEqual(reducedState.toJSON(), { data:
    [
      {name: "one"},
      {name: "two"}
    ]}
  )
})