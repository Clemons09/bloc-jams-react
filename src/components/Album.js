import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import Ionicon from 'react-ionicons';
import PlayerBar from './PlayerBar';
import './Album.css';

class Album extends Component {
  constructor(props) {
    super(props);
    const album = albumData.find(album => {
      console.log(album);
      return album.slug === this.props.match.params.slug
    });
    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      isPlaying: false,
      volume: .25
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
    this.audioElement.volume = this.state.volume;
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.duration);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.duration);
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
    console.log('hey');
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
    console.log('hey');
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(this.state.album.songs.length, currentIndex +1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
    console.log(currentIndex + " " + newIndex);
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolume(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ volume: newVolume });
  }

  formatTime(duration) {
    let minutes = Math.floor(duration/60)
    let seconds = (duration - (minutes * 60)).toFixed(0)
    let formatSeconds = ("0" + seconds).slice(-2)
    if(typeof duration === "number") {
      return minutes + ":" + formatSeconds
    } else {
      return "-:--"
    }
  }

  render() {

    return (

    <section className="album">

      <section id="album-info">
        <img id="album-cover-art" src={this.state.album.albumCover} alt = ""/>
        <div className="album-details">
          <h1 id="album-title">{this.state.album.title}</h1>
          <h2 className="artist">{this.state.album.artist}</h2>
          <div id="release-info">{this.state.album.year} {this.state.album.label}</div>
        </div>
      </section>
      <table id="song-list">
        <colgroup>
          <col id="song-number-column" />
          <col id="song-title-column" />
          <col id="song-duration-column" />
        </colgroup>

        <tbody>
          {this.state.album.songs.map( (song, index) => {
            let className="song";
            if(song===this.state.currentSong) {
              className+=" current ";
              if(this.state.isPlaying) {
                className+=" playing ";
              }
            }

              return (
            <tr className={className} key={index} onClick={() => this.handleSongClick(song)}>
              <td className="song-actions">
                <button>
                      <span className="song-number">{index + 1}</span>
                      <span className="ion-pause"></span>
                      <span className="ion-play"></span>
                </button>
              </td>
              <td className="song-title">{song.title}</td>
              <td className="song-duration">{song.duration}</td>
            </tr>);
          })}
        </tbody>


       </table>
       <PlayerBar
        isPlaying={this.state.isPlaying}
        currentSong={this.state.currentSong}
        currentTime={this.audioElement.currentTime}
        duration={this.audioElement.duration}
        handleSongClick={() => this.handleSongClick(this.state.currentSong)}
        handlePrevClick={() => this.handlePrevClick()}
        handleNextClick={() => this.handleNextClick()}
        handleTimeChange={(e) => this.handleTimeChange(e)}
        formatTime={(duration) => this.formatTime(duration)}
        handleVolume={(e) => this.handleVolume(e)}
       />
      </section>
  );
}
}

export default Album;
