import React from "react";
import {RiEditBoxFill, RiDeleteBin2Fill } from "react-icons/ri";

function ExerciseRow({ exercise, onEdit, onDelete }) {
    return (
        <tr className="dataRow">
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date.substring(0,10)}</td>
            <td>
                <RiEditBoxFill className="button editButton" onClick={() => onEdit(exercise)} />
            </td>
            <td>
                <RiDeleteBin2Fill className="button deleteButton" onClick={() => onDelete(exercise._id)} />
            </td>
        </tr>
    );
}

export default ExerciseRow;
