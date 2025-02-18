import './App.css'
import RadioButton from './components/RadioButton'
import Select from 'react-select';
import { regions, districts } from './options';
import { useState } from 'react';
import { Option } from './options';
import house from "./img/house.svg";
import apartment from "./img/apartment.svg";
import buildingLot from "./img/building-lot.svg";
import arrow from "./img/arrow.svg";
import submit from "./img/submit.svg";
import { customStyles } from './reactSelectCustomStyles';

function App() {
  const [formData, setFormData] = useState({
    estateType: "",
    region: "",
    district: "",
    fullName: "",
    phone: "",
    email: "",
  })

  const [districtOptions, setDistrictOptions] = useState<Option[]>([]);
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");

  const paginationButtonDisabled = !formData.estateType || !formData.region || !formData.district;
  const submitDisabled = !formData.fullName || !formData.phone || !formData.email;

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const dev = import.meta.env.MODE === "development";

  const handleSubmit = async () => {
    const response = await fetch(dev ? "http://localhost/lead" : "/lead", {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.status === 400) {
      setMessage(await response.text());
    }
    if (response.ok) {
      setStep(3);
    }
  }

  return (
    <div className="form-wrapper">
      <form className="form" action={handleSubmit}>
        {step === 1 && (
          <>
            <div>
              <h2>Jaký typ nemovitosti hledáte?</h2>
              <fieldset className="radio-button-wrapper">
                <RadioButton
                  id="house"
                  value="Dům"
                  alt="house icon"
                  icon={house}
                  handleChange={handleChange}
                  checked={formData.estateType === "Dům"}
                />
                <RadioButton
                  id="apartment"
                  value="Byt"
                  alt="apartment icon"
                  icon={apartment}
                  handleChange={handleChange}
                  checked={formData.estateType === "Byt"}
                />
                <RadioButton
                  id="building-lot"
                  value="Stavební pozemek"
                  label={<>Stavební <br /> pozemek</>}
                  alt="building lot icon"
                  icon={buildingLot}
                  handleChange={handleChange}
                  checked={formData.estateType === "Stavební pozemek"}
                />
              </fieldset>
            </div>
            <div className="selector-wrapper">
              <h2>O jakou lokalitu se zajímate?</h2>
              <Select
                options={regions}
                value={regions.find(region => region.value === formData.region) || null}
                placeholder="Vyberte kraj"
                required
                styles={customStyles}
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    handleChange("region", selectedOption.value);
                    handleChange("district", "");
                    setDistrictOptions(districts[selectedOption.value as keyof typeof districts]);
                  }
                }}
              />
              <Select
                options={districtOptions}
                value={districtOptions?.find(district => district.value === formData.district) || null}
                placeholder="Vyberte okres"
                required
                styles={customStyles}
                isDisabled={!formData.region}
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    handleChange("district", selectedOption.value);
                  }
                }}
              />
            </div>
            <div className="button-container">
              <button
                type="button"
                className={`pagination-button ${paginationButtonDisabled ? 'button-disabled' : ''}`}
                onClick={() => setStep(2)}
                disabled={paginationButtonDisabled}
              >
                <span>Další krok</span>
                <img src={arrow} height={25} width={25} alt="arrow icon" />
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <div className="contact-form-wrapper">
            <h2>Kontaktní údaje</h2>
            <div className="contact-wrapper">
              <label>Celé jméno</label>
              <input
                type="text"
                pattern="^[A-Za-zÀ-ž]+(?: [A-Za-zÀ-ž]+)+$"
                className="input-contact"
                required
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
              />
              <label>Telefonní číslo</label>
              <div className="phone-input-wrapper">
                <span className="prefix">+420</span>
                <input
                  type="tel"
                  pattern="^[1-9][0-9]{8}$"
                  className="input-phone"
                  required
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>
              <label>Email</label>
              <input
                type="email"
                className="input-contact"
                required
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            <div className="message">{message}</div>

            <div className="button-wrapper">
              <div className="button-container">
                <button type="button" className="pagination-button" onClick={() => setStep(1)}>
                  <img src={arrow} height={20} width={20} alt="arrow icon" className="back-arrow" />
                  Předchozí krok
                </button>
              </div>
              <button
                type="submit"
                className={`pagination-button ${submitDisabled ? 'button-disabled' : ''}`}
                disabled={submitDisabled}
              >
                Odeslat
                <img src={submit} height={25} width={25} alt="submit button" />
              </button>
            </div>
          </div>
        )}
      </form>
      {step === 3 && (
        <div>
          Formulář úspěšně odeslán!
          Děkujeme za Váš zájem
        </div>
      )}
    </div >
  )
}

export default App
