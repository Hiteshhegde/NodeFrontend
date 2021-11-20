import React, { useState, useEffect } from "react";
import "./Sub.css";
import "./SubAccordian.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Link, withRouter } from "react-router-dom";
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
import axios from "axios";
import ReactPlayer from "react-player";

function Sub({ history }) {
  const [isSub, setIsSub] = useState(false);
  const [isCopy, setIsCopy] = useState("");
  const [error, setError] = useState("");
  const [isFormDelete, setIsFormDelete] = useState("");
  console.log("In Sub value=", isSub);
  const [privateData, setPrivateData] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [makeId, setMakeId] = useState("");
  const [isImage, setIsImage] = useState("");
  const [isErrorInVer, setIsErrorInVer] = useState(false);
  const [nowDeleting, setNowDeleting] = useState(false);
  useEffect(() => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 7; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setMakeId(result);
  }, []);
  useEffect(() => {
    console.log("Checking for token");
    if (!localStorage.getItem("authToken")) {
      console.log("Token Unavailable");
      history.push("/login");
    }
    const fetchPrivateData = () => {
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
      };

      axios
        .get("/private", config)
        .then((res) => {
          setPrivateData(res.data);
          console.log("Private Response", res);
        })
        .catch((err) => {
          localStorage.removeItem("authToken");
          setError("You are'nt authorized to view this page,Please Login");
          history.push("/login");
          console.log(err, "Is the Error");
        });
    };
    fetchPrivateData();
  }, [history]);
  useEffect(() => {
    axios
      .get("/api/" + privateData.email)
      .then((res) => {
        setUserPosts(res.data);
        setIsLoading(false);
        console.log("Curated Response", res);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  }, [privateData]);
  const GetImageName = (uid) => {
    for (var i in userPosts.imageHolder) {
      if (userPosts.imageHolder[i].formid == uid) {
        return userPosts.imageHolder[i].image;
      }
    }
  };
  const HandleFormDeletion = (e) => {
    e.preventDefault();
    const ToDeleteImageName = GetImageName(isFormDelete);
    if (e.target.makeid.value !== makeId) {
      setIsErrorInVer(true);
      setTimeout(() => {
        setIsErrorInVer(false);
      }, 3000);
    } else {
      setIsLoading(true);
      axios
        .delete("/api/delete/form/" + privateData.email + "/" + isFormDelete)
        .then((res) => {
          console.log(res, " Success");
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("Error ", err);
        });
      axios
        .delete(
          "/api/delete/image/" +
            privateData.email +
            "/" +
            isFormDelete +
            "/" +
            ToDeleteImageName
        )
        .then((res) => {
          console.log(res, " Success");
          window.location.reload();
        })
        .catch((err) => {
          console.log("Error ", err);
        });
    }
  };
  const ShareDisplayer = ({ SharingUrl }) => {
    return (
      <div className="shareCon2">
        <div className="SocialShare2">
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
    );
  };
  const DisplayButtons = ({ formid, uid }) => {
    return (
      <>
        {uid !== undefined && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <button
              className="formButtons"
              style={{
                width: "30%",
                paddingBottom: "5%",
                height: "40px",
                borderRadius: "5px",
                color: "white",
                backgroundColor: "blue",
              }}
            >
              <Link
                to={
                  "/page/edit/" + formid + "/" + uid + "/" + privateData.email
                }
                style={{ color: "white", textDecoration: "none" }}
              >
                Edit
              </Link>
            </button>

            <button
              style={{ backgroundColor: "red", width: "60px" }}
              className="dlt"
              onClick={() => {
                setIsFormDelete(uid);
              }}
            >
              Delete
            </button>

            <button
              className="formButtons"
              style={{
                width: "30%",
                paddingBottom: "5%",
                height: "40px",
                borderRadius: "5px",
                color: "white",
                backgroundColor: "blue",
              }}
            >
              <Link
                to={{
                  pathname: "/response/" + uid + "/" + privateData.email,
                  state: { user: userPosts },
                }}
                style={{ color: "white", textDecoration: "none" }}
              >
                Responses
              </Link>
            </button>
          </div>
        )}
      </>
    );
  };
  useEffect(() => {}, [userPosts]);
  const AvailabilityCheck = ({ uid }) => {
    //console.log(uid, userPosts.imageHolder[0].formid, "XXXXXXXXXXXXx");
    for (var i in userPosts.imageHolder) {
      if (userPosts.imageHolder[i].formid == uid) {
        setIsImage(userPosts.imageHolder[i].image);
        console.log(isImage, "IMAGEEE");
        return (
          <div>
            <b>Media</b>
            <ReactPlayer
              url={"/uploads/" + userPosts.imageHolder[i].image}
              controls={true}
              className="playIt2"
            />
          </div>
        );
      }
    }
    return <b>No Media</b>;
  };
  const UserPostsChecker = ({ questions }) => {
    if (questions !== null) {
      return (
        <div style={{ alignItems: "left" }} className="FormDisplayer">
          <b>Form</b>
          {questions.map((question, qno) => (
            <>
              {console.log(question.question, "QUESTIONS")}
              <p key={qno}>{question.question}</p>
            </>
          ))}
        </div>
      );
    }
  };
  const UserPostsDisplayer = () => {
    if (
      userPosts &&
      userPosts.forms &&
      userPosts.forms[0] &&
      userPosts.forms[0].questions
    ) {
      console.log(userPosts.forms[0].questions, "BEFORE PLEASE");
      return (
        <>
          {userPosts.forms.map((form) => (
            <>
              {form.uniqueFormId && (
                <div class="col-sm-3">
                  <div class="card2">
                    <></>{" "}
                    <>
                      <b style={{ marginTop: "10%", marginBottom: "5%" }}>
                        <Link
                          style={{ color: "black", textDecoration: "none" }}
                          key={form._id}
                          to={{
                            pathname: "/form/" + form._id,
                            state: {
                              data: form,
                            },
                          }}
                        >
                          {console.log("Particular form ", form)}
                          {form.formName}
                          <br></br>
                        </Link>
                      </b>{" "}
                      <ShareDisplayer
                        SharingUrl={"http://localhost:3000/form/" + form._id}
                      />
                      <h4>
                        <b>Contents</b>
                        <UserPostsChecker questions={form.questions} />
                        <AvailabilityCheck uid={form.uniqueFormId} />
                      </h4>
                    </>
                    <DisplayButtons formid={form._id} uid={form.uniqueFormId} />
                  </div>
                </div>
              )}
            </>
          ))}
        </>
      );
    } else {
      return (
        <div className="wrapper">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
        </div>
      );
    }
  };
  return (
    <>
      {isFormDelete !== "" && (
        <>
          {!nowDeleting ? (
            <>
              <div
                style={{
                  width: "40vw",
                  borderRadius: "20px",
                  boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                  margin: "auto",
                  textAlign: "center",
                  padding: "2%",
                  backgroundColor: "white",
                  opacity: "100",
                  marginTop: "50vh",
                  marginLeft: "30vw",
                  zIndex: "2",
                  position: "fixed",
                  // color: "b",
                }}
                className="DeletionPrompt"
              >
                <p style={{ fontSize: "18px" }}>
                  <b>Complete Verification to Initiate Deletion Process</b>
                  <hr />
                </p>
                <p>
                  <b>
                    Are you absolutely sure you want to delete this site?
                    <br /> All your data and responses will be lost
                  </b>
                </p>
                <p>type:{makeId}</p>
                {isErrorInVer && (
                  <p style={{ fontSize: "15px", color: "red" }}>
                    Please enter the correct characters
                  </p>
                )}
                <form onSubmit={HandleFormDeletion}>
                  <input type="text" name="makeid" />
                  <button
                    style={{ backgroundColor: "red", width: "50px" }}
                    className="dlt"
                    type="submit"
                  >
                    Delete
                  </button>
                </form>
                <button
                  style={{ backgroundColor: "red", width: "50px" }}
                  className="dlt"
                  onClick={() => {
                    setIsFormDelete("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h3>
                <b>Please Wait Do not Reload</b>
              </h3>
            </>
          )}
        </>
      )}
      <div style={{ marginTop: "200px" }}></div>
      {!isLoading && (
        <Link
          to={{ pathname: "/form", state: { user: userPosts } }}
          style={{ textDecoration: "none", maxWidth: "250px" }}
        >
          <div className="createContainer" style={{ maxWidth: "100px" }}>
            <div className="createButton">Create</div>
          </div>
        </Link>
      )}
      <div className="row">
        <UserPostsDisplayer />
      </div>
    </>
  );
}

export default withRouter(Sub);
