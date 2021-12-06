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
    <div className="card p-3 mb-5 bg-white">
      <form className="card-body">
        <div className="form-group">
          <label htmlFor="plaintext" className="form-label mt-4">
            Plain text
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              name="plaintext"
              id="plaintext"
              onChange={handleChange}
              defaultValue={formData.plaintext}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="k" className="form-label mt-4">
            k
          </label>
          <div className="col-sm-10">
            <input type="text" className="form-control" name="k" id="k" onChange={handleChange} defaultValue={formData.k} />
          </div>
        </div>
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
    </div>
  );
};
export default CipherForm;
