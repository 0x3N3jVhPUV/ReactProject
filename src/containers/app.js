import React, {Component} from 'react'
import SearchBar from '../components/searchBar'
import VideoList from './videoList'
import VideoDetail from '../components/videoDetail'
import axios from 'axios'

const API_END_POINT = "https://api.themoviedb.org/3/"
const POPULAR_MOVIES_URL = "discover/movie?sort_by=popularity.desc&language=fr&include_adult=false"
const API_KEY = "api_key=8b0848331984dd4fcc1078735fdc8f5e";

class App extends Component {
    constructor(props){
        super(props)
        this.state = {movieList:{}, currentMovies:{}}
    }

    componentWillMount(){
        axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`)
             .then(function(res){
                 this.setState({ movieList: res.data.results.slice(1, 6) });
                 this.setState({ currentMovies: res.data.results[0]});
             }.bind(this));
    }

    render(){
        return (
            <div>
                <SearchBar />
                <VideoList />
                <VideoDetail title={this.state.currentMovies.title} description={this.state.currentMovies.overview}/>
            </div>
        );
    }
}

export default App;