import Upperbar from "../Upperbar";
import Foooter from "../footer/footer";

const JobDetails = () => {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
        <Upperbar />
      {/* Main Content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px", display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
        {/* Job Details */}
        <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "8px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Call Center Agent</h2>
          <p style={{ color: "#4b5563", marginBottom: "16px" }}>
            We are looking for Call Center Agents that will be the liaison between our clients and their current and potential customers...
          </p>

          {/* Responsibilities */}
          <h3 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "16px" }}>Responsibilities</h3>
          <ul style={{ color: "#374151", marginTop: "8px", paddingLeft: "20px", listStyleType: "disc" }}>
            <li>Manage large amounts of inbound and outbound calls</li>
            <li>Keep records of all conversations</li>
            <li>Follow communication scripts when handling different topics</li>
            <li>Build relationships with customers</li>
          </ul>

          {/* Requirements */}
          <h3 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "16px" }}>Requirements</h3>
          <ul style={{ color: "#374151", marginTop: "8px", paddingLeft: "20px", listStyleType: "disc" }}>
            <li>Previous experience in a call center</li>
            <li>Strong phone and verbal communication skills</li>
            <li>Ability to multi-task and manage time effectively</li>
          </ul>

          <button style={{ 
            marginTop: "24px", 
            backgroundColor: "#facc15", 
            color: "black", 
            width: "100%", 
            padding: "12px", 
            fontWeight: "bold", 
            borderRadius: "8px", 
            transition: "background-color 0.3s ease, transform 0.2s ease"
          }}
          onMouseOver={(e) => { e.target.style.backgroundColor = "#eab308"; e.target.style.transform = "scale(1.05)"; }}
          onMouseOut={(e) => { e.target.style.backgroundColor = "#facc15"; e.target.style.transform = "scale(1)"; }}>
            Apply for this position
          </button>
        </div>

        {/* Sidebar */}
        <aside style={{ backgroundColor: "white", padding: "24px", borderRadius: "8px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>Summary</h3>
          <p style={{ color: "#374151", marginTop: "8px" }}><strong>Job Category:</strong> Communications</p>
          <p style={{ color: "#374151" }}><strong>Job Setup:</strong> Remote</p>
          <p style={{ color: "#374151" }}><strong>Employment Type:</strong> Full-time</p>
          <p style={{ color: "#374151" }}><strong>Country:</strong> Canada</p>
          
          <h3 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "24px" }}>Related Jobs</h3>
          <div style={{ marginTop: "16px" }}>
            {[
              "Email Support - $2.2K/mo - Feb 15, 2025", 
              "Chat Support - $1K/mo - Feb 18, 2025", 
              "Virtual Assistant - $850/mo - Feb 20, 2025"
            ].map((job, index) => (
              <div key={index} style={{ 
                border: "1px solid #e5e7eb", 
                padding: "12px", 
                borderRadius: "6px", 
                marginBottom: "8px", 
                backgroundColor: "white", 
                transition: "background-color 0.3s ease, transform 0.2s ease"
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#facc15"; e.currentTarget.style.transform = "scale(1.02)"; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "white"; e.currentTarget.style.transform = "scale(1)"; }}>
                <p style={{ fontSize: "16px", fontWeight: "bold" }}>{job.split(" - ")[0]}</p>
                <p style={{ color: "#4b5563" }}>{job.split(" - ")[1]}</p>
                <p style={{ color: "#9ca3af", fontSize: "14px" }}>{job.split(" - ")[2]}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
      <Foooter />
    </div>
  );
};

export default JobDetails;