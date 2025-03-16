import { useState } from 'react';
import { FaAmbulance, FaFire, FaPhone, FaCarCrash, FaHeartbeat, FaLungs, FaBolt, FaUserInjured, FaShieldAlt, FaFireAlt, FaHandHoldingWater, FaFemale, FaRunning, FaBan } from 'react-icons/fa';

const EmergencyForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    location: 'location',
    floor: 9,
    building: 90,
    apartment: 20,
    userInfo: {
      name: 'Mohamed Hossam',
      phone: '010XXXXXXXXXX',
      bloodType: 'A+',
      allergies: 'no allergies, asthma',
    },
    emergencyType: [],
    additionalDetails: [],
    questions: {
      alone: '',
      weapons: '',
      hurt: '',
      abuser: '',
    },
    extraDetails: '',
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleEmergencyType = (type) => {
    setFormData({ ...formData, emergencyType: [...formData.emergencyType, type] });
    nextStep();
  };

  const handleQuestions = (question, value) => {
    setFormData({
      ...formData,
      questions: { ...formData.questions, [question]: value },
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

  const handleExtraDetails = (e) => {
    setFormData({ ...formData, extraDetails: e.target.value });
  };

  const renderStep = () => {
    switch (step) {
      case 1: // Select Emergency Service
        return (
          <div className="p-6 flex-1 flex flex-col">
            <h2 className="text-4xl font-bold text-red-600 mb-6">EMERGENCY CASE</h2>
            <p className="text-lg text-gray-700 mb-4">{formData.location}</p>
            <button className="bg-red-500 text-white px-6 py-3 rounded mb-6 w-fit">EDIT</button>
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

      case 2: // Questions
        return (
          <div className="p-6 flex-1 flex flex-col">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-red-600">Are you alone?</h3>
              <div className="flex gap-4 mt-4">
                {['yes', 'no', 'not sure'].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleQuestions('alone', option)}
                    className={`px-6 py-3 rounded-lg text-lg ${
                      formData.questions.alone === option ? 'bg-red-500 text-white' : 'bg-red-200 text-red-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-red-600">Are there any weapons involved?</h3>
              <div className="flex gap-4 mt-4">
                {['yes', 'no', 'not sure'].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleQuestions('weapons', option)}
                    className={`px-6 py-3 rounded-lg text-lg ${
                      formData.questions.weapons === option ? 'bg-red-500 text-white' : 'bg-red-200 text-red-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-red-600">Are you hurt?</h3>
              <div className="flex gap-4 mt-4">
                {['yes', 'no', 'someone else is hurt'].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleQuestions('hurt', option)}
                    className={`px-6 py-3 rounded-lg text-lg ${
                      formData.questions.hurt === option ? 'bg-red-500 text-white' : 'bg-red-200 text-red-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-red-600">Is there an abuser next to you?</h3>
              <div className="flex gap-4 mt-4">
                {['yes', 'no', 'not sure'].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleQuestions('abuser', option)}
                    className={`px-6 py-3 rounded-lg text-lg ${
                      formData.questions.abuser === option ? 'bg-red-500 text-white' : 'bg-red-200 text-red-700'
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

      case 3: // Additional Details
        return (
          <div className="p-6 flex-1 flex flex-col">
            <h2 className="text-3xl font-semibold mb-6">Additional details</h2>
            <p className="text-lg text-gray-600 mb-6">select all that apply</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
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

      case 4: // Extra Details
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

      case 5: // Summary
        return (
          <div className="p-6 flex-1 flex flex-col">
            <h2 className="text-4xl font-bold mb-6">Summary</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-red-500 text-white p-6 rounded-lg">
                <h3 className="text-2xl font-semibold">LOCATION</h3>
                <p className="text-lg">{formData.location}</p>
                <p className="text-lg">floor: {formData.floor}</p>
                <p className="text-lg">building: {formData.building}</p>
                <p className="text-lg">apartment: {formData.apartment}</p>
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
                <p className="text-lg">{formData.emergencyType.join(', ')}</p>
                <p className="text-lg">
                  {formData.additionalDetails.join(', ')}, {Object.values(formData.questions).join(', ')},{' '}
                  {formData.extraDetails}
                </p>
              </div>
            </div>
            <div className="mt-auto flex justify-center">
              <button onClick={nextStep} className="bg-red-500 text-white px-6 py-3 rounded text-lg">
                contact help
              </button>
            </div>
          </div>
        );

      case 6: // Call to 112
        return (
          <div className="p-6 flex-1 flex flex-col">
            <h2 className="text-4xl font-bold mb-6">we are making your call to 112</h2>
            <div className="flex justify-around items-center mb-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <FaPhone className="text-3xl" />
                </div>
                <p className="text-lg mt-2">convert to speech</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                  <FaPhone className="text-3xl" />
                </div>
                <p className="text-lg mt-2">talking to 112</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
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

      case 7: // Help in the Way
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