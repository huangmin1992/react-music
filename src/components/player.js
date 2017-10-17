import React,{Component} from "react";
import "./common.less";
import musicList from '../static/musicList.json'

class Player extends Component{
	constructor(){
		super();
		this.state={
			isPlay:true,//默认播放
			musicLenth:musicList.length,//歌曲数
			currentTime:0,//当前歌曲播放的时间
			currentTotalTime:0,//当前歌曲的总时间
			musicIndex:0,//当前播放歌曲索引，默认播放第一首
			progress:0
		}
	}
	//歌曲更新
	updateMusic(){
		let audio = document.getElementById("audio");
		if(this.state.isPlay){
			audio.play()
		}else{
			audio.pause()
		}
		this.setState({
			currentTotalTime:audio.duration
		})
	}
	//歌曲播放
	musicPlay(){
		this.setState({
			isPlay:!this.state.isPlay
		},()=>{
			this.updateMusic();
		})
	}
	//上一首
	musicPrev(){
		if(this.state.musicIndex-1<0){
			alert("这是第一首歌曲")
		}else{
			this.setState({
				musicIndex:--this.state.musicIndex
			},()=>{
				this.updateMusic();
			})
		}
	}
	//下一曲
	musicNext(){
		if(this.state.musicIndex+1>=this.state.musicLenth){
			alert("这已经是最后一首歌曲了")
		}else{
			this.setState({
				musicIndex:++this.state.musicIndex
			},()=>{
				this.updateMusic()
			})
		}
		console.log(this.state.musicIndex)
	}
	componentDidMount(){
		this.updateMusic();
		let audio = document.getElementById("audio");
		setInterval(()=>{
			this.setState({
				currentTime:audio.currentTime
			},()=>{
				if(this.state.currentTime>=this.state.currentTotalTime){
					this.musicNext()
				}
			})
		},300)
		setInterval(()=>{
			this.setState({
				progress:audio.currentTime/this.state.currentTotalTime*100
			})
			
		},300)
	}
	render(){
		return(
			<div className="player">
				{/*播放器名称*/}
				<div className="header">音乐播放器 React版</div>
				{/*音乐信息*/}
				<MusicInfo music = {musicList[this.state.musicIndex]}/>
				{/*进度条*/}
        		<Progress progress={this.state.progress} />
        		{/*播放控制*/}
        		<MusicControls musicPlay = {this.musicPlay.bind(this)} isPlay = {this.state.isPlay}
        		 musicPrev = {this.musicPrev.bind(this)} musicNext = {this.musicNext.bind(this)}/>
        		{/*播放时间*/}
        		<MusicTimes totalTime={this.state.currentTotalTime} currentTime = {this.state.currentTime}/>
        		{/*音频控件*/}
        		<audio id="audio" src={musicList[this.state.musicIndex].file} controls ref="audio" onCanPlay={()=>this.updateMusic()}/>
			</div>
		)
	}
}


//音乐信息
class MusicInfo extends Component{
	componentDidMount(){
		// console.log(musicList[0].cover)
	}
	render(){
		return(
			<div>
				<div className="music-img" style={{background:"url("+this.props.music.cover+") center no-repeat",backgroundSize:"cover"}}></div>
				<div className="music-info">
					<div className="music-name">{this.props.music.title}</div>
					<div className="music-singer">{this.props.music.artist}</div>
				</div>
			</div>
		)
	}
}

//进度条
class Progress extends Component{
	render(){
		return(
			<div className="music-progress" style={{width:this.props.progress+"%"}}></div>
		)
	}
}

//播放控制
class MusicControls extends Component{
	hanleClick(){
		if(this.props.musicPlay){
			this.props.musicPlay();
		}
	}
	handlePrev(){
		if(this.props.musicPrev){
			this.props.musicPrev();
		}
	}
	handleNext(){
		if(this.props.musicNext){
			this.props.musicNext()
		}
	}
	render(){
		let isPlay = this.props.isPlay;
		let playBtns = "music-btns";
			playBtns += isPlay?" music-play" :" music-pause"
		return(
			<div className="music-controls">
				<div className="music-prev music-dirs" onClick={this.handlePrev.bind(this)}></div>
				<div className={playBtns} onClick={this.hanleClick.bind(this)}></div>
				<div className="music-next music-dirs" onClick={this.handleNext.bind(this)}></div>
			</div>
		)
	}
}

//播放时间
class MusicTimes extends Component{
	//时间格式
	timeConvert(time){
		let minutes = parseInt(time/60);
		let seconds = parseInt(time%60);
		seconds=seconds>=10?seconds:'0'+seconds;
		return minutes+":"+seconds;
	}
	render(){
		return(
			<div className="music-times">
				<div className="music-protime">{this.timeConvert(this.props.currentTime)}</div>
				<div className="music-totaltime">{this.timeConvert(this.props.totalTime)}</div>
			</div>
		)
	}
}



















export default Player;