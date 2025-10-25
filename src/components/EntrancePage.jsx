import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import logo from "../../src/assets/logo.png";
import { Link } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger, SplitText);

function EntrancePage() {
  const canvasRef = useRef();
  const parentRef = useRef();
  const page1Ref = useRef();
  const page2Ref = useRef();
  const page3Ref = useRef();
  const page4Ref = useRef();
  const page5Ref = useRef();
  const videoRef = useRef();
  const photoEffect = useRef();
  const photoEffectDiv = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const frames = { currentIndex: 0, maxIndex: 469 };
    const images = [];
    let imagesLoaded = 0;

    function preloadImages() {
      for (let i = 1; i <= frames.maxIndex; i++) {
        const imageUrl = `/compressedFrames/${i
          .toString()
          .padStart(4, "0")}.png`;
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
          imagesLoaded++;
          if (imagesLoaded === frames.maxIndex) {
            loadImages(frames.currentIndex);
            startAnimation();
          }
        };
        images.push(img);
      }
    }

    function loadImages(index) {
      if (index >= 0 && index <= frames.maxIndex) {
        const img = images[index];
        if (!img) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

        frames.currentIndex = index;
      }
    }

    function startAnimation() {
      gsap.registerPlugin(ScrollTrigger);

      gsap.to(frames, {
        currentIndex: frames.maxIndex,
        onUpdate: () => loadImages(Math.floor(frames.currentIndex)),
        scrollTrigger: {
          trigger: parentRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 3,
        },
      });
    }

    // Preload all images
    preloadImages();
    ScrollTrigger.create({
      trigger: videoRef.current,
      start: "top top",

      endTrigger: parentRef.current,
      end: "bottom bottom",
      pin: true,
    });

    // Responsive resize
    const handleResize = () => loadImages(frames.currentIndex);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  useGSAP(() => {
    gsap.to(page1Ref.current, {
      scrollTrigger: {
        // scroller: parentRef.current,
        trigger: page1Ref.current,
        start: "top top",
        end: "bottom top",
        pin: true,

        pinSpacing: true,
        scrub: 4,
      },
    });
    gsap.to(page2Ref.current, {
      scrollTrigger: {
        // scroller: parentRef.current,
        trigger: page2Ref.current,
        start: "top top",
        end: "bottom-=50% top",
        pin: true,
        pinSpacing: true,
        scrub: 4,
      },
    });
    gsap.to(page3Ref.current, {
      scrollTrigger: {
        // scroller: parentRef.current,
        trigger: page3Ref.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: true,
        scrub: 4,
      },
    });
    gsap.to(page4Ref.current, {
      scrollTrigger: {
        // scroller: parentRef.current,
        trigger: page4Ref.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: true,
        scrub: 4,
      },
    });
    gsap.to(page5Ref.current, {
      scrollTrigger: {
        // scroller: parentRef.current,
        trigger: page5Ref.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: true,
        scrub: 4,
      },
    });
    gsap.to(".looping", {
      opacity: 0,
      scrollTrigger: {
        trigger: ".looping",
        start: "top top+=200",
        // endTrigger: page1Ref.current,
        end: "top top-=100",
        pin: true,
        scrub: 3,
        // markers: true,
      },
    });
  });
  useGSAP(() => {
    const pages = [page1Ref, page2Ref, page3Ref, page4Ref, page5Ref];

    pages.forEach((pageRef) => {
      const container = pageRef.current;

      const h1s = container.querySelectorAll("h1");
      h1s.forEach((h1) => {
        const split = new SplitText(h1, { type: "lines" });
        gsap.from(split.lines, {
          opacity: 0,
          y: 20,
          stagger: { each: 0.2, from: "random" },
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top center",
            end: "top top",
          },
        });
      });

      const paragraphs = container.querySelectorAll("p");
      paragraphs.forEach((p, i) => {
        const split = new SplitText(p, { type: "lines" });
        gsap.from(split.lines, {
          opacity: 0,
          y: -50,
          stagger: 0.2,
          duration: 1,
          ease: "power2.out",
          delay: i * 0.5,
          scrollTrigger: {
            trigger: container,
            start: "top center",
            end: "top top",
          },
        });
      });

      gsap.to(container.querySelectorAll("h1, p"), {
        opacity: 0,
        y: -20,
        scrollTrigger: {
          trigger: container,
          start: "bottom center",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  });
  useEffect(() => {
    const photoDiv = photoEffectDiv.current;
    const photo = photoEffect.current;

    if (!photoDiv || !photo) return; // Safety check

    // Function to get boundary dynamically
    const getBoundary = () => photoDiv.getBoundingClientRect();

    // Mouse move effect
    const handleMouseMove = (e) => {
      const boundary = getBoundary();
      const mouseX = e.clientX - boundary.left;
      const mouseY = e.clientY - boundary.top;

      // Calculate translation with clamping to prevent escaping outside
      const maxX = boundary.width / 4; // or appropriate limit
      const maxY = boundary.height / 4;

      const translateX = Math.max(
        Math.min((mouseX - boundary.width / 2) * 0.2, maxX),
        -maxX
      );
      const translateY = Math.max(
        Math.min((mouseY - boundary.height / 2) * 0.2, maxY),
        -maxY
      );

      gsap.to(photo, {
        x: translateX,
        y: translateY,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    // Reset on leave
    const handleMouseLeave = () => {
      gsap.to(photo, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1.2,0.1)",
      });
    };

    // Add event listeners
    photoDiv.addEventListener("mousemove", handleMouseMove);
    photoDiv.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup
    return () => {
      photoDiv.removeEventListener("mousemove", handleMouseMove);
      photoDiv.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      <div className="relative top-0 w-full ">
        <Link to="/">
          <div className=" z-wanted absolute top-0 left-0 bg-black h-[10vh] w-[15vw] border-white border-2">
            <img
              src={logo}
              alt="logo"
              className="h-full w-full object-contain object-center cursor-pointer"
            />
          </div>
        </Link>
        <Link to="/cyber">
          <div className="absolute top-0 right-0 z-wanted  bg-black h-[10vh] w-[20vh] text-white text-center pt-3 font-[font6] text-2xl border-white border-2">
            cyber-world
          </div>
        </Link>
        <div className="w-screen h-screen absolute top-0 left-0 z-20 ">
          <video
            ref={videoRef}
            src="/video_bg/bg-video001.mp4"
            autoPlay
            loop
            muted
            preload="auto"
            className="w-full h-full object-fill filter grayscale "
            onLoadedData={() => {
              videoRef.current.play();
            }}
          />
        </div>
        <div className="absolute w-screen h-screen  top-[30vh] z-30">
          <div id="loop" className="looping overflow-x-hidden">
            <h1>
              <b>CYBER</b>FICTION* THE{" "}
              <b>
                <i>REAL</i>
              </b>{" "}
              <span>STORY</span> IN THE{" "}
              <span>
                <i>METAVERSE.</i>
              </span>
            </h1>
            <h1>
              <b>CYBER</b>FICTION* THE{" "}
              <b>
                <i>REAL</i>
              </b>{" "}
              <span>STORY</span> IN THE{" "}
              <span>
                <i>METAVERSE.</i>
              </span>
            </h1>
            <h1>
              <b>CYBER</b>FICTION* THE{" "}
              <b>
                <i>REAL</i>
              </b>{" "}
              <span>STORY</span> IN THE{" "}
              <span>
                <i>METAVERSE.</i>
              </span>
            </h1>
          </div>
        </div>
        <div
          ref={parentRef}
          className="relative top-0 left-0  w-full bg-zinc-300 "
        >
          <canvas
            ref={canvasRef}
            className="w-full h-screen sticky top-0 z-40  "
          ></canvas>

          {/* PAGE 1 */}
          <div ref={page1Ref} className="w-screen h-screen relative z-20">
            <div className="w-full h-full absolute z-40 text-4xl text-white gap-4">
              <h1 className="font-[font2] text-5xl leading-15 ml-5 mt-40">
                LET’S BUILD THE <br /> FUTURE <br />{" "}
                <span className="font-[font4]">TOGETHER</span>
                <br />
                <b>
                  <i className="font-[font1]"> -George </i>
                </b>
              </h1>
              <div className="w-1/3 absolute top-1/3 right-0 text-left mr-7">
                <p className="text-[20px] text-right my-4 leading-7 font-[font6]">
                  Let’s imagine new worlds beyond limits. Collaborate, create,
                  and express yourself without boundaries — in the metaverse,
                  every pixel is a possibility.
                </p>
                <p className="text-[20px] text-right leading-7 font-[font5]">
                  <i>
                    कल्पयाम विश्वानि सीमातीतानि। सहयोगं कुरु, सृज, स्वं व्यक्तिं
                    निरवरोधं प्रदर्शय — मेटाविश्वे प्रत्येकः पिक्सेलः
                    सम्भावनायाः रूपम् अस्ति।
                  </i>
                </p>
              </div>
            </div>
          </div>

          {/* PAGE 2 */}
          <div ref={page2Ref} className="w-screen h-screen relative z-20">
            <div className="w-full h-full absolute z-40 text-4xl text-white gap-4">
              <h1 className="font-[font2] text-5xl leading-15 ml-5 mt-40">
                LET’S MEET <br />
                <span className="font-[font4]">BEYOND REALITY</span>
                <br />
                <b>
                  <i className="font-[font1]"> -Matthew</i>
                </b>
              </h1>
              <div className="w-1/3 absolute top-1/3 right-0 text-left mr-7">
                <p className="text-[20px] text-right my-4 leading-7 font-[font6]">
                  No borders. No distances. Just people connecting through
                  imagination, sharing stories, and making memories in digital
                  spaces.
                </p>
                <p className="text-[20px] text-right leading-7 font-[font5]">
                  <i>
                    न सीमाः, न दूरताः — केवलं जनाः कल्पनया संयोज्यमानाः, कथा:
                    साझा कुर्वन्तः, स्मृतयः च डिजिटल्-जगति निर्मायन्ते।
                  </i>
                </p>
              </div>
            </div>
          </div>

          {/* PAGE 3 */}
          <div ref={page3Ref} className="w-screen h-screen relative z-20">
            <div className="w-full h-full absolute z-40 text-4xl text-white gap-4">
              <h1 className="font-[font2] text-5xl leading-15 ml-5 mt-40">
                LET’S DREAM <br />
                <span className="font-[font4]">OUT LOUD</span>
                <br />
                <b>
                  <i className="font-[font1]"> -Simon</i>
                </b>
              </h1>
              <div className="w-1/3 absolute top-1/3 right-0 text-left mr-7">
                <p className="text-[20px] text-right my-4 leading-7 font-[font6]">
                  Dreams are no longer confined to sleep. Turn your wildest
                  ideas into vivid, interactive experiences — where fantasy
                  meets creation.
                </p>
                <p className="text-[20px] text-right leading-7 font-[font5]">
                  <i>
                    स्वप्नाः निद्रायाः सीमिताः न भवन्ति। तव अद्भुततमाः कल्पनाः
                    जीवदनुभूतिषु परिवर्तय — यत्र कल्पना सृष्टिं संगच्छति।
                  </i>
                </p>
              </div>
            </div>
          </div>

          {/* PAGE 4 */}
          <div ref={page4Ref} className="w-screen h-screen relative z-20">
            <div className="w-full h-full absolute z-40 text-4xl text-white gap-4">
              <h1 className="font-[font2] text-5xl leading-15 ml-5 mt-40">
                LET’S TURN <br />
                <span className="font-[font4]">LIFE INTO A GAME</span>
                <br />
                <b>
                  <i className="font-[font1]"> -Luke</i>
                </b>
              </h1>
              <div className="w-1/3 absolute top-1/3 right-0 text-left mr-7">
                <p className="text-[20px] text-right my-4 leading-7 font-[font6]">
                  Every interaction is an adventure. Every moment is a quest.
                  Level up your creativity and play with purpose.
                </p>
                <p className="text-[20px] text-right leading-7 font-[font5]">
                  <i>
                    प्रत्येकः संवादः साहसम् अस्ति। प्रत्येकः क्षणः अन्वेषणम्।
                    स्वसृजनशीलताम् उन्नय, उद्देश्येन क्रीडस्व।
                  </i>
                </p>
              </div>
            </div>
          </div>

          {/* PAGE 5 */}
          <div ref={page5Ref} className="w-screen h-screen relative z-20">
            <div className="w-full h-full absolute z-40 text-4xl text-white gap-4">
              <h1 className="font-[font2] text-5xl leading-15 ml-5 mt-40">
                LET’S STAND <br />
                <span className="font-[font4]">AS ONE</span>
                <br />
                <b>
                  <i className="font-[font1]"> -John</i>
                </b>
              </h1>
              <div className="w-1/3 absolute top-1/3 right-0 text-left mr-7">
                <p className="text-[20px] text-right my-4 leading-7 font-[font6]">
                  Erase the lines that divide us — culture, gender, age, status.
                  Together, we shape a digital space built on respect, fun, and
                  equality.
                </p>
                <p className="text-[20px] text-right leading-7 font-[font5]">
                  <i>
                    यत् रेखाः वयं विभजति तानि लोपय — संस्कृति, लिङ्ग, आयुः,
                    स्थिति। सहैव वयं सम्मान, मनोरञ्जन, समता च आधारभूतं
                    डिजिटल्-जगत् निर्मयाम।
                  </i>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="  relative h-screen w-screen  flex flex-col items-center justify-center overflow-hidden uppercase bg-black">
        <div
          ref={photoEffectDiv}
          className="absolute h-[90vh] w-[100vh] overflow-hidden flex items-center justify-center  bg-black"
        >
          <div
            ref={photoEffect}
            className=" absolute h-full w-[100vh] bg-[url('/avatars/CyberFiction-Ryan.png')] bg-cover z-30 bg-center "
          ></div>
        </div>

        {/* Marquee Layer 1 */}
        <div className="marquee-container  bg-black">
          <div className="marquee-text font-[font1]">
            CYBER FICTION IS FOR REAL ONE DAMNNN !!!
          </div>
          <div className="marquee-text font-[font1]">
            CYBER FICTION IS FOR REAL ONE DAMNNN !!!
          </div>
          <div className="marquee-text font-[font1]">
            CYBER FICTION IS FOR REAL ONE DAMNNN !!!
          </div>
        </div>

        {/* Marquee Layer 2 */}
        <div className="marquee-container">
          <div className="marquee-text1 font-[font1] z-40">
            CYBER FICTION IS FOR REAL ONE DAMNNN !!!
          </div>
          <div className="marquee-text1 font-[font1] z-40">
            CYBER FICTION IS FOR REAL ONE DAMNNN !!!
          </div>
          <div className="marquee-text1 font-[font1] z-40">
            CYBER FICTION IS FOR REAL ONE DAMNNN !!!
          </div>
        </div>

        {/* Marquee Layer 3 */}
        <div className="marquee-container">
          <div className="marquee-text font-[font1]">
            CYBER FICTION IS FOR REAL ONE DAMNNN !!!
          </div>
          <div className="marquee-text font-[font1]">
            CYBER FICTION IS FOR REAL ONE DAMNNN !!!
          </div>
          <div className="marquee-text font-[font1]">
            CYBER FICTION IS FOR REAL ONE DAMNNN !!!
          </div>
        </div>
      </div>
    </>
  );
}

export default EntrancePage;
