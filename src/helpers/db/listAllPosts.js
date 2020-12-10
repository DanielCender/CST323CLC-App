export const listAllPosts = () => {
  // Simple POST request with a JSON body using fetch
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  return new Promise((res, rej) =>
    fetch('/api/posts', requestOptions)
      .then(async (response) => {
        const res = await response.json();
        if (!response.ok) throw new Error(res.message);
        return res;
      })
      .then((data) => res(data))
      .catch((e) => rej(e))
  );
};
