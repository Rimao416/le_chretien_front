import React,{useContext} from "react";
import { UserContext } from "../context/UserContext";
import { useSelector } from "react-redux";
function getDropDown(type,handleChange,errorType) {


  const generateList = (items) => (
    <select name={type} className={`select__input ${errorType==="dateError" && "error"}`} id="" onChange={handleChange}>
      {items.map((item, index) => (
        <option value={item} key={index} className="select__option">
          {item}
        </option>
      ))}
    </select>
  );

  if (type === "day") {
    const jours = Array.from({ length: 31 }, (_, index) => index + 1);
    return generateList(jours);
  } else if (type === "month") {
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
function Select({ type }) {
  const {errorType}=useSelector((state)=>state.authReducer)
  const { handleChange } = useContext(UserContext);
  return (
    <div className="select">
     {getDropDown(type,handleChange,errorType)}

      {/* Ici, vous pouvez mettre une icône de flèche pour le dropdown */}
    </div>
  );
}

export default Select;
