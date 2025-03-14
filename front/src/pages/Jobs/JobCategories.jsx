import { useNavigate } from "react-router-dom"; // Import useNavigate
import Upperbar from "../Upperbar";
import Foooter from "../footer/footer";

const jobCategories = [
  { name: "Banking", image: "/assets/banking.jpg", path: "/banking" },
  { name: "Accounting/Finance", image: "/assets/finance.jpg", path: "/finance" },
  { name: "Business Development", image: "/assets/business.jpg", path: "/business" },
  { name: "Creative/Design/Art", image: "/assets/design.jpg", path: "/design" },
  { name: "Writing/Editorial", image: "/assets/writing.jpg", path: "/writing" },
  { name: "IT/Software Development", image: "/assets/IT.jpg", path: "/it" }
];

const JobCategories = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCategoryClick = (path) => {
    navigate(path); // Navigate to the specified path
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <Upperbar />
      <h2 style={{ fontSize: "28px", fontWeight: "bold", color: "blue" }}>Jobs by Categories</h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "10px",
        maxWidth: "800px",
        margin: "0 auto",
      }}>
        {jobCategories.map((job, index) => (
          <div
            key={index}
            style={{
              background: "white",
              padding: "8px",
              borderRadius: "10px",
              boxShadow: "0 3px 5px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              transition: "transform 0.3s",
              cursor: "pointer",
              width: "160px"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            onClick={() => handleCategoryClick(job.path)} // Add onClick handler
          >
            <img src={job.image} alt={job.name} style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "8px" }} />
            <p style={{ fontSize: "16px", fontWeight: "bold", marginTop: "8px", color: "black" }}>{job.name}</p>
          </div>
        ))}
      </div>
      <Foooter />
    </div>
  );
};

export default JobCategories;