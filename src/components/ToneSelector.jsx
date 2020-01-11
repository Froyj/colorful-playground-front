import React, { useState } from 'react';

const ToneSelector = ({ toneHandler }) => {
  const tones = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  const [tone, setTone] = useState("C");

  return (
    <select onChange={toneHandler}>
      {tones.map(tone => (
        <option value={tone}>{tone}</option>
      ))}
    </select>
  );
}

export default ToneSelector;