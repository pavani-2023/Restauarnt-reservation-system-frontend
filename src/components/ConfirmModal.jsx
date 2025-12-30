import "../styles/ConfirmModal.css";

export default function ConfirmModal({
  open,
  title = "Confirm",
  message,
  onConfirm,
  onClose,
  confirmText = "Yes",
  cancelText = "No",
}) {
  if (!open) return null;

  return (
    <div className="confirm-overlay">
      <div className="confirm-modal">
        <h3>{title}</h3>
        <p>{message}</p>

        <div className="confirm-actions">
          <button className="btn-secondary" onClick={onClose}>
            {cancelText}
          </button>
          <button className="btn-danger" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
