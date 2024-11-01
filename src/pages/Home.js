import React, { useState, useCallback, useEffect } from "react";
import Header from "../components/Header.js";
import AddPlayerForm from "../components/AddPlayerForm/AddPlayerForm.js"
import AddGameForm from "../components/AddGameForm/AddGameForm.js";
import AddTurnamentForm from "../components/AddTurnamentForm/AddTurnamentForm.js";
import GameStatistic from "../components/GameStatistic/GameStatistic.js";
import EventStatistic from "../components/TurnamentStatistic/TurnamentStatistic.js"
import { getAllPlayers, getAllEvents,getAllMatches, getStatistics} from "../util/apiHandling.js";

const Home = () => {
  const [addPlayerFormIsShown, setAddPlayerFormIsShown] = useState(false);
  const [addGameFormIsShown, setAddGameFormIsShown] = useState(false);
  const [addTurnamentFormIsShown, setAddTurnamentFormIsShown] = useState(false);
  const[showGameStatitic,setShowGameStatistic]= useState(false);
  const[showTurnamentStatitic,setShowTurnamentStatistic]= useState(false);
  const[idTurnament,setIdTurnament]=useState(0);
  const[idGame,setIdGame]=useState(0);
  const[players,setPlayers]= useState([]);
  const [statistics,setStatistics] = useState([]);
  const [events,setEvents] = useState([]);
  const [games,setGames] = useState([]);


  const fetchPlayers = useCallback(async () => {
    const data = await getAllPlayers();
    console.log("players", data);
    const loadedPlayers = [];
    if (data) {
      data.forEach((player) => {
        loadedPlayers.push({
          id: player.id,
          name: player.name ? player.name : "Tica Zivic",
          birth: player.birth ? new Date(player.birth) : new Date("2001-06-01"),
          gk: player.gk ? player.gk : "false",
        });
      });
    }
    setPlayers(loadedPlayers);
  }, []);
  
   const fetchEvents = useCallback(async () => {
     const data = await getAllEvents();
     console.log("events", data);
     const loadedEvents = [];
     if (data) {
       data.forEach((event) => {
         loadedEvents.push({
           id: event.id,
           name: event.name,
           date: new Date(event.date),
         });
       });
     }
     setEvents(loadedEvents);
   }, []);

   const fetchGames = useCallback(async () => {
    const data = await getAllMatches();
    console.log("games", data);
    const loadedGames = [];
    if (data) {
      data.forEach((event) => {
        loadedGames.push({
        id:event.id,
        tim1:event.tim1,
        tim2:event.tim2,
        event_id:event.event_id,
        i_v_c1:event.i_v_c1,
        i_v_c2:event.i_v_c2,
        i_v_c3:event.i_v_c3,
        i_v_c4:event.i_v_c4,
        i_m_c1:event.i_m_c1,
        i_m_c2:event.i_m_c2,
        i_m_c3:event.i_m_c3,
        i_m_c4:event.i_m_c4,
        i_v_gc1:event.i_v_gc1,
        i_v_gc2:event.i_v_gc2,
        i_v_gc3:event.i_v_gc3,
        i_v_gc4:event.i_v_gc4,
        i_m_gc1:event.i_m_gc1,
        i_m_gc2:event.i_m_gc2,
        i_m_gc3:event.i_m_gc3,
        i_m_gc4:event.i_m_gc4,
        });
      });
    }
    setGames(loadedGames);
  }, []);

  const fetchStatistics = useCallback(async () => {
    const data = await getStatistics();
    console.log("statistics", data);
    const loadedStatistic = [];
    if (data) {
      data.forEach((event) => {
        loadedStatistic.push({
          id:event.id,
          gk:event.gk,
          id_player:event.id_player,
          name:event.name,
          gol_n:event.gol_n,
          penal_n:event.penal_n,
          centar_n:event.centar_n,
          spolja_n:event.spolja_n,
          izg_lopta_n:event.izg_lopta_n,
          pog_dodavanje_n:event.pog_dodavanje_n,
          kontrafaul_n:event.kontrafaul_n,
          sut_n:event.sut_n,
          spolja_centar_g_p:event.spolja_centar_g_p,
          i_vise_g_p:event.i_vise_g_p,
          penal_g_p:event.penal_g_p,
          centar_p:event.centar_p,
          spolja_p:event.spolja_p,
          penal_p:event.penal_p,
          osvojena_asis_p:event.osvojena_asis_p,
          coachBonus:event.coachBonus,
          efikasnost:event.efikasnost,
          sutevi:event.sutevi,
          odbrane:event.odbrane,
          prim_gol:event.prim_gol,
          id_game:event.id_game,
          id_event:event.id_event
        });
      });
    }
    setStatistics(loadedStatistic);
  }, []);
 // fetchPlayers();
  useEffect(()=>{
    fetchPlayers();
    console.log('players', players);
  },[fetchPlayers]);

  useEffect(()=>{
    fetchEvents();
    console.log('players', players);
  },[fetchEvents]);

  useEffect(()=>{
    fetchGames();
    console.log('players', players);
  },[fetchGames]);

  useEffect(()=>{
    fetchStatistics();
    console.log('players', players);
  },[fetchStatistics]);




  const addStatistics = (newStatistics) => {
    setStatistics([...statistics, ...newStatistics]);
  };
  const deleteStatistics = (id) => {
    console.log("markomarkoni");
    const novaLista = statistics.filter(statistic => statistic.id !== id);
    setStatistics(novaLista);
  };

  const addGame = (newGame) => {
    setGames([...games, newGame]);
  };
  const deleteGame = (id) => {
    console.log("markomarkoni");
    const novaLista = games.filter(game => game.id !== id);
    setGames(novaLista);
  };

 

  const showAddPlayerFormHandler = () => {
    setAddPlayerFormIsShown(true);
  };
  const hideAaddPlayerFormHandler = () => {
    setAddPlayerFormIsShown(false);
  };
  const showAddGameFormHandler = () => {
    setAddGameFormIsShown(true);
  };
  const hideAaddGameFormHandler = () => {
    setAddGameFormIsShown(false);
  };
  const showAddTurnamentFormHandler = () => {
    setAddTurnamentFormIsShown(true);
  };
  const hideAaddTurnamentFormHandler = () => {
    setAddTurnamentFormIsShown(false);
  };
  const showGameStatisticHandler = () => {
    setShowGameStatistic(true);
    setShowTurnamentStatistic(false);
  };
  const hideshowGameStatisticHandler = () => {
  

    setShowGameStatistic(false);
  
  
  };
  const showTurnamentStatisticHandler = () => {
    setShowTurnamentStatistic(true);
    setShowGameStatistic(false);
  };
  const hideshowTurnamentStatisticHandler = () => {
    setShowTurnamentStatistic(false);
  };

  return (
    <React.Fragment>
      <Header  events={events} games={games} setIdGame={setIdGame} setIdTurnament={setIdTurnament} showTurnamentStatisticHandler={showTurnamentStatisticHandler} showGameStatisticHandler={showGameStatisticHandler}showAddPlayerFormHandler={showAddPlayerFormHandler} showAddGameFormHandler={showAddGameFormHandler} showAddTurnamentFormHandler={showAddTurnamentFormHandler}
      ></Header>
      <main>
        {addPlayerFormIsShown && (
          <AddPlayerForm fetchPlayers={fetchPlayers} playersList={players} hideAddPlyerForm={hideAaddPlayerFormHandler} hideAddGameForm={hideAaddGameFormHandler} hideAddTurnamentForm={hideAaddTurnamentFormHandler}></AddPlayerForm>
        )}
        {addGameFormIsShown && (
          <AddGameForm  fetchGames={fetchGames} fetchStatistics={fetchStatistics} addStatistics={addStatistics} statistics={statistics} events={events} addGame={addGame} games={games} playersList={players} hideAddGameForm={hideAaddGameFormHandler} ></AddGameForm>
        )}
         {addTurnamentFormIsShown && (
          <AddTurnamentForm events={events} setIdGame={setIdGame} fetchEvents={fetchEvents} events_lenght={events.length}  hideAddTurnamentForm={hideAaddTurnamentFormHandler} ></AddTurnamentForm>
        )}
        {showGameStatitic && <GameStatistic fetchGames={fetchGames} fetchStatistics={fetchStatistics} games={games} idGame={idGame}  statistics={statistics} hideshowGameStatisticHandler={hideshowGameStatisticHandler}></GameStatistic>}
        {showTurnamentStatitic && <EventStatistic games={games} players={players} events={events} stat={statistics} idEvent={idTurnament} hideshowTurnamentStatisticHandler={hideshowTurnamentStatisticHandler}></EventStatistic>}
      </main>
    </React.Fragment>
  );
};

export default Home;
