import Foooter from "../footer/footer";
import UpperbarV from "../UpperbarV";
export default function DetailsEme() {
    return (
<>  
<UpperbarV/>
<div className="flex flex-col items-center p-6 bg-gray-300 w-1/2 mx-auto mt-10 mb-10 rounded-lg">
      <h2 className="text-red-600 font-bold text-4xl animate-pulse">Emergency</h2>
      <ul className="text-black font-semibold text-3xl mt-4">
        <li>• <b>Location:</b> New Cairo</li>
        <li>• <b>Report time:</b> 10:30 AM</li>
        <li>• <b>Name:</b> John Doe</li>
        <li>• <b>Gender:</b> Male</li>
        <li>• <b>Phone:</b> +2011111111</li>
        <li>• <b>Blood Type:</b> O+</li>
        <li>• <b>Medications:</b> None</li>
        <li>• <b>Relative Numbers:</b> </li>
        <ul className="ml-6">
          <li>1] Mom: +20111222333</li>
          <li>2] Dad: +20122334455</li>
          <li>3] Brother: +20133445566</li>
        </ul>
      </ul>
      <div className="flex gap-4 mt-4">
        <button className="bg-gray-500 text-white font-bold px-4 py-2 rounded w-16 h-16 text-2xl">❌</button>
        <button className="bg-red-500 text-white font-bold px-4 py-2 rounded w-16 h-16 text-2xl">✅</button>
      </div>
    </div>
<Foooter/>

</>
    );
  }
  