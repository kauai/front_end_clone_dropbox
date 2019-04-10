import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import api from './../../services/api'
import './styles.css'
import logo from './../../assets/logo.svg'
import { MdInsertDriveFile } from 'react-icons/md'

export default class Box extends Component {

  state = {
    box:{}
  }
  
  async componentDidMount(){
      const box = this.props.match.params.id
      const response = await api.get(`boxes/${box}`)
      this.setState({box:response.data})
      console.log(this.state.box)
  }

  render() {
    return (
      <div id="box-container">
          <header>
              <img src={logo} alt="" />
              <h1>{this.state.box.title}</h1>
          </header>

          <ul>
          {this.state.box.files 
          && this.state.box.files.map(item => (
                <li>
                  <a target="_blank" href={item.url}><MdInsertDriveFile size="24" color="#a5cfff"/>
                    <strong>{ item.title }</strong>
                  </a>
                  <span>{item.createdAt}</span>
              </li>
              ))}
          </ul>
      </div>
    )
  }
}
