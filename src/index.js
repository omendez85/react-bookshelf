import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './css/index.css'
import { BrowserRouter, HashRouter } from 'react-router-dom'

const Router = ( window.location.host.includes('github') ) ? HashRouter : BrowserRouter;

ReactDOM.render(
	<Router><App /></Router>,
	document.getElementById('root')
);