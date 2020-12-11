export const savePost = ({ id, title, content, author } = {}) => {
  // Create post if ID is undefined
  const route = id ? '/api/posts/update' : '/api/posts/create';
  // Simple POST request with a JSON body using fetch
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, title, content, author }),
  };
  return new Promise((res, rej) =>
    fetch(route, requestOptions)
      .then(async (response) => {
        const res = await response.json();
        if (!response.ok) throw new Error(res.message);
        return res;
      })
      .then((data) => res(data))
      .catch((e) => rej(e))
  );
};
