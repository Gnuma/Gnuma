import React, { Component } from "react";
import "./ListResultFilter.scss";
import DropDown from "../Inputs/DropDownList/DropDownList";

export default class ListResultFilter extends Component {
  constructor(props) {
    super(props);
    this.selectOrder = this.selectOrder.bind(this);
    this.selectSubject = this.selectSubject.bind(this);
  }

  state = {
    selectedOrder: this.props.orderFilter[0],
    orderList: this.props.orderFilter,

    selectedSub: this.props.subFilter[0],
    subjectList: this.props.subFilter
  };

  selectOrder(item) {
    this.setState({ selectedOrder: item });
  }
  selectSubject(item) {
    this.setState({ selectedSub: item });
  }

  render() {
    const { selectedOrder, orderList, selectedSub, subjectList } = this.state;
    return (
      <div className="list-result-filter">
        <div className="list-filter-block">
          <span className="label">Ordina Per</span>

          <DropDown
            list={orderList}
            selected={selectedOrder}
            select={this.selectOrder}
            style="std-drp-list"
          />
        </div>
        <div className="list-filter-block">
          <span className="label">Categoria</span>
          <DropDown
            list={subjectList}
            selected={selectedSub}
            select={this.selectSubject}
            style="std-drp-list"
          />
        </div>
      </div>
    );
  }
}
