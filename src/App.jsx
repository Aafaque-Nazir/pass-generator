import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [nums, setNums] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (nums) str += "0123456789";
    if (char) str += "!@#$%&";

    for (let i = 1; i <= length; i++) {
      let characters = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(characters);
    }
    setPassword(pass);
  }, [length, nums, char, setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passwordRef = useRef();

  useEffect(() => {
    passwordGenerator();
  }, [length, nums, char, passwordGenerator]);

  return (
    <>
      <div className=" text-centerw-full max-w-xl  rounded-xl mx-auto px-6 my-10 bg-gray-600 ">
        <h1 className="text-center text-white text-2xl font-semibold ">
          Password Generator
        </h1>
        <div className="flex gap-2  rounded-2xl p-6 overflow-hidden my-2 ">
          <input
            className="  flex items-center justify-center outline-none w-full p-2  bg-white rounded "
            type="text"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPassword}
            className=" bg-blue-500 rounded  px-2 text-white cursor-pointer  shrink-0 hover:bg-blue-600 active:scale-105 active:bg-blue-700 focus:ring-1 focus:ring-blue-500"
          >
            COPY
          </button>
        </div>
        <div className="text-sm flex gap-x-3 justify-around ">
          <div className="flex item-center gap-x-2 overflow-hidden mb-5">
            <input
              type="range"
              min={8}
              max={16}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="length">Length:{length}</label>
            <input
              type="checkbox"
              onChange={() => {
                setNums((prev) => !prev);
                id: "num";
              }}
            />
            <label htmlFor="num">Numbers</label>
            <input
              type="checkbox"
              onChange={() => {
                setChar((prev) => !prev);
                id: "splchar";
              }}
            />
            <label htmlFor="splchar">Spl Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
