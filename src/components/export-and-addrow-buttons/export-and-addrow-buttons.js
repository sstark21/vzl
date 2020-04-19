import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";

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
    <div className={classes.root}>
      <Button onClick={() => onBtnExportDataAsExcel()} variant="outlined">
        Экспортировать в Excel
      </Button>
      <Button
        onClick={() => alert("Переход на другую страницу")}
        variant="outlined"
      >
        Добавить
      </Button>
    </div>
  );
};

export default ExportAndAddButtons;
