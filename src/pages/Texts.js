import { useTexts } from "../contexts/TextsContext";

import TextsList from "../components/TextsList";
import AddText from "../components/AddText";
import SearchBar from "../components/SearchBar";

const Texts = () => {
  const { showAddTextModal, setShowAddTextModal } = useTexts();

  return (
    <div className="px-4 py-2">
      <div className="mt-2 flex justify-between">
        <SearchBar />
        <button className="border" onClick={() => setShowAddTextModal(true)}>
          Add New Text
        </button>
      </div>
      <TextsList />

      {showAddTextModal && <AddText />}
    </div>
  );
};

export default Texts;
