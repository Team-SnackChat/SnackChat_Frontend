import { Dialog, DialogProps } from '@mui/material';

interface SnackChatDefaultModalProps extends DialogProps {
  onClose: () => void;
}

export default function SnackChatDefaultModal({
  onClose,
  children,
  ...props
}: SnackChatDefaultModalProps) {
  return (
    <Dialog
      onClose={onClose}
      {...props}
      PaperProps={{ sx: { backgroundColor: 'transparent', boxShadow: 'none' } }}
    >
      {children}
    </Dialog>
  );
}
