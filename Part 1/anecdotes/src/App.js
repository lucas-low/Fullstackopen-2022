import React from 'react';
import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  ];

  const [selected, setSelected] = useState(0);

  const [votes, setVotes] = useState(
    Array.apply(null, new Array(anecdotes.length)).fill(0)
  );
  const handleVotes = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  const mostVotes = () => votes.indexOf (Math.max(...votes));

  const random = () => Math.floor(Math.random() * (anecdotes.length));
  const handleNext = () => setSelected(random);
  console.log (selected)
  console.log (votes)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <button onClick={handleVotes}>Vote</button>
      <button onClick={handleNext}>Next anecdote</button>
      <h1>Anecdote with the most votes</h1>
      <div>{anecdotes[mostVotes()]}</div>
      <div>has {votes[mostVotes()]} votes</div>
    </div>
  );
};

export default App