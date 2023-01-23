import { getClassNames } from "../helpers";

const TypingInput = ({ state, actions, inputRef, dispatch }) => {
  return (
    <div>
      <p className="focus:outline-blue-600 absolute px-8 py-3 h-96">
        {state.chars.map((char, i) => (
          <span
            className={`${getClassNames(
              i,
              state.currentIndex,
              state.isTyping,
              state.typedText,
              state.chars
            )} font-mono text-2xl`}
            key={i}
          >
            {char}
          </span>
        ))}
      </p>
      <div className="px-4 absolute w-full h-96">
        <input
          className="border w-full  bg-transparent text-transparent h-96 selection:bg-transparent"
          type="text"
          value={state.typedText}
          ref={inputRef}
          onChange={(event) =>
            dispatch({
              type: actions.TYPING,
              payload: { event },
            })
          }
          disabled={state.typingIsFinished}
        />
      </div>
    </div>
  );
};

export default TypingInput;
