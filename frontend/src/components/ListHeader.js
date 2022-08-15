import React from "react";

function ListHeader() {
    return (
        <tr>
            <th>Exercise</th>
            <th>Reps/Count</th>
            <th>Weight/Distance/Time</th>
            <th>Units</th>
            <th>Date</th>
            <th id="editCol">Edit</th>
            <th id="deleteCol">Delete</th>
        </tr>
    );
}

export default ListHeader;
