// MemberManagement.js
import React, { useState } from 'react';

function MemberManagement({ members, onAddMember, onRemoveMember, userId, isOwner }) {
  const [newMemberName, setNewMemberName] = useState('');

  const handleAddMember = () => {
    if (newMemberName.trim() && onAddMember) {
      onAddMember(newMemberName);
      setNewMemberName('');
    }
  };

  return (
    <div className="members-container">
      <h2 className="members-title">Members</h2>
      <ul className="member-list">
        {members.map((member) => (
          <li key={member.id} className="member-item">
            <span className="member-name">{member.name}</span>
            {isOwner && member.id !== userId && (
              <button
                className="member-action-button remove-button"
                onClick={() => onRemoveMember(member.id)}
              >
                Remove
              </button>
            )}
            {!isOwner && member.id === userId && (
              <button
                className="member-action-button leave-button"
                onClick={() => onRemoveMember(member.id)}
              >
                Leave List
              </button>
            )}
          </li>
        ))}
      </ul>

      {isOwner && onAddMember && (
        <div className="add-member-form">
          <input
            type="text"
            placeholder="Enter member name"
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.target.value)}
            className="add-member-input"
          />
          <button onClick={handleAddMember} className="add-member-button">
            Add Member
          </button>
        </div>
      )}
    </div>
  );
}

export default MemberManagement;
