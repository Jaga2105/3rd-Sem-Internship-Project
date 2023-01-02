import axios from 'axios';
import { useState } from 'react';
// import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PatientUpdate = (props) => {
  const navigate = useNavigate();
  const [diseases, setDiseases] = useState([{ disease: '', yrs: '' }]);

  const addDisease = () => {
    const diseaseList1 = [...diseases];
    diseaseList1.push({ disease: '', yrs: '' });
    setDiseases(diseaseList1);
  };

  console.log(diseases);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`/updatepatient`, diseases);
      console.log(res);

      if (res.status === 200) {
        props.settoastCondition({
          status: 'success',
          message: 'Your Registration done Successfully!',
        });
        props.setToastShow(true);
        navigate('/patient/dashboard');
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div className='w-full my-8 px-4 col-span-10 flex items-center justify-center flex-col'>
      <h1 className='text-2xl font-bold'>Add Patient diseases</h1>

      <form
        onSubmit={handleFormSubmit}
        className='bg-white p-4 mt-8 shadow max-w-[480px]'
      >
        {diseases.map((disease, i) => (
          <div className='flex gap-4'>
            <div className='my-2'>
              <label htmlFor={'disease' + i + 1} className='block mb-2'>
                Disease {i + 1}
              </label>
              <div className='flex gap-4'>
                <input
                  type='text'
                  name='disease'
                  id={'disease' + i + 1}
                  placeholder={'Disease name'}
                  className='block rounded-md border p-2 w-full'
                  onChange={(e) => {
                    let diseaseList1 = [...diseases];
                    diseaseList1[i].disease = e.target.value;
                    setDiseases(diseaseList1);
                  }}
                />
                <input
                  type='text'
                  name='yrs'
                  placeholder={'Disease duration'}
                  className='block rounded-md border p-2 w-full'
                  onChange={(e) => {
                    let diseaseList1 = [...diseases];
                    diseaseList1[i].yrs = e.target.value;
                    setDiseases(diseaseList1);
                  }}
                />
                {diseases.length - 1 === i && (
                  <button
                    type='button'
                    onClick={addDisease}
                    className='bg-blue-600 rounded-md px-4 py-2 text-white'
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        <button
          type='submit'
          className='font-bold rounded my-2 px-8 w-full text-white bg-primary py-2'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PatientUpdate;
