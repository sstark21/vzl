import React from "react";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";

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
        <MenuList>
          <MenuItem style={{ height: 60 }}>Управление отчетами</MenuItem>
          <MenuItem style={{ height: 60 }}>Взаимозависимые лица</MenuItem>
          <MenuItem style={{ height: 60 }}>Страновая отчетность</MenuItem>
          <MenuItem style={{ height: 60 }}>Сверка уведовлений</MenuItem>
          <MenuItem style={{ height: 60 }}>НСИ</MenuItem>
          <MenuItem style={{ height: 60 }}>Пользователи</MenuItem>
          <MenuItem style={{ height: 60 }}>Аудит</MenuItem>
          <MenuItem style={{ height: 60 }}>Помощь</MenuItem>
        </MenuList>
      </Paper>
    </div>
  );
}
