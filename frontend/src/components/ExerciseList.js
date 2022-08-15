import React from "react";
import ExerciseRow from "./ExerciseRow";
import ListHeader from "./ListHeader";

function ExerciseList({ exercises, editExercise, deleteExercise }) {
    return (
        <table>
            <thead>
                <ListHeader />
            </thead>
            <tbody>
                {exercises.map((exercise, i) => (
                    <ExerciseRow exercise={exercise} onEdit={editExercise} onDelete={deleteExercise} key={i} />
                ))}
            </tbody>
        </table>
    );
}

export default ExerciseList;
