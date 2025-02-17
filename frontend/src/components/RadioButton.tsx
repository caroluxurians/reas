import { JSX } from "react"

type RadioButonProps = {
  id: string
  value: string
  label?: JSX.Element
  checked: boolean
  icon: string
  alt: string
  handleChange: (key: string, value: string) => void
}

const RadioButton = ({ id, value, label, checked, icon, alt, handleChange }: RadioButonProps) => {
  return (
    <div className="radio-button">
      <input
        type="radio"
        name="estate"
        id={id}
        className="radio-input"
        value={value}
        checked={checked}
        onChange={() => handleChange("estateType", value)}
      />
      <label htmlFor={id} className={checked ? "radio-label radio-label-checked" : "radio-label"}>
        <img src={icon} height={45} width={45} alt={alt} />
        {label ?? value}
      </label>
    </div>
  );
};

export default RadioButton;
