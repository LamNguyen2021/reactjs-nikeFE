import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { StyledButton } from "./Button";
import { notifiSuccess } from "../utils/MyToys";
import { useForm } from "react-hook-form";
import userService from "../Service/UserService";
import codeService from "../Service/CodeService";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  form: {
    width: 350,
  },
  Detail: {
    width: "100%",
    marginTop: "10px",
    padding: "12px",
    fontSize: 14,
  },
  inputValid: {
    color: "#fe0000",
  },
  inputContainer: {
    marginBottom: 18,
  },
}));

interface Props {
  open: boolean;
  closeModal: () => void;
  title: string;
  contentButton: string;
  code: any;
}

export default function ModalCode({
  closeModal,
  open,
  title,
  contentButton,
  code,
}: Props) {
  const classes = useStyles();
  type FormStatus = {
    codeName: string;
    codeValue: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormStatus>();

  const onSubmitEdit = (data: { codeName: string; codeValue: any }) => {
    console.log(data);
    data = { ...data, codeValue: parseInt(data.codeValue) };
    if (title === "create code") {
      const callAPI = async () => {
        const token = userService.getAccessToken();
        const res = await codeService.postCode(token, data);
        closeModal();
        notifiSuccess("create code successfully");
      };
      callAPI();
    } else {
      const callAPI = async () => {
        const token = userService.getAccessToken();
        const res = await codeService.updateCode(code._id, token, data);
        closeModal();
        notifiSuccess("update code successfully");
      };
      callAPI();
    }
  };

  React.useEffect(() => {
    if (code) {
      setValue("codeName", code.codeName);
      setValue("codeValue", code.codeValue);
      return () => {
        setValue("codeName", "");
        setValue("codeValue", "");
      };
    }
  }, [code, open, setValue]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <form
              className={classes.form}
              id="AdminFormEditUser"
              onSubmit={handleSubmit(onSubmitEdit)}
            >
              <DialogContent>
                <div className={classes.inputContainer}>
                  <div>CodeName: </div>
                  <input
                    type="text"
                    className={classes.Detail}
                    placeholder="codeName"
                    {...register("codeName", {
                      required: "codeName is required",
                    })}
                  />
                  {errors.codeName && (
                    <p className={classes.inputValid}>
                      {errors.codeName.message}
                    </p>
                  )}
                  <div>CodeValue: </div>
                  <input
                    type="number"
                    className={classes.Detail}
                    placeholder="code Value"
                    {...register("codeValue", {
                      required: "codeValue is required",
                    })}
                  />
                  {errors.codeValue && (
                    <p className={classes.inputValid}>
                      {errors.codeValue.message}
                    </p>
                  )}
                </div>
                <DialogActions>
                  <StyledButton type="submit">{contentButton}</StyledButton>
                </DialogActions>
              </DialogContent>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
