import { Checkbox } from "@mui/material";
import axios from "axios";
import "./FormCreator.css";
import React, { useEffect, useState, useRef } from "react";
import { useLocation, withRouter } from "react-router";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import ImgVid from "./ImgVid";
// import "./images";
function FormCreator({ history }) {
  const location = useLocation();
  if (location.state === undefined) {
    history.push("/home");
  }
  const { user } = location.state;
  console.log(user);
  console.log(user.email, " EMAIL");

  const [uniqueFormId, setUniqueFormId] = useState("");
  const [check, setCheck] = useState(false);
  const [type, setType] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [questionare, setQuestionare] = useState([]);
  const [showEditor, setShowEditor] = useState(-1);
  const [descMain, setDescMain] = useState("");

  const [textbox, settextbox] = useState(true);
  const [parabox, setparabox] = useState(false);
  const [mcqbox, setmcqbox] = useState(false);
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState("");
  const [showNavBar, setShowNavBar] = useState(false);
  const [isFormDone, setIsFormDone] = useState(false);
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
    setUniqueFormId(Date.now());
  }, []);
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    }

    console.log("In form creator got= ", user);
  }, [history]);
  const FinalSubmit = () => {
    const forms = [
      {
        uniqueFormId: uniqueFormId,
        formName: formTitle,
        questions: questionare,
      },
    ];
    console.log("SUBMITTING ", forms);
    axios
      .put("/api/add/form/" + user.email, { forms: forms })
      .then((res) => {
        console.log(res);
        setIsFormDone(true);
        axios
          .post("/api/create/response/" + user.email, {
            response: {
              uniqueFormId: uniqueFormId,
              answers: [],
            },
          })
          .then((res) => {
            console.log(res);
            history.push("/add-sub");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  const QuesSubmissionHandler = (e) => {
    e.preventDefault();
    console.log(e.target.question.value);
    console.log(check);
    if (mcqbox) {
      console.log("In mcq");
      setQuestionare(
        questionare.concat({
          question: e.target.question.value,
          type: "mcq",
          choices: options,
          requirement: check,
        })
      );
    } else if (textbox) {
      console.log("In text");
      setQuestionare(
        questionare.concat({
          question: e.target.question.value,
          type: "text",
          requirement: check,
        })
      );
    } else {
      setQuestionare(
        questionare.concat({
          question: e.target.question.value,
          type: "para",
          requirement: check,
        })
      );
    }
    setOptions([]);
    e.target.question.value = "";
    console.log(questionare);
  };
  const Editor = (i) => {
    console.log(i);
    setShowEditor(i);
  };
  const EditorHandler = (e) => {
    e.preventDefault();
    const tempArray2 = questionare;
    tempArray2[showEditor].question = e.target.editing.value;
    console.log(tempArray2);
    setQuestionare(tempArray2);
    setShowEditor(-1);
  };
  const Deletor = (i) => {
    const tempArray = questionare.filter(
      (question) => questionare.indexOf(question) != i
    );
    setQuestionare(tempArray);
  };
  const ChangeHandler = () => {
    console.log(textbox.current);
    if (textbox.current.value) {
      console.log(textbox.current.value);
      setType("text");
    } else if (mcqbox.current.value) {
      console.log(mcqbox.current.value);
      setType("mcq");
    } else if (parabox.current.value) {
      console.log(parabox.current.value);
      setType("para");
    }
    console.log("type", type);
  };
  const AddOne = (e) => {
    e.preventDefault();
    setOptions(options.concat(option));
    setOption("");
    console.log("Options", options);
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

      <div style={{ margin: "10%" }} id="aboutYou">
        {/* {isFormDone && (
          <div className="sideBack">
            <Link
              to={{
                pathname: "/addimage",
                state: { user: formTitle, userid: user.email },
              }}
              style={{ textDecoration: "none", maxWidth: "1vw" }}
            >
              <div
                className="Navbtn"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                }}
              >
                <div className="NavBtnLink" style={{ textAlign: "center" }}>
                  Click to add Image/Videos and Finish
                </div>
              </div>
            </Link>
          </div>
        )} */}
        <div
          style={{ marginBottom: "-80px", width: "0px", height: "0px" }}
        ></div>
        {user && (
          <>
            <div
              style={{
                // border: "0.2px solid black",
                padding: "5%",
                width: "80vw",
                borderRadius: "10px",
                boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
              }}
              className="d-flex justify-content-center align-items-center flex-column"
            >
              <h3
                style={{
                  color: "black",
                  marginBottom: "5vh",
                }}
              >
                <b> {user.username}</b> <br />
              </h3>
              <input
                type="text"
                name="formName"
                placeholder="Page Name"
                onChange={(e) => setFormTitle(e.target.value)}
                style={{
                  maxWidth: "200px",
                  border: "none",
                  borderBottom: "2px solid purple",
                  backgroundColor: "transparent",
                  marginBottom: "5%",
                }}
              ></input>
              <textarea
                style={{
                  border: "0px",
                  borderBottom: "2px solid purple",
                  backgroundColor: "transparent",
                  width: "90%",
                  height: "10vh",
                  fontSize: "20px",
                  marginBottom: "5vh",

                  // boxShadow: "2px black",
                }}
                onChange={(e) => setDescMain(e.target.value)}
                placeholder="Add Description"
              ></textarea>
            </div>
            <br />
            <div
              id="formBuilder"
              style={{
                // border: "0.2px solid black",
                padding: "5%",
                width: "80vw",
                borderRadius: "10px",
                boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
              }}
              className="d-flex justify-content-center align-items-center flex-column"
            >
              <h3
                style={{
                  color: "black",
                }}
              >
                {" "}
                <b> Create Form</b>
              </h3>
              <h3
                style={{
                  color: "black",
                }}
              >
                {/* <img
                src={require("./images/work-illustrations.e8bc4baf.jpg")}
                alt="svg2"
              /> */}
                <div style={{ color: "purple" }}>
                  Text
                  <Checkbox
                    name="Text"
                    style={{ color: "purple" }}
                    value={textbox}
                    checked={textbox}
                    onChange={() => {
                      settextbox(!textbox);
                      setmcqbox(false);
                      setparabox(false);
                    }}
                  />{" "}
                  Multiple Choice
                  <Checkbox
                    name="MultipleChoice"
                    style={{ color: "purple" }}
                    value={mcqbox}
                    checked={mcqbox}
                    onChange={() => {
                      settextbox(false);
                      setmcqbox(true);
                      setparabox(false);
                    }}
                  />{" "}
                  Paragraph
                  <Checkbox
                    name="Paragraph"
                    style={{ color: "purple" }}
                    value={parabox}
                    checked={parabox}
                    onChange={() => {
                      settextbox(false);
                      setmcqbox(false);
                      setparabox(true);
                    }}
                  />{" "}
                </div>
              </h3>

              <form
                onSubmit={QuesSubmissionHandler}
                style={{
                  color: "black",
                  // margin: "50px",
                  marginLeft: "0.5%",
                }}
                className="d-flex justify-content-center align-items-center flex-column"
              >
                <input
                  type="text"
                  name="question"
                  placeholder="Enter Questions"
                  style={{
                    maxWidth: "200px",
                    border: "none",
                    borderBottom: "2px solid purple",
                    backgroundColor: "transparent",
                  }}
                />
                <div
                  id="addVideo"
                  style={{
                    color: "purple",
                    display: "block",
                    marginTop: "2vh",
                  }}
                  className="d-flex justify-content-center align-items-center flex-column"
                >
                  <Checkbox
                    name="required"
                    style={{ color: "purple" }}
                    onChange={() => setCheck(!check)}
                  />{" "}
                  Required?
                  {mcqbox && (
                    <>
                      <form>
                        <input
                          type="text"
                          name="choice"
                          placeholder="Choice"
                          style={{
                            width: "200px",
                            border: "none",
                            borderBottom: "2px solid purple",
                            backgroundColor: "transparent",
                          }}
                          value={option}
                          onChange={(e) => setOption(e.target.value)}
                        />

                        <button
                          id="choiceSub"
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "100%",
                            color: "white",
                            justifyContent: "center",
                            paddingBottom: "10px",
                          }}
                          onClick={AddOne}
                        >
                          <i class="fas fa-plus"></i>
                        </button>

                        <br />
                      </form>
                    </>
                  )}
                  <button type="submit" style={{ width: "50px" }}>
                    {" "}
                    Add
                  </button>
                </div>
              </form>
            </div>
            <div
              style={{
                padding: "5%",
                width: "80vw",
                borderRadius: "10px",
                boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                marginTop: "4vh",
                marginBottom: "4vh",
              }}
            >
              <ImgVid
                formid={uniqueFormId}
                email={user.email}
                description={descMain}
              />
            </div>
            <div
              className="ulin"
              style={{
                minWidth: "50%",
                height: "60%",
                backgroundColor: "white",
                margin: "auto",
                padding: "20px",
                // borderRadius: "20px",
                textAlign: "center",
                // position: "absolute",
                // top: "60%",
                // left: "70%",
                // transform: "translate(-50%,-50%)",
              }}
            >
              <h2>
                {formTitle}
                <button
                  style={{ width: "80px", background: "teal" }}
                  className="edform"
                  onClick={FinalSubmit}
                >
                  submit
                </button>
              </h2>
              <hr />
              {showEditor !== -1 && (
                <div>
                  <form onSubmit={EditorHandler}>
                    <button
                      style={{ width: "80px", background: "teal" }}
                      className="edform"
                      onClick={() => setShowEditor(-1)}
                    >
                      {" "}
                      CLose
                    </button>
                    <label>
                      Edit Question No.{showEditor + 1}
                      <input
                        type="text"
                        name="editing"
                        placeholder="Enter New"
                      />
                    </label>
                    <button style={{ maxWidth: "10px" }} type="submit" />
                  </form>
                </div>
              )}
              <ol className="ulin">
                {questionare.map((question, i) => (
                  <li key={i}>
                    <h5 onClick={() => Editor(i)}>{question.question}</h5>
                    {/* <button style={{ maxWidth: "20px" }}> */}
                    <Icon
                      icon="mdi:trash-can"
                      color="pink"
                      width="20"
                      onClick={() => Deletor(i)}
                    />
                    {/* </button> */}
                    <hr></hr>
                  </li>
                ))}
              </ol>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default withRouter(FormCreator);
