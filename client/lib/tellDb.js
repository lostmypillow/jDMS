import axios from "axios";
export async function tellDb(type, dataOrId) {
  //save the response to vue store
  let response;
  let data;
  if (type == "import") {
    response = await axios.post("http://localhost:3002/update", {
      link: dataOrId,
    });
    data = await response.data;
    console.log(`${data}`);
  } else if (type == "sync") {
    response = await axios.get("http://localhost:3002/get");
    data = await response.data;
  } else {
    response = await axios.get("http://localhost:3002/get?id=" + dataOrId);
    data = await response.data;
  }

  return await data;
}
