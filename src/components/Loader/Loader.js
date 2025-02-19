import React from "react";
import styles from "./Loader.module.css";

function Loader(props) {
  return (
    <div>
      <div className={styles.loader}></div>
    </div>
  );
}

export default Loader;
