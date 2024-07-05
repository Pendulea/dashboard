export const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: '#353535',
      color: '#fff',
      borderColor: '#353535',
    }),
    input: (provided: any) => ({
      ...provided,
      color: '#FFFFFF',
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: '#353535',
      color: '#fff',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#fff',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#555555' : state.isFocused ? '#444444' : '#353535',
      color: '#fff',
      padding: '4px 6px',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#aaa',
    }),
  };
  