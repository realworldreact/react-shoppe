export default function makeFetch(uri, options) {
  return fetch(uri, options).then(res => {
    if (!res.ok) {
      return Promise.reject(new Error(res.statusText));
    }
    return res.json();
  });
}
