import Foooter from "../footer/footer";
import UpperbarV from "../UpperbarV";
export default function Emptyemer() {
    return (
<>  
<UpperbarV/>
<div className="flex flex-col items-center space-y-96 mt-10 mb-48">
<h1 className="text-5xl mt-48 text-center ">No Emergency Report</h1>
</div>
       <div className="mb-0"> <Foooter/></div>

</>
    );
  }