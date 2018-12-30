import React, { Component } from "react";
import ResultFilter from "../ListResultFilter/ListResultFilter";

export default class StandardList extends Component {
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
    return (
      <div>
        <ResultFilter orderFilter={orderFilter} subFilter={subFilter} />
      </div>
    );
  }
}
