import React from "react";
import Alchimiste from "../assets/img/livre_8.jpeg";
function TruncateString({ text }) {
  const maxLength = 25;

  if (text.length <= maxLength) {
    return <span>{text}</span>;
  }

  const truncatedText = text.slice(0, maxLength) + "...";
  return <span>{truncatedText}</span>;
}

function MainBook({ image, lectures, title }) {
  return (
    <div className="mostread__container">
      <div className="mostread__container--image">
        <img src={Alchimiste} alt="" />
      </div>
      <div className="mostread__container--text">
        <span className="mostread__container--text-span">
          <TruncateString text={title} />
        </span>
        <span className="mostread__container--text-span">25K Lectures</span>{" "}
      </div>
    </div>
  );
}

export default MainBook;
