import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
export const ConfirmDeleteModal = ({ open, onClose, onConfirm }) => {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="confirm-delete-title"
        aria-describedby="confirm-delete-description"
      >
        <DialogTitle id="confirm-delete-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-delete-description">
            Are you sure you want to delete this item? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            startIcon={<CancelIcon />}
            onClick={onClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={onConfirm}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };