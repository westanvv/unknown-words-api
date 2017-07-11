export default {
  stripTags,
  matchAll,
  filterParams,
  updateParams,
};

function stripTags(text) {
  return text.replace(/<[^>]+>/g, '');
}

function matchAll(regex, text) {
  if (regex.constructor !== RegExp) {
    throw new Error('No RegExp');
  }

  let res = [];
  let match = null;

  if (regex.global) {
    while (match = regex.exec(text)) {
      res.push(match[1]);
    }
  } else {
    if (match = regex.exec(text)) {
      res.push(match[1]);
    }
  }

  return res;
}

function filterParams(params, whitelist) {
  const filtered = {};
  for (const key in params) {
    if (whitelist.indexOf(key) > -1) {
      filtered[key] = params[key];
    }
  }
  return filtered;
}

function updateParams(obj, params) {
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      obj[key] = params[key];
    }
  }
  return obj;
}
