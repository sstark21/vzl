import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import { KeyboardDatePicker } from "@material-ui/pickers";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { LangConsumer } from "../language-context";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 735,
      height: 27,
    },
  },
  date: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 360,
      height: 45,
    },
  },
  checkbox: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 360,
      height: 27,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    width: 360,
    height: 45,
  },
}));

const PeriodType = ({ element, onToggle, getDateFrom, getDateTo }) => {
  const [selectedDateFrom, handleDateChangeFrom] = useState(new Date());
  const [selectedDateTo, handleDateChangeTo] = useState(new Date());
  const classes = useStyles();
  const switchId = element.name + "Switch";

  return (
    <LangConsumer>
      {({ dateTo, dateFrom }) => {
        return (
          <FormGroup row>
            <form className={classes.date} noValidate autoComplete="off">
              <div>
                <Switch
                  id={switchId}
                  name="checkedB"
                  color="primary"
                  size="small"
                  onClick={() => {
                    onToggle(element.name, selectedDateFrom, selectedDateTo);
                  }}
                  checked={element.isRequired}
                />
                <KeyboardDatePicker
                  inputProps={{ style: { fontSize: 12 } }}
                  InputLabelProps={{ style: { fontSize: 17 } }}
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  label={dateFrom}
                  format="dd/MM/yyyy"
                  size="small"
                  value={selectedDateFrom}
                  helperText={element.label}
                  InputAdornmentProps={{ position: "start" }}
                  onChange={(date) => {
                    handleDateChangeFrom(date);
                    getDateFrom(date);
                  }}
                  disabled={!element.isRequired}
                  noValidate
                />
                <KeyboardDatePicker
                  inputProps={{ style: { fontSize: 12 } }}
                  InputLabelProps={{ style: { fontSize: 17 } }}
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  label={dateTo}
                  format="dd/MM/yyyy"
                  size="small"
                  value={selectedDateTo}
                  InputAdornmentProps={{ position: "start" }}
                  onChange={(date) => {
                    handleDateChangeTo(date);
                    getDateTo(date);
                  }}
                  disabled={!element.isRequired}
                  noValidate
                />
              </div>
            </form>
          </FormGroup>
        );
      }}
    </LangConsumer>
  );
};

const CheckboxOnlyType = ({ element, onToggle }) => {
  const classes = useStyles();
  return (
    <FormGroup row>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <Switch
            name="checkedA"
            color="primary"
            size="small"
            onClick={() => onToggle(element.name)}
            checked={element.isRequired}
            disabled={element.disabled}
          />
          <TextField
            inputProps={{ style: { fontSize: 12 } }}
            InputLabelProps={{ style: { fontSize: 13 } }}
            size="small"
            id="filled-read-only-input"
            value={element.label}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </div>
      </form>
    </FormGroup>
  );
};

const SelectType = ({ element, onToggle }) => {
  const [choice, setChoice] = useState("");
  const classes = useStyles();
  const handleChange = (event) => {
    setChoice(event.target.value);
  };
  return (
    <FormGroup row>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <Switch
            name="checkedB"
            color="primary"
            size="small"
            onClick={() => onToggle(element.name)}
            checked={element.isRequired}
          />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel
              id="demo-simple-select-outlined-label"
              style={{ fontSize: 13 }}
            >
              {element.label}
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={choice}
              onChange={handleChange}
              label={element.label}
              disabled={!element.isRequired}
            >
              <MenuItem value={10}>{element.values[0]}</MenuItem>
              <MenuItem value={15}>{element.values[1]}</MenuItem>
            </Select>
          </FormControl>
        </div>
      </form>
    </FormGroup>
  );
};

const InputTextType = ({ element, onToggle, onChangeContent }) => {
  const classes = useStyles();
  return (
    <FormGroup row>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <Switch
            name="checkedB"
            color="primary"
            size="small"
            onClick={() => {
              onToggle(element.name);
            }}
            checked={element.isRequired}
          />
          <TextField
            inputProps={{ style: { fontSize: 12 } }}
            InputLabelProps={{ style: { fontSize: 13 } }}
            label={element.label}
            id={element.name}
            defaultValue=""
            variant="outlined"
            size="small"
            disabled={!element.isRequired}
            onChange={onChangeContent}
          />
        </div>
      </form>
    </FormGroup>
  );
};

export { PeriodType, CheckboxOnlyType, SelectType, InputTextType };
