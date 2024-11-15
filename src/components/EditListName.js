import React, { useState } from 'react';

function EditListName({ name, onEdit }) {
  const [newName, setNewName] = useState(name);

  const handleEdit = () => {
    if (newName.trim()) {
      onEdit(newName);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <button onClick={handleEdit}>Save Name</button>
    </div>
  );
}

export default EditListName;
