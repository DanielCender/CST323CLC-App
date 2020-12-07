const PROTECTED = ['Password'];

exports.stripProtectedFields = (obj = {}) => {
  return Object.entries(obj)
    .filter(([key, _]) => !PROTECTED.includes(key))
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
};
