import { useState } from "react";
import { sendContactMessage } from "../../../api"; // Import the API function

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendContactMessage(formData);
      setStatus({ type: "success", message: response.data.success });
      setFormData({ name: "", email: "", message: "" }); // Clear the form
    } catch (error) {
      setStatus({ type: "error", message: error.response?.data?.error || "Something went wrong!" });
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
      <div className="absolute w-[400px] h-[400px] bg-yellow-200 rounded-full top-[-150px] left-[-150px] shadow-lg flex items-center justify-center"></div>
      <div className="absolute w-[350px] h-[350px] bg-blue-500 rounded-full bottom-[-100px] right-[-100px]"></div>
      <div className="relative bg-gradient-to-r from-yellow-200 to-blue-500 p-8 rounded-lg shadow-lg z-10 max-w-3xl grid place-items-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
          <h2 className="text-2xl font-bold text-blue-700 text-center mb-4">Contact Us</h2>
          <p className="text-gray-600 text-center mb-6">
            We would love to hear from you! Fill out the form below and we will get back to you as soon as possible.
          </p>

          {status && (
            <div
              className={`text-center p-2 mb-4 rounded ${
                status.type === "success" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
              }`}
            >
              {status.message}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border rounded h-32"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
