import React, { useState, useRef, useEffect } from "react";
function getDropDown(type) {
  const generateList = (items) => (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );

  if (type === "Jour") {
    const jours = Array.from({ length: 31 }, (_, index) => index + 1);
    return generateList(jours);
  } else if (type === "Mois") {
    const mois = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];
    return generateList(mois);
  } else {
    const annees = Array.from(
      { length: 2023 - 1930 + 1 },
      (_, index) => 1930 + index
    );
    const anneesInversees = annees.reverse();
    return generateList(anneesInversees);
  }
}
function DatePicker({ type }) {
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const dropdownRef = useRef(null);

  
  const displayDrop = () => {
    // setIsDropdownActive((prevState) => !prevState);
    setIsDropdownActive(!isDropdownActive)
    console.log()
  };
  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownActive(false);
    }
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownActive(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div
      className="datepicker"
      id="datepicker"
      onClick={() => displayDrop()}
    >
      <div className="datepicker__form">
        <input
          type="text"
          className="datepicker__input"
          readOnly
          name=""
          id=""
          placeholder={type}
        />

        <span
          className={`datepicker__arrow ${
            isDropdownActive ? "datepicker__arrow--active" : ""
          }`}
          id={type}
        ></span>
      </div>
      {isDropdownActive && (
        <div className="datepicker__dropdown" ref={dropdownRef}>
          {" "}
          {getDropDown(type)}
        </div>
      )}
    </div>
  );
}

export default DatePicker;
