import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useForm } from "react-hook-form";
import { DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { StyledButton } from "./Button";
import statusService from "../Service/StatusService";
import { notifiError, notifiSuccess } from "../utils/MyToys";
import userService from "../Service/UserService";

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
  nameStatus: string;
}

export default function ModalPopUp({
  closeModal,
  open,
  title,
  contentButton,
  nameStatus,
}: Props) {
  const classes = useStyles();
  type FormStatus = {
    nameStatus: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormStatus>();
  const onSubmitEdit = (data: { nameStatus: string }) => {
    try {
      const token = userService.getAccessToken();
      const callAPI = async () => {
        const res = await statusService.createStatus(data, token);
        closeModal();
        notifiSuccess("create status successfull");
      };
      callAPI();
    } catch (error) {
      // console.log({ ...error });
      notifiError("create status fail");
    }
  };
  React.useEffect(() => {
    setValue("nameStatus", nameStatus);
    return () => {
      setValue("nameStatus", "");
    };
  }, [nameStatus, open]);
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
                  <div>Name Status: </div>
                  <input
                    type="text"
                    className={classes.Detail}
                    placeholder="Name Status"
                    {...register("nameStatus", {
                      required: "Name Status is required",
                    })}
                  />
                  {errors.nameStatus && (
                    <p className={classes.inputValid}>
                      {errors.nameStatus.message}
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
