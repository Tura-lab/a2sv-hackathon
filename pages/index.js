import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import ResponseCard from "../components/ResponseCard";
import InputPdfLink from "../components/InputPdfLink";





export default function Home() {
  const [query, setquery] = useState("");
  const [result, setResult] = useState([]);
  const [pdfLink, setPdfLink] = useState("");

  console.log(pdfLink)
  //result is the response from the api and i want it to populate the response in the array and map over it to display it in the div


  const Content = result.length === 0
    ? 'start chat'
    : result.map(cur => <ResponseCard response={cur} />);





  async function onSubmit(event) {
    event.preventDefault();
    setResult(prevResult => [
      ...prevResult,
      { author: 'USER', text: query },
    ]);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: query, pdfLink: pdfLink }),
      });

      const data = await response.json();

      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(prevResult => [
        ...prevResult,
        { author: 'AI', text: data.result },
      ]);

      setquery("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>PDFY</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <InputPdfLink setPdfLink={setPdfLink} />

        <img src="/dog.png" className={styles.icon} />
        <h3>let's learn</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="ask me about the document"
            value={query}
            onChange={(e) => setquery(e.target.value)}
          />
          <button className={styles.button}>GO</button>
        </form>
        <div className={styles.result}>{Content}</div>
      </main>
    </div>
  );
}
