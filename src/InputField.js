export function InputField({
  label,
  value,
  onChange,
  error,
  id,
  disabled = false,
}) {
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
        {error && <div className="error-message">{error}</div>}
      </div>
    </>
  );
}
