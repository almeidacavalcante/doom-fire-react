import React, { useState, useEffect } from 'react';
import { produce } from 'immer';

import { Container } from './styles';

export default function Fire() {
  const [dataStructure, setDataStructure] = useState([]);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    propagateFire();
    if (!started) init()
  }, [started, dataStructure])

  const MAX_INTENSITY = 36
  const FIRE_LENGTH = 80;
  const FIRE_HEIGHT = 80;
  const BASE_DECAY = 4;
  const PALLETTE = [{ "r": 7, "g": 7, "b": 7 }, { "r": 31, "g": 7, "b": 7 }, { "r": 47, "g": 15, "b": 7 }, { "r": 71, "g": 15, "b": 7 }, { "r": 87, "g": 23, "b": 7 }, { "r": 103, "g": 31, "b": 7 }, { "r": 119, "g": 31, "b": 7 }, { "r": 143, "g": 39, "b": 7 }, { "r": 159, "g": 47, "b": 7 }, { "r": 175, "g": 63, "b": 7 }, { "r": 191, "g": 71, "b": 7 }, { "r": 199, "g": 71, "b": 7 }, { "r": 223, "g": 79, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 103, "b": 15 }, { "r": 207, "g": 111, "b": 15 }, { "r": 207, "g": 119, "b": 15 }, { "r": 207, "g": 127, "b": 15 }, { "r": 207, "g": 135, "b": 23 }, { "r": 199, "g": 135, "b": 23 }, { "r": 199, "g": 143, "b": 23 }, { "r": 199, "g": 151, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 175, "b": 47 }, { "r": 183, "g": 175, "b": 47 }, { "r": 183, "g": 183, "b": 47 }, { "r": 183, "g": 183, "b": 55 }, { "r": 207, "g": 207, "b": 111 }, { "r": 223, "g": 223, "b": 159 }, { "r": 239, "g": 239, "b": 199 }, { "r": 255, "g": 255, "b": 255 }]

  function createColorPalette(value) {

  }

  const translateHexToRGB = (hexList) => {
    if (hexList.length === 0) return;

    const pallette = [];

    hexList.forEach(hex => {
      if (hex[0] === '#') {
        const hexSanitized = hex.substr(1);

        const size = hexSanitized.length / 3

        const rHex = hexSanitized.slice(0, size);
        const gHex = hexSanitized.slice(size, size + 2);
        const bHex = hexSanitized.slice(size + 2, size + 4);

        const r = parseInt(rHex, 16);
        const g = parseInt(gHex, 16);
        const b = parseInt(bHex, 16);

        pallette.push({ "r": r, "g": g, "b": b, });
      };
    })
  }


  const init = () => {
    const row = new Array(FIRE_LENGTH);
    row.fill(0);

    const newStructure = new Array(FIRE_HEIGHT);
    newStructure.fill(row);

    setStarted(true);
    setDataStructure(newStructure);
  }

  const renderStructure = () => {
    return (
      <table>
        <tbody>
          {
            dataStructure.map((row, i) => {
              return (
                <tr key={i}>
                  {row.map((col, j) => {
                    return (
                      <td key={i.toString().concat(j)} style={{ backgroundColor: `rgb(${PALLETTE[col].r}, ${PALLETTE[col].g}, ${PALLETTE[col].b}` }}>

                      </td>
                    )
                  })}
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }

  const propagateFire = () => {
    const newRows = produce(dataStructure, (draft => {
      for (let row = 0; row < draft.length; row++) {
        const rowArray = draft[row];

        for (let col = 0; col < rowArray.length; col++) {
          const bellowIntensity = getBellowFireIntensity(row, col, draft);
          const intensity = calculateNextIntensity(bellowIntensity);
          const random = Math.random();
          let addition = 0
          if (random < 0.3) {
            addition = Math.floor(Math.random() * 3);
          }

          const currentRow = (row - addition) >= 0 ? (row - addition) : row;
          const currentCol = (col - addition) >= 0 ? (col - addition) : col;

          draft[currentRow][currentCol] = intensity;
        }
      }
    }));

    setDataStructure(newRows);
  }

  const calculateNextIntensity = (bellowIntensity) => {
    const decay = Math.floor(Math.random() * BASE_DECAY);
    return (bellowIntensity <= 0) ? 0 : (bellowIntensity - decay) < 0 ? 0 : bellowIntensity - decay;
  }

  const getBellowFireIntensity = (row, col, arrayRows) => {
    if (row === FIRE_HEIGHT - 1) return MAX_INTENSITY;
    return arrayRows[row + 1][col];
  }

  return (
    <Container id='fire-container'>
      {renderStructure()}
      {translateHexToRGB(['#123123', '#FFF'])}
      {createColorPalette(2)}
    </Container>
  );
}
