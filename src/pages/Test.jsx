import moment from "moment";
import React, { useState } from "react";
import CountDown from "../components/CountDown";

function Test() {
  return (
    <div>
      <CountDown seconds={120} />
      Salut les gars
    </div>
  );
}

export default Test;
