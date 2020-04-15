import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const ApplyRemoveFilters = ({ checkUpdate }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button variant="outlined" onClick={() => checkUpdate()}>
        Применить фильтры
      </Button>
      <Button variant="outlined">Отключить все фильтры</Button>
    </div>
  );
};

export default ApplyRemoveFilters;
