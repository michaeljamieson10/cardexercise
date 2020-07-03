import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ProfileViewer = () => {
  
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState(null);
  const [cardN, setCardN] = useState(1);
  const [deckUrl, setDeckUrl] = useState(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
  const [cardUrl, setCardUrl] = useState(null);
  const [cardTimer, setCardTimer] = useState(false);
  const timerId = useRef(null);
  const timerId2 = useRef(null);

/** creates a deck */
  const getCard = () => {
    if(!cardTimer){
      setCardTimer(cardTimer => !cardTimer);
      setCardUrl(`https://deckofcardsapi.com/api/deck/${deck}/draw/`);
    }else{
      setCardTimer(true)
      stopTimers()
    }
  };
  useEffect(() => {
    console.log("LOADING DATA")
    async function loadProfile() {
      const res = await axios.get(deckUrl);
      setDeck(res.data.deck_id);
    }
    loadProfile();
    return () => console.log("CLEANING UP!")
  }, [])


///////////////////
      ///////
///////////////////
// try {
  // let drawRes = await axios.get(`${API_BASE_URL}/${deck_id}/draw/`);

  // if (drawRes.data.remaining === 0) {
  //   setAutoDraw(false);
  //   throw new Error("no cards remaining!");
  // }
useEffect(() => {
  if(cardTimer == true){
    timerId.current = setInterval(() => {
    console.log("LOADING DATA")
    async function loadProfile() {
      try {
      let drawRes = await axios.get(cardUrl);
       console.log(drawRes,' this is draw res')
        if (drawRes.data.remaining === 0) {
          setCardTimer(false);
          throw new Error("no cards remaining!");
        }
      setCard(drawRes.data.cards[0].code);
    }catch(err){
      alert(err)
    }}
    loadProfile();
    return () => { clearInterval(timerId.current); timerId2.current = null; }
  }, 1000) }}
  , [cardTimer, setCardTimer])

  useEffect(() => {
    if(cardTimer == true){
      timerId2.current = setInterval(() => {
    console.log("LOADING DATA")
    console.log(cardN, 'this is cardn')
    function loadProfile() {
        setCardN(cardN => cardN + 1)
    }
    loadProfile();
    return () => { clearInterval(timerId2.current); timerId2.current = null; }
  }, 1000) }}
  , [cardTimer,setCardTimer])
  
  function stopTimers() {
    
    clearInterval(timerId.current)
    clearInterval(timerId2.current)
    timerId.current = null;
    timerId2.current = null;
    setCardTimer(cardTimer => !cardTimer);
    return "done"
  }


  return (
    <>
    <h3>  {deck ? deck : 'Loading...'}</h3>
    <h3>  {cardN ? card : 'Loading...'}</h3>
    <h3>  {cardN ? cardN : () => 'Loading..'}</h3>
    <button onClick={() => getCard()}>
          {cardTimer ? "STOP" : "KEEP"} DRAWING FOR ME!
        </button>
    <button onClick={() => getCard()}>get card</button>
    </>
  )
};

export default ProfileViewer;