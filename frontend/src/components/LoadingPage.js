const LoadingPage = () => {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <div className="animate-spin rounded-full border-4 border-t-4 border-t-blue-400 w-16 h-16 mb-8"></div>
        <h1 className="text-3xl font-bold">Loading, please wait...</h1>
      </div>
    );
  };
  
  export default LoadingPage;
  