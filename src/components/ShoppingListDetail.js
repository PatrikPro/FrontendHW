import React, { useState } from 'react';
import AddItemForm from './AddItemForm';
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
    { id: 'item4', name: 'Coca Cola', isResolved: false },
    { id: 'item5', name: 'Pepsi', isResolved: false },
    { id: 'item6', name: 'Milk', isResolved: false },
    { id: 'item7', name: 'Juice', isResolved: false },
    { id: 'item8', name: 'Apple', isResolved: false }
  ]
};

const currentUser = { id: 'user1', name: 'Owner User' }; // Change to 'user2' to test as a non-owner

function ShoppingListDetail() {
  const [listData, setListData] = useState(SHOPPING_LIST_DATA);
  const [isEditingName, setIsEditingName] = useState(false);

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

  const editListName = (newName) => {
    if (isOwner) {
      setListData((prevState) => ({
        ...prevState,
        name: newName
      }));
      setIsEditingName(false);
    }
  };

  const sortedItems = listData.items
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
      </div>

      <AddItemForm onAddItem={addItem} />

      <MemberManagement
        members={listData.members}
        onAddMember={isOwner ? addItem : null}
        onRemoveMember={isOwner ? removeItem : null}
        userId={currentUser.id}
      />
    </div>
  );
}

export default ShoppingListDetail;
