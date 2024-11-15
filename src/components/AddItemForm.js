// AddItemForm.js
import React, { useState } from 'react';

function AddItemForm({ onAddItem }) {
  const [itemName, setItemName] = useState('');

  const handleAddItem = (e) => {
    e.preventDefault();
    if (itemName.trim()) {
      onAddItem(itemName);
      setItemName('');
    }
  };

  return (
    <form onSubmit={handleAddItem} className="add-item-form">
      <input
        type="text"
        placeholder="Enter item name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        className="add-item-input"
      />
      <button type="submit" className="add-item-button">Add Item</button>
    </form>
  );
}

export default AddItemForm;
