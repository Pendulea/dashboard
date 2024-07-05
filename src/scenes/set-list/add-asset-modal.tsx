import React from 'react';
import styled from 'styled-components';
import Modal from '../../components/modal';
import { IAddAssetRequest, SetModel } from '../../models/set';
import AddAsset from './add-asset';
import DropdownAlert from '../../components/dropdown-alert';
import { showAlertMessage } from '../../constants/msg';

interface AddPairModalProps {
    set?: SetModel
    onClose: () => void;
    dropdownRef: React.RefObject<DropdownAlert>
}

const AddPairModal: React.FC<AddPairModalProps> = ({ set, onClose, dropdownRef }) => {
  if (!set) return null;

  const id = set.get().settings().get().id()
  const symbol0 = id[0]
  const symbol1 = id[1]
  const onSubmit = async (d: IAddAssetRequest) => {
    const err = await set.addAsset(d)
    if (err){
      showAlertMessage(dropdownRef).error(err)
      return err
    } else {
      onClose()
    }
    return err
  }

  return (
    <Modal onClose={onClose}>
      <ModalWrapper>
        <h3 style={{color: 'white', margin: 10, padding: 0}}>
            <span style={{ fontWeight: 900 }}>{symbol0}</span>-<span style={{ fontWeight: 500 }}>{symbol1}</span>
        </h3>
        <div style={{marginTop: 20, marginBottom: 40}}>
            <AddAsset 
              dropdownRef={dropdownRef}
              set={set} 
              onSubmit={(d: IAddAssetRequest) => onSubmit(d)}
            />
        </div>
      </ModalWrapper>
    </Modal>
  );
};

export default AddPairModal;

const ModalWrapper = styled.div`
  width: 300px;
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