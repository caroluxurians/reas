import { StylesConfig } from "react-select";

type OptionType = { label: string; value: string };

export const customStyles: StylesConfig<OptionType, false> = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? 'var(--custom-blue)' : provided.borderColor,
    boxShadow: state.isFocused ? '0 0 0 1px var(--custom-blue)' : provided.boxShadow,
    width: '25rem',
    marginBottom: '1rem'
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: '0px',
    borderTop: 'none',
  }),
  menuList: (provided) => ({
    ...provided,
    paddingTop: '0px',
    paddingBottom: '0px',
  }),
};
