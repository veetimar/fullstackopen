import styled from 'styled-components'

export const Button = styled.button`
  background: wheat;
  margin: 0.2em 0.2em;
  padding: 0.2em 0.5em;
  border: 2px solid Chocolate;
  border-radius: 5px;
  transition-duration: 0.2s;
  &:hover {
    background-color: Chocolate;
  }
`

export const FakeButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  text-decoration: underline;
  cursor: pointer;
  color: #069;
  font-family: arial, sans-serif;
`

export const Input = styled.input`
  margin: 0.2em 0.2em;
  padding: 0.1em 0.2em;
  width: 100px;  
`

export const Navigation = styled.div`
  padding: 0.3em 0.2em 0.4em;
  background: lightblue;
  border: 2px solid blue;
  border-radius: 5px;
`

export const Alert = styled.div`
  color: grey;
  background: lightgrey;
  font-size: 20px;
  border-style: solid;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`

export const Unit = styled.div`
  background: lightskyblue;
  margin: 1em 0;
  padding: 0 1em 1em;
  border: 2px solid blue;
  border-style: solid;
  border-radius: 5px
`
