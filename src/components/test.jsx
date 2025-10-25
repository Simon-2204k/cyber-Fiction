// import { useGSAP } from "@gsap/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { use, useEffect, useRef } from "react";

const App = () => {
  const parentRef2 = useRef();
  const canvasRef2 = useRef();
  const page1Ref = useRef();
  const page2Ref = useRef();
  const page3Ref = useRef();
  const page4Ref = useRef();
  const imgeRef = useRef();
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
        // console.log(imageUrl);

        let imgDiv = new Image();
        imgDiv.src = imageUrl;
        // console.log(imgDiv);
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
          invalidateOnRefresh: true, // ensures resizing doesn't break
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
  });
  // useEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);

  //   const imagesCount = 28; // total images
  //   const frameObj = { frame: 1 }; // dummy object

  //   gsap.to(frameObj, {
  //     frame: imagesCount - 1,
  //     snap: "frame",
  //     ease: "none",
  //     scrollTrigger: {
  //       trigger: parentRef2.current,
  //       start: "top top",
  //       end: "bottom bottom",
  //       pin: true,
  //       scrub: 1,
  //       markers: true,
  //     },
  //     onUpdate: () => {
  //       const index = Math.floor(frameObj.frame).toString().padStart(4, "0");
  //       imgeRef.current.src = `/photo_bg/mangapanels${index}.jpeg`;
  //     },
  //   });
  // }, []);
  useGSAP(() => {
    gsap.to(imgeRef.current, {
      scrollTrigger: {
        trigger: imgeRef.current,
        pin: true,
        start: "top top",
        endTrigger: page4Ref.current,
        end: "top bottom ",
        scrub: 2,
        // markers: true,
      },
    });
  });
  return (
    <>
      <div className=" relative h-screen w-full bg-zinc-200 ">
        <div ref={parentRef2} className="relative top-0 left-0  w-full  ">
          <div className="absolute h-screen w-screen z-30  overflow-x-hidden">
            <img
              ref={imgeRef}
              src="/photo_bg/mangapanels0001.jpeg"
              alt=""
              className="w-full h-full object-cover object-center "
            />
          </div>
          <div className="sticky top-0 left-0 h-screen z-50">
            {" "}
            <canvas ref={canvasRef2} className="h-screen w-full"></canvas>
          </div>

          <div
            ref={page1Ref}
            className=" relative page1 w-screen h-screen bg-green-200"
          >
            page1
          </div>
          <div
            ref={page2Ref}
            className="relative page2 w-screen h-screen bg-red-200"
          >
            page2
          </div>
          <div
            ref={page3Ref}
            className=" relative page3 w-screen h-screen bg-blue-200"
          >
            page3
          </div>
          <div
            ref={page4Ref}
            className="relative page4 w-screen h-screen bg-fuchsia-200"
          >
            page4
          </div>
        </div>
        <div className="w-screen h-screen bg-amber-300"></div>
      </div>
    </>
  );
};

export default App;
