import React, { useEffect, useState } from 'react';
import { useNavigate,useSubmit } from 'react-router-dom';
import { Form } from 'react-router-dom';
import styles from './Header.module.css';
import Dropdown from './Dropdown/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignOut } from '@fortawesome/free-solid-svg-icons';


const DUMMY = [
    {
        id:1,
      name:"under 15 Duisburg",
    },
    {  id:2,
        name:"Friendly Duisburg",
      },
      {
        id:3,
        name:"under 17 Duisburg",
      }
      
]
const DUMMY2 = [
    {
        id:1,
        tim1:"HUN",
        tim2:"GER",
        turnament_id:1
    },
    {  id:2,
        tim1:"ITY",
        tim2:"GER",
        turnament_id:1
      },
      {
        id:3,
        tim1:"SRB",
        tim2:"GER",
        turnament_id:1
      }
      
]
const Header = (props) => {

    // povci podatke o turnirima koji postoje 
 
    const[optionsT,setOptionsT]= useState([]);
    const[optionsG,setOptionsG]= useState([]);
    const[showGameDropdown,setshowGameDropdown]=useState(false)
    const [showMenu, setShowMenu] = useState(false); // Stanje za prikazivanje/ukrivanje menija
   
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

   // const navigate= useNavigate()
    const submit = useSubmit();

      const navigateHandler = () =>{
        
        submit(null, {
          method: "post",
          action: "/logout",
        });
        
      }



//VADIM SVE EVENTE I UTAKMICE KOJE IMAM DA BI IH PROSLEDIO DROPDOWN KOMPONENTI 
    useEffect(()=>{
        const kombinovana_l=[];
        let obj={};
        for (let i=0;i<props.events.length;i++){
              obj={
                name:props.events[i].name,
                id:props.events[i].id

              }
            
              kombinovana_l.push(obj);
          }
          setOptionsT(kombinovana_l);
      },[props.events]);

      // useEffect(()=>{
      //   const kombinovana_ll=[];
      //   for (let i=0;i<games.length;i++){
      //         kombinovana_ll.push(games[i].tim1+" VS "+games[i].tim2);
      //     }
      //     setOptionsG(kombinovana_ll);
      // },[games]);

      const getGames= (option) => {
        const kombinovana_ll=[];
        let obj={};
        for (let i=0;i<props.games.length;i++){
                if(props.games[i].event_id==option){
                  console.log("bitnooo uso");
                  obj={
                    name:props.games[i].tim1+" VS "+props.games[i].tim2,
                    id:props.games[i].id
                  }
              kombinovana_ll.push( obj);
                }
          }
          setOptionsG(kombinovana_ll);     
      }

        // OVE DVE FUNKCIJE SU ZA KLIK U DROPDOWN LISTI NA NEKI EVENT ILI UTAKMICU
        // PAMTIM KLIKNUTIM IDJEVE DA ZNAM ZA FILTIRNJE PODATAKA I PRIKAZ
      const turnamentIdHandler= (option) =>{
        const pronadjeniObjekti = props.events.filter(objekat => objekat.id == option);
        props.setIdTurnament(pronadjeniObjekti[0].id)
        getGames(pronadjeniObjekti[0].id);
        props.showTurnamentStatisticHandler();
        setshowGameDropdown(true);
        toggleMenu();
        // ovde pokrenuti skupljanje podataka koje utakmice sve postoje na turniru pomocu pronadjeniObjekti[0].id---turnament id 

      }
      const gameIdHandler= (option) =>{
        const pronadjeniObjekti = props.games.filter(objekat => objekat.id === option);
        console.log("bitnoo1",pronadjeniObjekti[0].id, option)
        // props.setIdTurnament(pronadjeniObjekti[0].id)
        props.setIdGame(pronadjeniObjekti[0].id)
        toggleMenu();
        props.showGameStatisticHandler();
      }
    return (
        <React.Fragment>
            <header className={styles.header}>
                <div className={ showMenu === false ? styles.header_div : styles.header_divOpen }>
                  {/* <h3>Menu</h3> */}
                  <button  onClick={props.showAddPlayerFormHandler}>PLAYER ACTION</button>
                  <button  onClick={props.showAddTurnamentFormHandler}>EVENT ACTION</button>
                  <button  onClick={props.showAddGameFormHandler}>GAME ACTION</button>
                  
                  {showGameDropdown && <Dropdown blinking={true} onClick={gameIdHandler} options={optionsG} title={"CHOOSE GAME"}></Dropdown>}
                  <Dropdown   onClick={turnamentIdHandler} options={optionsT} title={"CHOOSE EVENT"}></Dropdown>
                   {/* <button onClick={navigateHandler}  >LOGOUT</button>   */}
                   <button   >LOGOUT</button> 
                   {/* <button  onClick={navigateHandler} className={styles.logout}>LOGOUT<FontAwesomeIcon style={{marginLeft:'4px'}} size="xs" icon={faSignOut} border /></button> */}
                  {/* <Form action='/logout' method='post'>
                      <button className={styles.logout}>LOGOUT<FontAwesomeIcon style={{marginLeft:'4px'}} size="xs" icon={faSignOut} border /></button>
                </Form> */}
               </div>
              
               {/* <button className={styles.mobile} onClick={toggleMenu}>Trigerr</button> */}
               <button className={styles.mobile} onClick={toggleMenu}>
                    <FontAwesomeIcon size="" icon={faBars} border />
                </button>
            </header>
           
            <div className={styles['main-image']}>
                <img src={'./4k.jpg'} alt="bg" />
            </div>
        </React.Fragment>




    );
}

export default Header;
