import React, { Component } from "react";
import logo from "./baa_logo.png";
import "./App.css";
import results from "./data/5k.js";

import "react-table/react-table.css";
import ReactTable from "react-table";

let data = results.map(function(result, index) {
  return { ...result, rank: index + 1 };
});

const columns = [
  {
    Header: "Rank",
    accessor: "rank",
    maxWidth: 100
  },
  {
    Header: "Name",
    accessor: "name"
  },
  {
    Header: "Sex",
    accessor: "sex",
    maxWidth: 100
  },
  {
    Header: "Age",
    accessor: "age",
    maxWidth: 100
  },
  {
    Header: "5K",
    accessor: "display"
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: "0-200",
      sex: "M|F",
      results: results,
      data: data
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let sex = this.state.sex;
    let age = this.state.age;

    if (event.target.name === "age") {
      age = event.target.value;
    } else {
      sex = event.target.value;
    }

    let minAge = parseInt(age.split("-")[0]);
    let maxAge = parseInt(age.split("-")[1]);
    let newData = results
      .filter(function(result) {
        let resultAge = parseInt(result["age"]);
        let resultSex = result["sex"];
        return (
          resultAge >= minAge && resultAge <= maxAge && resultSex.match(sex)
        );
      })
      .map(function(result, index) {
        return { ...result, rank: index + 1 };
      });

    console.log(newData);
    console.log(minAge, maxAge);
    this.setState({
      [event.target.name]: event.target.value,
      data: newData
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">2018 B.A.A Distance Medley Standings</h1>
        </header>

        <div className="division-selector">
          <select name="age" onChange={this.handleChange}>
            <option value="0-200">All Ages</option>
            <option value="0-19">19 and Under</option>
            <option value="20-24">20 to 24</option>
            <option value="25-29">25 to 29</option>
            <option value="30-34">30 to 34</option>
            <option value="35-39">35 to 39</option>
            <option value="40-44">40 to 44</option>
            <option value="45-49">45 to 49</option>
            <option value="50-54">50 to 54</option>
            <option value="55-59">55 to 59</option>
            <option value="60-64">60 to 64</option>
            <option value="65-69">65 to 69</option>
            <option value="70-74">70 to 74</option>
            <option value="75-79">75 to 79</option>
            <option value="80-200">80+</option>
          </select>
          <select name="sex" onChange={this.handleChange}>
            <option value="M|F">All Sexes</option>
            <option value="F">Female</option>
            <option value="M">Male</option>
          </select>
        </div>
        <div className="table-container">
          <ReactTable
            data={this.state.data}
            columns={columns}
            resizable={false}
            showPagination={false}
            defaultPageSize={this.state.data.length}
            pageSize={this.state.data.length}
            showPaginationTop={false}
            showPaginationBottom={false}
          />
        </div>
      </div>
    );
  }
}

export default App;
