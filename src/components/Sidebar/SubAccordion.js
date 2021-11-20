import React from "react";
import { Link } from "react-router-dom";
// import { Accordion } from "react-bootstrap";
import "./SubAccordian.css";
function SubAccordion({ userPosts }) {
  return (
    <div className="accordion-flush" id="accordionFlushExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingOne">
          <button
            className="accordion-button collapsed"
            // type="button"
            // style={{ marginLeft: "50%" }}
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseOne"
            // aria-expanded="false"
            aria-controls="flush-collapseOne"
          >
            Your Drafts
          </button>
        </h2>
        <div
          id="flush-collapseOne"
          className="accordion-collapse collapse"
          aria-labelledby="flush-headingOne"
          data-bs-parent="#accordionFlushExample"
        >
          <div className="accordion-body">
            {userPosts.forms.map((form) => (
              <Link
                key={form._id}
                to={{
                  pathname: "/form/" + form._id,
                  state: {
                    data: form,
                  },
                }}
              >
                <button className="subAddButtonHead">{form.formName}</button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubAccordion;
