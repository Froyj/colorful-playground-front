import React, { useState, Fragment } from 'react';

import ToneSelector from './ToneSelector';
import Upload from './Upload/Upload'

const NewSheetForm = () => {
  const [trackName, setTrackName] = useState("");
  const [sheetFile, setSheetFile] = useState("");
  const [tone, setTone] = useState("C");

  const toneHandler = (event) => {
    const { selectedTone } = event.target;
    setTone(selectedTone);
  }

  return (
    <Fragment>
      <ToneSelector toneHandler={toneHandler} />
      <Upload />
    </Fragment>
  );
}

export default NewSheetForm;