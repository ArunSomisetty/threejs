import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
// import "./TextAnimation.css";

gsap.registerPlugin(ScrollTrigger);

const TextAnimation = () => {
  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".landingPage",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    timeline
      .fromTo(
        ".landingInner",
        { scale: 0.95, opacity: 1 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "none" }
      )
      .to(".landingInner", {
        scale: 1.1,
        opacity: 0,
        duration: 0.5,
        ease: "none",
        onComplete: () => {
          const introTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: ".landingIntro",
              start: "top top",
              end: "bottom+=100 top",
              scrub: true,
            },
          });

          introTimeline
            .fromTo(
              ".introInner",
              { scale: 0.8, opacity: 0, visibility: "hidden" },
              {
                scale: 0.9,
                opacity: 1,
                visibility: "visible",
                duration: 0.5,
                ease: "none",
              }
            )
            .to(".introInner", { scale: 1, duration: 0.5, ease: "none" })
            .to(".introInner", {
              scale: 1.1,
              opacity: 0,
              duration: 0.5,
              ease: "none",
              onComplete: () => {
                gsap.set(".introInner", { visibility: "visible" });
                const section2Timeline = gsap.timeline({
                  scrollTrigger: {
                    trigger: ".section--2",
                    start: "top top",
                    end: "bottom+=100 top",
                    scrub: true,
                  },
                });

                section2Timeline
                  .set(".earthScene", { opacity: 0 })
                  .set(".section--2", { visibility: "visible", opacity: 1 })
                  .set(".section2Frame1", { visibility: "visible", opacity: 1 })
                  .fromTo(
                    ".line1",
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                  )
                  .fromTo(
                    ".line2",
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                    "-=0.3"
                  )
                  .fromTo(
                    ".Frame1InroductionPart2 h3",
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                  )
                  .fromTo(
                    ".Frame1InroductionPart2 p",
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                    "-=0.3"
                  )
                  .fromTo(
                    ".Frame1InroductionPart2 button",
                    { opacity: 0 },
                    { opacity: 1, duration: 0.5, ease: "power2.out" },
                    "-=0.3"
                  )
                  //   .to(".section2Frame1", {
                  //     opacity: 0,
                  //     duration: 0.1,
                  //     ease: "none",
                  //     onComplete: () => {
                  //       gsap.fromTo(
                  //         ".earthScene",
                  //         { opacity: 0 },
                  //         {
                  //           opacity: 1,
                  //           duration: 1.5,
                  //           ease: "power2.out",
                  //         }
                  //       );
                  //     },
                  //   });
                  .to(".section2Frame1", {
                    opacity: 0,
                    duration: 0.1,
                    ease: "none",
                    onComplete: () => {
                      // Fade out the Earth scene before fading it back in
                      gsap.set(".earthScene", { opacity: 0 });
                      gsap.to(".earthScene", {
                        opacity: 0, // Ensure the Earth scene is set to opacity 0 before fading in
                        duration: 0.1,
                        ease: "none",
                        onComplete: () => {
                          // Now fade it back in
                          gsap.fromTo(
                            ".earthScene",
                            { opacity: 0 },
                            {
                              opacity: 1,
                              duration: 1.5,
                              ease: "power2.out",
                            }
                          );
                        },
                      });
                    },
                  });

                function animateQuestionFrame(timeline, frame, question) {
                  timeline
                    .fromTo(
                      frame,
                      { opacity: 0, x: 0 },
                      { opacity: 1, x: 0, duration: 0.1, ease: "none" }
                    )
                    .fromTo(
                      question,
                      {
                        opacity: 0,
                        transform:
                          "translate3d(-50vw, 0px, -400px) rotateY(-40deg)",
                        ease: "none",
                      },
                      {
                        opacity: 1,
                        visibility: "visible",
                        transform: "translate3d(0, 0px, 0px) rotateY(0deg)",
                        duration: 0.5,
                        ease: "none",
                      }
                    )
                    .fromTo(
                      question,
                      {
                        opacity: 1,
                        transform: "translate3d(0, 0px, 0px) rotateY(0deg)",
                        ease: "none",
                      },
                      {
                        opacity: 0,
                        visibility: "visible",
                        transform:
                          "translate3d(50vw, 0px, -400px) rotateY(40deg)",
                        duration: 0.5,
                        ease: "none",
                      }
                    )
                    .to(frame, { opacity: 0, duration: 0.1, ease: "none" });
                }

                animateQuestionFrame(
                  section2Timeline,
                  ".section2Frame2",
                  ".question1"
                );
                animateQuestionFrame(
                  section2Timeline,
                  ".section2Frame3",
                  ".question2"
                );
                animateQuestionFrame(
                  section2Timeline,
                  ".section2Frame4",
                  ".question3"
                );
                animateQuestionFrame(
                  section2Timeline,
                  ".section2Frame5",
                  ".question4"
                );

                section2Timeline
                  .to(".section2Frame5", {
                    opacity: 0,
                    y: 0,
                    duration: 0.1,
                    ease: "none",
                  })
                  .to(".section2Frame6", {
                    opacity: 1,
                    y: 0,
                    duration: 0.1,
                    ease: "none",
                  })
                  .fromTo(
                    ".line4",
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                  );
              },
            });
        },
      });
  }, []);

  return (
    <main className="scroll-container lenis lenis-smooth">
      <div className="sections container-fluid">
        <div
          className="section section--1 w-100"
          style={{ opacity: 1, visibility: "inherit" }}
        >
          <div className="d-flex justify-content-center align-items-center h-100vh w-100 relative fixed landingPage left-0">
            <div className="landingInner">
              <h1 className="text-center max-w-350 max-w-525@sm max-w-800@md mb-0 t-30 t-50@sm t-80@md t-lh-1 font_Univia">
                Healthy oceans help combat climate change
              </h1>
              <p className="mb-0 mt-20 text-center t-10 t-14@sm t-20@md text-uppercase">
                A quest for new discoveries
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center h-100vh w-100 relative fixed landingIntro left-0">
            <div className="introInner">
              <p className="mb-0 text-center t-20 t-36@sm t-lh-1.2 max-w-875@md">
                The ocean plays a vital role in the Earth’s carbon cycle. It
                holds 50 times more carbon than the atmosphere and currently,
                captures around 25% of the carbon emitted by burning fossil
                fuels. To help solve the climate crisis we need to understand
                how carbon is stored in the ‘seascape’ and seafloor.
              </p>
            </div>
          </div>
        </div>

        <div
          className="section section--2 w-100"
          style={{ opacity: 0, visibility: "hidden" }}
        >
          <div className="d-flex align-items-end h-100vh relative fixed top left section2Frame1 w-100 justify-content-md-center">
            <div
              className="row"
              style={{ marginBottom: "50px", maxWidth: "90%" }}
            >
              <div className="col-12 col-md-8">
                <div className="Frame1Inroduction">
                  <p className="line line1 t-30 t-50@sm t-70@md t-lh-1 font_Univia">
                    Introducing the
                  </p>
                  <p className="line line2 t-30 t-50@sm t-70@md t-lh-1 font_Univia">
                    Convex Seascape Survey
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-4 Frame1InroductionPart2">
                <h3 className="t-20 t-24@sm t-30@md font_Univia">
                  Understanding the ocean
                </h3>
                <p className="t-12 t-14@sm t-16@md">
                  The survey is an ambitious, five-year global research
                  programme developed by project partners: Blue Marine
                  Foundation, University of Exeter and Convex Group Ltd.
                  World-leading experts will investigate and quantify carbon
                  storage in coastal seas around the globe. The carbon capacity
                  of these vast areas is currently unknown.
                </p>
                <button>THE TEAM</button>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center align-items-center h-100vh w-100 relative fixed top left section2Frame2">
            <div className="questionsBox" style={{ perspective: "60rem" }}>
              <div className="question question1">
                <h2 className="max-w-350 max-w-525@sm max-w-800@md t-30 t-50@sm t-70@md t-lh-1 font_Univia">
                  Questions the research will address:
                </h2>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center h-100vh w-100 relative fixed top left section2Frame3">
            <div className="questionsBox" style={{ perspective: "60rem" }}>
              <div className="question question2">
                <h2 className="max-w-350 max-w-525@sm max-w-800@md t-30 t-50@sm t-70@md t-lh-1 font_Univia">
                  Where is blue carbon stored, when did it get there, where has
                  it come from?
                </h2>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center h-100vh w-100 relative fixed top left section2Frame4">
            <div className="questionsBox" style={{ perspective: "60rem" }}>
              <div className="question question3">
                <h2 className="max-w-350 max-w-525@sm max-w-800@md t-30 t-50@sm t-70@md t-lh-1 font_Univia">
                  What is the role of marine plants and animals in carbon
                  capture and storage?
                </h2>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center h-100vh w-100 relative fixed top left section2Frame5">
            <div className="questionsBox" style={{ perspective: "60rem" }}>
              <div className="question question4">
                <h2 className="max-w-350 max-w-525@sm max-w-800@md t-30 t-50@sm t-70@md t-lh-1 font_Univia">
                  Are blue carbon stores under threat from human activities?
                </h2>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center h-100vh w-100 relative fixed top left section2Frame6">
            <p className="line line4"></p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TextAnimation;
