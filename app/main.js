import Hello from './view/hello.js'
import React,
{
	Component
} from 'react';
import ReactDOM from 'react-dom';

class APP extends Component{
	render(){
		return (<div><Hello/></div>);
	}
};

ReactDOM.render(
  <APP/>,
  document.getElementById('root')
);
