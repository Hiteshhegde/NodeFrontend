import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router";

function Responses({ history }) {
  const { uid, email } = useParams();
  const [answers, SetAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    }
    console.log("Params- ", uid, " ", email);
    axios
      .get("/api/response/" + email + "/" + uid)
      .then((res) => {
        console.log("Recieved ", res);
        SetAnswers(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error ", err);
      });
  }, []);
  const HandleDeletion = (index) => {
    setIsLoading(true);
    console.log("CLICKED", answers[index]);
    const TempAns = answers;
    TempAns.splice(index, 1);
    console.log("New Ans ", TempAns);
    axios
      .delete("/api/remove/response/" + email + "/" + uid)
      .then(() => {
        for (var i in TempAns) {
          axios
            .put("/api/add/response/" + email + "/" + uid, {
              answers: TempAns[i],
            })
            .then((res) => {
              console.log("Success ", res, " ");
              setIsLoading(false);
            })
            .catch((err) => console.log("Error caught while resetting ", err));
        }
      })
      .catch((err) => {
        console.log("Error caught at Deletion", err);
      });
  };
  const AnswersDisplayer = () => {
    return (
      <>
        {answers.map((answer, index) => (
          <div
            key={index}
            style={{
              width: "60vw",
              borderRadius: "20px",
              boxShadow: "1px 2px 3px rgba(0,0,0,0.5)",
              minHeight: "30vh",
              textAlign: "left",
              margin: "auto",
              padding: "2%",
            }}
          >
            <button
              style={{
                backgroundColor: "red",
                width: "70px",
                height: "30px",
                borderRadius: "5px",
                padding: "2px",
                marginLeft: "10%",
              }}
              onClick={() => HandleDeletion(index)}
            >
              Remove
            </button>
            {answer.map((ans, i) => {
              if (Object.keys(ans)[0] != "ansid") {
                return (
                  <h6
                    key={i}
                    style={{
                      width: "50vw",
                      // border: "2px solid black",
                      padding: "15px",
                      justifyItems: "center",
                      marginLeft: "10%",
                    }}
                  >
                    <b>{Object.keys(ans)[0]}</b>
                    <br />
                    {Object.values(ans)[0]}
                  </h6>
                );
              }
            })}
          </div>
        ))}
      </>
    );
  };
  return (
    <>
      {!isLoading ? (
        <div style={{ marginTop: "10vh", textAlign: "center" }}>
          <h3>
            <b>Responses for Form in PageName</b>
          </h3>
          <AnswersDisplayer />
        </div>
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

export default withRouter(Responses);
