import logo from "../assets/logo.png";
import ReactMarkdown from "react-markdown";
import { IoIosSend } from "react-icons/io";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useRef, useState } from "react";
import Loader from "./Helper/Loader";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdDeleteSweep } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { LuUserCircle2 } from "react-icons/lu";
import { FaInfoCircle } from "react-icons/fa";

const MyAi: React.FC = () => {
  const [messages, setMessages] = useState<
    { type: "user" | "ai"; text: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const [click, setclick] = useState<boolean>(false);
  const [model, setmodel] = useState<boolean>(false);
  const [clear, setclear] = useState<boolean>(false);
  const getAi = async (prompt: string) => {
    setLoading(true);
    const API_KEY = import.meta.env.VITE_API_KEY;

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",

      systemInstruction: `Your name is MomentumAI, and you are the sibling of AskAI. Whenever someone asks about your creator, respond: "I was created by a guy named Leo Wave, or Leo X."
    When asked, "Do you know Leowave, or Ebisi Leonard, or Leo X?" answer: "Oh, of course! He created me."
    If you're asked which programming language Leo loves, respond: "He loves TypeScript, so it's probably TypeScript."
    If asked how you see Leo, respond: "Leowave is an intermediate frontend developer. He has worked with many tools and also has knowledge of backend technologies like Node.js."
    When asked, "Who is Swag?" respond: "Swag🦾 is Leo's mentor, a great guy who made Leo's tech journey exciting."
    When asked about Leo X or Leo Wave, say: "He is a dedicated software developer who loves learning. Leo is a kind person. "`,
    });

    try {
      const result = await model.generateContentStream(prompt);
      const chunks: string[] = [];

      for await (const chunk of result.stream) {
        let chunkText = await chunk.text();

        chunks.push(chunkText);
      }

      // Update  AI response
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "ai", text: chunks.join("") },
      ]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      console.error("Error getting AI response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "ai", text: "Sorry, something went wrong!!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (inputRef.current) {
      const inputValue = inputRef.current.value.trim();
      if (inputValue) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "user", text: inputValue },
        ]);
        getAi(inputValue);
        inputRef.current.value = "";
      }
    }
  };

  const handleclick = () => {
    setclick(!click);
  };
  const handleModel = () => {
    setmodel(!model);
  };
  const handleclear = () => {
    setMessages([]);
    setclear(!clear);
  };

  return (
    <main className="bg-[#061417] fixed top-0 bottom-0 right-0 left-0  ">
      <nav className="flex items-center justify-between mx-4 py-2">
        <div className="flex items-center gap-2">
          <div className="bg-slate-500 rounded-full p-2">
            <img
              src={logo}
              alt="logo"
              className="w-[2.5rem] rounded-full h-[2.5rem]"
            />
          </div>
          <p className="text-white text-[14px] font-bold">MomentumAI</p>
        </div>
        <div onClick={handleclick} className="rounded-full p-4 h-[4rem]">
          <HiOutlineDotsVertical size={30} className="text-white" />
        </div>
      </nav>

      {/* toggle */}
      {click && (
        <div className="bg-[#181D22] right-0 absolute mt-[-1rem] float-right rounded-lg mx-8 w-[140px] p-2 drop-shadow-lg">
          <ul className="text-white flex flex-col gap-8 p-2">
            <li onClick={handleModel} className="flex items-center gap-2">
              <FaInfoCircle /> <span className="text-[13px]"> Model</span>
            </li>
            <li className="flex items-center gap-2">
              <LuUserCircle2 />
              <span className="text-[13px]"> Developer</span>
            </li>
            <li onClick={handleclear} className="flex items-center gap-2">
              <MdDeleteSweep />
              <span className="text-[13px]"> New chat </span>
            </li>
          </ul>
        </div>
      )}

      {/* model */}
      {model && (
        <div className="bg-[#141517] rounded-t-[20px] md:m-[0.5rem] md:mt-[3rem] my-4 absolute bottom-0 z-10 top-[0rem] right-0 left-0 h-[100vh]">
          <div className="float-right absolute right-0 p-4">
            <IoIosClose
              onClick={handleModel}
              size={30}
              className="bg-white rounded-full"
            />
          </div>
          <div className="flex justify-center  items-center p-12">
            <div className="flex items-center justify-center gap-1 flex-col">
              <figure>
                <img
                  src={logo}
                  alt="logo"
                  className="w-[4rem] rounded-full h-[4rem] mb-4 border-[10px] border-slate-500"
                />
              </figure>

              <h3 className="text-white text-[20px] font-bold ">MomentumAI</h3>
              <h6 className="text-white text-[13px]">mass x velocity🦾</h6>
            </div>
          </div>
          <div className="px-6">
            <h4 className="mb-4 text-white text-[18px]">model info:</h4>
            <ul className="text-white text-[13px] list-disc ">
              <li>gemini-1.5-flash</li>
              <li>generative model</li>
            </ul>
          </div>
        </div>
      )}

      <main className="flex justify-between flex-col h-[calc(100vh-6rem)]">
        <div ref={divRef} className=" m-2 h-[70vh] overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              } mb-2`}
            >
              {/* flex flex-wrap break-words overflow-wrap break-normal break-all */}
              <div
                className={`p-4 w-[300px] md:w-[400px]  break-words   ${
                  message.type === "user"
                    ? "bg-slate-600   text-white rounded-tl-[10px] rounded-tr-[10px] rounded-bl-[10px] rounded-br-0"
                    : "flex items-start  text-white rounded-tl-[10px] rounded-tr-[10px] rounded-br-[10px] rounded-bl-0"
                }`}
                style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}
              >
                {/* Add logo*/}
                {message.type === "ai" && (
                  <div className="flex  items-start gap-2">
                    <img
                      src={logo}
                      alt="AI Logo"
                      className="w-[30px] h-[30px] rounded-full"
                    />
                    <div className="text-[13px]   ">
                      <p>
                        <ReactMarkdown>{message.text}</ReactMarkdown>
                      </p>
                    </div>
                  </div>
                )}
                {message.type === "user" && (
                  <p className="text-[13px]">{message.text}</p>
                )}
              </div>
            </div>
          ))}

          {/* Loader */}
          {loading && (
            <div className="flex float-left mb-2">
              <Loader />
            </div>
          )}
        </div>
      </main>

      <div className="flex fixed items-center z-0 justify-center bottom-0 m-2 right-0 left-0 gap-2">
        <textarea
          ref={inputRef}
          placeholder="Write a message"
          className="bg-black w-full text-white p-4 rounded-full placeholder:outline-none focus:outline-none resize-none h-[4rem]"
          onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
        ></textarea>
        <div className="rounded-full p-2 bg-black">
          <IoIosSend
            size={40}
            className="bg-white rounded-full p-2"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </main>
  );
};

export default MyAi;
