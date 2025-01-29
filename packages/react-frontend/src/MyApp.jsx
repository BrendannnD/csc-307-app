// src/MyApp.jsx
import React, { useState, useEffect} from "react";
import Table from "./Table";
import Form from "./Form";



function MyApp() {
    const [characters, setCharacters] = useState([]);

    function removeOneCharacter(index) {
        const updated = characters.filter((character, i) => {
            return i !== index;
        });
        removeUser(characters[index]._id)
            .then((response) => {
                if (response.status === 204) {
                    setCharacters(updated);
                } else {
                    throw new Error("Error: " + response.status);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function updateList(person) {
        postUser(person)
            .then((response) => {
                if (response.status === 201) {
                    return response.json();
                } else {
                    throw new Error("Error: " + response.status);
                }
            })
            .then(data => {
                setCharacters([...characters, data]);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

    function postUser(person) {
        const promise = fetch("http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });

        return promise;
    }

    function removeUser(id) {
        const promise = fetch(`http://localhost:8000/users/${id}`, {
            method: "DELETE",
        });

        return promise;
    }




    useEffect(() => {
        fetchUsers()
            .then((res) =>
                 res.json())
            .then((json) => setCharacters(json))
            .catch((error) => { console.log(error); });
    }, [] );

    return (
        <div className="container">
            <Table
                characterData={characters}
                removeCharacter={removeOneCharacter}
            />
            <Form handleSubmit={updateList} />
        </div>
    );


}


export default MyApp;