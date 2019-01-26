import React, { Component } from "react";
import PropTypes from "prop-types";
import "./MainList.scss";
import InfoBar from "../../components/InfoBar/InfoBar";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import ResultFilter from "../../components/ListResultFilter/ListResultFilter";
import ListItem from "../../components/ListItem/ListItem";

export class MainList extends Component {
  state = {
    orderFilter: [
      {
        id: 0,
        name: "Rilevanza"
      },
      {
        id: 1,
        name: "Prezzo crescente"
      },
      {
        id: 2,
        name: "Prezzo decrescente"
      },
      {
        id: 3,
        name: "Novità"
      }
    ],
    subFilter: [
      {
        id: 0,
        name: "Qualsiasi Materia"
      },
      {
        id: 1,
        name: "Matematica"
      },
      {
        id: 2,
        name: "Italiano"
      },
      {
        id: 3,
        name: "Inglese"
      }
    ]
  };

  render() {
    const { orderFilter, subFilter } = this.state;
    const { results } = this.props;

    return (
      <div>
        <InfoBar
          office="I.I.S.S J. Von Neumann"
          subjects={["Italiano", "Matematica", "Inglese", "Informatica"]}
        />
        <div className="main-list">
          <FilterPanel />
          <div>
            <ResultFilter
              orderFilter={orderFilter}
              subFilter={subFilter}
              keyWord="Matematica Verde 3"
              nResults="1450"
            />
            {results
              ? results.map(item => <ListItem key={item.id} {...item} />)
              : ""}
          </div>
        </div>
      </div>
    );
  }
}

export default MainList;
