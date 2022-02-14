
import { useState, useContext, useEffect } from "react";
import Rating from "./RatingSelect";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import FeedbackContext from "../context/FeedbackContext";
function FeedbackForm() {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [msg, setMsg] = useState("");
  const handleText = (e) => {
    let curText = e.target.value;
    setText(curText);
    if (curText === "") {
      setBtnDisabled(true);
      setMsg(null);
    } else if (curText.trim().length < 10) {
      //   console.log(curText.trim().length);
      setBtnDisabled(true);
      setMsg("Comment must be at least 10 characters long, thank you");
    } else {
      setBtnDisabled(false);
      setMsg(null);
    }
  };
  const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)
  useEffect(()=>{
    if(feedbackEdit.edit===true){
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
      setBtnDisabled(false)
    }
  },[feedbackEdit])

  const handleSubmit = (e) => {
    // console.log(e.target.value, "submitted!");
    e.preventDefault();
    if (text.trim().length>=10){
        let newFeedback = {
            // id: uuidv4(),
            text,
            rating
        }
        // console.log(newFeedback)
        if (feedbackEdit.edit===true){
          updateFeedback(feedbackEdit.item.id, newFeedback)
        } else {
          addFeedback(newFeedback)
        }
        setText('')
    }
  };
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            onChange={handleText}
            type="text"
            placeholder="write here"
            value={text}
          />
          <Button type="submit" version="primary" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {/* <h6>{(text.length<10&&text.length>0)&&'Please enter your comment with at least 10 characters.'}</h6> */}
        <h6>{msg && <div className="message">{msg}</div>}</h6>
      </form>
    </Card>
  );
}

export default FeedbackForm;
