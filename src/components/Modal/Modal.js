import React from "react";
import styles from "./Modal.module.css";

//zatamljena pozadina
const Backdrop = props => {
    return (
        <div className={styles.backdrop} onClick={props.onClose}></div>
    );

}
const ModalOverlay = props => {
    return (
        <div className={styles.modal}>
            {props.children}
        </div>
    );

}
const Modal = props => {
    return (
        <React.Fragment>
            <Backdrop onClose={props.onClose}></Backdrop>
            <ModalOverlay>{props.children}</ModalOverlay>
        </React.Fragment>
    );
}

export default Modal;