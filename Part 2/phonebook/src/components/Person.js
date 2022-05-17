import React from "react";
/**
 * Show delete button on individual 'Person' parameter 'person , deletePerson'
 * button onClick mouseeventhandler deletes the name and number that its next to by 'person.id, person.name'
 */
const Person = ({ person, deletePerson}) =>
    <div>
        {person.name} {person.number} 
        <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
    </div>
    
export default Person