import React from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import Person from './Person';
/**
 * Show "filter" "Persons" from mapping new arrays of "persons"
 * "deletePerson" component shows delete button and deletes array
 */
const Persons = ({ filter, persons, deletePerson }) => {
  const personsToShow =
  filter === ''
      ? persons
      : persons.filter((person) => 
      person.name.toLowerCase().includes(filter.toLowerCase())
      )
  return (
    <Fragment>
      {personsToShow.map(person => 
        <Person key={person.id} person={person}  deletePerson={deletePerson}/>
      )}
     </Fragment>
  );
};

export default Persons