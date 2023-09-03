import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import ResponseCard from "../components/ResponseCard";
import InputPdfLink from "../components/InputPdfLink";
// import {} from "react-icons/fa";/
import { IoMdSend } from "react-icons/io";

export default function Home() {
  const [query, setquery] = useState("");
  const [result, setResult] = useState([]);
  const [pdfLink, setPdfLink] = useState("");

  console.log(pdfLink);
  //result is the response from the api and i want it to populate the response in the array and map over it to display it in the div

  const Content =
    result.length === 0 ? (
      <div className={styles.placeholder}>Start Something here</div>
    ) : (
      result.map((cur) => <ResponseCard response={cur} />)
    );

  async function onSubmit(event) {
    event.preventDefault();
    setResult((prevResult) => [...prevResult, { author: "USER", text: query }]);
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
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult((prevResult) => [
        ...prevResult,
        { author: "AI", text: data.result },
      ]);

      setquery("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className={styles.body}>
      <Head>
        <title>PDFY</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <div>
        <h1 className={styles.title}>Study Pal</h1>
      </div>

      <main className={styles.main}>
        <InputPdfLink setPdfLink={setPdfLink} />

        <div className={styles.chat}>
          <div className={styles.result}>{Content}</div>
          <form className={styles.chatinput} onSubmit={onSubmit}>
            <input
              type="text"
              name="animal"
              className={styles.inputElement}
              placeholder="Ask me about the document"
              value={query}
              onChange={(e) => setquery(e.target.value)}
            />
            <button className={styles.button}>
              <IoMdSend />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
