import { Route, Switch } from 'react-router-dom';
import './App.css';
import LandingPage from './components/landingPage';
import GameCard from "./components/gameCard";
import Home from "./components/home";
import Form from "./components/form";

function App() {
  return (
    <Switch>

      <Route path="/" exact={true}>
        <LandingPage />
      </Route>

      <Route path="/home" exact={true}>
        <Home />
      </Route>

      <Route path="/form" exact={true}>
        <Form />
      </Route>

      <Route path="/home/:id">
        <GameCard />
      </Route>

    </Switch>

  );
}

export default App;