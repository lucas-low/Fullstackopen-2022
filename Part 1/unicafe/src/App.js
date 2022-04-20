import React from 'react';
import { useState } from 'react'

const Statistics = ({statistics}) => {
      const good = statistics[0];
      const neutral = statistics[1];
      const bad = statistics[2];
      const all = statistics[3];
      const average = () => {
        const result = (good - bad) / all;
        return result;
        };
      const positive = () => { 
        const result = (good * 100) / all;
        return result + '%';
        };
    
  const StatisticLine = ({ text, value }) => {
    return (
      <tbody>
        <tr>
          <td>{text}:</td>
          <td>{value}</td>
        </tr>
      </tbody>
    );
  };
    return (
    <div>
      <h1>Statistics</h1>
      {all === 0 ? ( 'No feedback given' ) : (
        <div>
            <StatisticLine text='good' value={good}/>
            <StatisticLine text='neutral' value={neutral}/>
            <StatisticLine text='bad' value={bad}/>
            <StatisticLine text='all' value={all}/>
            <StatisticLine text='average' value={average()}/>
            <StatisticLine text='positive' value={positive()}/>
         </div> 
        )}
    </div> 
    );
  
};

const Button = ({handleClick, text}) => { 
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const handleGoodClick = () => {
      setGood(good + 1)
      setAll(all + 1)
  };

    const handleNeutralClick = () => {
      setNeutral(neutral + 1)
      setAll(all + 1)
  };
  
    const handleBadClick = () => {
      setBad(bad + 1)
      setAll(all + 1)
  };
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' /> 
      <Statistics statistics={[good, neutral, bad, all]}/>
      </div>
  );
};

export default App