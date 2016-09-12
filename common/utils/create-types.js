export default function createTypes(types, ns) {
  if (!Array.isArray(types) || typeof ns !== 'string') {
    return {};
  }
  return types.reduce((types, type) => {
    types[type] = ns + '.' + type;
    return types;
  }, {});
}
