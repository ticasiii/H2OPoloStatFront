import React, { useState } from "react";
import styles from "./TurnamentStatistic.module.css";
import GameStatisticCard from "../GameStatistic/GameStatisticCard.js";
import { useEffect } from "react";
import { format } from "date-fns";
import Dropdown from '../Dropdown/Dropdown';



const DUMMY6 = [
    {
     date:new Date("2001-06-01")
    },
    {
       date:new Date("2001-07-01")
      },
      {
       date:new Date("2001-08-01")
      },
      {
       date:new Date("2001-09-01")
      }, {
       date:new Date("2001-06-01")
      }, {
       date:new Date("2001-11-01")
      }, {
       date:new Date("2001-06-01")
      }, {
       date:new Date("2001-05-01")
      }, {
       date:new Date("2001-06-01")
      }, {
       date:new Date("2001-06-01")
      }, {
       date:new Date("2002-06-01")
      }, {
       date:new Date("2001-06-01")
      }, {
       date:new Date("2003-06-01")
      }, {
       date:new Date("2001-07-01")
      }, {
       date:new Date("2001-06-01")
      }, {
       date:new Date("2001-06-01")
      },
      
]
const DUMMY7 = new Date("2020-06-01");
    

const EventStatistic = (props) => {
 


  const [playersStat,setPlayerStat]=useState([]);
  const [games,setGames]=useState([]);
  const [godistaLista,setGodistaLista]=useState([]);
  const[optionsG,setOptionsG]= useState([]);

  // useEffect(()=>{
  //   const newList=[];
  //   for (let i=0;i<props.games.length;i++){
  //     if(props.games[i].event_id.toString() == props.idEvent){
  //       const object={
  //         team:props.games[i].tim1,
  //         idGame:  props.games[i].id 
  //     }
  //     newList.push(object);
  //     } 
  //     }
  //     setGames(newList);
  // },[]);

//OVDE JE KUPUS GENERALNO, BILO JE POTREBNO DA SE ZA JEDAN EVENT IZVUKU SVE UTAKMICE I EFIKASNOSTI IGRACA ZA SVAKU OD TIH UTAKMICA 
//PRI UCITAVANJU VADIM SVE UTAKMICE KOJE IMAJU TAJ ID TURNIRA/ OPET BOLJE MOZDA KRZ BAZU DA SE URADI 
//VADIM I SVE STATISTIKE KOJE SU BILE TU NA TURNIRU, SPAJAM IH SA UTAKMICAMA ...
// ZA DRUGU TABELU BILO JE POTREBNO I IZVUCI DATUME RODJENJA SVIH IGRACA 
//TAKO DA OVDE MI TREBAJU I TABELA IGRACA I TABELA STATISTIKE UTAKMICE I TABELA UTAKMICE 

  useEffect(()=>{
    const newList=[];
    for (let i=0;i<props.games.length;i++){
      if(props.games[i].event_id == props.idEvent){
        const object={
          team:props.games[i].tim1,
          idGame:  props.games[i].id 
      }
      newList.push(object);
      } 
      }
      setGames(newList);
      console.log("MarkoG",newList,props.games);

      let unique=[];
  const filtered = props.stat.filter(stat => stat.id_event == props.idEvent);
  console.log('blablafiltered',filtered,props.idEvent);
  const kombinovana_l=[];
  let kombinovani_o={};
    if(newList.length!=1){
      
  for (let i=0;i<filtered.length;i++){
   let br=0;
   let index=1;
    for (let j=0;j<filtered.length;j++){

    if(filtered[i].id_player == filtered[j].id_player ) {
      br++;
      console.log('blablauso');
      if(br==1){
      kombinovani_o={
        id_player:filtered[i].id_player,
        name:filtered[i].name,
        efikasnost1: filtered[i].efikasnost,     
    }
  }
        console.log('blablabrojanje',br);
        kombinovani_o[`efikasnost${index++}`]= filtered[j].efikasnost;

    }
   
  } 
  console.log('blablapoj',kombinovani_o);
  if(kombinovani_o!=null){
    const length=newList.length-index;
    for(let i=0; i<=length; i++){
      kombinovani_o[`efikasnost${index++}`]= null;
    }
  kombinovana_l.push(kombinovani_o);
  }

  kombinovani_o=null;
    }
  
      console.log("blablakom", kombinovana_l);
      unique= kombinovana_l.filter((obj, index) => {
      return index === kombinovana_l.findIndex(o => obj.id_player === o.id_player);
  });
  
    setPlayerStat(unique);
}
else {

  for (let i=0;i<filtered.length;i++){
      console.log('blablauso');
      kombinovani_o={
        id_player:filtered[i].id_player,
        name:filtered[i].name,
        efikasnost: filtered[i].efikasnost,    
       
    }
       
    unique.push(kombinovani_o);
    }
    setPlayerStat(unique);
}

    const date_l=[];
    let date_o={};
    const eventDate=props.events.filter(event => event.id == props.idEvent);
    console.log('dateU',unique,props.players);
    for (let i=0;i<unique.length;i++){
      for (let j=0;j<props.players.length;j++){
        if(unique[i].id_player == props.players[j].id) {
          console.log('dateusoo',eventDate[0].date,props.players[j].birth,props.players[j].name,);
          date_o={
          birth: props.players[j].birth,
          name: props.players[j].name,
          eventDate:eventDate[0].date,  
          sub:(props.players.birth-eventDate.date)    
      }
      date_l.push(date_o);
    }

  }
  }
  console.log("dateUl",date_l,games);
  setGodistaLista(date_l);
    



},[props.idEvent]);
console.log('blabla',playersStat);

useEffect(()=>{

  },[props.idEvent]);




  
const prosekHandler=(index)=>{
    let suma=0;
    let br=0;
    for (const kljuc in playersStat[index]) {
        
        if (playersStat[index].hasOwnProperty(kljuc) && kljuc !== 'name' && kljuc !=='id_player') {
            console.log("maksim",playersStat[index],playersStat[index][kljuc]);
            if(playersStat[index][kljuc]!=0){
          suma += playersStat[index][kljuc];
          console.log("maksimS",suma);
          br++;
        }
    
}
      }
      return((suma/br).toFixed(2))
}

//POMOCNE FUNKCIJE 
function calculateDateDifference(startDate, endDate) {
  const differenceInMilliseconds = Math.abs(endDate - startDate);
  const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  return `${(differenceInDays/365).toFixed(0)}y-${differenceInDays%365}${differenceInDays%365>1? 'days' : 'day'}`;
}

function formatDate(date) {
  // Formatiranje datuma u format YYYY-MM-DD
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const getAllKeys = () => {
  let keys = [];
  playersStat.forEach(item => {
    Object.keys(item).forEach(key => {
      if (!keys.includes(key)) {
        keys.push(key);
      }
    });
  });
  return keys;
};


// Dobavljanje svih ključeva
const keys = getAllKeys();


useEffect(()=>{
  const kombinovana_ll=[];
  let obj={};
  for (let i=0;i<props.games.length;i++){
          if(props.games[i].event_id==props.idEvent){
            console.log("bitnooo uso");
            obj={
              name:props.games[i].tim1+" VS "+props.games[i].tim2,
              id:props.games[i].id
            }
        kombinovana_ll.push( obj);
          }
    }
    setOptionsG(kombinovana_ll);    
},[props.idEvent]);
  


  // OVE DVE FUNKCIJE SU ZA KLIK U DROPDOWN LISTI NA NEKI EVENT ILI UTAKMICU
  // PAMTIM KLIKNUTIM IDJEVE DA ZNAM ZA FILTIRNJE PODATAKA I PRIKAZ

 
 
const gameIdHandler= (option) =>{
  const pronadjeniObjekti = props.games.filter(objekat => objekat.id === option);
  console.log("bitnoo1",pronadjeniObjekti[0].id, option)
  // props.setIdTurnament(pronadjeniObjekti[0].id)
  props.setIdGame(pronadjeniObjekti[0].id);
  props.showGameStatisticHandler();
}

  
  return (
    <React.Fragment>
       
    <section className={styles.gameStatistic}>
        <button style={{marginBottom:"1rem"}} onClick={props.hideshowTurnamentStatisticHandler}>Close</button>
       <div style={{marginTop:"20px", marginBottom: "5px"}}> 
      <Dropdown blinking={true} onClick={gameIdHandler} options={optionsG} title={"CHOOSE GAME"}></Dropdown>
      </div>
    
      <GameStatisticCard>
      
        <div className={styles.div}>
        <table className={styles.table}>
            <thead>
          <tr>
            <th>No</th>
            <th>Full name</th>
            {games.map((val,key)=>{
                return(
                <td>{val.team}</td>
                );
            })}
            <th>Ges/Spiel</th>
            <th>Rang</th>
          </tr>
          </thead>
          <tbody>
            {/* {dummy} */}
          {playersStat.map((val, index) => {
            return (
              <tr key={index}>

              {keys.map((key, colIndex) => (
               
                <td key={colIndex}>{val[key]}</td>
              ))}
                  

                  
                <td>{prosekHandler(index)}</td>
              </tr>
            );
          })}
          </tbody>
        </table>
       
        <table className={styles.table}>
            <thead>
          <tr>
            <th>No</th>
            <th>Full name</th>
            <th>Date</th>
            <th>Event date</th>
            <th>Alter zur Zeit</th>
          </tr>
          </thead>
          <tbody>
          {godistaLista.map((val, key) => {

            return (
              <tr key={key}>
                <td>{key}</td>
                <td>{val.name}</td>
                {/* <td><input type="date" value={val.x1} key={key} ></input></td> */}
                <td><label key={key} > {formatDate(val.birth)}</label></td> 
                <td><label key={key} > {formatDate(val.eventDate)}</label></td>
                <td><label key={key} > {calculateDateDifference(val.birth,val.eventDate)}</label></td>
                {/* <td><input type="date"  key={key} value={val.x2}></input></td> */}
                {/* <td><input key={key} type="date" value={val.x4}></input></td> */}
              </tr>
            );
          })}
          </tbody>
        </table>
        </div>
      </GameStatisticCard>
     
    </section>
    </React.Fragment>
  );
};
export default EventStatistic;
