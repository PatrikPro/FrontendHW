import React, { useState } from "react";
import "./MemberManagement.css";

function MemberManagement({ members, onAddMember, onRemoveMember, userId }) {
  const [inviteEmail, setInviteEmail] = useState("");

  // Find if the current user is the owner
  const isOwner = members[0]?.id === userId;

  // Add a member (only for the owner)
  const handleAddMember = () => {
    if (!inviteEmail) {
      alert("Please enter a valid email.");
      return;
    }
    onAddMember(inviteEmail);
    setInviteEmail("");
  };

  // Remove a member
  const handleRemoveMember = (memberId) => {
    if (memberId === userId) {
      onRemoveMember(memberId); // Allow any user to remove themselves
    } else if (isOwner) {
      onRemoveMember(memberId); // Allow the owner to remove others
    }
  };

  return (
    <div className="members-container">
      <h2 className="members-title">Members</h2>

      <ul className="member-list">
        {members.map((member) => (
          <li key={member.id} className="member-item">
            <span className="member-name">{member.name}</span>
            {isOwner || member.id === userId ? (
              <button
                className="member-action-button remove-button"
                onClick={() => handleRemoveMember(member.id)}
              >
                {member.id === userId ? "Leave" : "Remove"}
              </button>
            ) : null}
          </li>
        ))}
      </ul>

      {/* Add member form only visible to the owner */}
      {isOwner && (
        <div className="add-member-form">
          <input
            type="email"
            placeholder="Enter member email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="add-member-input"
          />
          <button className="add-member-button" onClick={handleAddMember}>
            Add Member
          </button>
        </div>
      )}
    </div>
  );
}

export default MemberManagement;
