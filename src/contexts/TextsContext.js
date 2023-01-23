import {
  useContext,
  useState,
  useCallback,
  useEffect,
  createContext,
} from "react";
import axios from "axios";
import { TEXTS_URL } from "../constants";

const TextsContext = createContext();

export function useTexts() {
  return useContext(TextsContext);
}

export function TextsProvider({ children }) {
  const [texts, setTexts] = useState([]);
  const [showAddTextModal, setShowAddTextModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getTexts = async () => {
    const response = await axios.get(TEXTS_URL());
    const data = response.data;

    const loadedTexts = [];

    for (const key in data) {
      loadedTexts.push({ id: key, content: data[key].content });
    }

    return loadedTexts;
  };

  async function addText(text) {
    await axios.post(TEXTS_URL(), text);
    const loadedTexts = await getTexts();
    setTexts(loadedTexts);
  }

  async function deleteText(id) {
    await axios.delete(TEXTS_URL(id));
    const loadedTexts = await getTexts();
    setTexts(loadedTexts);
  }

  useEffect(() => {
    getTexts().then((loadedTexts) => setTexts(loadedTexts));
  }, []);

  const textsContextValue = {
    texts,
    getTexts,
    addText,
    deleteText,
    showAddTextModal,
    setShowAddTextModal,
    searchQuery,
    setSearchQuery,
  };

  return (
    <TextsContext.Provider value={textsContextValue}>
      {children}
    </TextsContext.Provider>
  );
}
