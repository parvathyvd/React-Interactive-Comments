import React, { useState } from "react";
import Modal from "./Modal";

const Replies = ({
  reply,
  currentUser,
  onEditHandler,
  onDeleteHandler,
  replies,
  setReplies,
  showModal,
  onClickModalDelete,
  onClickModalCancel,
}) => {
  const [showInnerReply, setShowInnerReply] = useState(false);
  const [contentReplyValue, setContentReplyValue] = useState(
    `@${reply.user.username}`
  );
  let [score, setScore] = useState(reply.score);

  const onClickReplyHandler = (id) => {
    //show the reply block
    setShowInnerReply(true);
  };
  const onClickSendHandler = (id) => {
    //remove the showreply false
    let newReply = {
      id: new Date().getTime().toString(),
      content: `${contentReplyValue}`,
      createdAt: new Date().toISOString(),
      score: 2,
      replyingTo: `${reply.user.username}`,
      user: {
        image: {
          png: `${currentUser.image.png}`,
        },
        username: `${currentUser.username}`,
      },
    };

    //Add it to the reply of corresponding comment to the replies array
    setReplies([...replies, newReply]);
    setShowInnerReply(false);
  };
  const onPlusBtnHandler = () => {
    setScore(score + 1);
  };
  const onMinusBtnHandler = () => {
    setScore(score - 1);
  };

  return (
    <>
      <div className="comments">
        <div className="vote">
          <img
            className="icon-plus"
            src="./images/icon-plus.svg"
            alt="icon-plus"
            onClick={onPlusBtnHandler}
          />
          <span className="vote__num">{score}</span>
          <img
            className="icon-minus"
            src="./images/icon-minus.svg"
            alt="icon-minus"
            onClick={onMinusBtnHandler}
          />
        </div>
        <div className="user__profile">
          <div className="user__info">
            <div className="user-details">
              <img
                className="user__img"
                src={reply.user.image.png}
                alt={reply.user.username}
              />
              <h4>{reply.user.username} </h4>
              {currentUser.username === reply.user.username && (
                <h4 className="you-text">You</h4>
              )}
              <p>{reply.createdAt} </p>
            </div>
            <div className="user__btns">
              {currentUser.username === reply.user.username ? (
                <div className="change-btns">
                  <span onClick={() => onDeleteHandler(reply.id)}>
                    <img src="./images/icon-delete.svg" alt="icon-edit" />{" "}
                    Delete
                  </span>
                  <span onClick={() => onEditHandler(reply.id)}>
                    <img src="./images/icon-edit.svg" alt="icon-edit" /> Edit
                  </span>
                </div>
              ) : (
                <div
                  className="reply"
                  onClick={() => onClickReplyHandler(reply.id)}
                >
                  <img
                    className="reply-icon"
                    src="./images/icon-reply.svg"
                    alt="icon-reply"
                  />
                  <h5>Reply</h5>{" "}
                </div>
              )}
            </div>
          </div>
          <div className="user__desc">
            <p>{reply.content}</p>
          </div>
        </div>
      </div>
      {showInnerReply && (
        <div className="type__comments">
          <img
            className="current__user"
            src="./images/avatars/image-juliusomo.png"
            alt="juliusomo"
          />
          <textarea
            name=""
            id=""
            value={contentReplyValue}
            onChange={(e) => setContentReplyValue(e.target.value)}
          ></textarea>
          <button
            className="btn btn-send"
            onClick={() => onClickSendHandler(reply.id)}
          >
            SEND
          </button>
        </div>
      )}
      {showModal && (
        <Modal
          onClickModalDelete={onClickModalDelete}
          onClickModalCancel={onClickModalCancel}
        />
      )}
    </>
  );
};

export default Replies;
