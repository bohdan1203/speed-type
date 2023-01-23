import { Fragment, useState } from "react";

import { useTexts } from "../contexts/TextsContext";

const AddText = () => {
  const [newText, setNewText] = useState("");

  const { addText, setShowAddTextModal } = useTexts();

  function newTextChangeHandler(event) {
    setNewText(event.target.value);
  }

  async function submitHandler(event) {
    event.preventDefault();
    addText({ content: newText });
    setShowAddTextModal(false);
  }

  return (
    <Fragment>
      <div
        className="fixed bg-black opacity-75 w-full h-screen inset-0 z-10"
        onClick={() => setShowAddTextModal(false)}
      ></div>
      <form
        className="fixed z-20 top-1/2 left-1/2  px-5 py-3 bg-white rounded -translate-x-1/2 -translate-y-1/2"
        onSubmit={submitHandler}
      >
        <h1>Add New Text</h1>
        <textarea
          className="border w-96 h-64 resize-none px-2 py-1"
          placeholder="Enter Text..."
          value={newText}
          onChange={newTextChangeHandler}
        ></textarea>
        <div className="flex justify-between">
          <button className="border" type="submit">
            Add New Text
          </button>

          <button
            className="border"
            type="button"
            onClick={() => setShowAddTextModal(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default AddText;
