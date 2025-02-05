import { useEffect, useState } from "react";
import { getUser } from "./api/userApi";
import { userClick } from "./api/clickerApi";
import { Toaster, toast } from "react-hot-toast";

const App = () => {
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [counter, setCounter] = useState(0);
  const [points, setPoints] = useState(0);
  const [prizes, setPrizes] = useState(0);
  const [reward, setReward] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") || false
  );
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      getUser(userId)
        .then((res) => {
          setCounter(res.totalClicks);
          setPrizes(res.prizesWon);
          setPoints(res.totalPoints);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [isLoggedIn, userId]);

  useEffect(() => {
    if (reward.length) {
      toast.success(reward);
    }
  }, [reward]);

  const handleClick = () => {
    setIsClicked(true);
    userClick(userId)
      .then((res) => {
        setCounter(res.totalClicks);
        setPoints(res.totalPoints);
        setPrizes(res.prizesWon);
        setReward(res.reward);
      })
      .catch((err) => console.error(err))
      .finally(() => setTimeout(() => setIsClicked(false), 200));
  };
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("userId", userId);
    localStorage.setItem("isLoggedIn", true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId("");
    localStorage.clear();
  };
  return (
    <>
      <Toaster />
      <header className="bg-slate-700 border-b border-gray-700 fixed w-full top-0 z-40 backdrop-blur-lg bg-slate-100/80 text-white">
        {isLoggedIn && (
          <div className="mx-auto px-4 h-16 flex items-center justify-between">
            <span className="font-semibold">{userId.toUpperCase()}</span>
            <button
              className="cursor-pointer min-w-fit rounded-lg hover:bg-slate-800/20 px-4 py-2 hover:ring ring-gray-800"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </header>
      <div className="flex items-center justify-center min-h-screen bg-gray-900/80 p-4">
        {!isLoggedIn ? (
          <div className="min-w-md flex flex-col bg-white p-6 rounded-lg shadow-lg text-center w-80">
            <h1 className="text-2xl font-bold mb-4">Enter Your Username</h1>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Username"
              className="w-full p-2 border rounded-md mb-4"
            />
            <button
              onClick={handleLogin}
              disabled={!userId}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-75 disabled:hover:bg-blue-500 cursor-pointer"
            >
              Start
            </button>
          </div>
        ) : (
          <div className="bg-white min-w-md flex flex-col items-center gap-2 p-6 rounded-lg shadow-lg text-center w-80">
            <h1 className="text-5xl font-bold mb-4">Clicker</h1>
            <p className="text-lg">
              Total Clicks: <span className="font-bold">{counter}</span>
            </p>
            <p className="text-lg">
              Total Points: <span className="font-bold">{points}</span>
            </p>
            <p className="text-lg">
              Prizes Won: <span className="font-bold">{prizes}</span>
            </p>
            <button
              onClick={handleClick}
              className={`flex items-center gap-2 bg-blue-500 max-w-fit text-white px-4 py-2 rounded-md mt-4 transform transition duration-150 ease-in-out cursor-pointer ${
                isClicked ? "scale-90" : "hover:bg-blue-600"
              }`}
            >
              <img
                src="/cookie.svg"
                alt="cookie"
                className={`size-10 ${isClicked ? "animate-spin" : ""}`}
              />
              Click Me!
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
