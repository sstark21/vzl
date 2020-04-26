import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { LangConsumer } from "../language-context";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const ExportAndAddButtons = ({ onBtnExportDataAsExcel }) => {
  const classes = useStyles();
  return (
    <LangConsumer>
      {({ exportToExcelBtn, addRowBtn }) => {
        return (
          <div className={classes.root}>
            <Button onClick={() => onBtnExportDataAsExcel()} variant="outlined">
              {exportToExcelBtn}
            </Button>
            <Button
              onClick={() => alert("Переход на другую страницу")}
              variant="outlined"
            >
              {addRowBtn}
            </Button>
          </div>
        );
      }}
    </LangConsumer>
  );
};

export default ExportAndAddButtons;
