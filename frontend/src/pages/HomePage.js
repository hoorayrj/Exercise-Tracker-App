import React from "react";
import ExerciseList from "../components/ExerciseList";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function HomePage({ setExercise }) {
    // Use the history for updating
    const history = useHistory();

    // Use state to bring in the data
    const [exercises, setExercises] = useState([]);

    // Retrieve the list of exercises
    const loadExercises = async () => {
        const response = await fetch("/exercises");
        const exerciseData = await response.json();
        setExercises(exerciseData);
    };

    // Edit an entry
    const editExercise = async (exercise) => {
        setExercise(exercise);
        history.push("/edit-exercise");
    };

    // Delete an Exercise
    const deleteExercise = async (_id) => {
        const response = await fetch(`/exercises/${_id}`, { method: "DELETE" });
        if (response.status === 204) {
            const getResponse = await fetch("/exercises");
            const exercise = await getResponse.json();
            setExercises(exercise);
        } else {
            console.error(`Failed to delete movie with _id = ${_id}, status code = ${response.status}.`);
        }
    };

    // Load Data on Page Load
    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <article>
            <h2>Exercise Summary</h2>
            <p>Info on your past exercises</p>
            <ExerciseList
                exercises={exercises}
                editExercise={editExercise}
                deleteExercise={deleteExercise}
            />
        </article>
    );
}

export default HomePage;
