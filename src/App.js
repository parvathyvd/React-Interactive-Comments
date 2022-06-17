import React, { useState } from "react";
import Comments from "./Comments";
import data from "./data.json";
import Modal from "./Modal";

const App = () => {
  const [comments, setComments] = useState(data.comments);
  const [currentUser, setCurrentUser] = useState(data.currentUser);
  const [contentValue, setContentValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditId, setIsEditId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const onClickSendHandler = () => {
    //remove the showreply false and showerplyid null
    let newComment = {
      id: new Date().getTime().toString(),
      content: `${contentValue}`,
      createdAt: new Date().toISOString(),
      score: 12,
      user: {
        image: {
          png: `${currentUser.image.png}`,
        },
        username: `${currentUser.username}`,
      },
      replies: [],
    };
    if (!contentValue) {
      return;
    }
    if (!isEditing) {
      //Add it to the reply of corresponding comment to the replies array
      setComments([...comments, newComment]);
    }
    if (isEditing) {
      setComments(
        comments.map((item) => {
          if (item.id === isEditId) {
            return { ...item, content: contentValue };
          }
          return item;
        })
      );
    }
    setContentValue("");
  };

  const onCommentEditHandler = (id) => {
    console.log("item to be edited", id);
    //isEditing true
    const specificItem = comments.find((item) => item.id === id);
    setIsEditing(true);
    setIsEditId(id);
    setContentValue(specificItem.content);
  };

  const onCommentDeleteHandler = (id) => {
    console.log("id to be deleted,", id);
    setShowModal(true);
    setDeleteId(id);
  };

  const onClickModalCancel = () => {
    setShowModal(false);
  };

  const onClickModalDelete = () => {
    const filteredComments = comments.filter((item) => item.id !== deleteId);
    console.log(filteredComments);
    setComments([...filteredComments]);
    setShowModal(false);
    setDeleteId(null);
  };

  return (
    <>
      <div className="comments__wrapper">
        {comments.map((comment) => {
          return (
            <Comments
              comment={comment}
              currentUser={currentUser}
              onCommentEditHandler={onCommentEditHandler}
              onCommentDeleteHandler={onCommentDeleteHandler}
              key={comment.id}
            />
          );
        })}
        <div className="type__comments">
          <img
            className="current__user"
            src="./images/avatars/image-juliusomo.png"
            alt="juliusomo"
          />
          <textarea
            name=""
            id=""
            placeholder="Add a comment"
            value={contentValue}
            onChange={(e) => setContentValue(e.target.value)}
          ></textarea>
          <button className="btn btn-send" onClick={() => onClickSendHandler()}>
            SEND
          </button>
        </div>
      </div>
      {showModal && (
        <Modal
          onClickModalDelete={onClickModalDelete}
          onClickModalCancel={onClickModalCancel}
        />
      )}
    </>
  );
};

export default App;
