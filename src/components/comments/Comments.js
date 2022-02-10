import { useEffect, useState, useCallback } from "react";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import CommentList from './CommentsList'
import { useParams } from "react-router-dom";

const Comments = () => {
  const [ isAddingComment, setIsAddingComment ] = useState(false);
  const { quoteId } = useParams()
  const {
    sendRequest,
    status,
    error: errorMessage,
    data: loadedComments,
  } = useHttp(getAllComments, true);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId])

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  let comments
  if (status === "pending") {
    comments = (
      <main className="centered">
        <p>Loading comments...</p>
      </main>
    );
  }

  if (status === 'completed' && loadedComments.length === 0) {
    comments = (
      <main className="centered">
        <p>No comments yet</p>
      </main>
    );
  }

  if (status === 'completed' && loadedComments.length > 0) {
    comments = <CommentList comments={loadedComments} />
  }

  if (errorMessage) {
   comments =  (
      <main className="centered">
        <h1>{errorMessage}</h1>
      </main>
    );
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm onAddedComment={addedCommentHandler} quoteId={quoteId} />}
      { comments }
    </section>
  );
};

export default Comments;
