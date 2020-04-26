import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { LangConsumer } from "../language-context";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const ApplyRemoveFilters = ({ applyFilter, removeAllFilters }) => {
  const classes = useStyles();
  return (
    <LangConsumer>
      {({ applyFiltersBtn, removeAllFiltersBtn }) => {
        return (
          <div className={classes.root}>
            <Button variant="outlined" onClick={() => applyFilter()}>
              {applyFiltersBtn}
            </Button>
            <Button variant="outlined" onClick={() => removeAllFilters()}>
              {removeAllFiltersBtn}
            </Button>
          </div>
        );
      }}
    </LangConsumer>
  );
};

export default ApplyRemoveFilters;
