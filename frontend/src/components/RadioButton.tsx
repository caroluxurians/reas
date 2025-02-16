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
      <input type="radio" name="estate" id={id} value={label} checked={checked} onChange={() => handleChange("estateType", label)} />
      <label htmlFor={id}>
        {label}
        <img src={icon} height={40} width={40} alt={alt} />
      </label>
    </div>
  );
};

export default RadioButton;
