import './App.css'
import RadioButton from './components/RadioButton'
import Select from 'react-select';
import { regions } from './options';

function App() {


  return (
    <>
      <form>
        <h2>Jaký typ nemovitosti hledáte?</h2>
        <div className="radio-button-wrapper">
          <RadioButton id="house" label="Dům" icon="/src/assets/house.svg" />
          <RadioButton id="apartment" label="Byt" icon="/src/assets/apartment.svg" />
          <RadioButton id="building-lot" label="Stavební pozemek" icon="/src/assets/building-lot.svg" />
        </div>

        <h2>Kde se nemovitost nachází?</h2>
        <Select options={regions} placeholder="Vyberte kraj" />

      </form>
    </>
  )
}

export default App
