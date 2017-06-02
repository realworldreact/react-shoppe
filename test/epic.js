import test from 'ava';
import { Observable } from 'rxjs';
import { ActionsObservable } from 'redux-observable';

import { fetchProductsEpic } from '../common/redux.js';

test('fetchProductsEpic no trigger', t => {
  const actions = ActionsObservable.of({
    type: 'FOO'
  });
  return fetchProductsEpic(actions, null, {})
    .toArray()
    .do(actions => {
      t.is(
        0,
        actions.length,
        'Epic responded to unknown action'
      );
    });
});

test('fetchProductsEpic trigger', t => {
  const actions = ActionsObservable.of({
    type: 'FETCH_PRODUCTS'
  });
  const expected = {};
  const fetcher = {
    read() {
      return {
        end() {
          return Observable.timer(500)
            .mapTo({ data: expected })
            .toPromise();
        }
      };
    }
  };
  return fetchProductsEpic(actions, null, { fetcher })
    .toArray()
    .do(actions => {
      const fetchProductsCompleteAction = actions[0];
      t.is(
        1,
        actions.length,
        'Epic responded to unknown action'
      );
      t.is(
        fetchProductsCompleteAction.type,
        'FETCH_PRODUCTS_COMPLETE'
      );
      t.is(
        fetchProductsCompleteAction.products,
        expected
      );
    });
});

test('fetchProductsEpic error', t => {
  const actions = ActionsObservable.of({
    type: 'FETCH_PRODUCTS'
  });
  const fetcher = {
    read() {
      return {
        end() {
          return Observable.throw(new Error('cats suck'))
            .toPromise();
        }
      };
    }
  };
  return fetchProductsEpic(actions, null, { fetcher })
    .toArray()
    .do(actions => {
      const fetchProductsCompleteAction = actions[0];
      t.is(
        1,
        actions.length,
        'Epic responded to unknown action'
      );
      t.is(
        fetchProductsCompleteAction.type,
        'FETCH_PRODUCTS_ERROR'
      );
      t.is(
        fetchProductsCompleteAction.error,
        true
      );
    });
});
