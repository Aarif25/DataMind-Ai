import { createContext, useState } from "react";

export const AppContext = createContext();

function AppProvider({ children }) {

    const [dataset, setDataset] = useState(null);

    const [summary, setSummary] = useState(null);

    const [training, setTraining] = useState(null);

    const [prediction, setPrediction] = useState(null);

    const [report, setReport] = useState(null);

    return (

        <AppContext.Provider

            value={{

                dataset,
                setDataset,

                summary,
                setSummary,

                training,
                setTraining,

                prediction,
                setPrediction,

                report,
                setReport

            }}

        >

            {children}

        </AppContext.Provider>

    );

}

export default AppProvider;