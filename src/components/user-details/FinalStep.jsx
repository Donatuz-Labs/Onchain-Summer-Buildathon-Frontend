import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../actions/profile';
import StandardButton from '../shared/StandardButton';
import TextInput from '../shared/TextInput';
import onboardingBar3 from '../../assets/onboarding-bar-3.png';

import ChevronRight from '../../assets/svg/chevron-right.svg';
import CamaraIcon from '../../assets/ion_camera-sharp.svg';


const FinalStep = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  let { token } = useParams();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // const errorMessage = useSelector((state) => state.profile.resetPasswordError);
  // const requestResponse = useSelector((state) => state.profile.resetPasswordSuccess);

  useEffect(() => {
    // if (!token) {
    //   navigate('/login')
    // }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
      
    try {
      // dispatch(resetPassword({newPassword: password, token}));
      // setRequestResponse(response.message);
      // if todo ok
      navigate('/done');
    } catch (error) {
      // setErrorMessage(error.message);
    }

    setIsLoading(false);
  };

  const [description, setDescription] = useState('');

  return (
    <div className="w-full h-full bg-personal-bg md:bg-personal-bg-one">
      <div className="flex justify-center items-center h-screen mx-6 md:mx-4 ">
        <div className="relative flex flex-col items-center w-full md:w-120  md:rounded-2 md:mx-auto md:px-5 py-5 md:bg-dark-gray-left-gradient">   
            <>
              <div className="flex flex-col justify-center items-center text-center md:w-5/6">
                <h1 className="font-bold text-5-5 md:text-7 text-center text-white leading-natural -tracking-0-6 w-full">
                  Final Step
                </h1>
                <p className='text-white text-center mb-6'>Add Your Banner Image and Description</p>
              </div>

              <form
                id="reset-password-form"
                className="w-full mt-8 space-y-3"
                onSubmit={handleSubmit}
              >

                <div className='bg-dark-gray-left-gradient-light h-30 w-full rounded-2 flex justify-center items-center'>
                  <img
                    className="inline h-14 fill-white text-white items-center "
                    src={CamaraIcon}
                    alt={"arrow-logo"}
                  /> 
                </div>

                <TextInput
                  id="description"
                  type="text"
                  placeholder="Enter Description"
                  name="description"
                  className="w-full"
                  onChange={setDescription}
                  value={description}
                />
   

                <div className="text-center flex flex-row space-x-3">
                  <div onClick={() => navigate(`/creator-socials`)} className="bg-dark-gray-left-gradient-light w-1/2 h-12 text-5 font-medium rounded-2 mt-0 self-center focus:outline-none ">
                    <button
                      onClick={() => navigate(`/creator-socials`)}
                      className="inline-flex justify-center items-center mt-2 space-x-1"
                    >
                      <img
                        className="inline h-3-5 fill-white text-white mt-1"
                        src={ChevronRight}
                        alt={"arrow-logo"}
                      /> 
                      <span className="text-left text-white font-semibold text-5">
                        Back 
                      </span>
                    </button>
                  </div>
                  <StandardButton
                    text="Save"
                    type="submit"
                    heightStyle="h-12"
                    widthStyle="w-1/2"
                    textSizeStyle="text-5"
                    className="font-medium rounded-2 mt-0 self-center focus:outline-none hover:bg-primary-hover"
                  />
                </div>
              </form>
              <img className="flex h-2 w-16 rounded-3 justify-center my-6" src={onboardingBar3} alt="onboardingBar2" />
              
            </>
        </div>
      </div>
    </div>
  );
};

export default FinalStep;
