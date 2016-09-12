const api = '/api/users';

export function signUp(form) {
  const data = [].filter.call(form.elements, node => !!node.name)
    .reduce((data, node) => {
      data[node.name] = node.value;
      return data;
    }, {});

  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return fetch(api, options).then(res => res.json());
}
