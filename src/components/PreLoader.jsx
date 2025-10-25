import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";

function PreLoader() {
  const cardRef1 = useRef(null);

  const cardRef3 = useRef(null);
  const loopingDiv = useRef(null);
  const loopingRef = useRef(null);

  useEffect(() => {
    const allCards = [cardRef1.current, cardRef3.current];
    const degreeTilt = 12;
    const scaleCard = 1;
    const easeCgi = { duration: 0.6, ease: "power3.out" };

    const mapRange = (v, a1, a2, b1, b2) =>
      ((v - a1) * (b2 - b1)) / (a2 - a1) + b1;

    const cleanupFns = [];

    allCards.forEach((card) => {
      if (!card) return;

      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const dx = x - rect.width / 2;
        const dy = y - rect.height / 2;

        gsap.to(card, {
          rotateY: mapRange(
            dx,
            -rect.width / 2,
            rect.width / 2,
            degreeTilt,
            -degreeTilt
          ),
          rotateX: mapRange(
            dy,
            -rect.height / 2,
            rect.height / 2,
            degreeTilt,
            -degreeTilt
          ),
          transformPerspective: 1200,
          transformOrigin: "center",
          ...easeCgi,
        });
      };

      const onEnter = () => {
        gsap.to(card, { scale: scaleCard, ...easeCgi });
      };

      const onLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          ...easeCgi,
        });
        card.style.transformStyle = "preserve-3d";
      };

      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerenter", onEnter);
      card.addEventListener("pointerleave", onLeave);

      cleanupFns.push(() => {
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerenter", onEnter);
        card.removeEventListener("pointerleave", onLeave);
      });
    });

    return () => cleanupFns.forEach((fn) => fn());
  }, []);

  useGSAP(() => {
    gsap.to("#looping", {
      attr: { startOffset: "-100%" },
      duration: 3,
      repeat: -1,
      ease: "linear",
    });

    const onMouseMove = (el) => {
      if (!loopingDiv.current || !loopingRef.current) return;
      let boundary = loopingDiv.current.getBoundingClientRect();
      const path = loopingRef.current.querySelector("#linePath");
      const baseBoundary = 150;
      const maxOffset = 300;
      const mouseY = el.clientY - boundary.top;

      const rawOffset = (mouseY - baseBoundary) * 30;
      const offset = Math.max(-maxOffset, Math.min(rawOffset, maxOffset));

      const newPath = `M 0 150 Q 800 ${baseBoundary + offset} 1600 150`;

      gsap.to(path, {
        attr: { d: newPath },
        duration: 0.5,
        ease: "power.out",
      });
    };
    const onMouseLeave = () => {
      if (!loopingRef.current) return;
      const path = loopingRef.current.querySelector("#linePath");
      gsap.to(path, {
        attr: { d: "M 0 150 Q 800 150 1600 150" },
        duration: 0.5,
        ease: "elastic.out(2,0.1)",
      });
    };
    loopingDiv.current.addEventListener("mousemove", onMouseMove);
    loopingDiv.current.addEventListener("mouseleave", onMouseLeave);
    return () => {
      loopingDiv.current.removeEventListener("mousemove", onMouseMove);
      loopingDiv.current.removeEventListener("mouseleave", onMouseLeave);
    };
  });
  return (
    <div
      className="relative top-0 left-0 flex w-screen h-screen bg-zinc-800 overflow-y-hidden"
      style={{ perspective: 1500 }}
    >
      <div className="absolute card_divs flex items-center justify-between gap-16 w-full h-full ">
        <div
          ref={cardRef1}
          className="cardMain h-[400px] w-[350px] ml-5 bg-[url('/avatars/01.avif')] bg-cover bg-center bg-no-repeat z-50"
        ></div>
        <div className="cardSecond h-[500px] w-[400px] bg-[url('/avatars/02.avif')] bg-cover bg-center  bg-no-repeat z-10 rounded-4xl"></div>
        <div
          ref={cardRef3}
          className="cardThird h-[400px] w-[350px] bg-[url('/avatars/03.avif')] bg-cover bg-center bg-no-repeat z-50 mr-5"
        ></div>
      </div>

      <div
        ref={loopingDiv}
        className=" relative top-[10vh] w-[1600px] h-[80vh] font-[font1] z-30  "
      >
        <svg
          ref={loopingRef}
          viewBox="0 0 1600 300"
          preserveAspectRatio="xMinYMid meet"
          className="w-full h-full absolute top-10"
        >
          <defs>
            <path id="linePath" d="M 0 150 Q 800 150 1600 150" />
          </defs>
          <text fontSize="13vh" fill="white" fontWeight="bold">
            <textPath
              id="looping"
              className="text"
              xlinkHref="#linePath"
              startOffset="0%"
            >
              SIMON SIMON SIMON SIMON SIMON SIMON SIMON SIMON SIMON SIMON SIMON
              SIMON SIMON SIMON SIMON SIMON SIMON SIMON SIMON SIMON SIMON
            </textPath>
          </text>
        </svg>
      </div>
      <Link to="/entrance">
        <button
          className="turn  absolute bottom-2 left-[45%] h-[150px] w-[150px]
         rounded-full border-8 border-white 
         bg-transparent text-white text-[490%]
         uppercase tracking-widest cursor-pointer 
         overflow-hidden 
          z-50 font-[font2] p-2
         
         "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
          >
            <g data-name="15.Arrow Down">
              <path d="M12 24a12 12 0 1 1 12-12 12.013 12.013 0 0 1-12 12zm0-22a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2z" />
              <path d="m12 18.414-4.707-4.707 1.414-1.414L12 15.586l3.293-3.293 1.414 1.414L12 18.414z" />
              <path d="M11 6h2v11h-2z" />
            </g>
          </svg>
        </button>
      </Link>
    </div>
  );
}

export default PreLoader;
