import { Observable } from 'rxjs';
import test from 'ava';
import { ActionsObservable } from 'redux-observable';

import { fetchProductsEpic } from '../common/redux.js';

test('no output', t => {
  const actions = ActionsObservable.of({
    type: 'FOO'
  });
  return fetchProductsEpic(actions, null, { fetcher: null })
    .toArray()
    .do(actions => {
      t.is(
        actions.length,
        0
      );
    });
});
test('respond to fetch', t => {
  const actions = ActionsObservable.of({
    type: 'FETCH_PRODUCTS'
  });
  const expectedPayload = [];
  const fetcher = {
    read: () => ({
      end: () => Observable.timer(500)
        .map(() => ({
          data: expectedPayload
        }))
        .toPromise()
    })
  };
  return fetchProductsEpic(actions, null, { fetcher })
    .toArray()
    .do(actions => {
      t.is(
        actions[0].products,
        expectedPayload
      );
      t.is(
        actions[0].type,
        'FETCH_PRODUCTS_COMPLETE'
      );
      t.is(
        actions.length,
        1
      );
    });
});

test('respond to fetch error', t => {
  const actions = ActionsObservable.of({
    type: 'FETCH_PRODUCTS'
  });
  const expectedPayload = new Error('foo');
  const fetcher = {
    read: () => ({
      end: () => Observable.timer(500)
        .do(() => { throw expectedPayload; })
        .toPromise()
    })
  };
  return fetchProductsEpic(actions, null, { fetcher })
    .toArray()
    .do(actions => {
      t.is(
        actions[0].err,
        expectedPayload
      );
      t.is(
        actions[0].type,
        'FETCH_PRODUCTS_ERROR'
      );
      t.is(
        actions.length,
        1
      );
    });
});
