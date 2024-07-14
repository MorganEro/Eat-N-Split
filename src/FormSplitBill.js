import { useState } from 'react';
import { Button } from './Button';
import { InputField } from './InputField';

export function FormSplitBill({ selectedFriend, onSplitBill }) {
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
