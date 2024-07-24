import React from 'react';
import styled from 'styled-components';
import Modal from '../../../components/modal';
import DropdownAlert from '../../../components/dropdown-alert';
import Select from 'react-select';
import cryptoList from '../../../constants/crypto-list';
import sets, { SetModel } from '../../../models/set';
import Button from '../../../components/button';
import { showAlertMessage } from '../../../constants/msg';
import selectStyle from '../../../components/select-style';

interface AddPairModalProps {
    onClose: () => void;
    show: boolean
    dropdownRef: React.RefObject<DropdownAlert>
}

const AddPairModal: React.FC<AddPairModalProps> = ({ onClose, dropdownRef, show }) => {
    if (!show) return null

    const [loading, setLoading] = React.useState<boolean>(false)
    const [tokenA, setTokenA] = React.useState<string>('')

    const onAdd = async () => {
        setLoading(true)
        const err = await sets.addSet(tokenA.toUpperCase())
        setLoading(false)
        if (err){
            showAlertMessage(dropdownRef).error(err)
        } else {
            onClose()
        }
    }


    const takenSymbolList = sets.map((set: SetModel) => set.get().settings().get().id()[0].toUpperCase()) as string[]

    const renderSelect = () => {

        const options = cryptoList.filter((crypto) => {
            return !takenSymbolList.includes(crypto.symbol.toUpperCase()) && crypto.symbol.toUpperCase().indexOf('USD') == -1
        }).map((crypto, idx: number) => {
            return {
                value: crypto.symbol,
                label: idx+1 + '. ' + crypto.symbol + ' (' + crypto.name + ')'
            }
        })

        return (
            <Select
                styles={selectStyle} 
                isSearchable={true}
                options={options}
                onChange={(selectedOption) => {
                    selectedOption && setTokenA(selectedOption.value)
                }}
            />
        )
    }

  return (
    <Modal onClose={onClose}>
      <ModalWrapper>
        <h3 style={{color: 'white', margin: 10, padding: 0}}>
            <span style={{ fontWeight: 800 }}>New Pair</span>
        </h3>
        <div style={{width: 300, marginTop: 20}}>
            <span style={{fontSize: 11}}>TOKEN A:</span>
            {renderSelect()}
        </div>
        <div style={{width: 300, marginTop: 20}}>
            <span style={{fontSize: 11}}>TOKEN B:</span>
            <Select
                styles={selectStyle}
                isSearchable={true}
                isDisabled={true}
                defaultValue={{value: 'USDT', label: 'USDT (Tether)'}}
            />
        </div>
        <Button
            color={'green'}
            title={'Add'}
            disabled={tokenA.length === 0}
            style={{width: 150, height: 30, marginTop: 50, marginBottom: 20}}
            onClick={onAdd}
            loading={loading}
        >
        </Button>
      </ModalWrapper>
    </Modal>
  );
};

export default AddPairModal;

const ModalWrapper = styled.div`
  width: 400px;
  min-height: 300px;
  background-color: #111111;
  border-radius: 10px;
  margin-top: 40px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;