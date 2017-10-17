import React,{Component} from "react";
import "./common.less";

class Header extends Component{
	render(){
		return(
			<div className="music-header">
				<img src="./static/logo.png" alt="logo" className="logo"/>
				<h1 className="caption">React Music Title</h1>
			</div>
		)
	}
}
export default Header;