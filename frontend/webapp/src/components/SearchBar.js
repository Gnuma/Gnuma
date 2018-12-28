import React, { Component } from 'react'
import searchLogo from "../media/vectors/search-lens.svg";

export default class SearchBar extends Component {
    constructor(props){
        super(props);
        this.focusAll = this.focusAll.bind(this);
        this.focusOutAll = this.focusOutAll.bind(this);
    }

    state = {
        subjects: ["Italiano", "Matematica", "Inglese", "Storia"],
        isFocused: false,
    }
  
    focusAll(){
        this.setState({isFocused: true});
    }

    focusOutAll(){
        this.setState({isFocused: false});
    }

    render() {
        const {subjects, isFocused} = this.state;
    return (
      <div className="search-bar">
        <button className={"sub-menu " + (isFocused ? "focus-n-r" : "")}>
            <span>Qualsiasi Materia</span>
        </button>
        <ul className="subject-drp-dw">
            {this.state.subjects.map(sub => 
                <li>{sub}</li>
            )}
        </ul>
        <input type="text" className={"search-input " + (isFocused ? "focus-vc" : "")}  onFocus={this.focusAll} onBlur={this.focusOutAll} ></input>
        <button className={"search-submit " + (isFocused ? "focus-n-l" : "")}>
            <img src={searchLogo} alt="search"></img>
        </button>
      </div>
    )
  }
}

