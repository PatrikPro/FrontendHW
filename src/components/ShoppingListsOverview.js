import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddListModal from './AddListModal';
import ConfirmationDialog from './ConfirmationDialog';
import './ShoppingListsOverview.css';

const DEFAULT_LISTS = [
  { id: '1', name: 'Groceries', isArchived: false, owner: 'user1' },
  { id: '2', name: 'Party Supplies', isArchived: false, owner: 'user1' },
  { id: '3', name: 'Archived List', isArchived: true, owner: 'user2' },
];

const currentUser = { id: 'user1', name: 'Owner User' };

function ShoppingListsOverview() {
  const [shoppingLists, setShoppingLists] = useState(DEFAULT_LISTS);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(null);
  const [filterArchived, setFilterArchived] = useState(false);

  const navigate = useNavigate();

  const filteredLists = shoppingLists.filter(
    (list) => (filterArchived ? true : !list.isArchived)
  );

  const addNewList = (listName) => {
    const newList = {
      id: Date.now().toString(),
      name: listName,
      isArchived: false,
      owner: currentUser.id,
    };
    setShoppingLists([...shoppingLists, newList]);
    setShowModal(false);
  };

  const deleteList = (listId) => {
    setShoppingLists(shoppingLists.filter((list) => list.id !== listId));
    setShowConfirm(null);
  };

  const archiveList = (listId) => {
    setShoppingLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId ? { ...list, isArchived: !list.isArchived } : list
      )
    );
  };

  return (
    <div className="overview-container">
      <header className="header">
        <h1 className="header-title">My Shopping Lists</h1>
        <button className="add-button" onClick={() => setShowModal(true)}>
          + Add List
        </button>
      </header>

      <div className="filter-section">
        <label>
          <input
            type="checkbox"
            checked={filterArchived}
            onChange={() => setFilterArchived(!filterArchived)}
          />
          Show Archived Lists
        </label>
      </div>

      <div className="tiles-container">
        {filteredLists.map((list) => (
          <div
            key={list.id}
            className={`list-tile ${list.isArchived ? 'archived' : ''}`}
            onClick={() => navigate(`/lists/${list.id}`)}
          >
            {list.owner === currentUser.id && (
              <button
                className="archive-button"
                onClick={(e) => {
                  e.stopPropagation();
                  archiveList(list.id);
                }}
                title={list.isArchived ? 'Unarchive List' : 'Archive List'}
              >
                📦
              </button>
            )}
            <h2>{list.name}</h2>
            {list.owner === currentUser.id && (
              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowConfirm(list.id);
                }}
                title="Delete List"
              >
                🗑
              </button>
            )}
          </div>
        ))}
      </div>

      {showModal && <AddListModal onAddList={addNewList} onClose={() => setShowModal(false)} />}
      {showConfirm && (
        <ConfirmationDialog
          message="Are you sure you want to delete this list?"
          onConfirm={() => deleteList(showConfirm)}
          onCancel={() => setShowConfirm(null)}
        />
      )}
    </div>
  );
}

export default ShoppingListsOverview;
