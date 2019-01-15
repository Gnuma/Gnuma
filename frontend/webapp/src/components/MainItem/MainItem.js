import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./MainItem.scss";
import InfoBar from "../../components/InfoBar/InfoBar";
import thumbnailTest from "../../media/img/thumbnail-test.png";

export class MainItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <div>
        <InfoBar
          office="I.I.S.S J. Von Neumann"
          subjects={["Italiano", "Matematica", "Inglese", "Informatica"]}
        />
        <div className="main-item">
          <div className="left-col">
            <img
              src={thumbnailTest}
              alt="thumbnail"
              onMouseEnter={this.focus}
              onMouseLeave={this.unfocus}
            />
          </div>
          <div className="middle-col">
            <h1 className="m-title ">{item.book.name}</h1>
            <div className="in-b">
              <h1 className="s-subtitle">di {item.book.authors}</h1>
              <div className="price-buy-b">
                <div className="price-b">
                  <h1 className="xl-title">EUR {item.price}</h1>
                  <p className="xs-l-info">
                    invece che{" "}
                    <span className="deleted">EUR {item.book.new_price}</span>
                  </p>
                </div>
                <div className="buy-b">
                  <button className="buy-btn">Contatta Ora</button>
                  <Link to="/c o n t a c t">
                    <h1 className="s-title">Aggiungi alla tua lista</h1>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="right-col">RightCol</div>
        </div>
      </div>
    );
  }
}

export default MainItem;
