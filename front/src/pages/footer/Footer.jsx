import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import { sendFeedbackMessage } from '../../../api';

const Foooter = () => {
  const [feedback, setFeedback] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendFeedbackMessage(feedback);
      setStatus({ type: 'success', message: response.data.message });
      setFeedback({ name: '', phone: '', email: '', message: '' }); // Clear form
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.error || 'Failed to submit feedback' });
    }
  };

  return (
    <div>
      <footer className="bg-[#1B2A41] text-white p-10 flex flex-col md:flex-row justify-between items-center">
        <div className="text-left md:w-1/3 space-y-3">
          <h2 className="text-xl font-bold">Contact us:</h2>
          <div className="flex space-x-4">
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faTwitter} />
            <FontAwesomeIcon icon={faInstagram} />
            <FontAwesomeIcon icon={faLinkedin} />
          </div>

          <div className="flex items-center space-x-2">
            <span role="img" aria-label="phone">📞</span>
            <span className="font-semibold">+123-456-7890</span>
          </div>
          <div className="flex items-center space-x-2">
            <span role="img" aria-label="email">📧</span>
            <span className="font-semibold">hear@me.out.com</span>
          </div>
        </div>

        <div className="md:w-1/3 flex flex-col items-center">
          <h2 className="text-xl font-bold">Leave your feedback:</h2>
          {status && (
            <div className={`p-2 rounded ${status.type === 'success' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
              {status.message}
            </div>
          )}
          <form className="space-y-3 w-full max-w-md" onSubmit={handleSubmit}>
            <div className="flex space-x-2">
              <input 
                type="text" 
                name="name"
                placeholder="Name" 
                className="flex-1 p-3 rounded-md border text-black" 
                value={feedback.name} 
                onChange={handleChange} 
              />
              <input 
                type="text" 
                name="phone"
                placeholder="Phone number" 
                className="flex-1 p-3 rounded-md border text-black" 
                value={feedback.phone} 
                onChange={handleChange} 
              />
            </div>
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              className="w-full p-3 rounded-md border text-black" 
              value={feedback.email} 
              onChange={handleChange} 
            />
            <textarea 
              name="message"
              placeholder="Message" 
              className="w-full p-3 rounded-md border h-24 text-black" 
              value={feedback.message} 
              onChange={handleChange}
            ></textarea>
            <button type="submit" className="bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg w-full hover:bg-yellow-600">
              Submit
            </button>
          </form>
        </div>

        <div className="md:w-1/3 flex justify-center items-center">
          <img src="/assets/logo123.png" alt="HearMeOut Logo" className="h-52 w-auto" />
        </div>
      </footer>
    </div>
  );
};

export default Foooter;
