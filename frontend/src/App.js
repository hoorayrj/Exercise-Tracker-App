// Import Style Sheet
import "./App.css";

// Import dependencies
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState } from "react";

// Import Component
import Nav from "./components/Nav";

// Import Pages
import HomePage from "./pages/HomePage";
import CreateExercise from "./pages/CreateExercise";
import EditExercise from "./pages/EditExercise";

function App() {
    const [exercise, setExercise] = useState([]);
    return (
        <section className="App">
            <Router>
                <div className="mainContent">
                    <header className="App-header">
                        <h1>Exercise Tracker</h1>
                        <p className="description">
                            Keep track of your exercises anytime you workout.
                        </p>
                    </header>
                    <Nav />
                    <main>
                        <article>
                            <Route path="/" exact>
                                <HomePage setExercise={setExercise} />
                            </Route>
                            <Route path="/edit-exercise">
                                <EditExercise exercise={exercise} />
                            </Route>
                            <Route path="/create-exercise">
                                <CreateExercise />
                            </Route>
                        </article>
                    </main>
                </div>
                <footer>
                    <p>
                        {" "}
                        Modified on <cite>&copy; 2022 Raymond Sales</cite>
                    </p>
                </footer>
            </Router>
        </section>
    );
}

export default App;
