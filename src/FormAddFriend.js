import { useState } from 'react';
import { Button } from './Button';

export function FormAddFriend({ onAddFriend }) {
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
