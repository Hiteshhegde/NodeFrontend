import React, { useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router";
import axios from "axios";
import "./ImgVid.css";
function ImgVid(props) {
  let data = new FormData();
  console.log(props);
  const [success, setSuccess] = useState(false);

  const [progressPercent, setProgressPercent] = useState(0);
  const [error, setError] = useState({
    found: false,
    message: "",
  });
  const HandleSubmit = (e) => {
    e.preventDefault();
    data.append("desc", props.description);
    data.append("formid", props.formid);
    console.log("SENDING ", data);

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
      .put("/api/add/image/" + props.email, data, options)
      .then((res) => {
        console.log(res);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
        setTimeout(() => {
          setProgressPercent(0);
        }, 1000);
        // history.push("/home");
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
  return (
    <div
      //   style={{ width: "100vw", height: "100vh" }}
      className="d-flex justify-content-center align-items-center flex-column"
    >
      <h3 style={{ color: "black" }}>
        <b>Add a Video</b>
      </h3>
      <div style={{ width: "360px" }}>
        {error.found && (
          <div
            className="alert alert-danger"
            style={{ color: "black", textAlign: "center" }}
            role="alert"
          >
            {error.message}
          </div>
        )}
        {success && (
          <div
            className="alert alert-success"
            style={{ color: "black", textAlign: "center" }}
            role="alert"
          >
            File and Description Uploaded
          </div>
        )}

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
                    data.append("image", files[0]);
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
              style={{ textAlign: "center", backgroundColor: "purple" }}
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
        <button onClick={HandleSubmit} style={{ width: "50px" }}>
          Add
        </button>
        {/* <img className="mt-3" src="" alt=""></img> */}
      </div>
    </div>
  );
}

export default withRouter(ImgVid);
