import React, {Suspense} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
} from "react-router-dom";
import ListLeagues from "./ListLeagues";
import Container from "@material-ui/core/Container";
import LeagueDetail from "./LeagueDetail";
import ListTeams from "./listTeams";
import TeamDetail from "./TeamDetail";


class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {choice: "/"}

    handleChange = (event) => {
        event.preventDefault();
        this.setState({choice: event.target.value})
    }

    render() {
        console.log("this has been rendered too")
        return (
            <Router>
                <AppBar position="static">

                    <Toolbar>

                        <a href="/listLeagues" style={{flexGrow: 1, color: "white", textDecoration: "none"}}>
                            <Typography color="inherit" variant="h6">
                                A-SPORT APP
                            </Typography>
                        </a>


                        <Select style={{
                            color: "white",
                            height: "40px",
                            verticalAlign: "middle"
                        }}

                                variant="outlined"
                                labelId="All games"
                                id="demo-simple-select"
                                value={this.state.choice}
                                onChange={this.handleChange}
                        >
                            <MenuItem value="/">All games</MenuItem>
                            <MenuItem value="/csgo">CS-GO</MenuItem>
                            <MenuItem value="/codmw">Call Of Duty</MenuItem>
                            <MenuItem value="/dota2">Dota 2</MenuItem>
                            <MenuItem value="/lol">League of legend</MenuItem>
                            <MenuItem value="/pubg">PUBG</MenuItem>
                            <MenuItem value="/ow">Overwatch</MenuItem>
                        </Select>
                        <div className="headerButton">
                            <Button color="inherit" variant="outlined">
                            <a href="/listTeams" style={{color: "white",textDecoration : "none"}}>
                                TEAMS
                            </a>
                            </Button>
                            <Button color="inherit" variant="outlined">
                                <a href="/listLeagues" style={{color: "white",textDecoration : "none"}}>
                                LEAGUES
                                </a>
                            </Button>
                        </div>

                    </Toolbar>
                </AppBar>
                <Suspense fallback={Loading}>
                    <Switch>
                        <Route exact path="/">
                            <ListLeagues/>
                        </Route>
                        <Route path="/listLeagues/:leagueId" component={LeagueDetail}/>
                        <Route path="/listLeagues" >
                            <ListLeagues value={this.state.choice}/>
                        </Route>
                        <Route path="/listTeams/:teamId" component={TeamDetail}/>
                        <Route path="/listTeams" >
                            <ListTeams value={this.state.choice}/>
                        </Route>
                        <Route path="*">
                            <NoMatch/>
                        </Route>
                    </Switch>
                </Suspense>

            </Router>
        )
    }
}


function Loading() {
    return (
        <div className="App">
            <header className="App-header">
                <h3>
                    Chargement...
                </h3>
            </header>
        </div>
    );
}

function NoMatch() {
    return (
        <Container maxWidth="sm" style={{textAlign: "center"}}>
            <img
                src="https://previews.123rf.com/images/phanuchat/phanuchat1903/phanuchat190300128/121188620-404-error-page-not-found-concept-kids-using-laptops-having-problems-with-website-flat-design-of-boy-.jpg"
                style={{
                    width: "100%",
                    marginTop: 40
                }}/>
        </Container>
    );
}

export default NavBar