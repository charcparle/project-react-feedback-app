import { Link } from "react-router-dom";
import Card from "../components/shared/Card";

function AboutPage() {
  return (
    <Card>
      <div className="about">
      <h3>About page</h3>
      <p>This is a React app for submitting and displaying feedback.</p>
      </div>
      <p><Link to='/'>Back to Home</Link></p>
    </Card>
  );
}

export default AboutPage;
