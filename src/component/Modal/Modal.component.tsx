import { Box, Modal as ModalComponent, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./Modal.css";

const Modal = ({
  open,
  handleClose,
  style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
  heading,
  description,
}: any) => {
  return (
    <ModalComponent
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="heading">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {heading}
          </Typography>
          <CloseIcon onClick={handleClose} />
        </div>
        <Typography id="modal-modal-description" className="descriptionText">
          {description}
        </Typography>
      </Box>
    </ModalComponent>
  );
};

export { Modal };
