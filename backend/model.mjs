import mongoose from 'mongoose';
import 'dotenv/config';

// CONNECT MONGODB USING MONGOOSE
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!!!");
});

// SCHEMA: Define the collection schema.
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: Date, required: true }
});

// Create the model for the exercises. Takes 2 paramters, first is name of data Class, second is calling the schema
const Exercise = mongoose.model("Exercise", exerciseSchema);


// CREATE MODEL ////////////
const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({
        name: name,
        reps: reps,
        weight: weight,
        unit: unit,
        date: date
    });
    return exercise.save();
}

// RETRIEVE MODEL ////////
// No Filter, retrieves all the exercises
const getExercise = async () => {
    const query = Exercise.find();
    return query.exec();
}

// Get exercise by ID
const getExerciseById = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
}

// UPDATE MODEL //////
const updateExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.replaceOne({_id: _id}, {
        name: name,
        reps: reps,
        weight: weight,
        unit: unit,
        date: date
    });
    return result.modifiedCount;
}

// DELETE MODELL ///////
const deleteExercise = async (_id) => {
    const result = await Exercise.deleteOne({_id: _id});
    return result.deletedCount;
}

// Export the variables for use in the controller
export { createExercise, getExercise, getExerciseById, updateExercise, deleteExercise }