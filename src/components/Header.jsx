import React from "react";
import Search from "../assets/icons/search_16.png";
import Equalizer from "../assets/icons/equalizer_16.png";
function Header() {
  return (
    <div className="header">
      <div className="header__flex">Mon Logo</div>
      <div className="header__flex">
        <div className="header__flex--research">
          <img src={Equalizer} className="header__flex--icon transparent" alt="" />
          <input type="text" className="" placeholder="Entrez un livre, ISBN"  maxLength={40}/>
          <button className="header__flex--button Mainbutton">
            <img src={Search} alt="" className="header__flex--search transparent" />
          </button>
        </div>
      </div>
      <button className="header__flex Mainbutton">Se connecter</button>
    </div>
  );
}

export default Header;
