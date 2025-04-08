import { useState } from "react";

export default function Square() {
  const [values, setValues] = useState(Array(9).fill(null)); // one value per button
  const [turn, setTurn] = useState(0);
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // cols
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  function handleClick(index) {
    if (values[index]) return;

    const newValues = [...values];
    if (turn % 2 == 0) newValues[index] = "X";
    else newValues[index] = "O";

    setValues(newValues);
    setTurn(turn + 1);

    const winner = checkWinner(newValues);
    if (winner) alert(`${winner} has won!`);
  }

  function checkWinner(values) {
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (values[a] && values[a] === values[b] && values[a] === values[c]) {
        return values[a]; // either "X" or "O"
      }
    }
    return null;
  }

  const buttons = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      buttons.push(
        <button
          key={`${i}-${j}`}
          className="square"
          onClick={() => handleClick(index)}
        >
          {values[index]}
        </button>
      );
    }
  }

  return <div className="grid">{buttons}</div>;
}
