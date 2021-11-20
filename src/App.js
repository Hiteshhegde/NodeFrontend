import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Sub from "./components/Sidebar/Sub";
// import Authentication from "./pages/Authentication";
import PrivateRoute from "./pages/Private/PrivateRoute";
import PrivateScreen from "./pages/Screens/PrivateScreen";
import LoginPage from "./pages/Screens/Login";
import RegisterPage from "./pages/Screens/Register";
import ForgotPasswordPage from "./pages/Screens/ForgotPassword";
import ResetPasswordPage from "./pages/Screens/ResetPassword";
import FormEditor from "./pages/Pages/FormEditor";
import FormCreator from "./pages/Pages/FormCreator";
import Signup from "./pages/Forms/Signup";
import Signin from "./pages/Forms/Signin";
import ImgVid from "./pages/Pages/ImgVid";
import VideoPlayer from "./components/Video/VideoPlayer";
import PreviewForm from "./pages/Pages/PreviewForm";
import Responses from "./pages/Pages/Responses";
import PageEditor from "./pages/Pages/PageEditor";

function App() {
  return (
    <div className="App" style={{ width: "100%", height: "100%" }}>
      <Navbar style={{ zIndex: "109019301930" }} />
      <Route exact path="/" render={() => <Home />} />
      {/* <Route path="/auth" render={() => <Authentication />} /> */}
      <PrivateRoute exact path="/home" component={PrivateScreen} />

      <Route exact path="/login">
        <Signin />
      </Route>
      <Route exact path="/addimage">
        <ImgVid />
      </Route>

      <Route exact path="/register">
        <Signup />
      </Route>

      <Route exact path="/forgotpassword">
        <ForgotPasswordPage />
      </Route>

      <Route exact path="/passwordreset/:resetToken">
        <ResetPasswordPage />
      </Route>
      <Route exact path="/form/:formid">
        <FormEditor />
      </Route>
      <Route exact path="/form">
        <FormCreator />
      </Route>
      <Route exact path="/videotrial">
        <VideoPlayer />
      </Route>
      <Route exact path="/preview/:formid">
        <PreviewForm />
      </Route>
      <Route path="/response/:uid/:email">
        <Responses />
      </Route>
      <Route path="/page/edit/:formid/:uid/:email">
        <PageEditor />
      </Route>
      <Route path="/add-sub">
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "-1000",
          }}
        >
          <Sub />
        </div>
      </Route>
    </div>
  );
}

export default App;
