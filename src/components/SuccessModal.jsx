import "../styles/SuccessModal.css";

const SuccessModal = ({ isOpen, onConfirm }) => {
  if (!isOpen) return null;
  

  return (
    <div className="modal-overlay">
      <div className="success-modal">
        <div className="success-icon">✅</div>
        <h2>Reservation Confirmed</h2>
        <p>Your table has been successfully reserved.</p>

        <button className="success-btn" onClick={onConfirm}>
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
