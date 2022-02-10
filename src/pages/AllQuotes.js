import { useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: quotes,
    error: errorMessage,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <main className="centered">
        <h1>Loading...</h1>
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main className="centered">
        <h1>{errorMessage}</h1>
      </main>
    );
  }

  if (status === "completed" && (!quotes || quotes.length === 0)) {
    return (
      <main className="centered">
        <NoQuotesFound />
      </main>
    );
  }

  return <QuoteList quotes={quotes} />;
};

export default AllQuotes;
