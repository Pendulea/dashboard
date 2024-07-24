export default {
    valueContainer: (provided: any) => ({
        ...provided,
        height: '30px',
        padding: '0 8px',
        display: 'flex',
        alignItems: 'center',
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
    indicatorsContainer: (provided: any) => ({
        ...provided,
        height: '30px',
    }),
    control: (provided: any) => ({
        ...provided,
        backgroundColor: '#353535',
        borderColor: '#353535',
        minHeight: '30px',
        height: '30px',
        fontSize: 13,
        display: 'flex',
        alignItems: 'center',
    }),
    input: (provided: any) => ({
        ...provided,
        color: '#FFFFFF',
        height: 'auto',
        fontSize: 13,
        margin: '0px',
        paddingTop: 0,
        paddingBottom: 0,
    }),
    menu: (provided: any) => ({
        ...provided,
        backgroundColor: '#353535',
        color: '#fff',
        fontSize: 13,
    }),
    singleValue: (provided: any) => ({
        ...provided,
        fontSize: 13,
        color: '#fff',
        fontWeight: 600,
    }),
    option: (provided:any, state:any) => ({
        ...provided,
        backgroundColor: state.isSelected
        ? '#555555'
        : state.isFocused
        ? '#444444'
        : '#353535',
        color: '#fff',
        padding: '5px 10px',
        fontSize: 13,
    }),
    placeholder: (provided: any) => ({
        ...provided,
        color: '#aaa',
        fontSize: 13,
    }),
}