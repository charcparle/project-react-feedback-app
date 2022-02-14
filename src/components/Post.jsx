import {
  useParams,
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";
function Post() {
  const param = useParams();
  const navigate = useNavigate();
  const onClick = () => {
    console.log("triggered magic!");
    navigate("/about");
  };
  return (
    <div>
      <h3>
        Post {param.id} {param.name&&`by ${param.name}`}
      </h3>
      <button onClick={onClick}>Click here for magic</button>
      <Routes>
          <Route path='/show' element={<h3>Show only</h3>} />
          {/* Note that "/*" has to be specified in the Route component in App.js */}
      </Routes>
    </div>
  );
}
export default Post;
