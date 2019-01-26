import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RadioButton from "../Inputs/RadioButton/RadioButton";
import "./FilterPanel.scss";

export default class FilterPanel extends Component {
  constructor(props) {
    super(props);

    this.changePositionType = this.changePositionType.bind(this);
    this.handleChangeCap = this.handleChangeCap.bind(this);
    this.handleChangeOffice = this.handleChangeOffice.bind(this);
  }

  state = {
    isCAP: true,
    CAP: "00156",
    office: ""
  };

  render() {
    const { isCAP, CAP, office } = this.state;

    return (
      <div className="filter-panel">
        <div className="filter-box">
          <h3 className="skinny-title">
            <span>
              <FontAwesomeIcon icon="compass" />
            </span>
            Posizione
          </h3>
          <div className="filter-box-content">
            <div
              className="inline-radio-text"
              onClick={() => this.changePositionType(true)}
            >
              <RadioButton value={isCAP} />
              <span>CAP</span>
              <input
                type="text"
                className="std-field"
                value={CAP}
                onChange={this.handleChangeCap}
                placeholder="Inserisci CAP"
              />
            </div>
            <div
              className="inline-radio-text"
              onClick={() => this.changePositionType(false)}
            >
              <RadioButton value={!isCAP} />
              <span>Istituto</span>
              <input
                type="text"
                className="std-field"
                value={office}
                onChange={this.handleChangeOffice}
                placeholder="Inserisci Istituto"
              />
            </div>
          </div>
        </div>

        <div className="filter-box">
          <h3 className="skinny-title">
            <span>
              <FontAwesomeIcon icon="check-circle" />
            </span>
            Condizioni
          </h3>
          <div className="filter-box-content" />
        </div>

        <div className="filter-box">
          <h3 className="skinny-title">
            <span>
              <FontAwesomeIcon icon="school" />
            </span>
            Classe
          </h3>
          <div className="filter-box-content" />
        </div>

        <div className="filter-box">
          <h3 className="skinny-title">
            <span>
              <FontAwesomeIcon icon="euro-sign" />
            </span>
            Prezzo
          </h3>
          <div className="filter-box-content" />
        </div>
      </div>
    );
  }

  changePositionType(value) {
    this.setState({
      isCAP: value
    });
  }

  handleChangeCap(event) {
    let value = event.target.value;
    value = value.replace(/\D/g, "");
    this.setState({
      CAP: value
    });
  }

  handleChangeOffice(event) {
    this.setState({
      office: event.target.value
    });
  }
}
