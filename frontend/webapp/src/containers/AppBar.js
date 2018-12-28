import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SearchBar from '../components/SearchBar'

export class AppBar extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <nav className="app-bar">
        <div className="app-logo">
            CLUB
        </div>
        <SearchBar />
        <div>
            Ciao Francesco
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBar)
