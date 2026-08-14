import { useState } from 'react'

const Button = ({ onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => <p>{text} {value}</p>

const Statictics = ({ good, neutral, bad, total }) => {
  if (total == 0) {
    return(
      <div>
        <h1>Statictics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return(
    <div>
      <h1>Statictics</h1>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={(good - bad) / (total)} />
      <StatisticLine text="positive" value={good / total * 100 + " %"} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text={"good"} />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text={"bad"} />
      <Statictics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  )
}

export default App
