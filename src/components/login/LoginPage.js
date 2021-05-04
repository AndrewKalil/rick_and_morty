import React from "react";
import styles from "./login.module.css";
import { connect } from "react-redux";
import { googleLoginAction, logoutAction } from "../../redux/userDuck";

const LoginPage = ({ fetching, googleLoginAction, logged, logoutAction }) => {
  const login = () => {
    googleLoginAction();
  };

  const logout = () => {
    logoutAction();
  };

  if (fetching) {
    return <h2 className={styles.container}>Loading...</h2>;
  }

  return (
    <div className={styles.container}>
      {logged ? <h1>Cierra tu sesión</h1> : <h1>Inicia Sesión con Google</h1>}
      {logged ? (
        <button onClick={logout}>Cerrar Sesión</button>
      ) : (
        <button onClick={login}>Iniciar</button>
      )}
    </div>
  );
};

const mapStateToProps = ({ user: { fetching, logged } }) => {
  return { fetching, logged };
};

export default connect(mapStateToProps, { googleLoginAction, logoutAction })(
  LoginPage
);
