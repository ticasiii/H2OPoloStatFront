import React, { useRef, useState } from "react";
import styles from "./AddTurnamentForm.module.css";
import Modal from "../Modal/Modal.js";
import { addEvent, removeEvent } from "../../util/apiHandling.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const AddTurnamentForm = (props) => {
  const nameRef = useRef();
  const dateRef = useRef();

  const [isValid, setIsValid] = useState(false);
  const [isAddEvent, setIsAddEvent] = useState(false);  
  const [isRemoveEvent, setIsRemoveEvent] = useState(false);  
  const [isStartForm, setIsStartForm] = useState(true);    
  const [selectedOptions, setSelectedOptions] = useState([]);

  // const submitHandler = event => {
  //     event.preventDefault();
  //     const author = authorRef.current.value;
  //     const content = contentRef.current.value;
  //     let newTags = [];

  //     if (tags.length !== 0) {
  //         newTags = tags.split(",");
  //     }
  //     const newQuote = {
  //         content: content,
  //         author: author,
  //         tags: newTags
  //     }
  //     props.onAdd(newQuote);
  //     props.onClose();

  // }

  const handleChange = () => {
    if(dateRef.current.value && nameRef.current.value){
  setIsValid(true)
    }
};

  const submitHandler = event => {
    event.preventDefault();
    const name = nameRef.current.value;
    const date =dateRef.current.value;
    const newEvent = {
       
        id:`${Math.random()}`,
        name: `${name}`,
        date:new Date(date),
      }

addEvent(newEvent);
props.fetchEvents();
props.hideAddTurnamentForm();

}

const submitRemoveEventHandler = () =>{
  const proceed = window.confirm('Are you sure you want to remove selected players?');
  if (proceed){
   console.log("optionssss",selectedOptions);
   selectedOptions.forEach(option => {
      removeEvent(option);
   });
   
  //removePlayer(selectedOptions);
  props.fetchEvents();
  props.hideAddTurnamentForm();
  }
}

const addEventHandler = () =>{
  setIsAddEvent(true);
  setIsStartForm(false);
}
const removeEventHandler = () =>{
 
 
  setIsRemoveEvent(true);
  setIsStartForm(false);
  
}

const handleBoxChange = (e) => {
  console.log(e.target);
  if(e.target.checked){
      setSelectedOptions([...selectedOptions, e.target.value]);
  } else {
      setSelectedOptions(selectedOptions.filter((item) => item !== e.target.value));
  }
  console.log(e.target.value);
  }

function formatDate(date) {
    // Formatiranje datuma u format YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return (
    <Modal onClose={props.hideAddTurnamentForm}>
      <div className={styles.main_div}>
      {isStartForm && <div className={styles.startForm_div}>
                <button onClick={addEventHandler}> Add Event</button>
                <button onClick={removeEventHandler}>Remove Events</button>
                </div>}
        {isAddEvent && <form className={styles.form} onSubmit={submitHandler}>
          {/*</form>onSubmit={submitHandler}>*/}
          <label htmlFor="name">Name</label>
          <input ref={nameRef} id="name" type="text" onChange={handleChange} required></input>
          <label htmlFor="date">Date</label>
          <input ref={dateRef} id="date" type="date"  onChange={handleChange} required></input>
          <div className={styles.button_div}>
            <button onClick={props.hideAddTurnamentForm}>Close</button>
            {isValid && <button type="submit">Add</button>}
          </div>         
        </form>}
        {isRemoveEvent && <form className={styles.form} onSubmit={submitRemoveEventHandler}>
                <div className={styles.chosse_event_content}>
                        { props.events.map((val, key) => {
                             return (
                            <div className={styles.checkbox}>
                                <input
                            id={key}
                            type="checkbox"
                            value={val.id}
                            onChange={handleBoxChange}
                            />
                             <span  htmlFor={key} key={key}>
                             {`${val.name} (${formatDate(val.date)})`}
                        </span>
                        </div>
                        );
                    })}
                    </div>
                    <div className={styles.button_div} >
                        <button onClick={props.hideAddTurnamentForm}>Close</button>
                        <button type="submit"><FontAwesomeIcon size="" icon={faTrash} border /></button>
                    </div>
                </form>}
      </div>
    </Modal>
  );
};
export default AddTurnamentForm;
