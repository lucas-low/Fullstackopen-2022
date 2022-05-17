import React, { Fragment } from "react"

const Course = ({ course }) => {
    return (
    <Fragment> 
        <Header course={course.name}  />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </Fragment>
    )
}

const Header = ({ course }) => <h1>{course}</h1>
    
const Total = ({ parts }) => {
    return (
        <h2>total of {parts.reduce((sum,parts) => sum+parts.exercises,0)}  exercises</h2>
        ) 
    }
    
      
const Part = ({ part }) => 
    <p>
    {part.name} {part.exercises}
    </p>
    
const Content = props => {
    return (
    props.parts.map((part)=> <Part key={part.id} part={part}/>)
          ) 
        }

export default Course