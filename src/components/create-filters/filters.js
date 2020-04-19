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

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 360,
      height: 27,
    },
  },
  date: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 172,
      height: 27,
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
  const [
    selectedDateFrom,
    handleDateChangeFrom,
    selectedDateTo,
    handleDateChangeTo,
  ] = useState(new Date());
  const classes = useStyles();
  const switchId = element.name + "Switch";
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
              onToggle(element.name);
              getDateFrom(selectedDateFrom);
              getDateTo(selectedDateTo);
            }}
          />
          <KeyboardDatePicker
            inputProps={{ style: { fontSize: 12 } }}
            InputLabelProps={{ style: { fontSize: 17 } }}
            autoOk
            variant="inline"
            inputVariant="outlined"
            label="с"
            format="dd/MM/yyyy"
            size="small"
            value={selectedDateFrom}
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
            label="по"
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
            checked={element.checked}
            disabled={
              element.name == "newForThePeriod" ||
              element.name == "changeForThePeriodOrganization" ||
              element.name == "changeForThePeriodParticipation"
            }
          />
          <TextField
            inputProps={{ style: { fontSize: 12 } }}
            InputLabelProps={{ style: { fontSize: 13 } }}
            size="small"
            id="filled-read-only-input"
            label=""
            defaultValue={element.title}
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

const SelectType = ({ element }) => {
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
            onClick={() => {}}
          />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel
              id="demo-simple-select-outlined-label"
              style={{ fontSize: 13 }}
            >
              {element.title}
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={choice}
              onChange={handleChange}
              label={element.title}
              disabled
            >
              <MenuItem value={10}>{element.variants[0].title}</MenuItem>
              <MenuItem value={15}>{element.variants[1].title}</MenuItem>
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
