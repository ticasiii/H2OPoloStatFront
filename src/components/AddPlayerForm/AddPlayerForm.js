import React, { useRef, useState } from "react";
import styles from './AddPlayerForm.module.css';
import Modal from "../Modal/Modal.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { addPlayer, removePlayer}  from "../../util/apiHandling.js";
const AddPlayerForm = props => {

    const nameRef = useRef();
    const surnameRef = useRef();
    const birthRef = useRef();
    const [isValid, setIsValid] = useState(false);   
    const [selectedOption, setSelectedOption] = useState('option1');
    const [isAddPlayer, setIsAddPlayer] = useState(false);  
    const [isRemovePlayers, setIsRemovePlayers] = useState(false);  
    const [isStartForm, setIsStartForm] = useState(true);    
    const [selectedOptions, setSelectedOptions] = useState([]);
    const handleRadioChange = (event) => {
        if(event.target.value){
      setSelectedOption(event.target.value);
      setIsValid(true)
        }
    };

// DODAVANJE NOVOG IGRACA
const submitHandler = event => {
    event.preventDefault();
    const name = nameRef.current.value;
    const surname = surnameRef.current.value;
    const birth =birthRef.current.value;
    
    const newPlayer = {
        gk:selectedOption === "Goalkeeper" ? true : false,
        id: `${Math.random()}`,
        name: `${name} ${surname}`,
        birth:new Date(birth),
        
      }


//props.addPlayer(newPlayer);
addPlayer(newPlayer);
props.fetchPlayers();
props.hideAddPlyerForm();
}



const submitRemovePlayerHandler = () =>{
    const proceed = window.confirm('Are you sure you want to remove selected players?');
    if (proceed){
     console.log("optionssss",selectedOptions);
     selectedOptions.forEach(option => {
        removePlayer(option);
     });
     
    //removePlayer(selectedOptions);
    props.fetchPlayers();
    props.hideAddPlyerForm();
    }
}


const addPlayerHandler = () =>{
    setIsAddPlayer(true);
    setIsStartForm(false);
}
const removePlayersHandler = () =>{
   
   
    setIsRemovePlayers(true);
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

        <Modal onClose={props.hideAddPlyerForm}>
            <div className={styles.main_div}>
                {isStartForm && <div className={styles.startForm_div}>
                <button onClick={addPlayerHandler}> Add Player</button>
                <button onClick={removePlayersHandler}>Remove Players</button>
                </div>}
                {isAddPlayer && <form className={styles.form} onSubmit={submitHandler}>
                <label htmlFor="name">Name</label>
                    <input ref={nameRef} id='name' type="text" required ></input>
                    <label htmlFor="surname">Surname</label>
                    <input ref={surnameRef} id='surname' type="text" required></input>
                    <label htmlFor="birth">Birthday</label>
                    <input ref={birthRef} id='birth' type="date" required></input>
                    <div>
                        <label>
                            <input
                            type="radio"
                            value="Player"
                            checked={selectedOption === 'Player'}
                            onChange={handleRadioChange}
                            />
                             Player
                        </label>

                        <label>
                            <input
                            type="radio"
                            value="Goalkeeper"
                            checked={selectedOption === 'Goalkeeper'}
                            onChange={handleRadioChange}
                            />
                            Goalkeeper
                        </label>
                    </div>
                    {/* <input style={{ backgroundColor: `${isValid ? 'white' : 'salmon'}` }} id='tags' type="text" onChange={changeHandler}></input>
                    {!isValid && <label htmlFor="tags">Please use comas insted spaces</label>} */}
                    <div className={styles.button_div} >
                        <button onClick={props.hideAddPlyerForm}>Close</button>
                       {isValid && <button type="submit">Add</button>}
                    </div>
                </form>}
                {isRemovePlayers && <form className={styles.form} onSubmit={submitRemovePlayerHandler}>
                <div className={styles.chosse_player_content}>
                        { props.playersList.map((val, key) => {
                             return (
                            <div className={styles.checkbox}>
                                <input
                            id={key}
                            type="checkbox"
                            value={val.id}
                            onChange={handleBoxChange}
                            />
                             <span  htmlFor={key} key={key}>
                             {`${val.name} (${formatDate(val.birth)}) ${val.gk === true ? 'GK' : ''}`}
                        </span>
                        </div>
                        );
                    })}
                    </div>
                    <div className={styles.button_div} >
                        <button onClick={props.hideAddPlyerForm}>Close</button>
                        <button type="submit"><FontAwesomeIcon size="" icon={faTrash} border /></button>
                    </div>
                </form>}
            </div>
        </Modal>

    );

}
export default AddPlayerForm;