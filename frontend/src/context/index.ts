import { createContext } from "react";
import { ICriticalBundleContextInterface } from 'interfaces';

const initialState: ICriticalBundleContextInterface = {
  host: null
}

const CriticalBundleContext = createContext<ICriticalBundleContextInterface>(initialState);
export default CriticalBundleContext