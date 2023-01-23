import { useTexts } from "../contexts/TextsContext";

const TextsList = () => {
  const { texts, deleteText, searchQuery } = useTexts();

  function deleteHandler(id) {
    deleteText(id);
  }

  return (
    <ul>
      {texts
        .filter((text) =>
          text.content.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((text) => (
          <li className="border px-4 py-2 mt-2 flex items-start" key={text.id}>
            <p className="mr-3">{text.content}</p>
            <button className="ml-auto" onClick={() => deleteHandler(text.id)}>
              ❌
            </button>
          </li>
        ))}
    </ul>
  );
};

export default TextsList;
