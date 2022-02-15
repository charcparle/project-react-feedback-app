// import { v4 as uuidv4 } from "uuid";
import { useState, createContext, useEffect } from "react";
// import FeedbackData from "../data/FeedbackData";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(()=>{
    fetchFeedback()
  }, [])

  // Fetch data as feedback
  const fetchFeedback = async () => {
    const response = await fetch(`/feedback?_sort=id&_order=desc`)
    const data = await response.json()
    console.log(response)
    setFeedback(data)
    setIsLoading(false)
  }

  // Delete feedback
  const deleteFeedback = (id) => {
    console.log("App-level, deleting ", id);
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  // Add feedback
  const addFeedback = async (newFeedback) => {
    console.log("Adding new feedback");
    const response = await fetch('/feedback',{
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    })
    const data = await response.json()
    // newFeedback.id = uuidv4();
    setFeedback([data, ...feedback]);
    // setFeedback([newFeedback, ...feedback])
  };

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  // Update Feedback
  const updateFeedback = (id, updItem) => {
    console.log(`updating item id ${id}`);
    // setFeedback(feedback.reduce((acc,item)=>{
    //   if(item.id===id){
    //     item.text = updItem.text
    //     item.rating = updItem.rating
    //   }
    //   return acc.concat(item)
    // },[]))
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    );
    console.log(feedback)
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
