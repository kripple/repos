import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useCallback, useState } from 'react';

import { useModal } from '@/components/ModalProvider';

import '@/components/modal.css';

export function Modal({
  actions,
  children,
  title,
  onClose,
}: {
  actions: ReactNode;
  children: ReactNode;
  title: string;
  onClose?: () => void;
}) {
  const [open, setOpen] = useState<boolean>(true);
  const modal = useModal();

  const handleClose = useCallback(() => {
    onClose?.();
    setOpen(false);
  }, []);

  return (
    <Dialog
      className="mui-dialog"
      container={modal}
      keepMounted={true}
      onClose={handleClose}
      open={open}
    >
      <DialogTitle className="mui-dialog-title">{title} </DialogTitle>
      <DialogContent className="mui-dialog-content">
        {children}
        <DialogActions className="mui-dialog-actions">
          {actions}
          <button className="button-tertiary" onClick={handleClose}>
            Close
          </button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
