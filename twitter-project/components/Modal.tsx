import { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "./Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
}) => {
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    onClose();
  }, [disabled, onClose]);
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="bg-black text-white p-6 rounded-lg shadow-lg max-w-xl w-full">
          <div className="flex justify-between items-center">
            <h3 className="text-3xl font-semibold text-white">{title}</h3>
            <button
              onClick={handleClose}
              className="p-1 ml-[350px] border-0 text-white hover:opacity-70 transition "
            >
              <AiOutlineClose size={20} />
            </button>
          </div>
          {/* Body */}
          <div className="relative p-10 flex-auto">{body}</div>
          {/* footer */}
          <div className=" flex flex-col gap-2 p-10">
            <Button
              disabled={disabled}
              label={actionLabel}
              secondary
              fullWidth
              large
              onClick={handleSubmit}
            />
            {footer}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
