import React,
{
	Component
} from 'react';
import _ from 'lodash';
import $ from 'jquery';

class Todo extends Component{
	constructor(props){
    super(props);
	}
	changeText(){
		let Dom=this.refs.todoLi;
		let originText=$(Dom).text();
		$(Dom).hide();
		$(Dom).next().show().val(originText);
	}
	submitEdit(e){
		let Dom=e.target;
		let editText=$(Dom).val();
		if(e.keyCode==13){
			$(Dom).hide();
			$(Dom).prev().show().text(editText);
		}
	}
	removeTodo(e){
		let Dom=e.target;
		if($(Dom).is(':checked')){
			$(Dom).next().css('text-decoration','line-through');
			this.props.remove($(Dom).next().text());
		}else{
			$(Dom).next().css('text-decoration','none');
		}
	}
	render(){
		let liStyle={'display':'inline-block'};
		let style={'display':'none'};
		return(<div><input type="checkbox" onClick={this.removeTodo.bind(this)}/>
					<li ref="todoLi" style={liStyle} onDoubleClick={this.changeText.bind(this)}>{this.props.text}</li>
					<input className="edit" type="text" onKeyUp={this.submitEdit.bind(this)}  style={style}/>
			</div>
		)
	}
}

class Todos extends Component{
	constructor(props){
		super(props);
	}
	render(){
		let todoItems=_.map(this.props.texts,(t)=>{
			return <Todo text={t} remove={this.props.remove}/>
		})
		return <ul>{todoItems}</ul>;
	}
}

class Status extends  Component{
	constructor(props){
		super(props);
	}

	render(){
		console.log(this.props)
		return (<div>
				<span id="totalCount">{this.props.ncount.total+'issue Total  '}</span>
				<span id="completedCount">{this.props.ncount.completed+'issue complete  '}</span>
				<span id="leftCount">{this.props.ncount.left+'issue left'}</span>
			</div>)
	}
}
class TodoInput extends Component{
	constructor(props){
		super(props);
	}
	InputContent(e){
		let todoText=this.refs.inputText.value;
		if(e.keyCode==13){
			todoText=todoText.trim();
			this.props.addNew(todoText);
			e.target.value='';
		}
	}
	render(){
		return <input id="inputText" ref="inputText" type="text" onKeyUp={this.InputContent.bind(this)}/>
	}
}
export default class TodoAPP extends Component{
	constructor(props){
		super(props);
		this.state={
			todoTexts:[],
			total:0,
			completed:0,
			left:0
		};
	}
	addNew(text){
		let texts=this.state.todoTexts;
		texts.push(text);
		this.setState({
			todoTexts:texts,
			total:this.state.total+1,
			left:this.state.left+1
		});
	}
	removeOne(text){
		let texts=this.state.todoTexts;
		texts=_.filter(texts,(t)=>{
			return t!=text;
		})
		this.setState({
			todoTexts:texts,
			total:this.state.total-1,
			left:this.state.left-1
		});
	}
	render(){
		console.log(this.state)
		return(<div>
			<TodoInput addNew={this.addNew.bind(this)}/>
			<Todos texts={this.state.todoTexts} remove={this.removeOne.bind(this)}/>
			<Status ncount={{total:this.state.total,
							completed:this.state.completed,
							left:this.state.left}}/>
		</div>);
	}
}