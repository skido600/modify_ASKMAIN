import { IoIosSend } from "react-icons/io";
import { RefObject } from "react";
interface ModelProps {
  handleSubmit: () => void;
  inputRef: RefObject<HTMLTextAreaElement>;
}
function Sender({ handleSubmit, inputRef }: ModelProps) {
  return (
    <div className="flex fixed items-center z-0 justify-center bottom-0 m-2 right-0 left-0 gap-2">
      <textarea
        ref={inputRef}
        placeholder="Write a message"
        className="bg-black w-full text-white p-4 rounded-lg placeholder:outline-none focus:outline-none resize-none h-[4rem]"
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
  );
}

export default Sender;
