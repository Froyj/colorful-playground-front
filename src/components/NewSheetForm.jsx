import React, { useState } from 'react';

import ToneSelector from './ToneSelector'

const NewSheetForm = () => {
  const [trackName, setTrackName] = useState("");
  const [sheetFile, setSheetFile] = useState("");
  const [tone, setTone] = useState("C");

  const toneHandler = (event) => {
    const { tone } = event.target;
    setTone(tone);
  }

  return (
    <ToneSelector toneHandler={toneHandler} />
  );
}

export default NewSheetForm;