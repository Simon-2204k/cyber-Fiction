const PageSize = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-6">
        Welcome!
      </h1>
      <p className="text-lg md:text-xl lg:text-2xl text-center max-w-3xl leading-relaxed">
        This website is optimized for larger screens and above. On smaller
        devices, some features may not function properly, and the layout may not
        appear as intended. For the best experience, please visit from a desktop
        or large tablet.
      </p>
    </div>
  );
};

export default PageSize;
