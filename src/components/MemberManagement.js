import React, { useState } from "react";
import "./MemberManagement.css"; // Ensure styles are updated

function MemberManagement() {
  const [inviteEmail, setInviteEmail] = useState(""); // For the email input
  const [members, setMembers] = useState([]); // To hold the list of members

  // Add a member locally
  const addMember = () => {
    if (!inviteEmail) {
      alert("Please enter a valid email.");
      return;
    }
    const newMember = { email: inviteEmail, name: inviteEmail.split("@")[0] }; // Generate a name from the email
    setMembers((prev) => [...prev, newMember]); // Add the new member to the list
    alert(`Member with email ${inviteEmail} has been added.`);
    setInviteEmail(""); // Clear the input field
  };

  // Remove a member locally
  const removeMember = (email) => {
    setMembers((prev) => prev.filter((member) => member.email !== email));
    alert(`Member with email ${email} has been removed.`);
  };

  return (
    <div className="add-member-container">
      <h2>Manage Members</h2>

      {/* Add Member Section */}
      <div className="add-member-form">
        <input
          type="email"
          placeholder="Enter member email"
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
          className="add-member-input"
        />
        <button className="add-member-button" onClick={addMember}>
          Add Member
        </button>
      </div>

      {/* Display Current Members */}
      <div className="member-list-container">
        <h3>Current Members</h3>
        <ul className="member-list">
          {members.map((member, index) => (
            <li key={index} className="member-item">
              <span className="member-name">{member.name}</span>
              <span className="member-email">{member.email}</span>
              <button
                className="remove-member-button"
                onClick={() => removeMember(member.email)}
              >
                -
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MemberManagement;
