async function doRequest(url, method = "GET") {
  const response = await fetch(url, {
    method,
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  });
  const jsonData = await response.json();
  console.log(jsonData);
  return jsonData;
}

doRequest("http://localhost:2323/api/v1/products?page=1&page_size=10", "GET");
