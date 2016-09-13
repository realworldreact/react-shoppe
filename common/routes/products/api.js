import makeFetch from '../../utils/make-fetch';

const api = '/api/products';
export function fetchProducts() {
  return makeFetch(api);
}
