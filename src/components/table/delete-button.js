import React, { Component } from "react";
import DeleteIcon from "@material-ui/icons/Delete";

export default class DeleteButton extends Component {
  buttonClick = (e) => {
    this.setState({
      visible: true,
    });

    const name = this.props.node.data.f_004;
    if (window.confirm("Удалить " + name + "?")) {
      let deletedRow = this.props.node.data;
      e.gridApi.updateRowData({ remove: [deletedRow] });
    }
  };

  render() {
    return (
      <button
        style={{ marginTop: 20, marginLeft: 40 }}
        onClick={() => this.buttonClick(this.props.node)}
      >
        <DeleteIcon />
      </button>
    );
  }
}
