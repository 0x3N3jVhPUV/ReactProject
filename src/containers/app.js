import React, {Component} from 'react'
import SearchBar from '../components/searchBar'
import VideoList from './videoList'
import VideoDetail from '../components/videoDetail'
import Video from '../components/video'
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
        this.initMovies();
    }

    initMovies(){
        axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`)
             .then(function(res) {
                this.setState({ movieList: res.data.results.slice(1, 6),    
                                currentMovies: res.data.results[0]
                }, function(){                   
                    this.applyVideoToCurrentMovie();
                });
            }.bind(this));
    }

    applyVideoToCurrentMovie(){
        axios.get(`${API_END_POINT}movie/${this.state.currentMovies.id}/videos?${API_KEY}&language=en-US`)
             .then(function(res){
                 if (res.data.results[0] && res.data.results[0].key){
                    const youtubeKey = res.data.results[0].key;
                    let newCurrentMovieState = this.state.currentMovies;
                    newCurrentMovieState.videoId = youtubeKey;
                    this.setState({currentMovies: newCurrentMovieState});
                 }
            }.bind(this));
    }

    receiveCallBack(movie){
        this.setState({currentMovies:movie},function(){
            this.applyVideoToCurrentMovie();
        });
    }

    render(){
        const renderVideoList = () => {
            if(this.state.movieList.length >= 5){
                return <VideoList movieList={this.state.movieList} callback={this.receiveCallBack.bind(this)}/>
            }
        }
        return (
            <div>
                <div className="search_bar">
                    <SearchBar/>
                </div>
                <div className="row">
                    <div className='col-md-8'>
                        <Video videoId={this.state.currentMovies.videoId}/>
                        <VideoDetail title={this.state.currentMovies.title} description={this.state.currentMovies.overview} />
                    </div>
                    <div className='col-md-4'>
                        {renderVideoList()}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;