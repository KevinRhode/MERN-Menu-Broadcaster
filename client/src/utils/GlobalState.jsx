import { createContext, useContext, useReducer } from "react";
import { reducer } from './reducers'

const contentContext = createContext();
const { Provider } = contentContext;

const ContentProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    tasks: [],   
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useContentContext = () => {
  return useContext(contentContext);
};

export { ContentProvider, useContentContext };
