import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useEffect, useRef } from "react";

const CyberWhite = () => {
  const parentRef2 = useRef();
  const canvasRef2 = useRef();
  const page1Ref = useRef();
  const page2Ref = useRef();
  const page3Ref = useRef();
  const page4Ref = useRef();
  const imageRef = useRef();

  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    const canvas = canvasRef2.current;
    const context = canvas.getContext("2d");

    const framesImage = {
      currentImage: 0,
      lastImage: 300,
    };

    const imagesArray = [];
    let imageLoaded = 0;

    function preLoadedImages() {
      for (let i = 1; i <= framesImage.lastImage; i++) {
        const imageUrl = `/page2images/male${i
          .toString()
          .padStart(4, "0")}.png`;

        let imgDiv = new Image();
        imgDiv.src = imageUrl;
        imgDiv.onload = () => {
          imageLoaded++;
          if (imageLoaded === framesImage.lastImage) {
            loadingFunc(framesImage.currentImage);
            startAnimationFunc();
          }
        };
        imagesArray.push(imgDiv);
      }
    }
    function loadingFunc(index) {
      if (index >= 0 && index <= framesImage.lastImage) {
        let img = imagesArray[index];
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

        framesImage.currentImage = index;
      }
    }
    function startAnimationFunc() {
      gsap.to(framesImage, {
        currentImage: framesImage.lastImage - 1,
        onUpdate: () => loadingFunc(Math.floor(framesImage.currentImage)),
        scrollTrigger: {
          trigger: parentRef2.current,
          start: "top top",
          endTrigger: parentRef2.current,
          end: "bottom bottom",
          scrub: 3,
          invalidateOnRefresh: true,
        },
      });
    }
    preLoadedImages();
    const handleResize = () => loadingFunc(frames.currentIndex);
    window.addEventListener("resize", handleResize);
  }, []);
  useGSAP(() => {
    gsap.to(page1Ref.current, {
      scrollTrigger: {
        trigger: page1Ref.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: true,
        scrub: 3,
      },
    });
    gsap.to(page2Ref.current, {
      scrollTrigger: {
        trigger: page2Ref.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: true,
        scrub: 3,
      },
    });
    gsap.to(page3Ref.current, {
      scrollTrigger: {
        trigger: page3Ref.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: true,
        scrub: 3,
      },
    });
    gsap.to(page4Ref.current, {
      scrollTrigger: {
        trigger: page4Ref.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: true,
        scrub: 3,
      },
    });

    const frames = {
      startingImg: 1,
      endingImg: 13,
    };
    gsap.to(frames, {
      startingImg: frames.endingImg - 1,
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top-=100 top",
        end: "bottom top+=100",
        pin: ".mainDiv",
        scrub: true,
        onUpdate: () => {
          const frameIndex = Math.round(frames.startingImg);
          const frameStr = frameIndex.toString().padStart(2, "0");
          imageRef.current.src = `/avatars/CF-Avatar-${frameStr}.png`;
        },
      },
    });
  });

  useGSAP(() => {
    const pages = [page1Ref, page2Ref, page3Ref, page4Ref];

    pages.forEach((ref) => {
      const page = ref.current;
      if (!page) return;

      const h1 = page.querySelector("h1");
      const pElements = page.querySelectorAll("p");
      if (!h1) return;

      ScrollTrigger.create({
        trigger: page,
        start: "top 80%",
        onEnter: () => {
          const splitH1 = new SplitText(h1, { type: "chars" });
          const splitPs = Array.from(pElements).map(
            (p) => new SplitText(p, { type: "words" })
          );

          const tl = gsap.timeline();
          tl.from(splitH1.chars, {
            opacity: 0,
            y: 50,
            stagger: 0.05,
            duration: 1,
            ease: "back.out(1.7)",
          });

          splitPs.forEach((splitP) => {
            tl.from(
              splitP.words,
              {
                opacity: 0,
                y: 30,
                stagger: 0.2,
                duration: 0.8,
                ease: "power2.out",
              },
              "-=0.5"
            );
          });
        },
      });
    });
  });

  return (
    <>
      <div className="  class-div relative left-0 h-screen w-full bg-zinc-200 ">
        <div
          ref={parentRef2}
          className=" class-div relative top-0 left-0  w-full  bg-zinc-200  "
        >
          <div className="  class-div class-div absolute top-0 left-0  w-screen h-screen z-10 flex overflow-hidden">
            <div className="w-1/6 border-x-[2px] h-screen overflow-hidden flex justify-center">
              <div className="vertical-text font-[font1] text-[10vw] ">
                MANIAC MANIAC MANIAC MANIAC MANIAC MANIAC MANIAC MANIAC MANIAC
                MANIAC MANIAC MANIAC
              </div>
            </div>
            <div className="w-1/6 border-x-[2px] h-screen overflow-hidden flex justify-center bg-black">
              <div className="vertical-text2 font-[font1] text-[10vw]  text-white ">
                MANIAC MANIAC MANIAC MANIAC MANIAC MANIAC MANIAC MANIAC MANIAC
                MANIAC MANIAC MANIAC
              </div>
            </div>
            <div className="w-1/6 border-x-[2px] h-screen overflow-hidden flex justify-center">
              <div className="vertical-text font-[font1] text-[10vw] ">
                MANIAC MANIAC MANIAC MANIAC MANIAC MANIAC MANIAC MANIAC MANIAC
                MANIAC MANIAC MANIAC
              </div>
            </div>
            <div className="w-1/6 border-x-[2px] h-screen overflow-hidden flex justify-center bg-black">
              <div className="vertical-text2 font-[font1] text-[10vw]   text-white  ">
                MANIAC MANIAC MANIAC MANIAC MANIAC MANIAC MANIAC MANIAC MANIAC
                MANIAC MANIAC MANIAC
              </div>
            </div>
            <div className="w-1/6 border-x-[2px] h-screen overflow-hidden flex justify-center">
              <div className="vertical-text font-[font1] text-[10vw] ">
                MANIAC MANIAC MANIAC MANIAC MANIAC MANIAC MANIAC MANIAC MANIAC
                MANIAC MANIAC MANIAC
              </div>
            </div>
            <div className="w-1/6 border-x-[2px] h-screen overflow-hidden flex justify-center bg-black">
              <div className="vertical-text2 font-[font1] text-[10vw] text-white ">
                MANIAC MANIAC MANIAC MANIAC MANIAC MANIAC MANIAC MANIAC MANIAC
                MANIAC MANIAC MANIAC
              </div>
            </div>
          </div>
          <div className="sticky top-0 left-0 h-screen z-50">
            <canvas ref={canvasRef2} className="h-screen w-full"></canvas>
          </div>

          <div
            ref={page1Ref}
            className="relative page1 w-screen h-[100vh] bg-gradient-to-b from-green-400 to-white"
          >
            <h1 className="absolute -top-30 left-0 font-[font7] text-[80vh] my-text span ">
              LIMITLESS
              <span className="ml-[20vw]">POWER</span>
            </h1>
            <p className="absolute bottom-5 left-1 font-[font8] text-[20vh] ">
              "Endless might"
            </p>
            <p
              className="absolute bottom-[50%] right-1 font-[font9] text-[20vh] "
              style={{ WebkitTextStroke: "3px white" }}
            >
              Infinite strength
            </p>
          </div>

          <div
            ref={page2Ref}
            className="relative page1 w-screen h-[100vh] bg-gradient-to-b from-pink-400 to-white"
          >
            <h1 className="absolute -top-30 left-1 font-[font7] text-[80vh]">
              SASS <span className="ml-[30vw]">POWER</span>
            </h1>
            <p className="absolute bottom-5 left-1 font-[font8] text-[20vh]">
              "Bold attitude"
            </p>
            <p
              className="absolute bottom-[50%] right-4 font-[font9] text-[20vh]"
              style={{ WebkitTextStroke: "3px white" }}
            >
              Fierce vibe
            </p>
          </div>

          <div
            ref={page3Ref}
            className="relative page1 w-screen h-[100vh] bg-gradient-to-b from-blue-400 to-white"
          >
            <h1 className="absolute -top-30 left-[10vw] font-[font7] text-[80vh]">
              SMILE<span className="ml-[30vw]">TEASE</span>
            </h1>
            <p className="absolute bottom-5 left-1 font-[font8] text-[20vh] ">
              "Playful smirk"
            </p>
            <p
              className="absolute bottom-[50%] right-7 font-[font9] text-[20vh]"
              style={{ WebkitTextStroke: "3px white" }}
            >
              Flirty fun
            </p>
          </div>

          <div
            ref={page4Ref}
            className="relative page1 w-screen h-[100vh] bg-gradient-to-b from-yellow-400 to-white"
          >
            <h1 className="absolute -top-30 left-[10vw] font-[font7] text-[80vh]">
              FUNNY <span className="ml-[20vw]">CHAOS</span>
            </h1>
            <p className="absolute bottom-5 left-1 font-[font8] text-[20vh]">
              "Wild laughter"
            </p>
            <p
              className="absolute bottom-[50%] right-1 font-[font9] text-[20vh]"
              style={{ WebkitTextStroke: "3px white" }}
            >
              Chaotic fun
            </p>
          </div>
        </div>
        <div className=" mainDiv relative  w-screen h-[100vh]  text-white  flex justify-center items-center">
          <div className=" avatars absolute z-30 w-[400px] h-[400px]  ">
            <img ref={imageRef} src="/avatars/CF-Avatar-01.png" alt="" />
          </div>
          <div className="absolute top-0 left-0 pl-4 w-1/2 h-full bg-amber-300 overflow-hidden ">
            <h1 className=" font-[font1] text-[20vh] bg-amber-300 ">AVA TAR</h1>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white  flex flex-col justify-end overflow-hidden ">
            <h1 className="font-[font1] w-full text-[20vh] text-yellow-300 text-right ">
              CYB FIC
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default CyberWhite;
