import Upperbar from "../Upperbar";
import Foooter from "../footer/footer";

const Etools = () => {
  return (
    <>
      <Upperbar />
      <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
                  {/* tool 1 */}
        <div className="bg-gray-200 p-4 rounded-lg shadow-md w-3/5 mb-4 flex items-center space-x-4">
          <img src="/assets/tool1.jpeg" alt="Grammarly Logo" className="w-12 h-12 rounded-md"/>
          <div className="flex-1">
           <h2 className="font-bold">Grammarly</h2>
           <p>Helps with grammar, spelling, and clarity.</p>
          </div>
          <a href="https://www.grammarly.com" target="_blank" rel="noopener noreferrer"className="bg-yellow-200 p-2 rounded hover:bg-yellow-400 transition">Visit</a>
        </div>
                          {/* tool 2 */}
        <div className="bg-gray-200 p-4 rounded-lg shadow-md w-3/5 mb-4 flex items-center space-x-4">
          <img src="" alt=" Logo" className="w-12 h-12 rounded-md"/>
          <div className="flex-1">
           <h2 className="font-bold">tool 2</h2>
           <p></p>
          </div>
          <a href="" target="_blank" rel="noopener noreferrer"className="bg-yellow-200 p-2 rounded hover:bg-yellow-400 transition">Visit</a>
        </div>
                          {/* tool 3 */}
        <div className="bg-gray-200 p-4 rounded-lg shadow-md w-3/5 mb-4 flex items-center space-x-4">
          <img src="" alt="Logo" className="w-12 h-12 rounded-md"/>
          <div className="flex-1">
           <h2 className="font-bold">tool 3</h2>
           <p></p>
          </div>
          <a href="" target="_blank" rel="noopener noreferrer"className="bg-yellow-200 p-2 rounded hover:bg-yellow-400 transition">Visit</a>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg shadow-md w-3/5 mb-4 flex items-center space-x-4"> </div>
        <div className="bg-gray-200 p-4 rounded-lg shadow-md w-3/5 mb-4 flex items-center space-x-4"> </div>
        <div className="bg-gray-200 p-4 rounded-lg shadow-md w-3/5 mb-4 flex items-center space-x-4"> </div>




      </div>
      <Foooter />
    </>
  );
}

export default Etools;
