const RadioButton = ({ id, label, icon }: { id: string, label: string, icon: string }) => {
  return (
    <div className="radio-button">
      <input type='radio' />
      {label}
      <img src={icon} height={40} width={40} alt="house" />
    </div>
  );
};

export default RadioButton;
