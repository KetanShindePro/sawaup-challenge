export const postFetch = (url: string, options: {}, callBack: Function) => {
  const fetchResponse = fetch(url, options);
  fetchResponse.then(async (data) => {
    if (data.ok) {
      let resp = await data.json();
      callBack(resp);
      return resp;
    } else {
      return data.text().then((text) => {
        console.error(
          `Request Status: ${data.status} and error message is - ${text}`
        );
        throw new Error(text);
      });
    }
  });
};
