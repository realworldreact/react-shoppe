const api = '/api/users';

const defaultOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

export function makeFetch(uri, options) {
  return fetch(uri, options).then(res => {
    if (!res.ok) {
      return Promise.reject(new Error(res.statusText));
    }
    return res.json();
  });
}
export function serializeForm(form) {
  const data = [].filter.call(form.elements, node => !!node.name)
    .reduce((data, node) => {
      data[node.name] = node.value;
      return data;
    }, {});

  return JSON.stringify(data);
}

export function signUp(form) {
  const options = {
    ...defaultOptions,
    body: serializeForm(form)
  };
  return makeFetch(api, options);
}

export function logIn(form) {
  const options = {
    ...defaultOptions,
    body: serializeForm(form)
  };
  return makeFetch(api + '/login?include=user', options)
    // normalize loopbacks response
    .then(res => ({
      ...res.user,
      accessToken: res.id
    }));
}
