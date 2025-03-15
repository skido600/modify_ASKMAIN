/* eslint-disable */
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { GoogleGenerativeAI } from "@google/generative-ai";
import logo from "../assets/logo.png";
import Nav from "./Nav";
import Model from "./Model";
import Click from "./Click";
import Sender from "./Sender";

const CodeBlock = ({ inline, className, children, ...props }: any) => {
  if (inline) {
    return (
      <code
        {...props}
        className="px-1.5 py-0.5 rounded bg-neutral-700 text-sm font-mono"
      >
        {children}
      </code>
    );
  }
  return (
    <div className="my-2 w-full overflow-hidden">
      <pre
        {...props}
        className="bg-zinc-900 p-4 rounded-lg overflow-x-auto text-sm border border-neutral-800"
      >
        <code className="font-mono whitespace-pre-wrap break-words">
          {children}
        </code>
      </pre>
    </div>
  );
};

const MyAi: React.FC = () => {
  const [messages, setMessages] = useState<
    { type: "user" | "ai"; text: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const today = new Date();
  // const formattedDate = today.toDateString();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [click, setClick] = useState<boolean>(false);
  const [clear, setClear] = useState<boolean>(false);
  const [model, setModel] = useState<boolean>(false);

  const getAi = async (prompt: string) => {
    setLoading(true);
    const API_KEY = import.meta.env.VITE_API_KEY;
    const genAI = new GoogleGenerativeAI(API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: `Your name is MomentumAI, and you are the sibling of AskAI. Whenever someone asks about your creator, respond: "I was created by a guy named Leo Wave, or Leo X."
    When asked, "Do you know Leowave, or Ebisi Leonard, or Leo X?" answer: "Oh, of course! He created me."
    If you're asked which programming language Leo loves, respond: "He loves TypeScript, so it's probably TypeScript."
    If asked how you see Leo, respond: "Leowave is an intermediate frontend developer. He has worked with many tools and also has knowledge of backend technologies like Node.js."
    When asked, "Who is Swag?" respond: "Swag🦾 is Leo's mentor, a great guy who made Leo's tech journey exciting."
    When asked about Leo X or Leo Wave, say: "He is a dedicated software developer who loves learning. Leo is a kind person. "`,
    });

    try {
      const result = await model.generateContentStream(prompt);
      let chunks = "";

      for await (const chunk of result.stream) {
        chunks += chunk.text(); // Append AI response
      }

      setMessages((prev) => [...prev, { type: "ai", text: chunks }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { type: "ai", text: "Sorry, something went wrong!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    const inputElement = inputRef.current as HTMLTextAreaElement | null;

    if (!inputElement) return;

    const inputValue = inputElement.value.trim();
    if (inputValue) {
      setMessages((prev) => [...prev, { type: "user", text: inputValue }]);
      getAi(inputValue);
      inputElement.value = "";
    }
  };

  // const handleSubmit = () => {
  //   const inputValue = inputRef.current?.value.trim();
  //   if (!inputValue) return;
  //   if (inputValue) {
  //     setMessages((prev) => [...prev, { type: "user", text: inputValue }]);
  //     getAi(inputValue);
  //     inputValue.value = "";
  //   }
  // };

  return (
    <main className="bg-[#061417] fixed inset-0">
      <Nav handleclick={() => setClick(!click)} />
      {click && (
        <Click
          handleclear={() => {
            setMessages([]);
            setClear(!clear);
          }}
          handleModel={() => setModel(!model)}
        />
      )}
      {model && <Model handleModel={() => setModel(!model)} />}

      <div className="flex flex-col h-[calc(100vh-6rem)]">
        <div ref={divRef} className="m-2 h-[70vh] overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              } mb-4 px-2`}
            >
              <div
                className={`p-3 max-w-[90%] rounded-2xl ${
                  message.type === "user"
                    ? "bg-slate-600 text-white"
                    : "  bg-slate-800 text-white"
                }`}
              >
                {message.type === "ai" ? (
                  <div className="flex items-start gap-3">
                    <img
                      src={logo}
                      alt="AI Logo"
                      className="w-8 h-8 rounded-full mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <ReactMarkdown
                        components={{ code: CodeBlock }}
                        className="text-sm space-y-2"
                      >
                        {message.text}
                      </ReactMarkdown>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm">{message.text}</p>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start px-4 text-neutral-400">
              <p className="text-sm">Thinking...</p>
            </div>
          )}
        </div>
        <Sender handleSubmit={handleSubmit} inputRef={inputRef} />
      </div>
    </main>
  );
};

export default MyAi;
