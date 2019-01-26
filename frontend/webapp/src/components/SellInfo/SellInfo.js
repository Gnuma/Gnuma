import React, { Component } from "react";
import "./SellInfo.scss";
import SearchBox from "../Box/SearchBox/SearchBox";
import InfoBox from "../Box/InfoBox/InfoBox";
import BookItem from "./BoxItems/BookItem";
import OfficeItem from "./BoxItems/OfficeItem";

import ImageSelector from "../Inputs/ImageSelector/ImageSelector";
import TextField from "../Inputs/TextField/TextField";
import DropDown from "../Inputs/DropDownList/DropDownList";
import { isEmpty } from "../Inputs/Form/errorFunctions";
import { submit } from "../Inputs/Form/formHelper";

export default class SellInfo extends Component {
  constructor(props) {
    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleInfoChange = this.handleInfoChange.bind(this);
    this.selectConditions = this.selectConditions.bind(this);
    this.submit = this.submit.bind(this);
  }

  state = {
    bookSelection: {
      query: "",
      results: [
        {
          id: 0,
          name: "Matematica Verde 3",
          img: "",
          authors: "Alessandro Borghesi, Francesca Maravilla",
          price: 26
        },
        {
          id: 1,
          name: "Matematica Verde 3",
          img: "",
          authors: "Alessandro Borghesi, Francesca Maravilla",
          price: 26
        },
        {
          id: 2,
          name: "Matematica Verde 3",
          img: "",
          authors: "Alessandro Borghesi, Francesca Maravilla",
          price: 26
        }
      ],
      selected: undefined
    },
    officeSelection: {
      query: "",
      selected: undefined,
      results: [
        {
          id: 0,
          name: "I.I.S.S. J. Von Neumann",
          address: "Via Pollenza 244, Roma"
        },
        {
          id: 1,
          name: "Firenze Lente",
          address: "Via Giovanni 14, Firenze"
        },
        {
          id: 2,
          name: "Enrico Movente",
          address: "Via Tiburtina 666, Roma"
        }
      ]
    },
    infos: {
      price: {
        value: "",
        errorMessage: ""
      },
      conditions: {
        list: [
          {
            id: 1,
            name: "Usurato"
          },
          {
            id: 2,
            name: "Buono"
          },
          {
            id: 3,
            name: "Ottimo"
          }
        ],
        selected: {
          id: 0,
          name: "Seleziona..."
        }
      }
    }
  };

  render() {
    const { bookSelection, officeSelection, infos } = this.state;

    return (
      <div className="sell-informations-list">
        <SearchBox
          className="book-box"
          id="bookSelection"
          handleChange={this.handleSearchChange}
          value={bookSelection.query}
          title="Quale libro vuoi vendere?"
        >
          {bookSelection.results.map(result => (
            <BookItem
              key={result.id}
              id="bookSelection"
              isSelected={bookSelection.selected === result}
              select={this.handleSelection}
              book={result}
            />
          ))}
        </SearchBox>

        <SearchBox
          className="office-box"
          id="officeSelection"
          handleChange={this.handleSearchChange}
          value={officeSelection.query}
          title="Seleziona il tuo istituto"
        >
          {officeSelection.results.map(result => (
            <OfficeItem
              key={result.id}
              id="officeSelection"
              isSelected={officeSelection.selected === result}
              select={this.handleSelection}
              office={result}
            />
          ))}
        </SearchBox>

        <InfoBox title="Aggiungi delle informazioni">
          <ImageSelector />
          <div className="info-box-right-col">
            <label>Prezzo</label>
            <div>
              <TextField
                onChange={this.handleInfoChange}
                type="text"
                id="price"
                state={infos.price}
                className="text-field-closed"
              />
            </div>
            <label>Condizioni</label>

            <DropDown
              list={infos.conditions.list}
              selected={infos.conditions.selected}
              select={this.selectConditions}
              style="std-drp-list"
            />
          </div>
        </InfoBox>
        <div>
          <button
            className="std-btn"
            style={{ marginTop: "20px" }}
            onClick={this.submit}
          >
            Pubblica
          </button>
        </div>
      </div>
    );
  }

  handleInfoChange(e) {
    const { id, value } = e.target;

    this.setState(prevState => ({
      infos: {
        ...prevState.infos,
        [id]: {
          ...prevState.infos[id],
          value: value
        }
      }
    }));
  }

  selectConditions(item) {
    this.setState(prevState => ({
      infos: {
        ...prevState.infos,
        conditions: {
          ...prevState.infos.conditions,
          selected: item
        }
      }
    }));
  }

  handleSearchChange(e, id) {
    const query = e.target.value;
    this.setState(prevState => ({
      [id]: {
        ...prevState[id],
        query
      }
    }));
  }

  handleSelection(id, selection) {
    this.setState(prevState => ({
      [id]: {
        ...prevState[id],
        selected: selection
      }
    }));
  }

  submit() {
    const fields = {
      book: {
        value: this.state.bookSelection.selected
      },
      office: {
        value: this.state.officeSelection.selected
      },
      price: this.state.infos.price
    };

    const result = submit(fields, validators);

    console.log(result);

    if (result === true) {
      console.log("ok");
    } else {
      this.setState(prevState => ({
        ...prevState,
        result
      }));
    }
  }
}

let validators = {
  book: {
    functions: [isEmpty],
    warnings: ["Seleziona il libro che vuoi vendere."]
  },
  office: {
    functions: [isEmpty],
    warnings: ["Seleziona il tuo istituto"]
  },
  price: {
    functions: [isEmpty],
    warnings: ["Inserisci il prezzo."]
  }
};
