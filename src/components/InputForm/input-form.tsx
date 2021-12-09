import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { AlgorithmContants, CipherType, AlgorithmType } from '../../models/cipher';
import { addLog, setData } from '../../reducers/appReducer';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

const InputForm = () => {
  const dispatch = useAppDispatch();
  const cipherData = useAppSelector(state => state.app.data);
  const [formData, setFormData] = useState({ ...cipherData });

  const onClickEncrypt = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(addLog('Encrypting...'));
    dispatch(setData({ ...formData, isDecrypt: false }));
  };

  const onClickDecrypt = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(addLog('Decrypting...'));
    dispatch(setData({ ...formData, isDecrypt: true }));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Form>
      <legend>Ứng dụng mã hóa/giải mã chơi chơi</legend>
      <FormGroup>
        <Label for="algorithm">Thuật toán</Label>
        <Input id="algorithm" name="algorithm" type="select" onChange={onChange}>
          {Object.keys(AlgorithmContants).map(key => (
            <option key={key} value={key}>
              {AlgorithmContants[key as AlgorithmType]}
            </option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="content">Nội dung</Label>
        <Input type="text" name="content" id="content" onChange={onChange} defaultValue={formData.content} />
      </FormGroup>
      <FormGroup>
        <Label for="k">K</Label>
        <Input type="text" name="k" id="k" onChange={onChange} defaultValue={formData.k} />
      </FormGroup>
      <Button color="primary" type="button" onClick={onClickEncrypt}>
        Encrypt
      </Button>
      &nbsp;
      <Button color="secondary" type="button" onClick={onClickDecrypt}>
        Decrypt
      </Button>
    </Form>
  );
};
export default InputForm;
