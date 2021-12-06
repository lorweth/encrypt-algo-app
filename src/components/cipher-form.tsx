import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/hook';
import { CipherDataType } from '../models/cipher';
import { setData } from '../reducers/appReducer';

const CipherForm = () => {
  const [formData, setFormData] = useState<CipherDataType>({ plaintext: '', k: '' });
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClickEncrypt = (e: React.MouseEvent<HTMLButtonElement>) => {
    // dispath data
    console.log('Encrypt: ' + JSON.stringify(formData));
    dispatch(setData(formData));
  };

  return (
    <form>
      <h1>Mã hóa RC4</h1>
      <input
        type="text"
        className="form-control"
        name="plaintext"
        id="plaintext"
        onChange={handleChange}
        defaultValue={formData.plaintext}
        placeholder="Nhập văn bản cần mã hóa"
      />

      <input type="text" className="form-control" name="k" id="k" onChange={handleChange} defaultValue={formData.k} placeholder="Nhập k" />
      <div className="form-group mt-3">
        <button className="btn btn-primary" type="button" onClick={handleClickEncrypt}>
          Mã hóa
        </button>
        &nbsp;
        <button className="btn btn-secondary" type="button">
          Giải mã
        </button>
      </div>
    </form>
  );
};
export default CipherForm;
