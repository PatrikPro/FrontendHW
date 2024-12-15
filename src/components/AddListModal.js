import React, { useState } from 'react';
import './AddListModal.css';

function AddListModal({ onAddList, onClose }) {
  const [listName, setListName] = useState('');

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Shopping List</h2>
        <input
          type="text"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          placeholder="Enter list name"
        />
        <div className="modal-actions">
          <button onClick={() => onAddList(listName)} disabled={!listName}>
            Add
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default AddListModal;
