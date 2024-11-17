import React, { useState } from 'react';
import MemberManagement from './MemberManagement';
import './ShoppingListDetail.css';

const SHOPPING_LIST_DATA = {
  listId: '123',
  name: 'For Party',
  owner: { id: 'user1', name: 'Owner User' },
  members: [
    { id: 'user1', name: 'Owner User' },
    { id: 'user2', name: 'Member User' }
  ],
  items: [
    { id: 'item1', name: 'Doritos', isResolved: false },
    { id: 'item2', name: 'Nuts', isResolved: false },
    { id: 'item3', name: 'Haribo', isResolved: false },
    { id: 'item4', name: 'Coca Cola', isResolved: true },
    { id: 'item5', name: 'Pepsi', isResolved: false },
    { id: 'item6', name: 'Milk', isResolved: true },
    { id: 'item7', name: 'Juice', isResolved: false },
    { id: 'item8', name: 'Apple', isResolved: false }
  ]
};

const currentUser = { id: 'user1', name: 'Owner User' }; // Change to 'user2' to test as a non-owner

function ShoppingListDetail() {
  const [listData, setListData] = useState(SHOPPING_LIST_DATA);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [filter, setFilter] = useState('all'); // Filter state: 'all', 'unresolved', or 'resolved'

  const isOwner = listData.owner.id === currentUser.id;

  const toggleItemResolved = (itemId) => {
    setListData((prevState) => ({
      ...prevState,
      items: prevState.items.map((item) =>
        item.id === itemId ? { ...item, isResolved: !item.isResolved } : item
      )
    }));
  };

  const addItem = (itemName) => {
    const newItem = {
      id: `item${listData.items.length + 1}`,
      name: itemName,
      isResolved: false
    };
    setListData((prevState) => ({
      ...prevState,
      items: [...prevState.items, newItem]
    }));
  };

  const removeItem = (itemId) => {
    setListData((prevState) => ({
      ...prevState,
      items: prevState.items.filter((item) => item.id !== itemId)
    }));
  };

  const addMember = (email) => {
    const newMember = {
      id: `user${listData.members.length + 1}`,
      name: email.split('@')[0]
    };
    setListData((prevState) => ({
      ...prevState,
      members: [...prevState.members, newMember]
    }));
  };

  const removeMember = (memberId) => {
    setListData((prevState) => ({
      ...prevState,
      members: prevState.members.filter((member) => member.id !== memberId)
    }));
  };

  const editListName = (newName) => {
    if (isOwner) {
      setListData((prevState) => ({
        ...prevState,
        name: newName
      }));
      setIsEditingName(false);
    }
  };

  const filteredItems = listData.items.filter((item) => {
    if (filter === 'unresolved') {
      return !item.isResolved;
    }
    if (filter === 'resolved') {
      return item.isResolved;
    }
    return true; // Default: 'all'
  });

  const sortedItems = filteredItems
    .slice()
    .sort((a, b) => {
      if (a.isResolved === b.isResolved) {
        return a.name.localeCompare(b.name);
      }
      return a.isResolved ? 1 : -1; // Active items come before resolved ones
    });

  return (
    <div className="shopping-list-container">
      <header className="header">
        <span className="back-button">←</span>
        {isEditingName ? (
          <input
            type="text"
            className="edit-list-name-input"
            value={listData.name}
            onChange={(e) => editListName(e.target.value)}
            onBlur={() => setIsEditingName(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setIsEditingName(false);
            }}
            autoFocus
          />
        ) : (
          <div className="list-name-container">
            <h1>{listData.name}</h1>
            {isOwner && (
              <span
                className="edit-icon"
                onClick={() => setIsEditingName(true)}
                title="Edit List Name"
              >
                ✏️
              </span>
            )}
          </div>
        )}
      </header>

      {/* Filter Section */}
      <div className="filter-container">
        <button
          className={`filter-button ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-button ${filter === 'unresolved' ? 'active' : ''}`}
          onClick={() => setFilter('unresolved')}
        >
          Unresolved
        </button>
        <button
          className={`filter-button ${filter === 'resolved' ? 'active' : ''}`}
          onClick={() => setFilter('resolved')}
        >
          Resolved
        </button>
      </div>

      <div className="items-container">
        {sortedItems.map((item) => (
          <div key={item.id} className={`item-row ${item.isResolved ? 'resolved' : ''}`}>
            <label>
              <input
                type="checkbox"
                checked={item.isResolved}
                onChange={() => toggleItemResolved(item.id)}
              />
              <span>{item.name}</span>
            </label>
            <button className="item-action-button" onClick={() => removeItem(item.id)}>
              -
            </button>
          </div>
        ))}

        {/* Add Item Section Inside the List */}
        <div className="item-row add-item-row">
          <input
            type="text"
            placeholder="Enter item name"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            className="add-item-input"
          />
          <button className="add-item-button" onClick={() => addItem(newItem)}>
            Add
          </button>
        </div>
      </div>

      <MemberManagement
        members={listData.members}
        onAddMember={isOwner ? addMember : null}
        onRemoveMember={isOwner || currentUser ? removeMember : null}
        userId={currentUser.id}
      />
    </div>
  );
}

export default ShoppingListDetail;
