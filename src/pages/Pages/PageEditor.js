import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router";
import { Link as ScrollLink } from "react-scroll";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

import "./PageEditor.css";
import { Checkbox } from "@mui/material";
function FormEditor() {
  let dataForForm = new FormData();
  const { formid, uid, email } = useParams();
  const [textbox, settextbox] = useState(true);
  const [parabox, setparabox] = useState(false);
  const [mcqbox, setmcqbox] = useState(false);
  const [check, setCheck] = useState(false);
  const [option, setOption] = useState("");

  const [success, setSuccess] = useState(false);

  const [error, setError] = useState({
    found: false,
    message: "",
  });
  const [progressPercent, setProgressPercent] = useState(0);
  const [data, setData] = useState({});
  const [changeTitle, setChangeTitle] = useState(false);
  const [newDescription, setNewDescription] = useState("");
  const [changeDescription, setchangeDescription] = useState(false);
  const [changeVideo, setchangeVideo] = useState(false);
  const [changeQuestions, setchangeQuestions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingImage, setLoadingImage] = useState(true);
  const [imageData, setImageData] = useState([]);
  const [titleNew, setTitleNew] = useState("");
  const [showNavBar, setShowNavBar] = useState(false);
  const [isCopy, setIsCopy] = useState("Copy");
  const [ShowQuesEditor, setShowQuesEditor] = useState(-1);
  const [newChangedTitle, setNewChangedTitle] = useState("");
  const [requirementMail, setRequirementMail] = useState("");
  const [isFormSent, setFormSent] = useState(false);
  const [toSendQuestions, setToSendQuestions] = useState([]);
  const [OptionsToAdd, setOptionsToAdd] = useState([]);
  const TypeDisplay = () => {
    return (
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
    );
  };
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
      .get("/api/form/" + formid)
      .then((res) => {
        console.log("CHECK", res.data);
        setRequirementMail(res.data.email);
        setData(res.data.data);
        setToSendQuestions(res.data.data.questions);
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
        .get("/api/image/" + formid)
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
  // const  = () => {
  //   e.preventDefault();

  // };

  const HandleChangeVideo = (e) => {
    e.preventDefault();
    console.log("SENDING ", data);
    setLoadingImage(true);
    setProgressPercent(0);
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        console.log(`${loaded}kb of ${total}kb | ${percent}`);
        setProgressPercent(percent);
      },
    };
    axios
      .patch(
        "/api/replace/image/" + email + "/" + uid + "/" + imageData.image,
        dataForForm,
        options
      )
      .then((res) => {
        console.log(res);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
        setTimeout(() => {
          setProgressPercent(0);
        }, 1000);
        setchangeVideo(false);
        setLoadingImage(false);
      })
      .catch((err) => {
        console.log(err);
        setError({
          found: true,
          message: err.response.data.message,
        });
        console.log(error);
        setTimeout(() => {
          setError({
            found: false,
            message: "",
          });
          setProgressPercent(0);
        }, 3000);
      });
  };
  const SetTitle = () => {
    setChangeTitle(false);
    setLoadingImage(true);
    axios
      .patch("/api/pagename/" + email + "/" + uid, {
        newName: newChangedTitle,
      })
      .then((res) => {
        console.log("Success ", res);
        setLoadingImage(false);
        // setNewChangedTitle(titleNew);
      })
      .catch((err) => {
        console.log("Error ", err);
      });
  };
  const AlterQuestionare = (e) => {
    e.preventDefault();
    var tempArray = toSendQuestions;
    // tempArray[ShowQuesEditor] = {
    //   question:e.target.question.value,
    //   type:
    // }
    console.log(e.target.question.value);
    console.log(check);
    if (mcqbox) {
      console.log("In mcq");
      tempArray[ShowQuesEditor] = {
        question: e.target.question.value,
        type: "mcq",
        choices: OptionsToAdd,
        requirement: check,
      };
    } else if (textbox) {
      console.log("In text");
      tempArray[ShowQuesEditor] = {
        question: e.target.question.value,
        type: "text",
        choices: OptionsToAdd,
        requirement: check,
      };
    } else {
      tempArray[ShowQuesEditor] = {
        question: e.target.question.value,
        type: "para",
        choices: OptionsToAdd,
        requirement: check,
      };
    }
    setToSendQuestions(tempArray);
    setOptionsToAdd([]);
    e.target.question.value = "";
    console.log(toSendQuestions);
  };
  const SetDesc = () => {
    setchangeDescription(false);
    setLoadingImage(true);
    axios
      .patch("/api/pagedesc/" + email + "/" + uid, {
        desc: newDescription,
      })
      .then((res) => {
        console.log("Success ", res);
        setLoadingImage(false);
      })
      .catch((err) => {
        console.log("Error ", err);
      });
  };
  const ServerSetNewQuestions = () => {
    setLoadingImage(true);
    axios
      .patch("/api/queschange/" + email + "/" + uid, {
        questions: toSendQuestions,
      })
      .then((res) => {
        console.log(res);
        setLoadingImage(false);
      })
      .catch((err) => {
        console.log("ERROR ", err);
      });
  };
  return (
    <>
      {!loadingImage ? (
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
          {(changeTitle ||
            changeQuestions ||
            changeDescription ||
            changeVideo) && (
            <>
              <div
                style={{
                  width: "70vw",
                  borderRadius: "20px",
                  boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                  margin: "auto",
                  textAlign: "center",
                  padding: "2%",
                  backgroundColor: "white",
                  opacity: "100",
                  marginTop: "10vh",
                  marginLeft: "15vw",
                  zIndex: "2",
                  position: "fixed",
                  // color: "b",
                }}
              >
                <h3>
                  {changeTitle && <b>Change Title</b>}
                  {changeVideo && <b>Change Video</b>}
                  {changeDescription && <b>Change Description</b>}
                  {changeQuestions && <b>Change Questions</b>}
                </h3>
                {changeTitle && (
                  <>
                    {" "}
                    <input
                      type="text"
                      onChange={(e) => {
                        setNewChangedTitle(e.target.value);
                      }}
                      style={{
                        border: "2px solid teal",
                        width: "60%",
                      }}
                    />
                    <button
                      style={{ backgroundColor: "teal", width: "60px" }}
                      className="edform"
                      onClick={SetTitle}
                    >
                      Change
                    </button>{" "}
                  </>
                )}
                {changeDescription && (
                  <>
                    {" "}
                    <textarea
                      onChange={(e) => {
                        setNewDescription(e.target.value);
                      }}
                      style={{
                        border: "2px solid teal",
                        width: "60%",
                      }}
                    />
                    <button
                      style={{ backgroundColor: "teal", width: "60px" }}
                      className="edform"
                      onClick={SetDesc}
                    >
                      Change
                    </button>{" "}
                  </>
                )}
                {changeQuestions && (
                  <>
                    {data.questions.map((questionObj, i) => (
                      <div
                        key={i}
                        style={{
                          textAlign: "left",
                          marginBottom: "10px",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <b
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setShowQuesEditor(i);
                          }}
                        >
                          Q{i + 1}.{questionObj.question}
                        </b>
                        <b>{questionObj.type}</b>
                      </div>
                    ))}
                    {ShowQuesEditor !== -1 && (
                      <div
                        id="formBuilder"
                        style={{
                          borderRadius: "10px",
                          boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                        }}
                      >
                        <form
                          style={{
                            color: "black",
                          }}
                          onSubmit={AlterQuestionare}
                        >
                          <input
                            type="text"
                            name="question"
                            placeholder="New Question"
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
                            }}
                          >
                            <TypeDisplay />
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
                                    onClick={(e) => {
                                      e.preventDefault();

                                      const tempOptionsArray = OptionsToAdd;
                                      tempOptionsArray.push(option);
                                      setOptionsToAdd(tempOptionsArray);
                                      setOption("");
                                    }}
                                  >
                                    <i class="fas fa-plus"></i>
                                  </button>

                                  <br />
                                </form>
                              </>
                            )}
                            <button
                              className="edform"
                              type="submit"
                              style={{ width: "50px", backgroundColor: "teal" }}
                            >
                              {" "}
                              Add
                            </button>
                            <button
                              style={{ backgroundColor: "red", width: "50px" }}
                              className="dlt"
                              onClick={() => {
                                setShowQuesEditor(-1);
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                    <button
                      className="edform"
                      style={{
                        width: "60px",
                        backgroundColor: "teal",
                        padding: "auto",
                      }}
                      onClick={ServerSetNewQuestions}
                    >
                      Submit
                    </button>
                  </>
                )}
                {changeVideo && (
                  <>
                    <form>
                      <div className="custom-file mb-3">
                        <label className="custom-file-upload">
                          <i class="fas fa-upload" style={{ color: "purple" }}>
                            <input
                              type="file"
                              className="custom-file-input"
                              id="inputGroupFile04"
                              aria-describedby="inputGroupFileAddon04"
                              onChange={({ target: { files } }) => {
                                console.log("IN UPLOAD FUNCTION");
                                dataForForm.append("image", files[0]);
                                console.log("IN UPLOAD FUNCTION ", data);
                              }}
                            />
                          </i>
                          Choose File
                        </label>
                      </div>
                      <div className="progress" style={{ maxHeight: "20px" }}>
                        <div
                          className={"progress-bar w-" + progressPercent}
                          role="progressbar"
                          aria-valuenow={progressPercent}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{
                            textAlign: "center",
                            backgroundColor: "purple",
                          }}
                        >
                          <p
                            style={{
                              textAlign: "center",
                              color: "white",
                              fontSize: "15px",
                            }}
                          >
                            {progressPercent}%
                          </p>
                        </div>
                      </div>

                      <br />
                    </form>
                    <button
                      onClick={HandleChangeVideo}
                      style={{ backgroundColor: "teal", width: "60px" }}
                      className="edform"
                    >
                      Add
                    </button>
                  </>
                )}
                <button
                  style={{ backgroundColor: "red", width: "60px" }}
                  className="dlt"
                  onClick={() => {
                    setChangeTitle(false);
                    setchangeDescription(false);
                    setchangeVideo(false);
                    setchangeQuestions(false);
                  }}
                >
                  Cancel
                </button>
              </div>
              <div
                style={{
                  // opacity: "0.8",
                  // backgroundColor: "black",
                  position: "fixed",
                  width: "100%",
                  height: "100%",
                  top: "0px",
                  left: "0px",
                  zIndex: "1",
                }}
              ></div>
            </>
          )}

          <div className="ulin2">
            <h1
              style={{ textAlign: "center", color: "black", cursor: "pointer" }}
              onClick={() => {
                setChangeTitle(true);
              }}
            >
              <b style={{ cursor: "pointer" }}>
                {newChangedTitle === "" ? data.formName : newChangedTitle}
              </b>
            </h1>

            <div className="container">
              <div
                className="row"
                style={{
                  padding: "3%",
                  width: "80vw",
                  borderRadius: "10px",
                  boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                }}
              >
                <div class="col-sm" id="colo" style={{ marginBottom: "2vh" }}>
                  <button
                    className="edform"
                    style={{ backgroundColor: "teal", width: "80px" }}
                    onClick={() => setchangeVideo(true)}
                  >
                    Edit Video
                  </button>
                  <ReactPlayer
                    url={"/uploads/" + imageData.image}
                    className="playIt"
                    controls={true}
                  />
                </div>
                {/* <div class="col-sm-3">One of three columns</div> */}
                <div class="col-sm">
                  <div
                    style={{
                      backgroundColor: "transparent",
                      // color: "purple",
                      minWidth: "100%",
                      padding: "10px",
                      maxHeight: "90% ",
                      marginTop: "20%",
                      border: "0.5px solid teal",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setchangeDescription(true);
                    }}
                    className="Desc"
                  >
                    <h3 style={{ color: "teal" }}>
                      <b>Description</b>
                    </h3>
                    {newDescription === "" ? imageData.desc : newDescription}
                  </div>
                </div>

                <div className="card" style={{ position: "relative" }}>
                  <div className="card-body">
                    {isFormSent ? (
                      <h1>
                        <b>Sent</b>
                      </h1>
                    ) : (
                      <form>
                        <button
                          className="edform"
                          style={{ backgroundColor: "teal", width: "80px" }}
                          onClick={(e) => {
                            e.preventDefault();
                            setchangeQuestions(true);
                          }}
                        >
                          Edit Form
                        </button>
                        <h4 style={{ textAlign: "center" }}>
                          <b> Form</b>
                        </h4>
                        {data.questions.map((question, i) => (
                          <div key={i}>
                            <b style={{ color: "black" }}>
                              {question.question}
                            </b>
                            {question.requirement && (
                              <b style={{ color: "red" }}>*</b>
                            )}
                            {/* <hr /> */}
                            <br /> <br />
                          </div>
                        ))}
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <br />
          </div>
        </>
      ) : (
        <div className="wrapper">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
        </div>
      )}
    </>
  );
}

export default withRouter(FormEditor);
