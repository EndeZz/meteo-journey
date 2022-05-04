export const fetchApi = async (url, options = {}) => {
  try {
    const fetchData = await fetch(url, options);

    if (!fetchData.ok) {
      const fetchRes = await fetchData.json();
      throw new Error(fetchRes.message);
    }

    const fetchRes = await fetchData.json();
    return fetchRes;
  } catch (error) {
    throw new Error(error.message);
  }
};
