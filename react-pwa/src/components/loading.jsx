import logo from "@/assets/logo-main.png";

const Loading = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-primary/5">
      <div className="relative">
        <img
          src={logo}
          alt="WA-Health"
          className="h-24 w-auto object-contain drop-shadow-lg mb-4"
        />
        <div className="absolute bottom-0 h-1 w-full overflow-hidden rounded-full bg-primary/20">
          <div className="animate-loading-bar h-full w-1/3 rounded-full bg-primary"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
