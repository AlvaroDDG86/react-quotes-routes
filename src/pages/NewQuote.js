import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

const NewQuote = () => {
  const { sendRequest, status, error } = useHttp(addQuote);
  const [isLoading, setIsloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  useEffect(() => {
    if (!status) {
      return;
    }
    if (status === "completed") {
      setIsloading(false);
      if (error) {
        setErrorMessage(error);
      } else {
        history.push(`/quotes`);
      }
    } else {
      setIsloading(true);
    }
  }, [status, history, error, isLoading]);
  const addQuoteHandler = (quote) => {
    sendRequest(quote);
  };

  if (errorMessage) {
    return (
      <>
        <main className="centered">
          <h1>{errorMessage}</h1>
        </main>
        <Link className="btn--flat" to="/">Go Quotes</Link>
      </>
    );
  }

  return <QuoteForm onAddQuote={addQuoteHandler} isLoading={isLoading} />;
};

export default NewQuote;
