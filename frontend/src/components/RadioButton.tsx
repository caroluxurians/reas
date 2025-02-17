type RadioButonProps = {
  id: string
  label: string
  checked: boolean
  icon: string
  alt: string
  handleChange: (key: string, value: string) => void
}

const RadioButton = ({ id, label, checked, icon, alt, handleChange }: RadioButonProps) => {
  return (
    <div className="radio-button">
      <input
        type="radio"
        name="estate"
        id={id}
        className="radio-input"
        value={label}
        checked={checked}
        onChange={() => handleChange("estateType", label)}
      />
      <label htmlFor={id} className="radio-label">
        <img src={icon} height={45} width={45} alt={alt} />
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
