import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ListHeader from "../components/ListHeader";

function CreateExercise() {
    const [name, setName] = useState("");
    const [reps, setReps] = useState(0);
    const [weight, setWeight] = useState(0);
    const [unit, setUnit] = useState("");
    const [date, setDate] = useState("");

    // Brings the user back to the homepage after creating the exercise
    const history = useHistory();

    // Check if the fields are blank if so notify user to fill in
    useEffect(() => {
        let repNote = document.getElementById('repFooter');
        let weightNote = document.getElementById('weightFooter');
        let nameNote = document.getElementById('nameFooter');
        if (isNaN(reps) || reps === 0) {
            repNote.style.display = "block";
        } else {
            repNote.style.display = "none";
        }
        if (name === '') {
            nameNote.style.display = "block";
        } else {
            nameNote.style.display = "none";
        }
        if (isNaN(weight) || weight === 0) {
            weightNote.style.display = "block";
        } else {
            weightNote.style.display = "none";
        }
    }, [reps, weight, name]);

    useEffect(() => {
        let editCol = document.getElementById('editCol');
        let deleteCol = document.getElementById('deleteCol');
        editCol.style.display = 'none';
        deleteCol.style.display = 'none';
    });

    // Function to add a new exercise
    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch("/exercises", {
            method: "post",
            body: JSON.stringify(newExercise),
            headers: { "Content-Type": "application/json" },
        });
        if (response.status === 201) {
            alert("Successfully added the exercise!");
        } else {
            alert(`Failed to add Exercise, status code = ${response.status}`);
        }
        // Once the use has entered the movie, send it back to the homepage
        history.push("/");

    };

    return (
        <article className="createArt">
            <h2>Add a New Exercise</h2>
            <p>Enter the values of the new exercise. All fields are required.*</p>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <table>
                    <thead>
                        <ListHeader />
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Exercise Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    id="name"
                                    required
                                /><p id="nameFooter">*Name field cannot be empty</p>
                            </td>
                            <td className="reps">
                                <input
                                    type="number"
                                    min="1"
                                    max="100"
                                    value={reps}
                                    onChange={(e) => setReps(e.target.valueAsNumber)}
                                    id="number"
                                    placeholder="Rep Count"
                                    required
                                /><p id="repFooter">*Rep field cannot be empty</p>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    placeholder="Weight"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.valueAsNumber)}
                                    id="weight"
                                    required
                                /><p id="weightFooter">*Weight field cannot be empty</p>
                            </td>
                            <td>
                                <select
                                    value={unit}
                                    onChange={(e) => setUnit(e.target.value)}
                                    id="unit"
                                    required="required"
                                >
                                    <option value="" disabled selected hidden>Select Unit</option>
                                    <option value="kg">kg</option>
                                    <option value="lbs">lbs</option>
                                    <option value="miles">miles</option>
                                    <option value="hrs">hrs</option>
                                    <option value="min">min</option>
                                </select>
                            </td>
                            <td>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    id="date"
                                    required
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <button type="submit" onClick={addExercise} id="submit">
                    Add Exercise
                </button>
            </form>
        </article>
    );
}

export default CreateExercise;
