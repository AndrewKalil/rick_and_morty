import React from "react";
import Card from "../card/Card";
import styles from "./home.module.css";
import { connect } from "react-redux";
import {
  removeCharacterAction,
  addToFavoritesAction,
} from "../../redux/charsDuck";

const Home = ({ chars, removeCharacterAction, addToFavoritesAction }) => {
  function renderCharacter() {
    let char = chars[0];

    return (
      <Card
        leftClick={removeCharacterAction}
        rightClick={addToFavoritesAction}
        {...char}
      />
    );
  }

  return (
    <div className={styles.container}>
      <h2>Personajes de Rick y Morty</h2>
      <div>{renderCharacter()}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    chars: state.characters.array,
  };
};

export default connect(mapStateToProps, {
  removeCharacterAction,
  addToFavoritesAction,
})(Home);
