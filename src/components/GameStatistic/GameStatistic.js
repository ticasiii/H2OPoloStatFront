import React, { useState } from "react";
import styles from "./GameStatistic.module.css";
import GameStatisticCard from "./GameStatisticCard.js";
import { useEffect } from "react";
import { updateStatistics,updateMatches } from "../../util/apiHandling.js";

const GameStatistic = (props) => {
 
  
  const [stat,setStat]=useState([]);
  const [game,setGame]=useState({});

 
  //FILTRIRANJE  PODATKA / OVO JE MOZDA BOLJE KROZ BAZU DA SE TRAZE PODACI SA ODGOVARAJUCIM ID
  useEffect(()=>{
    
    
    const filteredStat = props.statistics.filter(stat => stat.id_game == props.idGame);
    const filteredGame = props.games.filter(game => game.id == props.idGame);
    setStat(filteredStat);
    setGame(filteredGame[0]);
    console.log("Petra",props.idGame,stat,game);
    
  },[props.idGame,props.statistics, props.games]);


  // OVE FUNKCIJE REGULISU POVECAVANJE I SMANJIVANJE VREDNOSTI U TABELI (TREBA DA ODLUCIMO STA CEMO )
  const handleChangePlyersList =(index,field,novaVrednost)=>{
    const novaLista=[...stat];
    novaLista[index][field]=novaVrednost;
    novaLista[index]['efikasnost']=calculateEfikasnost(index);
    setStat(novaLista);
    calculateSuma(index);
    
    calculateKoficijent(index);
  }

  const ChangePlyersList =(index,field, flag)=>{
    const novaLista=[...stat];
    if (flag=="minus"){
    novaLista[index][field]--;
    }
    if (flag=="plus"){
      novaLista[index][field]++;
      }
    novaLista[index]['efikasnost']=calculateEfikasnost(index);
    setStat(novaLista);
    calculateSuma(index);
    //calculateEfikasnost(index);
    calculateKoficijent(index);
  }
  const handlerOnClick = (index,field) => {
    const novaLista=[...stat];
    novaLista[index][field]++;
    novaLista[index]['efikasnost']=calculateEfikasnost(index);
    setStat(novaLista);
    calculateSuma(index);
    //calculateEfikasnost(index);
    calculateKoficijent(index);
  }
  const handlerOnDoubleClick = (index,field) => {
    console.log("okida se ");
    const novaLista=[...stat];
    novaLista[index][field]--;
    setStat(novaLista);
    calculateSuma(index);
    calculateEfikasnost(index);
    calculateKoficijent(index);
  }

//************************************************************************************************* */
//OVO JE ZA SREDNJU TABELU VISE MANJE 
  const handleChangeGameList =(field,vrednost)=>{


   
    setGame({...game,[field]:vrednost});
    // console.log("novalista", novaLista[field],novaVrednost,field);
    // novaLista[field]=novaVrednost;
    // setGameList(novaLista);
    // console.log("novalista",gameList);
  }

  // ZA GOLAME 
  const handleChangeGolkeeperList =(index,field,flag)=>{
    // const novaLista=[...stat];
    // novaLista[index][field]=novaVrednost;
    const novaLista=[...stat];
    if (flag=="minus"){
    novaLista[index][field]--;
    }
    if (flag=="plus"){
      novaLista[index][field]++;
      }
    setStat(novaLista);
    calculateEfikasnostGK(index)

  }

  //OVO SU POMOCNE FUNKCIJE KOJE RACUNAJU ONA POLJA U TABELI KOJA TREBA AUTOMATSKI DA SE MENJAJU 
  //OVE JEDNACINE SAM IZVLACIO IZ ONE EXCELTABELE KOJU SI MI BIO POSLE DA GLEDAM PISAO SAM IH BAS KAKO STO JE TAMO DA NE BI BILO NEKIH GRESAKA
  const calculateSuma =(index)=>{
    const x=stat[index]
    const suma=(x.gol_n*-1)+(x.penal_n*-0.8)+(x.centar_n*-0.2)+(x.spolja_n*-0.5)+(x.izg_lopta_n*-0.1)+(x.pog_dodavanje_n*-0.1)+(x.kontrafaul_n*-0.1)+(x.sut_n*-0.1)+(x.spolja_centar_g_p*1)+(x.i_vise_g_p*0.5)+(x.penal_g_p*0.3)+(x.centar_p*0.2)+(x.spolja_p*0.5)+(x.penal_p*0.8)+(x.osvojena_asis_p*0.1);
    console.log(suma);
    return suma.toFixed(1);    
}
    const calculateKoficijent =(index)=>{
        const suma=calculateSuma(index);
        const kof=((1.71*suma)+7)/3;
        return kof.toFixed(1);
    }

    const calculateEfikasnost=(index)=>{
       console.log("mnogo bitno");
       const kof=calculateKoficijent(index);
       const  ef=parseFloat(kof) + stat[index].coachBonus;
        return ef.toFixed(1);
    }
     
    const calculateProsek=(pom)=>{
        let rez=0;
        if(pom=='manje'){
            rez=(game.i_m_gc1+game.i_m_gc2+game.i_m_gc3+game.i_m_gc4)/(game.i_m_c1+game.i_m_c2+game.i_m_c3+game.i_m_c4)
            rez=1-rez;
        }
        else{
            rez=(game.i_v_gc1+game.i_v_gc2+game.i_v_gc3+game.i_v_gc4)/(game.i_v_c1+game.i_v_c2+game.i_v_c3+game.i_v_c4)
        }
        //console.log("rez",(game.i_v_gc1+game.i_v_gc2+game.i_v_gc3+game.i_v_gc4)/(game.i_v_c1+game.i_v_c2+game.i_v_c3+game.i_v_c4));
        return (rez*100).toFixed(2);
     }
     const calculateEfikasnostGK=(index)=>{
       const gk=stat[index];
         return  ((gk.odbrane/(gk.prim_gol+gk.odbrane))*100).toFixed(2);
     }
     useEffect(()=>{
      
    },[]);

     const Close = () => {
       const proceed = window.confirm(
         "Are you sure you want to close without saving?"
       );

       if (proceed) {
         props.hideshowGameStatisticHandler();
       }
     };
     const Save = () => {
       stat.forEach((stat) => {
         updateStatistics(stat);
       });
       console.log("tihomir", game);
       
       updateMatches(game);
       props.fetchGames();
       props.fetchStatistics();
       props.hideshowGameStatisticHandler();
     };
    
  return (
   
    <section className={styles.gameStatistic}>
    <button  style={{marginBottom:"1rem"}} onClick={Close}>Close</button>
    <button  style={{marginBottom:"1rem", marginLeft:'1rem'}} onClick={Save}>Save</button>
      <GameStatisticCard>
        <table className={styles.table}>
            <thead>
          <tr>
            <th className={styles.No}>No</th>
            <th>Full name</th>
            <th className={styles.negativ}>GOAL 1:1</th>
            <th className={styles.negativ}>PENATY</th>
            <th className={styles.negativ}>CENTER</th>
            <th className={styles.negativ}>OUTSIDE</th>
            <th className={styles.negativ}>LOOSE BALL</th>
            <th className={styles.negativ}>WRONG PASS</th>
            <th className={styles.negativ}>COUNTER FOUL</th>
            <th className={styles.negativ}>SHOT/CHANCE</th>
            <th className={styles.positiv}>OUTSIDE-CENTER</th>
            <th className={styles.positiv}>EXTRA PLAYER</th>
            <th className={styles.positiv}>PENALTY</th>
            <th className={styles.positiv}>CENTER</th>
            <th className={styles.positiv}>OUTSIDE</th>
            <th className={styles.positiv}>PENALTY</th>
            <th className={styles.positiv}>BALL WON /ASS</th>
            <th>SUM</th>
            <th>COEFFICIENT</th>
            <th>COACH BONUS</th>
            <th>EFFICIENCY</th>
          </tr>
          </thead>
          <tbody>
            {/* {dummy} */}
          {stat.map((val, key) => {
            if (val.gk==false){
            return (
              <tr key={key}>
                <td className={styles.No}>{key}</td>
                <td>{val.name}</td>
                {/* <td><input type="number" value={val.gol_n} key={key} onChange={(e)=> handleChangePlyersList(key,"gol_n",parseInt(e.target.value,10))}></input></td> */}
                <td  onDoubleClick={()=> handlerOnDoubleClick(key,"gol_n")} onClick={()=> handlerOnClick(key,"gol_n")}><label  key={key}> {val.gol_n} </label></td>

                {/* <td><div style={{display:'flex', height:'100%'}}><div className={styles.minus} onClick={()=>ChangePlyersList(key,"gol_n","minus")}>-</div><label  className={styles.label} key={key}>{val.gol_n}</label><div className={styles.plus}  onClick={()=>ChangePlyersList(key,"gol_n","plus")}>+</div></div></td> */}
                {/* <td><input type="number" value={val.penal_n} key={key} onChange={(e)=> handleChangePlyersList(key,"penal_n",parseInt(e.target.value,10))}></input></td> */}
                <td><div style={{display:'flex', height:'100%'}}><div className={styles.minus} onClick={()=>ChangePlyersList(key,"penal_n","minus")}>-</div><label  className={styles.label} key={key}>{val.penal_n}</label><div className={styles.plus}  onClick={()=>ChangePlyersList(key,"penal_n","plus")}>+</div></div></td>
                
                {/* <td><input type="number" value={val.centar_n} key={key} onChange={(e)=> handleChangePlyersList(key,"centar_n",parseInt(e.target.value,10))}></input></td>
                <td><input type="number" value={val.spolja_n} key={key} onChange={(e)=> handleChangePlyersList(key,"spolja_n",parseInt(e.target.value,10))}></input></td>
                <td><input type="number" value={val.izg_lopta_n} key={key} onChange={(e)=> handleChangePlyersList(key,"izg_lopta_n",parseInt(e.target.value,10))}></input></td>
                <td><input type="number" value={val.pog_dodavanje_n} key={key} onChange={(e)=> handleChangePlyersList(key,"pog_dodavanje_n",parseInt(e.target.value,10))}></input></td>
                <td><input type="number" value={val.kontrafaul_n} key={key} onChange={(e)=> handleChangePlyersList(key,"kontrafaul_n",parseInt(e.target.value,10))}></input></td>
                <td><input type="number" value={val.sut_n} key={key} onChange={(e)=> handleChangePlyersList(key,"sut_n",parseInt(e.target.value,10))}></input></td>
                <td><input type="number" value={val.spolja_centar_g_p} key={key} onChange={(e)=> handleChangePlyersList(key,"spolja_centar_g_p",parseInt(e.target.value,10))}></input></td>
                <td><input type="number" value={val.i_vise_g_p} key={key} onChange={(e)=> handleChangePlyersList(key,"i_vise_g_p",parseInt(e.target.value,10))}></input></td>
                <td><input type="number" value={val.penal_g_p} key={key} onChange={(e)=> handleChangePlyersList(key,"penal_g_p",parseInt(e.target.value,10))}></input></td>
                <td><input type="number" value={val.centar_p} key={key} onChange={(e)=> handleChangePlyersList(key,"centar_p",parseInt(e.target.value,10))}></input></td>
                <td><input type="number" value={val.spolja_p} key={key} onChange={(e)=> handleChangePlyersList(key,"spolja_p",parseInt(e.target.value,10))}></input></td>
                <td><input type="number" value={val.penal_p} key={key} onChange={(e)=> handleChangePlyersList(key,"penal_p",parseInt(e.target.value,10))}></input></td>
                <td><input type="number" value={val.osvojena_asis_p} key={key} onChange={(e)=> handleChangePlyersList(key,"osvojena_asis_p",parseInt(e.target.value,10))}></input></td>
                <td><input type="text"  key={key} value={calculateSuma(key)}></input></td>
                <td><input type="text"  key={key} value={calculateKoficijent(key)} ></input></td>
                <td><input type="number" value={val.coachBonus} key={key} onChange={(e)=> handleChangePlyersList(key,"coachBonus",parseInt(e.target.value,10))}></input></td>
                <td><input type="text"  key={key} value={calculateEfikasnost(key)}></input></td> */}
                
               

<td>
  <div style={{ display: 'flex', height: '100%' }}>
    <div className={styles.minus} onClick={() => ChangePlyersList(key, "centar_n", "minus")}>-</div>
    <label className={styles.label} key={key}>{val.centar_n}</label>
    <div className={styles.plus} onClick={() => ChangePlyersList(key, "centar_n", "plus")}>+</div>
  </div>
</td>

<td>
  <div style={{ display: 'flex', height: '100%' }}>
    <div className={styles.minus} onClick={() => ChangePlyersList(key, "spolja_n", "minus")}>-</div>
    <label className={styles.label} key={key}>{val.spolja_n}</label>
    <div className={styles.plus} onClick={() => ChangePlyersList(key, "spolja_n", "plus")}>+</div>
  </div>
</td>

<td>
  <div style={{ display: 'flex', height: '100%' }}>
    <div className={styles.minus} onClick={() => ChangePlyersList(key, "izg_lopta_n", "minus")}>-</div>
    <label className={styles.label} key={key}>{val.izg_lopta_n}</label>
    <div className={styles.plus} onClick={() => ChangePlyersList(key, "izg_lopta_n", "plus")}>+</div>
  </div>
</td>

<td>
  <div style={{ display: 'flex', height: '100%' }}>
    <div className={styles.minus} onClick={() => ChangePlyersList(key, "pog_dodavanje_n", "minus")}>-</div>
    <label className={styles.label} key={key}>{val.pog_dodavanje_n}</label>
    <div className={styles.plus} onClick={() => ChangePlyersList(key, "pog_dodavanje_n", "plus")}>+</div>
  </div>
</td>

<td>
  <div style={{ display: 'flex', height: '100%' }}>
    <div className={styles.minus} onClick={() => ChangePlyersList(key, "kontrafaul_n", "minus")}>-</div>
    <label className={styles.label} key={key}>{val.kontrafaul_n}</label>
    <div className={styles.plus} onClick={() => ChangePlyersList(key, "kontrafaul_n", "plus")}>+</div>
  </div>
</td>

<td>
  <div style={{ display: 'flex', height: '100%' }}>
    <div className={styles.minus} onClick={() => ChangePlyersList(key, "sut_n", "minus")}>-</div>
    <label className={styles.label} key={key}>{val.sut_n}</label>
    <div className={styles.plus} onClick={() => ChangePlyersList(key, "sut_n", "plus")}>+</div>
  </div>
</td>

<td>
  <div style={{ display: 'flex', height: '100%' }}>
    <div className={styles.minus} onClick={() => ChangePlyersList(key, "spolja_centar_g_p", "minus")}>-</div>
    <label className={styles.label} key={key}>{val.spolja_centar_g_p}</label>
    <div className={styles.plus} onClick={() => ChangePlyersList(key, "spolja_centar_g_p", "plus")}>+</div>
  </div>
</td>

<td>
  <div style={{ display: 'flex', height: '100%' }}>
    <div className={styles.minus} onClick={() => ChangePlyersList(key, "i_vise_g_p", "minus")}>-</div>
    <label className={styles.label} key={key}>{val.i_vise_g_p}</label>
    <div className={styles.plus} onClick={() => ChangePlyersList(key, "i_vise_g_p", "plus")}>+</div>
  </div>
</td>

<td>
  <div style={{ display: 'flex', height: '100%' }}>
    <div className={styles.minus} onClick={() => ChangePlyersList(key, "penal_g_p", "minus")}>-</div>
    <label className={styles.label} key={key}>{val.penal_g_p}</label>
    <div className={styles.plus} onClick={() => ChangePlyersList(key, "penal_g_p", "plus")}>+</div>
  </div>
</td>

<td>
  <div style={{ display: 'flex', height: '100%' }}>
    <div className={styles.minus} onClick={() => ChangePlyersList(key, "centar_p", "minus")}>-</div>
    <label className={styles.label} key={key}>{val.centar_p}</label>
    <div className={styles.plus} onClick={() => ChangePlyersList(key, "centar_p", "plus")}>+</div>
  </div>
</td>

<td>
  <div style={{ display: 'flex', height: '100%' }}>
    <div className={styles.minus} onClick={() => ChangePlyersList(key, "spolja_p", "minus")}>-</div>
    <label className={styles.label} key={key}>{val.spolja_p}</label>
    <div className={styles.plus} onClick={() => ChangePlyersList(key, "spolja_p", "plus")}>+</div>
  </div>
</td>

<td>
  <div style={{ display: 'flex', height: '100%' }}>
    <div className={styles.minus} onClick={() => ChangePlyersList(key, "penal_p", "minus")}>-</div>
    <label className={styles.label} key={key}>{val.penal_p}</label>
    <div className={styles.plus} onClick={() => ChangePlyersList(key, "penal_p", "plus")}>+</div>
  </div>
</td>

<td>
  <div style={{ display: 'flex', height: '100%' }}>
    <div className={styles.minus} onClick={() => ChangePlyersList(key, "osvojena_asis_p", "minus")}>-</div>
    <label className={styles.label} key={key}>{val.osvojena_asis_p}</label>
    <div className={styles.plus} onClick={() => ChangePlyersList(key, "osvojena_asis_p", "plus")}>+</div>
  </div>
</td>
<td><input type="text"  key={key} value={calculateSuma(key)}></input></td>
                <td><input type="text"  key={key} value={calculateKoficijent(key)} ></input></td>
<td>
  <div style={{ display: 'flex', height: '100%' }}>
    <div className={styles.minus} onClick={() => ChangePlyersList(key, "coachBonus", "minus")}>-</div>
    <label className={styles.label} key={key}>{val.coachBonus}</label>
    <div className={styles.plus} onClick={() => ChangePlyersList(key, "coachBonus", "plus")}>+</div>
  </div>
</td>

                <td><input type="text"  key={key} value={calculateEfikasnost(key)}></input></td>
              </tr>
            );
            }
          })}
          </tbody>
        </table>
        <table className={styles.table2}>
            <thead>
          <tr>
          <th>extra/less</th>
            <th>1q</th>
            <th>2q</th>
            <th>3q</th>
            <th>4q</th>
            <th>percentage</th>
          </tr>
          </thead>
          <tbody>
          {/* <tr>
            <td>extra</td>
            <td><input type="number" name='i_v_c1' value={game.i_v_c1}  onChange={(e)=> handleChangeGameList(e.target.name,parseInt(e.target.value,10))}></input></td>
            <td><input type="number" name='i_v_c1' value={game.i_v_c2}  onChange={(e)=> handleChangeGameList("i_v_c2",parseInt(e.target.value,10))}></input></td>
            <td><input type="number" name='i_v_c1' value={game.i_v_c3}  onChange={(e)=> handleChangeGameList("i_v_c3",parseInt(e.target.value,10))}></input></td>
            <td><input type="number" name='i_v_c1' value={game.i_v_c4}  onChange={(e)=> handleChangeGameList("i_v_c4",parseInt(e.target.value,10))}></input></td>
            <td>{calculateProsek('vise')}%</td>
          </tr> */}
          {/* <tr>
            <td>extra/goal</td>
            <td><input type="number" name='i_v_c1' value={game.i_v_gc1}  onChange={(e)=> handleChangeGameList("i_v_gc1",parseInt(e.target.value,10))}></input></td>
            <td><input type="number" name='i_v_c1' value={game.i_v_gc2}  onChange={(e)=> handleChangeGameList("i_v_gc2",parseInt(e.target.value,10))}></input></td>
            <td><input type="number" name='i_v_c1' value={game.i_v_gc3}  onChange={(e)=> handleChangeGameList("i_v_gc3",parseInt(e.target.value,10))}></input></td>
            <td><input type="number" name='i_v_c1' value={game.i_v_gc4}  onChange={(e)=> handleChangeGameList("i_v_gc4",parseInt(e.target.value,10))}></input></td>
             <td><input type="number" value={gameList.i_v_gc1}  onChange={(e)=> handleChangeGameList("i_v_c1",parseInt(e.target.value,10))}></input></td> 
          </tr> */}
          {/* <tr>
            <td>less</td>
            <td><input type="number" name='i_v_c1' value={game.i_m_c1}  onChange={(e)=> handleChangeGameList("i_m_c1",parseInt(e.target.value,10))}></input></td>
            <td><input type="number" name='i_v_c1' value={game.i_m_c2}  onChange={(e)=> handleChangeGameList("i_m_c2",parseInt(e.target.value,10))}></input></td>
            <td><input type="number" name='i_v_c1' value={game.i_m_c3}  onChange={(e)=> handleChangeGameList("i_m_c3",parseInt(e.target.value,10))}></input></td>
            <td><input type="number" name='i_v_c1' value={game.i_m_c4}  onChange={(e)=> handleChangeGameList("i_m_c4",parseInt(e.target.value,10))}></input></td>
            <td>{calculateProsek('manje')}%</td> 
          </tr> */}
          {/* <tr>
            <td>less/goal</td>
            <td><input type="number" value={game.i_m_gc1}  onChange={(e)=> handleChangeGameList("i_m_gc1",parseInt(e.target.value,10))}></input></td>
            <td><input type="number" value={game.i_m_gc2}  onChange={(e)=> handleChangeGameList("i_m_gc2",parseInt(e.target.value,10))}></input></td>
            <td><input type="number" value={game.i_m_gc3}  onChange={(e)=> handleChangeGameList("i_m_gc3",parseInt(e.target.value,10))}></input></td>
            <td><input type="number" value={game.i_m_gc4}  onChange={(e)=> handleChangeGameList("i_m_gc4",parseInt(e.target.value,10))}></input></td>
            <td></td> 
          </tr> */}
    <tr>
    <td>extra</td>
    <td>
      <div style={{ display: 'flex', height: '100%' }}>
        <div className={styles.minus} onClick={() => handleChangeGameList("i_v_c1", game.i_v_c1 - 1)}>-</div>
        <label className={styles.label}>{game.i_v_c1}</label>
        <div className={styles.plus} onClick={() => handleChangeGameList("i_v_c1", game.i_v_c1 + 1)}>+</div>
      </div>
    </td>
    <td>
      <div style={{ display: 'flex', height: '100%' }}>
        <div className={styles.minus} onClick={() => handleChangeGameList("i_v_c2", game.i_v_c2 - 1)}>-</div>
        <label className={styles.label}>{game.i_v_c2}</label>
        <div className={styles.plus} onClick={() => handleChangeGameList("i_v_c2", game.i_v_c2 + 1)}>+</div>
      </div>
    </td>
    <td>
      <div style={{ display: 'flex', height: '100%' }}>
        <div className={styles.minus} onClick={() => handleChangeGameList("i_v_c3", game.i_v_c3 - 1)}>-</div>
        <label className={styles.label}>{game.i_v_c3}</label>
        <div className={styles.plus} onClick={() => handleChangeGameList("i_v_c3", game.i_v_c3 + 1)}>+</div>
      </div>
    </td>
    <td>
      <div style={{ display: 'flex', height: '100%' }}>
        <div className={styles.minus} onClick={() => handleChangeGameList("i_v_c4", game.i_v_c4 - 1)}>-</div>
        <label className={styles.label}>{game.i_v_c4}</label>
        <div className={styles.plus} onClick={() => handleChangeGameList("i_v_c4", game.i_v_c4 + 1)}>+</div>
      </div>
    </td>
    <td>{calculateProsek('vise')}%</td>
  </tr>

  <tr>
    <td>extra/goal</td>
    <td>
      <div style={{ display: 'flex', height: '100%' }}>
        <div className={styles.minus} onClick={() => handleChangeGameList("i_v_gc1", game.i_v_gc1 - 1)}>-</div>
        <label className={styles.label}>{game.i_v_gc1}</label>
        <div className={styles.plus} onClick={() => handleChangeGameList("i_v_gc1", game.i_v_gc1 + 1)}>+</div>
      </div>
    </td>
    <td>
      <div style={{ display: 'flex', height: '100%' }}>
        <div className={styles.minus} onClick={() => handleChangeGameList("i_v_gc2", game.i_v_gc2 - 1)}>-</div>
        <label className={styles.label}>{game.i_v_gc2}</label>
        <div className={styles.plus} onClick={() => handleChangeGameList("i_v_gc2", game.i_v_gc2 + 1)}>+</div>
      </div>
    </td>
    <td>
      <div style={{ display: 'flex', height: '100%' }}>
        <div className={styles.minus} onClick={() => handleChangeGameList("i_v_gc3", game.i_v_gc3 - 1)}>-</div>
        <label className={styles.label}>{game.i_v_gc3}</label>
        <div className={styles.plus} onClick={() => handleChangeGameList("i_v_gc3", game.i_v_gc3 + 1)}>+</div>
      </div>
    </td>
    <td>
      <div style={{ display: 'flex', height: '100%' }}>
        <div className={styles.minus} onClick={() => handleChangeGameList("i_v_gc4", game.i_v_gc4 - 1)}>-</div>
        <label className={styles.label}>{game.i_v_gc4}</label>
        <div className={styles.plus} onClick={() => handleChangeGameList("i_v_gc4", game.i_v_gc4 + 1)}>+</div>
      </div>
    </td>
    <td></td>
  </tr>

  <tr>
    <td>less</td>
    <td>
      <div style={{ display: 'flex', height: '100%' }}>
        <div className={styles.minus} onClick={() => handleChangeGameList("i_m_c1", game.i_m_c1 - 1)}>-</div>
        <label className={styles.label}>{game.i_m_c1}</label>
        <div className={styles.plus} onClick={() => handleChangeGameList("i_m_c1", game.i_m_c1 + 1)}>+</div>
      </div>
    </td>
    <td>
      <div style={{ display: 'flex', height: '100%' }}>
        <div className={styles.minus} onClick={() => handleChangeGameList("i_m_c2", game.i_m_c2 - 1)}>-</div>
        <label className={styles.label}>{game.i_m_c2}</label>
        <div className={styles.plus} onClick={() => handleChangeGameList("i_m_c2", game.i_m_c2 + 1)}>+</div>
      </div>
    </td>
    <td>
      <div style={{ display: 'flex', height: '100%' }}>
        <div className={styles.minus} onClick={() => handleChangeGameList("i_m_c3", game.i_m_c3 - 1)}>-</div>
        <label className={styles.label}>{game.i_m_c3}</label>
        <div className={styles.plus} onClick={() => handleChangeGameList("i_m_c3", game.i_m_c3 + 1)}>+</div>
      </div>
    </td>
    <td>
      <div style={{ display: 'flex', height: '100%' }}>
        <div className={styles.minus} onClick={() => handleChangeGameList("i_m_c4", game.i_m_c4 - 1)}>-</div>
        <label className={styles.label}>{game.i_m_c4}</label>
        <div className={styles.plus} onClick={() => handleChangeGameList("i_m_c4", game.i_m_c4 + 1)}>+</div>
      </div>
    </td>
    <td>{calculateProsek('manje')}%</td>
  </tr>

  <tr>
    <td>less/goal</td>
    <td>
      <div style={{ display: 'flex', height: '100%' }}>
        <div className={styles.minus} onClick={() => handleChangeGameList("i_m_gc1", game.i_m_gc1 - 1)}>-</div>
        <label className={styles.label}>{game.i_m_gc1}</label>
        <div className={styles.plus} onClick={() => handleChangeGameList("i_m_gc1", game.i_m_gc1 + 1)}>+</div>
      </div>
    </td>
    <td>
      <div style={{ display: 'flex', height: '100%' }}>
        <div className={styles.minus} onClick={() => handleChangeGameList("i_m_gc2", game.i_m_gc2 - 1)}>-</div>
        <label className={styles.label}>{game.i_m_gc2}</label>
        <div className={styles.plus} onClick={() => handleChangeGameList("i_m_gc2", game.i_m_gc2 + 1)}>+</div>
      </div>
    </td>
    <td>
      <div style={{ display: 'flex', height: '100%' }}>
        <div className={styles.minus} onClick={() => handleChangeGameList("i_m_gc3", game.i_m_gc3 - 1)}>-</div>
        <label className={styles.label}>{game.i_m_gc3}</label>
        <div className={styles.plus} onClick={() => handleChangeGameList("i_m_gc3", game.i_m_gc3 + 1)}>+</div>
      </div>
    </td>
    <td>
      <div style={{ display: 'flex', height: '100%' }}>
        <div className={styles.minus} onClick={() => handleChangeGameList("i_m_gc4", game.i_m_gc4 - 1)}>-</div>
        <label className={styles.label}>{game.i_m_gc4}</label>
        <div className={styles.plus} onClick={() => handleChangeGameList("i_m_gc4", game.i_m_gc4 + 1)}>+</div>
      </div>
    </td>
    <td></td>
  </tr>
        </tbody>
        </table>
        <table className={styles.table}>
            <thead>
          <tr>
          <th>No</th>
            <th>Full name</th>
            <th>SHOOTS</th>
            <th>CONC.GOAL</th>
            <th>SAVES</th>
            <th>EFFICIENCY</th>
          </tr>
          </thead>
          <tbody>
          {stat.map((val, key) => {
            if(val.gk==true){
            return (
              <tr key={key}>
                <td>{key}</td>
                <td>{val.name}</td>
                {/* <td><input type="number" value={val.sutevi} key={key} onChange={(e)=> handleChangeGolkeeperList(key, "sutevi",parseInt(e.target.value,10))}></input></td>
                <td><input type="number" value={val.prim_gol} key={key} onChange={(e)=> handleChangeGolkeeperList(key,"prim_gol",parseInt(e.target.value,10))}></input></td>
                <td><input type="number" value={val.odbrane} key={key} onChange={(e)=> handleChangeGolkeeperList(key,"odbrane",parseInt(e.target.value,10))}></input></td> */}
                
                <td>
  <div style={{ display: 'flex', height: '100%' }}>
    <div className={styles.minus} onClick={() => handleChangeGolkeeperList(key, "sutevi", "minus")}>-</div>
    <label className={styles.label} key={key}>{val.sutevi}</label>
    <div className={styles.plus} onClick={() => handleChangeGolkeeperList(key, "sutevi", "plus")}>+</div>
  </div>
</td>
<td>
  <div style={{ display: 'flex', height: '100%' }}>
    <div className={styles.minus} onClick={() => handleChangeGolkeeperList(key, "prim_gol", "minus")}>-</div>
    <label className={styles.label} key={key}>{val.prim_gol}</label>
    <div className={styles.plus} onClick={() => handleChangeGolkeeperList(key, "prim_gol", "plus")}>+</div>
  </div>
</td>
<td>
  <div style={{ display: 'flex', height: '100%' }}>
    <div className={styles.minus} onClick={() => handleChangeGolkeeperList(key, "odbrane", "minus")}>-</div>
    <label className={styles.label} key={key}>{val.odbrane}</label>
    <div className={styles.plus} onClick={() => handleChangeGolkeeperList(key, "odbrane", "plus")}>+</div>
  </div>
</td>
<td>{calculateEfikasnostGK(key) === NaN ? " " : `${calculateEfikasnostGK(key)}%`}</td>
    
              </tr>
            );
            }
          })}
          </tbody>
        </table>
      </GameStatisticCard>
    </section>
  );
};
export default GameStatistic;
