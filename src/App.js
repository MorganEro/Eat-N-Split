import { useState } from 'react';

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);

  function handleShowAddFriend() {
    setShowAddFriend(show => !show);
  }

  function handleAddFriend(friend) {
    setFriends(friends => [...friends, friend]);
    setShowAddFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? 'Close' : 'Add Friend'}
        </Button>
      </div>

      <FormSplitBill />
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button
      className="button"
      onClick={onClick}>
      {children}
    </button>
  );
}

function FriendsList({ friends }) {
  return (
    <ul>
      {friends.map(friend => (
        <Friend
          friend={friend}
          key={friend.id}
        />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img
        src={friend.image}
        alt={friend.name}
      />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          {' '}
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {' '}
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && (
        <p>
          {' '}
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      <Button>Select</Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');

  const handleSubmit = event => {
    event.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id: id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);

    setName('');
    setImage('https://i.pravatar.cc/48');
  };

  return (
    <form
      className="form-add-friend"
      onSubmit={handleSubmit}>
      <label htmlFor="Name">🧑‍🤝‍👩🏽Friend name</label>
      <input
        id="Name"
        type="text"
        value={name}
        onChange={event => setName(event.target.value)}
      />

      <label htmlFor="Image">🏞️Image Url</label>
      <input
        id="Image"
        type="text"
        value={image}
        onChange={event => setImage(event.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2> Split a bill with X </h2>

      <label htmlFor="BillValue">💰 Bill Value</label>
      <input
        id="BillValue"
        type="text"
      />

      <label htmlFor="YourExpense">🫵 Your Expense</label>
      <input
        id="YourExpense"
        type="text"
      />

      <label htmlFor="XExpense">🤑 X's Expense</label>
      <input
        id="XExpense"
        type="text"
        disabled
      />

      <label htmlFor="WhoPays">💳 Who is paying the bill</label>
      <select id="WhoPays">
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
