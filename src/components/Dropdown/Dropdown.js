import React, { useState } from 'react';
import styles from "./Dropdown.module.css"

const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Izaberite opciju');


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };



  return (
    <div className={styles.dropdown}>
      <button className={ props.blinking ?   styles.blinkingcomponent : styles.dropdown_button} onClick={toggleDropdown}>
        {props.title}
      </button>
      {isOpen && (
        <div className={props.fromEvent ? styles.dropdown_content_from_event : styles.dropdown_content}>
            <div className={styles.dropdown_scroll}>
            <ul className={styles.dropdown_list}>
          {props.options.map((option, index) => (
            <li
              key={index}
              onClick={() => props.onClick(option.id)}
            >
              {option.name}
            </li>
          ))}
          </ul>
        </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
