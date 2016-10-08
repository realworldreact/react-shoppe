export default function serializeForm(form) {
  const data = [].filter.call(form.elements, node => !!node.name)
    .reduce((data, node) => {
      data[node.name] = node.value;
      return data;
    }, {});

  return JSON.stringify(data);
}
