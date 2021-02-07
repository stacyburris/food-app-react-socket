import React, { Component } from "react";
import { Button, Table, Container } from "reactstrap";
import { socket } from "../global/header";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
class Kitchen extends Component {
  constructor() {
    super();
    this.state = {
      food_data: []
      // this is where we are connecting to with sockets,
    };
  }
  getData = foodItems => {
    console.log(foodItems);
    this.setState({ food_data: foodItems });
  };
  changeData = () => socket.emit("initial_data");
  /*As soon as the component gets mounted ie in componentDidMount method, firing the initial_data event to get the data to initialize the Kitchen Dashboard */
  /* Adding change_data listener for listening to any changes made by Place Order and Predicted Order components*/
  componentDidMount() {
    var state_current = this;
    socket.emit("initial_data");
    socket.on("get_data", this.getData);
    socket.on("change_data", this.changeData);
  }

  /* Removing the listener before unmounting the component in order to avoid addition of multiple listener at the time revisit*/
  componentWillUnmount() {
    socket.off("get_data");
    socket.off("change_data");
  }
  /* When Done gets clicked, this function is called and mark_done event gets emitted which gets listened on the backend explained later on*/
  markDone = id => {
    // console.log(predicted_details);
    socket.emit("mark_done", id);
  };
  getFoodData() {
    return this.state.food_data.map(food => {
      return (
        <tr key={food._id}>
          <td> {food.name} </td>
          <td> {food.ordQty} </td>
          <td> {food.prodQty} </td>
          <td> {food.predQty} </td>
          <td>
            <button onClick={() => this.markDone(food._id)}>Done</button>
          </td>
        </tr>
      );
    });
  }
  render() {
    return (
      <Container>
        <h2 className="h2Class">Kitchen Area</h2>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button"
          table="table-to-xls"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Download as XLS"
        />
        <Table striped id="table-to-xls">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Created Till Now</th>
              <th>Predicted</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{this.getFoodData()}</tbody>
        </Table>
      </Container>
    );
  }
}
export default Kitchen;