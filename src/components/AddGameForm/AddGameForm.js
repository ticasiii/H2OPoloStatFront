import React, { useRef, useState } from "react";
import styles from './AddGameForm.module.css';
import Modal from "../Modal/Modal.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { addMatch,createStatistics, removeMatch, removeStatistics } from "../../util/apiHandling.js";

const AddGameForm = props => {

    const opponentNameRef = useRef();
    const yourNameRef = useRef();

    const [isValidTag, setIsValidTag] = useState(true);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedOptionRadio, setSelectedOptionRadio] = useState('');
    const [isAddGame, setIsAddGame] = useState(false);  
    const [isRemoveGame, setIsRemoveGame] = useState(false);  
    const [isStartForm, setIsStartForm] = useState(true);
    const [selectedGameOptions, setSelectedGameOptions] = useState([]);   
    function formatDate(date) {
        // Formatiranje datuma u format YYYY-MM-DD
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }

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
    

    const handleBoxChange = (e) => {
        console.log(e.target);
        if(e.target.checked){
            setSelectedOptions([...selectedOptions, e.target.value]);
        } else {
            setSelectedOptions(selectedOptions.filter((item) => item !== e.target.value));
        }
        console.log(e.target.value);
        }

    const handleBoxChangeRemove = (e) => {
        console.log(e.target);
        if(e.target.checked){
            setSelectedGameOptions([...selectedGameOptions, e.target.value]);
        } else {
            setSelectedGameOptions(selectedGameOptions.filter((item) => item !== e.target.value));
        }
        console.log(e.target.value);
        }



        

        const handleRadioChange = (event) => {
            if(event.target.value){
          setSelectedOptionRadio(event.target.value);
          
            }
        };



    const submitHandler = (event) => {
        event.preventDefault();
        if(!selectedOptionRadio){
            window.confirm(
                "Pleas add event?"
              );
            return;
        }
        const opponentName = opponentNameRef.current.value;
        const yourName = yourNameRef.current.value;
        const options = [];
        for (let i = 0; i < selectedOptions.length; i++) {
            for (let j = 0; j < props.playersList.length; j++) {
                if(selectedOptions[i] == props.playersList[j].id){
                 options.push( props.playersList[j])
                }
                
            }
            
        }
        console.log("markoO",options, props.playersList);
        // SEM OVOG GORE PRIKUPLJANJA PODATAKA IZ FORME, IDEJA JE DA KADA SE KREIRA NOVA UTAKMICA(GAME)
        // DA SE KREIRA I NOVA STATISTIKA ZA TU UTAKMICU 
        const idG=`${Math.random()}`;
        const newGame={
            id:idG, //OVO SVAKAKO NIJE RESENJE TRAJNO
            tim1:opponentName,
            tim2:yourName,
            event_id:selectedOptionRadio,
            i_v_c1:0,
            i_v_c2:0,
            i_v_c3:0,
            i_v_c4:0,
            i_m_c1:0,
            i_m_c2:0,
            i_m_c3:0,
            i_m_c4:0,
            i_v_gc1:0,
            i_v_gc2:0,
            i_v_gc3:0,
            i_v_gc4:0,
            i_m_gc1:0,
            i_m_gc2:0,
            i_m_gc3:0,
            i_m_gc4:0,
        }

        const list=[];
        options.forEach(option => { 
            const stat={
                id:`${Math.random()}`,
                id_player: option.id,
                id_game:idG,
                id_event:selectedOptionRadio,
                name: option.name,
                gk:option.gk=='false' ? false:true,
                gol_n:0,
                penal_n:0,
                centar_n:0,
                spolja_n:0,
                izg_lopta_n:0,
                pog_dodavanje_n:0,
                kontrafaul_n:0,
                sut_n:0,
                spolja_centar_g_p:0,
                i_vise_g_p:0,
                penal_g_p:0,
                centar_p:0,
                spolja_p:0,
                penal_p:0,
                osvojena_asis_p:0,
                coachBonus:0,
                efikasnost:0,
                sutevi:0,
                odbrane:0,
                prim_gol:0,
                
            }
            //list.push(stat)
            createStatistics(stat);
           
        });

        // createStatistics(list);
        addMatch(newGame);
        props.fetchGames();
        props.fetchStatistics();
        props.hideAddGameForm();
    }

    const submitRemoveGameHandler = () =>{
        const proceed = window.confirm('Are you sure you want to remove selected games?');
        if (proceed){
         console.log("optionssss",selectedGameOptions);
         console.log("bitnoo", props.statistics, selectedGameOptions);
         
         selectedGameOptions.forEach(option => {
            props.statistics.forEach(stat=>{
                if(stat.id_game==option){
                    console.log("bitno", stat);    
                    removeStatistics(stat.id);
                }
            })
            removeMatch(option);
         });
         
        //removePlayer(selectedOptions);
        props.fetchGames();
        props.hideAddGameForm();
        }
    }

    const addGameHandler = () =>{
        setIsAddGame(true);
        setIsStartForm(false);
    }
    const removeGameHandler = () =>{
        setIsRemoveGame(true);
        setIsStartForm(false);
        
    }
    return (

        <Modal onClose={props.hideAddGameForm}>
            <div className={styles.main_div}>
            {isStartForm && <div className={styles.startForm_div}>
                <button onClick={addGameHandler}> Add Game</button>
                <button onClick={removeGameHandler}>Remove Game</button>
                </div>}
                {isAddGame && <form className={styles.form} onSubmit={submitHandler}>
                    <label htmlFor="OpponentName">Opponent team name</label>
                    <input ref={opponentNameRef} id='OpponentName' type="text" required></input>
                    <label htmlFor="YourName">Oppoent team name</label>
                    <input ref={yourNameRef} id='YourName' type="text" required></input>
                    <label >Add players for game:</label>
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
                    <label >Chosse event:</label>
                    <div className={styles.chosse_event_content}>
                        { props.events.map((val, key) => {
                             return (
                            <div className={styles.radio}>
                        <label>
                            <input
                            type="radio"
                            value={val.id}
                            checked={selectedOptionRadio === val.id.toString()}
                            onChange={handleRadioChange}
                            required
                            />
                             {val.name}
                        </label>
                    </div>
                          );
                        })}
                    </div>
                    {/* <input style={{ backgroundColor: `${isValidTag ? 'white' : 'salmon'}` }} id='tags' type="text" onChange={changeHandler}></input>
                    {!isValidTag && <label htmlFor="tags">Please use comas insted spaces</label>} */}
                    <div className={styles.button_div} >
                        <button onClick={props.hideAddGameForm}>Close</button>
                        <button type="submit">Add</button>
                    </div>
                </form> }
                {isRemoveGame && <form className={styles.form} onSubmit={submitRemoveGameHandler}>
                <div className={styles.chosse_game_content}>
                        { props.games.map((val, key) => {
                             return (
                            <div className={styles.checkbox}>
                                <input
                            id={key}
                            type="checkbox"
                            value={val.id}
                            onChange={handleBoxChangeRemove}
                            />
                             <span  htmlFor={key} key={key}>
                             {`${val.tim1}-${val.tim2}/${props.events.find(obj=>obj.id==val.event_id)?.name}`}
                        </span>
                        </div>
                        );
                    })}
                    </div>
                    <div className={styles.button_div} >
                        <button onClick={props.hideAddGameForm}>Close</button>
                        <button type="submit"><FontAwesomeIcon size="" icon={faTrash} border /></button>
                    </div>
                </form>}
            </div>
        </Modal>

    );

}
export default AddGameForm;