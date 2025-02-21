import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Foooter = () => {
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
    <form className="space-y-3 w-full max-w-md">
      <div className="flex space-x-2">
        <input type="text" placeholder="Name" className="flex-1 p-3 rounded-md border" />
        <input type="text" placeholder="Phone number" className="flex-1 p-3 rounded-md border" />
      </div>
      <input type="email" placeholder="Email" className="w-full p-3 rounded-md border" />
      <textarea placeholder="Message" className="w-full p-3 rounded-md border h-24"></textarea>
      <button type="submit" className="bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg w-full hover:bg-yellow-600">Submit</button>
    </form>
  </div>

  <div className="md:w-1/3 flex justify-center items-center">
    <img src="/assets/logo123.png" alt="HearMeOut Logo" className="h-52 w-auto" />
  </div>
</footer>

    </div>
  )
}

export default Foooter