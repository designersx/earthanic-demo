import React from 'react'
import styles from "../Modal/Modal.module.css"

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className={styles.closeButton}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    )
}

export default Modal
