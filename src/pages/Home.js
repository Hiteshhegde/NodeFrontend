import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";
function Home() {
  function Qual() {
    const obj = {
      0: "a Lorem",
      1: "a Impsum Designer",
      2: "a Form Artist",
      3: "an Helper",
      4: "a Lorem Impsum ",
      5: "A Lorem ipsum dolor",
    };
    const [pos, setPos] = useState(0);
    const auto = useRef();
    useEffect(() => {
      auto.current = next;
    });
    useEffect(() => {
      const play = () => {
        auto.current();
      };
      const interval = setInterval(play, 2000);
      return () => {
        clearInterval(interval);
      };
    }, []);
    const next = () => {
      setPos((pos + 1) % 6);
      console.log("POS=", pos);
    };
    return (
      <div style={{ fontSize: "30px", display: "inline-block" }}>
        {obj[pos]}
      </div>
    );
  }
  const items = [
    {
      title: "Birthday",
      desc: "16th,September",
    },
    { title: "Age", desc: "Small" },
    { title: "Achievements", desc: "Got Into Nift" },
    { title: "Skills", desc: "Artistic Genius Prodigy" },
    { title: "Aka", desc: "Sponge/Milk/SpoongeyBoob" },
    { title: "Hobbies", desc: "Reading/Drawing/Painting" },
  ];
  return (
    <>
      <section
        id="hero"
        className="d-flex flex-column align-items-center"
        style={{
          backgroundColor: "white",
          // width: "100%",
          // height: "60vh",
          fontStyle: "unset",
        }}
      >
        <div className="hero-container" data-aos="fade-in">
          <div
            style={{
              fontSize: "45px",
              color: "black",
              fontFamily: "'Lobster', cursive",
              textAlign: "center",
            }}
          >
            Build Simple yet Powerful
          </div>
          <div
            style={{
              fontSize: "60px",
              fontFamily: "'Lobster', cursive",
              background: "linear-gradient(to right,purple, pink)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              // -webkit-background-clip: "text",
              // -webkit-text-fill-color: "transparent"
            }}
          >
            Professional Landing Pages
          </div>
          <div
            style={{
              fontSize: "25px",
              color: "black",
              fontFamily: " 'Signika Negative', sans-serif",
              textAlign: "center",
              width: "400px",
              marginLeft: "17%",
            }}
          >
            <b>
              Create your Professional resume website that will capture your
              audience and recruiters.
            </b>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "300px",
              marginLeft: "25%",
            }}
          >
            <Link
              className="AddButton"
              // style={{ backgroundColor: "transparent", border: "0px" }}
              // onClick={() => setIsSub(true)}
              to="/add-sub"
            >
              <button className="btn btn-primary">Add Form</button>
            </Link>
            <Link
              className="AddButton"
              // style={{ backgroundColor: "transparent", border: "0px" }}
              // onClick={() => setIsSub(true)}
              to="/tutorialPage"
            >
              <button className="btn btn-secondary">See Example</button>
            </Link>
          </div>
        </div>
      </section>
      <div>
        <section id="about" className="about" style={{ color: "black" }}>
          <div className="container">
            <div className="section-title">
              <h2>About Me</h2>
            </div>
            <div className="row">
              <div className="col-lg-4" data-aos="fade-right">
                <img
                  src="assets/img/profile-img.jpeg"
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div
                className="col-lg-8 pt-4 pt-lg-0 content"
                data-aos="fade-left"
              >
                <h3>lorem &amp; lorem.</h3>
                <div className="row">
                  <div className="col-lg-6">
                    <ul>
                      {items.map((item) => (
                        <li>
                          <i className="icofont-rounded-right"></i>{" "}
                          <strong>{item.title}:</strong> {item.desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
