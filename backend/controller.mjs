import "dotenv/config";
import express from "express";
import asyncHandler from "express-async-handler";
import * as exercises from "./model.mjs";

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

// CREATE CONTROLLER ///////////////////
function validate(req) {
    // Validate the input from the user.
    let result = false;
    if (typeof req.body.name !== "string") {
        return result;
    }
    if (req.body.name === "") {
        return result;
    }
    if (req.body.name === null) {
        return result;
    }
    if (req.body.reps <= 0 || req.body.reps === null || req.body.reps === undefined) {
        return result;
    }
    if (
        req.body.weight <= 0 ||
        req.body.weight === null ||
        req.body.weight === undefined
    ) {
        return result;
    }
    if (typeof req.body.reps !== "number") {
        return result;
    }
    if (typeof req.body.weight !== "number") {
        return result;
    }
    if (typeof req.body.unit !== "string") {
        return result;
    }
    result = true;
    return result;
}

app.post("/exercises", (req, res) => {
    const check = validate(req);
    if (check) {
        exercises
            .createExercise(
                req.body.name,
                req.body.reps,
                req.body.weight,
                req.body.unit,
                req.body.date
            )
            .then((exercise) => {
                res.status(201).json(exercise);
            })
            .catch((error) => {
                console.log(`Error due to invalid syntax. ${error}`);
                res.status(400).json({
                    error: "Failed to create exercise due to invalid syntax.",
                });
            });
    } else {
        console.log(`Error due to invalid syntax.`);
        res.status(400).json({
            Error: "Failed to create exercise due to invalid syntax.",
        });
    }
});

// RETRIEVE CONTROLLER //////
// Get with no Filter
app.get("/exercises", (req, res) => {
    exercises
        .getExercise()
        .then((exercises) => {
            res.send(exercises);
        })
        .catch((error) => {
            console.error(error);
            res.send({ Error: "Failed to retrieve documents." });
        });
});

// Get Exercise by ID
app.get("/exercises/:_id", (req, res) => {
    const exerciseId = req.params._id;
    exercises
        .getExerciseById(exerciseId)
        .then((exercise) => {
            if (exercise !== null) {
                res.status(200).json(exercise);
            } else {
                res.status(404).json({ Error: "Failed to get exercise." });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(404).json({ Error: "Failed to get exercise." });
        });
});

// UPDATE Controller /////////
app.put("/exercises/:_id", (req, res) => {
    const check = validate(req);
    if (check) {
        exercises
            .updateExercise(
                req.params._id,
                req.body.name,
                req.body.reps,
                req.body.weight,
                req.body.unit,
                req.body.date
            )
            .then((numUpdated) => {
                if (numUpdated === 1) {
                    res.json({
                        _id: req.params._id,
                        name: req.body.name,
                        reps: req.body.reps,
                        weight: req.body.weight,
                        unit: req.body.unit,
                        date: req.body.date,
                    });
                } else {
                    res.status(404).json({ Error: "Exercise not found." });
                }
            })
            .catch((error) => {
                console.error(`Failed to update exercise ${error}`);
                res.status(400).json({
                    Error: "Failed to update exercise, invalid syntax.",
                });
            });
    } else {
        res.status(400).json({ Error: "Failed to update exercise, invalid syntax." });
    }
});

// DELETE Controller ////
app.delete("/exercises/:_id", (req, res) => {
    exercises
        .deleteExercise(req.params._id)
        .then((numDeleted) => {
            if (numDeleted === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: "Not found" });
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(404).json({ Error: "Not found" });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
