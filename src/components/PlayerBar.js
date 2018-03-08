import React, { Component } from 'react';
import Ionicon from 'react-ionicons';

class PlayerBar extends Component {
  render() {
    return (
      <section className="player-bar">
      <section id="buttons">
         <Ionicon icon="ios-skip-backward" onClick={this.props.handlePrevClick}/>
         <Ionicon icon={this.props.isPlaying ? 'ios-pause' : 'ios-play'} onClick={this.props.handleSongClick}/>
         <Ionicon icon="ios-skip-forward" onClick={this.props.handleNextClick}/>
       </section>
       <section id="time-control">
         <div className="current-time">–:––</div>
         <input type="range" className="seek-bar" />
         <div className="total-time">–:––</div>
       </section>
       <section id="volume-control">
         <div className="icon ios-volume-low"></div>
         <input type="range" className="seek-bar" />
         <div className="icon ios-volume-high"></div>
       </section>
    </section>
    );
  }
}

export default PlayerBar;
