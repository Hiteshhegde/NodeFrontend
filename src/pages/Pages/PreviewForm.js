import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router";
import ShareButton from "react-web-share-button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { Link as ScrollLink } from "react-scroll";
import { useParams } from "react-router-dom";
import "./Preview.css";
import ReactPlayer from "react-player";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";
import {
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";

import "./FormEditor.css";
function Preview({ history }) {
  const location = useLocation();
  if (location.state === undefined || location.state.user === undefined) {
    history.push("/home");
  }
  // const { user } = location.state;
  const SharingUrl = window.location.href;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingImage, setLoadingImage] = useState(true);
  const [imageData, setImageData] = useState([]);
  const { formid } = useParams();
  const [showNavBar, setShowNavBar] = useState(false);
  const [isCopy, setIsCopy] = useState("Copy");
  const [requirementMail, setRequirementMail] = useState("");
  // data.uniqueFormId,
  //requirementMail
  const controlNav = () => {
    if (window.scrollY > 80) {
      setShowNavBar(true);
    } else {
      setShowNavBar(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", controlNav);
    return () => {
      window.removeEventListener("scroll", controlNav);
    };
  }, []);
  useEffect(() => {
    console.log(formid);
    axios
      .get("http://localhost:9000/api/form/" + formid)
      .then((res) => {
        console.log("CHECK", res.data);
        setRequirementMail(res.data.email);
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    console.log("INITIAL", data);
  }, [data]);
  useEffect(() => {
    console.log("IMAGES DATA ", imageData);
  }, [imageData]);
  useEffect(() => {
    console.log("THE id", data.uniqueFormId);
    console.log(
      "SENDING GET REQUEST TO GET IMAGES ",
      loading,
      "AND",
      data.formName
    );
    if (data.formName !== undefined) {
      axios
        .get("http://localhost:9000/api/image/" + formid)
        .then((res) => {
          console.log("HELLOOOOO", res.data);
          for (let i in res.data) {
            if (res.data[i].formid === data.uniqueFormId) {
              setImageData(res.data[i]);
              console.log("res.data ", res.data);
              setLoadingImage(false);
            }
          }
          console.log("IMAGE DATA", imageData);
        })
        .catch((err) => {
          console.log("THIS IS THE ERROR ", err);
        });
    }
  }, [loading]);
  // const { data } = location.state;
  const [error, setError] = useState("");
  // useEffect(() => {
  //   if (!localStorage.getItem("authToken")) {
  //     history.push("/login");
  //   }

  //   console.log("In form editor got= ", data);
  // }, [history]);
  // Hi my name is Abhiraaj Verma I'm a 19 year old 2nd year studnet at National Institute of Technology Goa , India. My skills are that im a fullStack Web Developer and I'm currently working in 3 companies as a web developer intern and its going well. TO know more about me watch the attatched video and Answer the questions in my form so that i can read your answers and know more about you
  const Submit = (e) => {
    e.preventDefault();
    //     const answers = [];
    //     for (let i = 0; i < data.questions.length; i++) {
    //       if (data.questions[i].requirement) {
    //         if (!e.target[i].value) {
    //           console.log("QUESTION NO.", i + 1, "THIS IS A REQUIRED QUESTION");
    //           const tempPos = i + 1;

    //           setError("Q" + tempPos + "* is required");
    //           setTimeout(() => {
    //             setError("");
    //           }, 2000);
    //         }
    //       }
    //       if (e.target[i].value) {
    //         answers.push(e.target[i].value);
    //       }
    //     }
    //     console.log("Here are the answers ", answers);
    //     axios
    //       .put(
    //         "http://localhost:9000/api/add/response/" +
    //           requirementMail +
    //           "/" +
    //
    //         { answers: answers }
    //       )
    //       .then((res) => {
    //         console.log(
    //           "Success ",
    //           res,
    //           " ",
    //           data.uniqueFormId,
    //           " ",
    //           requirementMail
    //         );
    //       })
    //       .catch((err) => console.log(err));
  };
  const InputHolder = (props) => {
    if (props.question.type === "text") {
      return <input type="text" name={props.id}></input>;
    } else if (props.question.type === "para") {
      return (
        <textarea
          name={props.id}
          style={{
            width: "40%",
            border: "none",
            borderBottom: "2px solid teal ",
            border: "2px solid teal ",
            borderRight: "2px solid teal ",
            resize: "none",
            overflowY: "scroll",
            height: "100px",
          }}
        ></textarea>
      );
    } else if (props.question.type === "mcq") {
      return (
        <div className="form-group">
          <br />
          {/* <label htmlFor="exampleFormControlSelect1" style={{ color: "black" }}>
            Select One
          </label> */}
          <select
            className="form-control"
            id="exampleFormControlSelect1"
            style={{
              backgroundColor: "transparent",
              border: "none",
              borderBottom: "2px solid purple",
              width: "30%",
            }}
          >
            <option selected>click to choose</option>
            {props.question.choices.map((choice, index) => (
              <option key={index}>{choice}</option>
            ))}
          </select>
        </div>
      );
    }
  };
  return (
    <>
      <div className={`navbarFormCreator${!showNavBar ? "not" : ""}`}>
        <ul>
          <li style={{ color: "white" }}>
            <ScrollLink to="aboutYou">About You</ScrollLink>
          </li>
          <li style={{ color: "white" }}>
            <ScrollLink to="formBuilder">Form Builder</ScrollLink>
          </li>
          <li style={{ color: "white" }}>
            <ScrollLink to="addVideo">Add Video</ScrollLink>
          </li>
        </ul>
      </div>
      <div className="shareCon">
        <div className="SocialShare">
          <button
            className="copyBut"
            onClick={() => {
              navigator.clipboard.writeText(SharingUrl);
              setIsCopy("Copied!");
              setTimeout(() => {
                setIsCopy("Copy");
              }, 3000);
            }}
          >
            <ContentCopyIcon />
            {isCopy}
          </button>
          <FacebookShareButton
            url={SharingUrl}
            quote="Check out my new Website made with LandingPageMaker.com"
          >
            <FacebookIcon logoFillColor="white" round={true} size={32} />
          </FacebookShareButton>
          <WhatsappShareButton
            url={SharingUrl}
            quote="Check out my new Website made with LandingPageMaker.com"
          >
            <WhatsappIcon logoFillColor="white" round={true} size={32} />
          </WhatsappShareButton>
          <TwitterShareButton
            url={SharingUrl}
            quote="Check out my new Website made with LandingPageMaker.com"
          >
            <TwitterIcon logoFillColor="white" round={true} size={32} />
          </TwitterShareButton>
          <LinkedinShareButton
            url={SharingUrl}
            quote="Check out my new Website made with LandingPageMaker.com"
          >
            <LinkedinIcon logoFillColor="white" round={true} size={32} />
          </LinkedinShareButton>
          <TelegramShareButton
            url={SharingUrl}
            quote="Check out my new Website made with LandingPageMaker.com"
          >
            <TelegramIcon logoFillColor="white" round={true} size={32} />
          </TelegramShareButton>
        </div>
      </div>
      <div className="ulin2">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              width: "250px",
              height: "250px",
              //   border: "1px solid black",
              borderRadius: "20px",
              padding: "30px",
              marginLeft: "calc(50vw-125px)",
              boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
              textAlign: "center",
            }}
          >
            <b>Responses</b>
            <div
              className="withinBox"
              style={{
                width: "80%",
                // border: "2px solid teal",
                textAlign: "center",
                borderRadius: "30px",
                height: "25%",
                marginLeft: "calc(20px)",
                marginTop: "30px",
              }}
            >
              <b>Number of Responses</b>
            </div>
            <button
              className="btn btn-primary"
              style={{
                width: "40%",
                height: "30px",
                marginLeft: "calc(10px)",
                marginTop: "30px",
              }}
            >
              View
            </button>
          </div>
          <div
            style={{
              width: "250px",
              height: "250px",
              //   border: "1px solid black",
              borderRadius: "20px",
              padding: "30px",
              marginLeft: "calc(50vw-125px)",
              boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
              textAlign: "center",
            }}
          >
            <b>Custom Messages</b>
            <div
              className="withinBox"
              style={{
                width: "80%",
                // border: "2px solid teal",
                textAlign: "center",
                borderRadius: "30px",
                height: "25%",
                marginLeft: "calc(20px)",
                marginTop: "30px",
              }}
            >
              <b>Number of Custom Messages</b>
            </div>

            <button
              className="btn btn-primary"
              style={{
                width: "40%",
                height: "30px",
                marginLeft: "calc(10px)",
                marginTop: "30px",
              }}
            >
              View
            </button>
          </div>
          <div
            style={{
              width: "250px",
              height: "250px",
              //   border: "1px solid black",
              borderRadius: "20px",
              padding: "30px",
              marginLeft: "calc(50vw-125px)",
              boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
              textAlign: "center",
            }}
          >
            <b>Analytics</b>
            <div
              className="withinBox"
              style={{
                width: "80%",
                // border: "2px solid teal",
                textAlign: "center",
                borderRadius: "30px",
                height: "25%",
                marginLeft: "calc(20px)",
                marginTop: "30px",
              }}
            >
              <b>Number of Visits and Shares</b>
            </div>
            <button
              className="btn btn-primary"
              style={{
                width: "40%",
                height: "30px",
                marginLeft: "calc(10px)",
                marginTop: "30px",
              }}
            >
              View
            </button>
          </div>
        </div>
        <h1 style={{ textAlign: "center", color: "black" }}>
          <b>{data.formName}</b>
        </h1>

        <div className="container">
          <div
            className="row"
            style={{
              // border: "0.2px solid black",
              padding: "3%",
              width: "80vw",
              borderRadius: "10px",
              boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
            }}
          >
            <div className="col-sm" id="colo" style={{ marginBottom: "2vh" }}>
              <ReactPlayer
                url={"/uploads/" + imageData.image}
                className="playIt"
                controls={true}
              />
            </div>
            {/* <div className="col-sm">One of three columns</div> */}
            <div className="col-sm">
              <div
                style={{
                  backgroundColor: "transparent",
                  // color: "purple",
                  minWidth: "50%",
                  padding: "10px",
                  maxHeight: "40% ",
                  marginBottom: "10%",
                  border: "0.5px solid teal",
                  textAlign: "center",
                }}
                className="Desc"
              >
                <h3 style={{ color: "teal" }}>
                  <b>Description</b>
                </h3>
                {imageData.desc}{" "}
              </div>
              <form
                className="customMsg"
                style={{
                  padding: "5%",
                  // width: "80%",
                  borderRadius: "10px",
                  boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                  textAlign: "center",
                }}
              >
                <b>Send a Custom Message</b>
                <input
                  type="text"
                  placeholder="Contact Info"
                  style={{
                    border: "none",
                    borderBottom: "2px solid teal",
                    marginBottom: "2vh",
                  }}
                />

                <textarea
                  placeholder="Your Message"
                  style={{
                    border: "none",
                    borderBottom: "2px solid teal",
                    marginBottom: "2vh",
                  }}
                ></textarea>
                <button className="custSend">Send</button>
              </form>
            </div>
            {/* <div className="col-sm">
            
          </div> */}
            <div className="card" style={{ position: "relative" }}>
              <div className="card-body">
                {loading ? (
                  <h1 style={{ color: "purple" }}>loading...</h1>
                ) : (
                  <form onSubmit={Submit}>
                    <h4 style={{ textAlign: "center" }}>
                      <b> Form</b>
                    </h4>
                    {data.questions.map((question, i) => (
                      <div key={i}>
                        <b style={{ color: "black" }}>{question.question}</b>
                        {question.requirement && (
                          <b style={{ color: "red" }}>*</b>
                        )}
                        <br />
                        <InputHolder question={question} id={i} />
                        {/* <hr /> */}
                        <br /> <br />
                      </div>
                    ))}

                    <button
                      type="submit"
                      className="reset"
                      style={{ marginRight: "10px" }}
                    >
                      Submit
                    </button>
                    <button type="reset" className="reset">
                      <RotateLeftIcon />
                    </button>
                    <br />
                    <br />
                    {error && (
                      <b
                        style={{
                          color: "darkred",
                          marginTop: "10%",
                          // border: "2px solid black",
                          // position: "fixed",
                          // top: "150%",
                          // left: "50%",
                          // transform: "translate(-50%,-50%)",
                          borderRadius: "20px",
                          padding: "2%",
                          backgroundColor: "rgba(200,0,0,0.3)",
                        }}
                      >
                        {error}
                      </b>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    </>
  );
}

export default withRouter(Preview);
