import React, { Component } from 'react'
import DropZone from 'react-dropzone'
import { Link } from 'react-router-dom'
import api from './../../services/api'
import './styles.css'
import logo from './../../assets/logo.svg'
import { MdInsertDriveFile } from 'react-icons/md'
import socket from 'socket.io-client'

export default class Box extends Component {

  state = {
    box:{}
  }
  
  async componentDidMount(){
      this.subscribeToNewFiles()
      const box = this.props.match.params.id
      const response = await api.get(`boxes/${box}`)
      this.setState({box:response.data})
  }

  subscribeToNewFiles = () => {
    const box = this.props.match.params.id
    const io = socket('https://dropomni.herokuapp.com')
    io.emit('connectRoom',box)
    io.on('file',data => {
       this.setState({box:{...this.state.box,files:[data,...this.state.box.files]}})
    })
  }

  handleUpload = (files) => {
    files.forEach(item => {
       let data = new FormData()
       const box = this.props.match.params.id
       data.append('file',item)
       api.post(`boxes/${box}/files`,data)
    })
  }

  render() {
    return (
      <div id="box-container">
          <header>
              <img src={logo} alt="" />
              <h1>{this.state.box.title}</h1>
          </header>
          <DropZone onDropAccepted={this.handleUpload}>
             {({ getRootProps,getInputProps}) => (
                <div className="upload" {...getRootProps()}>
                  <input {...getInputProps()}/>
                  <p>Arraste ou clique aqui!!!</p>
                </div>
             )}
          </DropZone>

          <ul>
          {this.state.box.files 
          && this.state.box.files.map(item => (
                <li key={item._id}>
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
