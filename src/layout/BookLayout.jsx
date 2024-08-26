import React from "react";
import Title from "../components/Title";

function BookLayout({ withTitle = true, titre=null,children}) {
  return (
    <div className="book__layout mt-3">
      {withTitle && <Title titre={titre} />}
      {children}
    </div>
  );
}

export default BookLayout;
