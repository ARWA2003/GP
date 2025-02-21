

const ContactUs = () => {
  return (
    <>
    
    <div className="relative min-h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
    <div className="absolute w-[400px] h-[400px] bg-yellow-200 rounded-full top-[-150px] left-[-150px] shadow-lg flex items-center justify-center"> </div>
   <div className="absolute w-[350px] h-[350px] bg-blue-500 rounded-full bottom-[-100px] right-[-100px]"></div>
   <div className="relative bg-gradient-to-r from-yellow-200 to-blue-500 p-8 rounded-lg shadow-lg z-10 max-w-3xl grid place-items-center">

      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-4">Contact Us</h2>
        <p className="text-gray-600 text-center mb-6">We would love to hear from you! Fill out the form below and we will get back to you as soon as possible.</p>
        <form className="space-y-4">
          <input 
            type="text" 
            placeholder="Your Name" 
            className="w-full p-2 border rounded"
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            className="w-full p-2 border rounded"
          />
          <textarea 
            placeholder="Your Message" 
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
 


    
    </>
   
  );
};

export default ContactUs;
