import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectType} from '../actions/index';
import './client-list.css'


class ClientList extends React.Component {
  constructor(props) {
    super(props);
    console.log(this)
    this.state = {
      displayed: this.props.clients
    };
  }
    
  showList(){
    console.log(this.props.select)
    return this.state.displayed.map((client)=>{
      return(
        <li onClick={() => this.props.select (client)} >        
          <img src={client.general.avatar} alt={client.general.avatar} />
          <h3>{client.general.firstName} {client.general.lastName}</h3>
          <p>{client.job.company},<br /> {client.job.title}</p>
        </li>
       );
    });
	}
	
	searchClient(event){
    const value = event.target.value.toLowerCase();
    const display = this.props.clients.filter(function(el){
      const searchValue = JSON.stringify(el).toLocaleLowerCase();
      return searchValue.indexOf(value.toLowerCase()) !==-1;
    });    
    console.log(display)
    this.setState({
      displayed: display
    })
  }  
  
	render(){
    console.log( this);
		return(      
      <div className="sidebar" >        
        <input id="search" type="search" placeholder="search" onKeyUp={this.searchClient.bind(this)}/>
        <ul className="list">
          {this.showList()}
        </ul>
      </div>
    );
	}
};

//export to components/page.js

export default connect(
  state=>({
    clients: state.clients
  }),
  dispatch=>
    bindActionCreators({
      select: selectType,
      onFindClient: selectType,
    }, dispatch)    
  
      
)(ClientList)