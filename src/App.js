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
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend(show => !show);
  }

  function handleAddFriend(friend) {
    setFriends(friends => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelectFriend(friend) {
    // setSelectedFriend(friend); just made the button select a friend
    setSelectedFriend(
      selectedFriend => (selectedFriend?.id === friend.id ? null : friend) //this version allows the same button to select and unselect the friend. it is saying that if the friend event already has a friend and the Id's match, then the friend will be unselected, if not, the friend will be selected. The ? operator is used to check if there is a selected friend. It is the same as "selectedFriend && selectedFriend.id". Called optional chaining
    );
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends(friends =>
      friends.map(friend =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelectFriend={handleSelectFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? 'Close' : 'Add Friend'}
        </Button>
      </div>

      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
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

function FriendsList({ friends, onSelectFriend, selectedFriend }) {
  return (
    <ul>
      {friends.map(friend => (
        <Friend
          friend={friend}
          selectedFriend={selectedFriend}
          onSelectFriend={onSelectFriend}
          key={friend.id}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelectFriend, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id; //uses optional chaining otherwise, the onSelectFriend/handleSelectFriend function will throw an error when the selectedFriend is null

  return (
    <li className={isSelected ? 'selected' : ''}>
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
      <Button onClick={() => onSelectFriend(friend)}>
        {isSelected ? 'Close' : 'Select'}
      </Button>
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

function InputField({ label, value, onChange, error, id, disabled = false }) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <div className="input-wrapper">
        <span className="dollar-sign">$</span>
        <input
          className="dollar-input"
          value={value}
          onChange={onChange}
          id={id}
          type="text"
          disabled={disabled}
          aria-label={label}
          aria-invalid={!!error}
        />
      </div>
      {error && <div className="error-message">{error}</div>}
    </>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState('');
  const [paidByUser, setPaidByUser] = useState('');
  const [whoIsPaying, setWhoIsPaying] = useState('user');
  const [errors, setErrors] = useState({ bill: '', paidByUser: '' });
  const paidByFriend = Number((Number(bill) - Number(paidByUser)).toFixed(2));

  const validateInput = (value, relatedValue = null) => {
    if (!/^\d*\.?\d{0,2}$/.test(value)) return 'Invalid format';
    if (relatedValue !== null && Number(value) > Number(relatedValue))
      return 'Cannot exceed total bill';
    return '';
  };

  const handleBillChange = event => {
    const value = event.target.value;
    const error = validateInput(value);
    setErrors({ ...errors, bill: error });
    if (!error) setBill(value);
  };

  const handlePaidByUserChange = event => {
    const value = event.target.value;
    const error = validateInput(value, bill);
    setErrors({ ...errors, paidByUser: error });
    if (!error) setPaidByUser(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const errorBill = validateInput(bill);
    const errorPaidByUser = validateInput(paidByUser, bill);

    if (errorBill || errorPaidByUser) {
      setErrors({ bill: errorBill, paidByUser: errorPaidByUser });
      return;
    }

    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser);
  };

  return (
    <form
      className="form-split-bill"
      onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <InputField
        label="💰 Bill Value"
        value={bill}
        onChange={handleBillChange}
        error={errors.bill}
        id="BillValue"
      />

      <InputField
        label="🫵 Your Expense"
        value={paidByUser}
        onChange={handlePaidByUserChange}
        error={errors.paidByUser}
        id="YourExpense"
      />

      <InputField
        label={`🤑 ${selectedFriend.name}'s Expense`}
        value={bill && paidByUser ? paidByFriend : ''}
        id={`${selectedFriend.name}Expense`}
        disabled={true}
      />

      <label htmlFor="WhoPays">💳 Who is paying the bill</label>
      <select
        id="WhoPays"
        value={whoIsPaying}
        onChange={event => setWhoIsPaying(event.target.value)}
        aria-label="Who is paying the bill">
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button type="submit">Split Bill</Button>
    </form>
  );
}
