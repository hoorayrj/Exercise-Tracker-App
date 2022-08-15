import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ListHeader from "../components/ListHeader";

function EditExercise({ exercise }) {
    const [name, setName] = useState(exercise.name);
    const [reps, setReps] = useState(exercise.reps);
    const [weight, setWeight] = useState(exercise.weight);
    const [unit, setUnit] = useState(exercise.unit);
    const [date, setDate] = useState(exercise.date.substring(0, 10));

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

    const editExercise = async () => {
        const response = await fetch(`/exercises/${exercise._id}`, {
            method: "PUT",
            body: JSON.stringify({
                name: name,
                reps: reps,
                weight: weight,
                unit: unit,
                date: date,
            }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.status === 200) {
            alert("Successfully edited document!");
        } else {
            const errMessage = await response.json();
            alert(
                `Failed to edit exercise. Status ${response.status}. ${errMessage.Error}`
            );
        }
        history.push("/");
    };

    return (
        <article>
            <h2>Edit Exercise</h2>
            <p>Enter the values of the new exercise. All fields are required.</p>
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
                                    required
                                /><p id="repFooter">*Rep field cannot be empty</p>
                            </td>
                            <td>
                                <input
                                    type="number"
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
                <button type="submit" onClick={editExercise} id="submit">
                    Edit Exercise
                </button>
            </form>
        </article>
    );
}

export default EditExercise;
