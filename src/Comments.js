import React, { useState } from "react";
import Replies from "./Replies";

const Comments = ({
  comment,
  currentUser,
  onCommentEditHandler,
  onCommentDeleteHandler,
}) => {
  const [contentValue, setContentValue] = useState(`@${comment.user.username}`);
  const [replies, setReplies] = useState(comment.replies);
  const [showReply, setShowReply] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditId, setIsEditId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [btnUpDisabled, setBtnUpDisabled] = useState(false);
  const [btnDownDisabled, setBtnDownDisabled] = useState(false);
  let [score, setScore] = useState(comment.score);

  const onClickReplyHandler = (id) => {
    setShowReply(true);
  };

  const onClickSendHandler = (id, commentSelected) => {
    //remove the showreply false
    let newReply = {
      id: new Date().getTime().toString(),
      content: `${contentValue}`,
      createdAt: new Date().toISOString(),
      score: 2,
      replyingTo: `${commentSelected.user.username}`,
      user: {
        image: {
          png: `${currentUser.image.png}`,
        },
        username: `${currentUser.username}`,
      },
    };
    if (!contentValue) {
      return;
    }

    if (!isEditing) {
      //Add it to the reply of corresponding comment to the replies array
      setReplies([...commentSelected.replies, newReply]);
      setShowReply(false);
      setIsEditing(false);
    }
    if (isEditing) {
      setShowReply(true);
      setIsEditing(true);
      setReplies(
        replies.map((item) => {
          if (item.id === isEditId) {
            return { ...item, content: contentValue };
          }
          return item;
        })
      );
      setShowReply(false);
      setIsEditing(false);
    }
  };
  const onEditHandler = (id) => {
    console.log("item to be edited", id, comment.id);
    //isEditing true
    const specificItem = replies.find((item) => item.id === id);
    setIsEditing(true);
    setIsEditId(id);
    setContentValue(specificItem.content);
    setShowReply(true);
  };

  const onDeleteHandler = (id) => {
    console.log("id to be deleted,", id);
    setShowModal(true);
    setDeleteId(id);
  };

  const onClickModalDelete = () => {
    const filteredComments = replies.filter((item) => item.id !== deleteId);
    console.log(filteredComments);
    setReplies([...filteredComments]);
    setShowModal(false);
    setDeleteId(null);
  };

  const onClickModalCancel = () => {
    setShowModal(false);
  };

  let starterScore = comment.score;

  const onPlusBtnHandler = () => {
    setScore((prevScore) => prevScore + 1);
    if (score - starterScore < 1) {
      setBtnUpDisabled(true);
      starterScore = comment.score;
    }
    console.log("disabled is in the +", btnUpDisabled);
    console.log("starter score", starterScore, "score is", score);
  };
  const onMinusBtnHandler = () => {
    setScore((prevScore) => prevScore - 1);
    if (starterScore - score < 1) {
      setBtnDownDisabled(true);
      starterScore = comment.score;
    }
    console.log("disabled is in the -", btnDownDisabled);
    console.log("starter score", starterScore, "score is", score);
  };

  return (
    <>
      <div className="comments" key={comment.id}>
        <div className="vote">
          <button
            type="button"
            className="btn-vote"
            disabled={btnUpDisabled}
            onClick={onPlusBtnHandler}
          >
            <img
              className="icon-plus"
              src="./images/icon-plus.svg"
              alt="icon-plus"
            />
          </button>
          <span className="vote__num">{score}</span>
          <button
            className="btn-vote"
            onClick={onMinusBtnHandler}
            disabled={btnDownDisabled}
          >
            <img
              className="icon-minus"
              src="./images/icon-minus.svg"
              alt="icon-minus"
            />
          </button>
        </div>
        <div className="user__profile">
          <div className="user__info">
            <div className="user-details">
              <img
                className="user__img"
                src={comment.user.image.png}
                alt={comment.user.username}
              />
              <h4>{comment.user.username}</h4>
              {currentUser.username === comment.user.username && (
                <h4 className="you-text">You</h4>
              )}
              <p>{comment.createdAt}</p>
            </div>
            <div className="user__btns">
              {currentUser.username === comment.user.username ? (
                <div className="change-btns">
                  <span onClick={() => onCommentDeleteHandler(comment.id)}>
                    <img src="./images/icon-delete.svg" alt="icon-edit" />{" "}
                    Delete
                  </span>
                  <span onClick={() => onCommentEditHandler(comment.id)}>
                    <img src="./images/icon-edit.svg" alt="icon-edit" /> Edit
                  </span>
                </div>
              ) : (
                <div
                  className="reply"
                  onClick={() => {
                    onClickReplyHandler(comment.id);
                  }}
                >
                  <img
                    className="reply-icon"
                    src="./images/icon-reply.svg"
                    alt="icon-reply"
                  />
                  <h5>Reply</h5>
                </div>
              )}
            </div>
          </div>
          <div className="user__desc">
            <p>{comment.content}</p>
          </div>
        </div>
      </div>
      {showReply && (
        <div className="type__comments">
          <img
            className="current__user"
            src="./images/avatars/image-juliusomo.png"
            alt="juliusomo"
          />
          <textarea
            name="comments"
            id="comments"
            value={contentValue}
            onChange={(e) => setContentValue(e.target.value)}
          >{`@${comment.user.username}`}</textarea>
          <button
            className="btn btn-send"
            onClick={() => onClickSendHandler(comment.id, comment)}
          >
            {isEditing ? "UPDATE" : "SEND"}
          </button>
        </div>
      )}

      {replies.length > 0 && (
        <div className="reply__wrapper">
          {replies.map((reply) => {
            return (
              <Replies
                reply={reply}
                key={reply.id}
                currentUser={currentUser}
                onEditHandler={onEditHandler}
                onDeleteHandler={onDeleteHandler}
                replies={replies}
                setReplies={setReplies}
                showModal={showModal}
                onClickModalDelete={onClickModalDelete}
                onClickModalCancel={onClickModalCancel}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default Comments;
