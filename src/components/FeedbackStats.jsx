// import PropTypes from "prop-types";
import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackStats() {
  const { feedback } = useContext(FeedbackContext);
  return (
    <div className="feedback-stats">
      <h4>{feedback.length} Reviews</h4>
      <h4>
        Average rating:{" "}
        {feedback
          .reduce((acc, cur, i) => (acc * i + cur.rating * 1) / (i + 1), 0)
          .toFixed(1)
          .replace(/[.,]0$/, "")}
      </h4>
    </div>
  );
}

// FeedbackStats.propTypes = {
//   feedback: PropTypes.array.isRequired,
// };

export default FeedbackStats;
