import React, {useEffect, Suspense, useState} from "react";
import {
    useLocation,
    useParams,
    useHistory
} from "react-router-dom";
import Container from "@material-ui/core/Container";
import {CardContent} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";

class LeagueDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        noImg: "https://www.logistec.com/wp-content/uploads/2018/03/no-image-icon-6.png",
        leagueDetail: {}
    }

    componentDidMount() {
        fetch("https://api.pandascore.co/leagues/" + this.props.match.params.leagueId + "?token=Li9VL-Go-0xB6lVrSiwOXf8KIuQSCTD_FO-QDmBLG9DvEdWf-qg")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("this is the result", result)
                    this.setState({
                        leagueDetail: result
                    });
                },
                (error) => {
                    this.setState({error});
                }
            )
    }

    formatDate(string) {
        let options = {year: 'numeric', month: 'long', day: 'numeric'};
        return new Date(string).toLocaleDateString([], options);
    }

    render() {
        const leagueObj = this.state.leagueDetail
        console.log(leagueObj)
        return (
            <Container maxWidth="sm" style={{textAlign: "center", marginTop: 50, marginBottom: 30}}>
                <img src={leagueObj.image_url ? leagueObj.image_url : this.state.noImg}
                     style={{maxWidth: "100%", height: 260}}/>
                <h1>{leagueObj.name}</h1>
                <h3>Game : {leagueObj.videogame ? leagueObj.videogame.name : null}</h3>
                <hr/>
                {leagueObj.series ? leagueObj.series.map(serie => {
                    return <Card key={serie.id} style={{marginTop: 10}}>
                        <CardContent>
                            <div style={{
                                margin: 20,
                                fontSize: 22
                            }}>
                                <span>{serie.full_name}</span><br/>
                                <span>From : {this.formatDate(serie.begin_at)}</span>
                            </div>
                        </CardContent>
                        {serie.winner_id ?
                            <CardActions>

                                <a size="small" style={{marginLeft: "auto", color: "#004d99", textDecoration: "none", display: "flex"}}
                                   href={"/listTeams/" + serie.winner_id}>
                                    <div style={{paddingTop: 5}}>WINNER</div>
                                <img
                                src="https://previews.123rf.com/images/businessvector/businessvector1510/businessvector151000078/45788465-cup-prize-icon.jpg"
                                style={{width: 30}}/></a>
                            </CardActions> : null}
                    </Card>
                }) : null}


            </Container>)
    }
}


export default LeagueDetail