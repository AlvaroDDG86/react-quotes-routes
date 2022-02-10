import { Fragment, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { useParams, Route, Link } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

const QuoteDetail = () => {
const { quoteId } = useParams();
  const {
    sendRequest,
    data: quote,
    error: errorMessage,
    status,
  } = useHttp(getSingleQuote, true);
  useEffect(() => {
    sendRequest(quoteId)
  }, [sendRequest, quoteId])
  const routeMatch = useRouteMatch();

  if (status === 'pending') {
    return (
      <main className="centered">
        <LoadingSpinner />
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
  if (!quote.text) {
    return (
      <main className="centered">
        <h1>Quote not found</h1>
      </main>
    );
  }

  return (
    <Fragment>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Route path={`${routeMatch.path}`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${routeMatch.url}/comments`}>
            Show comments
          </Link>
        </div>
      </Route>
      <Route path={`${routeMatch.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
