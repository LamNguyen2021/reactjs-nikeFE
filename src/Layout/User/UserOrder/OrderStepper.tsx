import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

// ve duong thang
const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 15,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  line: {
    height: 10,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

// ve hinh tron
const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 42,
    height: 42,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
});

function ColorlibStepIcon(props: any) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons: any = {
    1: <ShoppingCartIcon />,
    2: <LocalShippingIcon />,
    3: <DoneOutlineIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: 350,
  },
  stepperContainer: {
    padding: 0,
    [theme.breakpoints.down("xs")]: {
      width: "220px",
    },
  },
  stepLabel: {
    [theme.breakpoints.down("xs")]: {
      marginRight: "0px !important",
    },
  },
}));

function getSteps() {
  return ["pending", "delivery", "complete"];
}

interface IProps {
  step: number;
}
export default function OrderStepper(props: IProps) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(props.step);
  const steps = getSteps();

  return (
    <div className={classes.root}>
      <Stepper
        className={classes.stepperContainer}
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((lable) => (
          <Step key={lable}>
            <StepLabel
              className={classes.stepLabel}
              StepIconComponent={ColorlibStepIcon}
            ></StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
