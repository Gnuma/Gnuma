import React from "react";
import AppBar from "./AppBar/AppBar";
import { connect } from "react-redux";
import MainItem from "../components/MainItem/MainItem";

const item = {
  id: 0,
  img: "",
  price: 26,
  condition: 4,
  book: {
    id: 0,
    name: "Matematica Verde 3",
    authors: "Alessandro Borghesi, Francesca Maravilla",
    new_price: 40,
    isbn_id: "9788804705161",
    subject: "Matematica",
    school_type: "Tecnico",
    anno: 3
  },
  seller: {
    id: 0,
    uid: "Carlo",
    seller_score: 8,
    seller_feedback: 0.93,
    office: {
      id: 0,
      name: "I.I.S.S. J. Von Neumann",
      address: "Via Pollenza 244, Roma"
    }
  }
};

function Item(props) {
  props = {
    item: item
  };
  return (
    <div className="view">
      <AppBar />
      <MainItem {...props} />
    </div>
  );
}

Item.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item);
