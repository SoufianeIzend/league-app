import React from "react";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import {CardContent} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import Pagination from '@material-ui/lab/Pagination';


class ListTeams extends React.Component {

    state = {
        pageNumber: 1,
        noImg: "https://www.logistec.com/wp-content/uploads/2018/03/no-image-icon-6.png",
        teams: [],
        filter: ""
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.value !== this.state.filter){
            this.setState({filter: this.props.value})
            this.filterPage(this.props.value)
        }
    }

    filterPage = (filter) =>{
        this.setState({filter: filter})
        fetch("https://api.pandascore.co"+filter+"/teams?token=Li9VL-Go-0xB6lVrSiwOXf8KIuQSCTD_FO-QDmBLG9DvEdWf-qg&per_page=5&page=" + this.state.pageNumber)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        teams: result
                    });
                },
                (error) => {
                    this.setState({error});
                }
            )
    }

    changePage = (event, value) =>{
        this.setState({pageNumber: value})
        fetch("https://api.pandascore.co/teams?token=Li9VL-Go-0xB6lVrSiwOXf8KIuQSCTD_FO-QDmBLG9DvEdWf-qg&per_page=5&page=" + value)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        teams: result
                    });
                },
                (error) => {
                    this.setState({error});
                }
            )
    }

    componentDidMount() {
        fetch("https://api.pandascore.co"+ this.props.value+"/teams?token=Li9VL-Go-0xB6lVrSiwOXf8KIuQSCTD_FO-QDmBLG9DvEdWf-qg&per_page=5&page=1")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        teams: result
                    });
                },
                (error) => {
                    this.setState({error});
                }
            )
    }


    render() {
        return (
            <Container maxWidth="sm" style={{textAlign: "center"}}>
                <h1>Teams</h1>
                {this.state.teams.map(team => {
                    return (
                        <Card key={team.id} style={{marginTop: 20}}>
                            <CardContent style={{fontSize: 30}}>
                                <img style={{
                                    width: 56,
                                    height: 56,
                                    display: "inline-block"
                                }} src={team.image_url ? team.image_url : this.state.noImg }/> <span className="card-title">{team.name}</span>
                            </CardContent>
                            <CardActions>
                                <a size="small" style={{marginLeft: "auto", color: "#004d99", textDecoration: "none"}}
                                   href={"/listTeams/"+team.id}  >Detail</a>
                            </CardActions>
                        </Card>
                    )
                })}
                <Pagination className="paginat" count={10} color="primary" page={this.state.pageNumber} onChange={this.changePage}/>

            </Container>
        )
    }
}

export default ListTeams