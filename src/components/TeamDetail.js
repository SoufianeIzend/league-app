import React, {useEffect, Suspense, useState} from "react";
import {
    useLocation,
    useParams,
    useHistory
} from "react-router-dom";
import Container from "@material-ui/core/Container";
import {CardContent} from "@material-ui/core";
import Card from "@material-ui/core/Card";

class TeamDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        noImg: "https://www.logistec.com/wp-content/uploads/2018/03/no-image-icon-6.png",
        teamDetail: {}
    }

    componentDidMount() {

        fetch("https://api.pandascore.co/teams/" + this.props.match.params.teamId + "?token=Li9VL-Go-0xB6lVrSiwOXf8KIuQSCTD_FO-QDmBLG9DvEdWf-qg")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        teamDetail: result
                    });
                },
                (error) => {
                    this.setState({error});
                }
            )
    }
    formatDate(string){
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([],options);
    }

    render() {
        const teamObj = this.state.teamDetail
        console.log(teamObj)
        return (
            <Container maxWidth="sm" style={{textAlign: "center", marginTop: 50}}>
                <img src={teamObj.image_url ? teamObj.image_url : this.state.noImg} style={{maxWidth: "100%", height: 260}}/>
                <h1>{teamObj.name}</h1>
                <h3>Game : {teamObj.current_videogame ? teamObj.current_videogame.slug : null}</h3>
                <img src="https://cdn.iconscout.com/icon/premium/png-512-thumb/game-console-543175.png"
                style={{width: 50}}/>
                <div style={{display : "flex", justifyContent: "space-between"}}>
                    {teamObj.players? teamObj.players.map(player =>{
                        return <span key={player.first_name + player.slug} style={{fontSize: 24, paddingRight: 8}}>{player.name}</span>
                    }) : null}

                </div>


            </Container>)
    }
}


export default TeamDetail