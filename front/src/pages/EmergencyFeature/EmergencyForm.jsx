import { FaAmbulance, FaFire, FaPhone, FaCarCrash, FaHeartbeat, FaLungs, FaBolt, FaUserInjured, FaShieldAlt, FaFireAlt, FaHandHoldingWater, FaFemale, FaRunning, FaBan } from 'react-icons/fa';
import { useEffect, useState } from "react";
import axios from "axios";

const EmergencyForm = () => {
  const [coordinates, setCoordinates] = useState({ lat: null, lon: null });

  useEffect(() => {
    const fetchAddress = async (latitude, longitude) => {
      const apiKey = "d98fb63bd1944bcea0f73eb08524133c";
      try {
        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
        );
        const address = response.data.results[0]?.formatted || "Address unavailable";
        setFormData((prevData) => ({ ...prevData, location: address }));
        setCoordinates({ lat: latitude, lon: longitude });
      } catch (error) {
        console.error("Error fetching address:", error);
        setFormData((prevData) => ({
          ...prevData,
          location: "Failed to get address",
        }));
      }
    };
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchAddress(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          setFormData((prevData) => ({
            ...prevData,
            location: "Location unavailable",
          }));
        }
      );
    } else {
      console.error("Geolocation not supported");
      setFormData((prevData) => ({
        ...prevData,
        location: "Geolocation not supported",
      }));
    }
  }, []);

  const [step, setStep] = useState(1);
  const [callState, setCallState] = useState('convert');
  const [formData, setFormData] = useState({
    location: 'location',
    building: '',
    apartment: '',
    userInfo: {
      name: 'Engy Mohamed',
      phone: '11111111111',
      bloodType: 'A+',
      allergies: 'no allergies, asthma',
    },
    emergencyType: [],
    additionalDetails: [],
    questions: {
      alone: { question: "Are you alone?", answer: '' },
      weapons: { question: "Are there any weapons involved?", answer: '' },
      hurt: { question: "Are you hurt?", answer: '' },
      abuser: { question: "Is there an abuser next to you?", answer: '' },
    },
    extraDetails: '',
  });

  useEffect(() => {
    if (step === 6) {
      const convertTimer = setTimeout(() => {
        setCallState('calling');
      }, 3000);

      const callTimer = setTimeout(() => {
        setCallState('completed');
      }, 6000);

      return () => {
        clearTimeout(convertTimer);
        clearTimeout(callTimer);
      };
    }
  }, [step]);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleEmergencyType = (type) => {
    setFormData({ ...formData, emergencyType: [...formData.emergencyType, type] });
    nextStep();
  };

  const handleQuestions = (questionKey, value) => {
    setFormData({
      ...formData,
      questions: {
        ...formData.questions,
        [questionKey]: { ...formData.questions[questionKey], answer: value }
      },
    });
  };

  const handleAdditionalDetails = (detail) => {
    if (formData.additionalDetails.includes(detail)) {
      setFormData({
        ...formData,
        additionalDetails: formData.additionalDetails.filter((d) => d !== detail),
      });
    } else {
      setFormData({
        ...formData,
        additionalDetails: [...formData.additionalDetails, detail],
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleExtraDetails = (e) => {
    setFormData({ ...formData, extraDetails: e.target.value });
  };

  const getMapUrl = () => {
    if (coordinates.lat && coordinates.lon) {
      return `https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.lon - 0.01},${coordinates.lat - 0.01},${coordinates.lon + 0.01},${coordinates.lat + 0.01}&marker=${coordinates.lat},${coordinates.lon}`;
    }
    return null;
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="p-6 flex-1 flex flex-col">
            <h2 className="text-4xl font-bold text-red-600 mb-6">EMERGENCY CASE</h2>
            <p className="text-lg text-gray-700 mb-2">{formData.location}</p>
            {coordinates.lat && coordinates.lon ? (
              <div className="mb-4 w-full h-64">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  src={getMapUrl()}
                  className="rounded-lg"
                />
              </div>
            ) : (
              <p className="text-sm text-gray-500 mb-4">Map unavailable</p>
            )}
            <button className="bg-red-500 text-white px-6 py-3 rounded mb-6 w-fit">EDIT</button>
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-semibold mb-2">Building Number</label>
                <input
                  type="text"
                  name="building"
                  value={formData.building}
                  onChange={handleInputChange}
                  className="w-full p-2 border-2 border-red-500 rounded-lg"
                  placeholder="Enter building number"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2">Apartment Number</label>
                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleInputChange}
                  className="w-full p-2 border-2 border-red-500 rounded-lg"
                  placeholder="Enter apartment number"
                />
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-6">select emergency service</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <button
                onClick={() => handleEmergencyType('police')}
                className="flex flex-col items-center p-6 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                <FaShieldAlt className="text-5xl mb-4" />
                <span className="text-lg">Police</span>
              </button>
              <button
                onClick={() => handleEmergencyType('medical')}
                className="flex flex-col items-center p-6 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                <FaAmbulance className="text-5xl mb-4" />
                <span className="text-lg">Medical</span>
              </button>
              <button
                onClick={() => handleEmergencyType('fire')}
                className="flex flex-col items-center p-6 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                <FaFire className="text-5xl mb-4" />
                <span className="text-lg">Fire</span>
              </button>
            </div>
            <div className="mt-auto flex justify-end">
              <button onClick={nextStep} className="bg-red-500 text-white px-6 py-3 rounded text-lg">
                next
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="p-6 flex-1 flex flex-col">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-red-600">{formData.questions.alone.question}</h3>
              <div className="flex gap-4 mt-4">
                {['yes', 'no', 'not sure'].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleQuestions('alone', option)}
                    className={`px-6 py-3 rounded-lg text-lg ${
                      formData.questions.alone.answer === option ? 'bg-red-500 text-white' : 'bg-red-200 text-red-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-red-600">{formData.questions.weapons.question}</h3>
              <div className="flex gap-4 mt-4">
                {['yes', 'no', 'not sure'].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleQuestions('weapons', option)}
                    className={`px-6 py-3 rounded-lg text-lg ${
                      formData.questions.weapons.answer === option ? 'bg-red-500 text-white' : 'bg-red-200 text-red-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-red-600">{formData.questions.hurt.question}</h3>
              <div className="flex gap-4 mt-4">
                {['yes', 'no', 'someone else is hurt'].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleQuestions('hurt', option)}
                    className={`px-6 py-3 rounded-lg text-lg ${
                      formData.questions.hurt.answer === option ? 'bg-red-500 text-white' : 'bg-red-200 text-red-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-red-600">{formData.questions.abuser.question}</h3>
              <div className="flex gap-4 mt-4">
                {['yes', 'no', 'not sure'].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleQuestions('abuser', option)}
                    className={`px-6 py-3 rounded-lg text-lg ${
                      formData.questions.abuser.answer === option ? 'bg-red-500 text-white' : 'bg-red-200 text-red-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-auto flex justify-between">
              <button onClick={prevStep} className="bg-red-500 text-white px-6 py-3 rounded text-lg">
                back
              </button>
              <button onClick={nextStep} className="bg-red-500 text-white px-6 py-3 rounded text-lg">
                next
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="p-6 flex-1 flex flex-col">
            <h2 className="text-3xl font-semibold mb-6">Additional details</h2>
            <p className="text-lg text-gray-600 mb-6">select all that apply</p>
            <div className="grid grid-cols- sm:grid-cols-1 md:grid-cols-2 gap-2">
              {[
                { label: 'panic attack', icon: <FaHeartbeat /> },
                { label: 'car accident', icon: <FaCarCrash /> },
                { label: 'abusement', icon: <FaUserInjured /> },
                { label: 'bleeding', icon: <FaHandHoldingWater /> },
                { label: 'burn', icon: <FaFireAlt /> },
                { label: 'electric danger', icon: <FaBolt /> },
                { label: 'crime active', icon: <FaShieldAlt /> },
                { label: 'pregnancy', icon: <FaFemale /> },
                { label: 'chest pain', icon: <FaHeartbeat /> },
                { label: 'breathing problem', icon: <FaLungs /> },
              ].map((detail) => (
                <button
                  key={detail.label}
                  onClick={() => handleAdditionalDetails(detail.label)}
                  className={`flex flex-col items-center p-6 rounded-lg transition ${
                    formData.additionalDetails.includes(detail.label) ? 'bg-red-200' : 'bg-gray-200'
                  } hover:bg-gray-300`}
                >
                  <span className="text-4xl mb-4">{detail.icon}</span>
                  <span className="text-lg">{detail.label}</span>
                </button>
              ))}
            </div>
            <div className="mt-auto flex justify-between">
              <button onClick={prevStep} className="bg-red-500 text-white px-6 py-3 rounded text-lg">
                back
              </button>
              <button onClick={nextStep} className="bg-red-500 text-white px-6 py-3 rounded text-lg">
                next
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="p-6 flex-1 flex flex-col">
            <h2 className="text-3xl font-semibold mb-6">any extra detail you wanna add to call:</h2>
            <textarea
              value={formData.extraDetails}
              onChange={handleExtraDetails}
              className="w-full flex-1 p-6 border-2 border-red-500 rounded-lg text-lg"
              placeholder="help there is fire in the upon floor i don't know what to do....."
            />
            <div className="mt-6 flex justify-between">
              <button onClick={prevStep} className="bg-red-500 text-white px-6 py-3 rounded text-lg">
                back
              </button>
              <button onClick={nextStep} className="bg-red-500 text-white px-6 py-3 rounded text-lg">
                next
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="p-6 flex-1 flex flex-col">
            <h2 className="text-4xl font-bold mb-6">Summary</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-red-500 text-white p-6 rounded-lg">
                <h3 className="text-2xl font-semibold">LOCATION</h3>
                <p className="text-lg">{formData.location}</p>
                {coordinates.lat && coordinates.lon ? (
                  <div className="mt-4 w-full h-48">
                    <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      scrolling="no"
                      marginHeight="0"
                      marginWidth="0"
                      src={getMapUrl()}
                      className="rounded-lg"
                    />
                  </div>
                ) : (
                  <p className="text-sm mt-2">Map unavailable</p>
                )}
                <p className="text-lg mt-2">building: {formData.building || 'Not specified'}</p>
                <p className="text-lg">apartment: {formData.apartment || 'Not specified'}</p>
              </div>
              <div className="bg-red-500 text-white p-6 rounded-lg">
                <h3 className="text-2xl font-semibold">INFO</h3>
                <p className="text-lg">{formData.userInfo.name}</p>
                <p className="text-lg">{formData.userInfo.phone}</p>
                <p className="text-lg">blood type is {formData.userInfo.bloodType}</p>
                <p className="text-lg">{formData.userInfo.allergies}</p>
              </div>
              <div className="bg-red-500 text-white p-6 rounded-lg sm:col-span-2">
                <h3 className="text-2xl font-semibold">EMERGENCY</h3>
                <p className="text-lg">Type: {formData.emergencyType.join(', ')}</p>
                <p className="text-lg">Additional Details: {formData.additionalDetails.join(', ')}</p>
                <div className="mt-2">
                  {Object.values(formData.questions).map((q, index) => (
                    q.answer && (
                      <p key={index} className="text-lg">
                        {q.question}: {q.answer}
                      </p>
                    )
                  ))}
                </div>
                {formData.extraDetails && (
                  <p className="text-lg mt-2">Extra Details: {formData.extraDetails}</p>
                )}
              </div>
            </div>
            <div className="mt-auto flex justify-center">
              <button onClick={nextStep} className="bg-red-500 text-white px-6 py-3 rounded text-lg">
                contact help
              </button>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="p-6 flex-1 flex flex-col">
            <h2 className="text-4xl font-bold mb-6">we are making your call to 112</h2>
            <div className="flex justify-around items-center mb-6">
              <div className="flex flex-col items-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  callState === 'convert' ? 'bg-green-500' : 'bg-gray-200'
                }`}>
                  <FaPhone className="text-3xl" />
                </div>
                <p className="text-lg mt-2">convert to speech</p>
              </div>
              <div className="flex flex-col items-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  callState === 'calling' ? 'bg-red-500' : 'bg-gray-200'
                }`}>
                  <FaPhone className="text-3xl" />
                </div>
                <p className="text-lg mt-2">talking to 112</p>
              </div>
              <div className="flex flex-col items-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  callState === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                }`}>
                  <FaPhone className="text-3xl" />
                </div>
                <p className="text-lg mt-2">call completed</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-gray-200 p-6 rounded-lg flex flex-col items-center">
                <FaRunning className="text-4xl mb-4" />
                <p className="text-lg text-center">Evacuate to the safe area and do not stay in closed rooms</p>
              </div>
              <div className="bg-gray-200 p-6 rounded-lg flex flex-col items-center ">
                <FaHandHoldingWater className="text-4xl mb-4" />
                <p className="text-lg text-center">Use wet cloth/Stay low below the smoke to escape</p>
              </div>
              <div className="bg-gray-200 p-6 rounded-lg flex flex-col items-center">
                <FaBan className="text-4xl mb-4" />
                <p className="text-lg text-center">Do not use the lifts in case of fire</p>
              </div>
            </div>
            {callState === 'completed' && (
              <div className="mt-6 flex justify-center">
                <button onClick={nextStep} className="bg-red-500 text-white px-6 py-3 rounded text-lg">
                  Continue
                </button>
              </div>
            )}
          </div>
        );

      case 7:
        return (
          <div className="p-6 flex-1 flex flex-col">
            <h2 className="text-4xl font-bold mb-6">Help in the way</h2>
            <p className="text-lg mb-4">stay calm mohamed and follow the given instruction</p>
            <p className="text-lg mb-6">do you want one of our volunteer contact with you through sms messages?</p>
            <div className="flex gap-4 mb-6">
              <button className="bg-red-500 text-white px-6 py-3 rounded text-lg">yes</button>
              <button className="bg-red-500 text-white px-6 py-3 rounded text-lg">
                No, go to HearMeOut home page
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-gray-200 p-6 rounded-lg flex flex-col items-center">
                <FaRunning className="text-4xl mb-4" />
                <p className="text-lg text-center">Evacuate to the safe area and do not stay in closed rooms</p>
              </div>
              <div className="bg-gray-200 p-6 rounded-lg flex flex-col items-center">
                <FaHandHoldingWater className="text-4xl mb-4" />
                <p className="text-lg text-center">Use wet cloth/Stay low below the smoke to escape</p>
              </div>
              <div className="bg-gray-200 p-6 rounded-lg flex flex-col items-center">
                <FaBan className="text-4xl mb-4" />
                <p className="text-lg text-center">Do not use the lifts in case of fire</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      {renderStep()}
      <div className="flex justify-center gap-3 p-6 border-t">
        {Array.from({ length: 7 }, (_, i) => i + 1).map((s) => (
          <div
            key={s}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
              step >= s ? 'bg-red-500 text-white' : 'bg-gray-200'
            }`}
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyForm;