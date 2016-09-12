const api = '/api/users';

const defaultOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

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
  return fetch(api, options).then(res => res.json());
}

export function logIn(form) {
  const options = {
    ...defaultOptions,
    body: serializeForm(form)
  };
  return fetch(api + '/login', options).then(res => res.json());
}
