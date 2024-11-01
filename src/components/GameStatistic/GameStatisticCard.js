import React from "react";
import styles from "./GameStatisticCard.module.css";

// bela pozadina iza tabele 
const GameStatisticCard = (props) => {
    return (
        <div className={styles.card}>
            {props.children}
        </div>
    );
}
export default GameStatisticCard;