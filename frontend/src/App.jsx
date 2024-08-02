import { useState } from "react";
import axios from "axios";
function App() {
  // const [count, setCount] = useState(0);
  const [title, setTitle] = useState();
  const [convdate, setConvdate] = useState();
  const [testURL, setTestURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  function handleChange(e) {
    setTestURL(e.target.value);
  }

  async function apiCall() {
    try {
      setIsLoading(true);
      const encoded = encodeURIComponent(testURL);
      const response = await axios.get(
        "http://localhost:3000/test?url=" + encoded
      );
      console.log(response);
      const results = await response.data;
      setIsLoading(false);
      setTitle(results.Title);
      setConvdate(results.converted_date);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <p>yoooo</p>
      <input
        type="text"
        name=""
        id=""
        value={testURL}
        onChange={handleChange}
      />

      <button aria-busy={isLoading ? "true" : ""} onClick={apiCall}>
        Search
      </button>
      <h1>{title}</h1>
      <h2>{convdate}</h2>
    </>
  );
}

export default App;
