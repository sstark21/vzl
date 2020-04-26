import React from "react";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import { LangConsumer } from "../language-context";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    width: 300,
    marginRight: theme.spacing(2),
  },
}));

export default function MenuListComposition() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <LangConsumer>
          {({
            reportManagment,
            RPR,
            countryReport,
            noticeVerification,
            referencedData,
            users,
            audit,
            helpAndSupport,
          }) => {
            return (
              <MenuList>
                <MenuItem style={{ height: 60 }}>{reportManagment}</MenuItem>
                <MenuItem style={{ height: 60 }}>{RPR}</MenuItem>
                <MenuItem style={{ height: 60 }}>{countryReport}</MenuItem>
                <MenuItem style={{ height: 60 }}>{noticeVerification}</MenuItem>
                <MenuItem style={{ height: 60 }}>{referencedData}</MenuItem>
                <MenuItem style={{ height: 60 }}>{users}</MenuItem>
                <MenuItem style={{ height: 60 }}>{audit}</MenuItem>
                <MenuItem style={{ height: 60 }}>{helpAndSupport}</MenuItem>
              </MenuList>
            );
          }}
        </LangConsumer>
      </Paper>
    </div>
  );
}
