import TodoAPP from './view/TODO.js';
import React,
{
	Component
} from 'react';
import ReactDOM from 'react-dom';
import  globalFun from 'mainfun';
//var globalFun=require('mainfun');

class APP extends Component{
	render(){
		return (<div><TodoAPP/></div>);
	}
};

ReactDOM.render(
  <APP/>,
  document.getElementById('root')
);
