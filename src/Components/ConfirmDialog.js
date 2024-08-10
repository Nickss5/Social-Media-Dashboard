import './ConfirmDialog.css'

function ConfirmDialog({
  show, // Boolean to control whether the dialog is shown or hidden
  onConfirm, // Function to handle the confirm action
  onCancel, // Function to handle the cancel action
  message, // Message to be displayed in the dialog
  onConfirmText, // Custom text for the confirm button (optional)
  onCancelText, // Custom text for the cancel button (optional)
}) {
  // If 'show' is false, don't render the dialog
  if (!show) return null

  return (
    // Overlay that covers the screen behind the dialog
    <div className="confirm-dialog-overlay">
      {/* Dialog box */}
      <div className="confirm-dialog">
        {/* Message displayed in the dialog */}
        <div className="confirm-dialog-message">{message}</div>
        {/* Container for the action buttons */}
        <div className="confirm-dialog-buttons">
          {/* Cancel button with custom or default text */}
          <button
            onClick={onCancel}
            className="confirm-dialog-button cancel"
            type="button"
          >
            {onCancelText || 'Cancel'}
          </button>
          {/* Confirm button with custom or default text */}
          <button
            onClick={onConfirm}
            className="confirm-dialog-button confirm"
            type="button"
          >
            {onConfirmText || 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
