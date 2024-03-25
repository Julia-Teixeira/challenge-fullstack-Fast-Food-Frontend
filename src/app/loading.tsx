const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full overflow-auto bg-white ">
      <div className="flex items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-green-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
