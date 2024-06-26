import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  registerSingleResult,
  registerMultipleResults,
  Resultat,
  Deltager,
  Disciplin,
  getDeltagerById,
} from "../api/api";

const initialResult: Resultat = {
  id: 0,
  formattedResult: "",
  dato: new Date().toISOString().split("T")[0],
  deltager: { id: 0, name: "" } as Deltager,
  disciplin: { id: 0, navn: "" } as Disciplin,
};

export function RegisterResultForm() {
  const [isMultiple, setIsMultiple] = useState(false);
  const [singleResult, setSingleResult] = useState<Resultat>(initialResult);
  const [multipleResults, setMultipleResults] = useState<Resultat[]>([
    { ...initialResult },
  ]);

  const navigate = useNavigate();

  const handleSingleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSingleResult((prevState) => ({
      ...prevState,
      [name]: value,
      deltager:
        name === "deltager"
          ? { ...prevState.deltager, id: parseInt(value, 10) }
          : prevState.deltager,
      disciplin:
        name === "disciplin"
          ? { ...prevState.disciplin, id: parseInt(value, 10) }
          : prevState.disciplin,
    }));
  };

  const handleMultipleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setMultipleResults((prevResults) => {
      const newResults = [...prevResults];
      newResults[index] = {
        ...newResults[index],
        [name]: value,
        deltager:
          name === "deltager"
            ? { ...newResults[index].deltager, id: parseInt(value, 10) }
            : newResults[index].deltager,
        disciplin:
          name === "disciplin"
            ? { ...newResults[index].disciplin, id: parseInt(value, 10) }
            : newResults[index].disciplin,
      };
      return newResults;
    });
  };

  const addNewResultField = () => {
    setMultipleResults((prevResults) => [...prevResults, { ...initialResult }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isMultiple) {
        const formattedMultipleResults = multipleResults.map((result) => ({
          ...result,
          deltager: {
            id: result.deltager.id
              ? parseInt(result.deltager.id.toString(), 10)
              : 0,
          },
          disciplin: {
            id: result.disciplin.id
              ? parseInt(result.disciplin.id.toString(), 10)
              : 0,
          },
          // Ensure `resultatType` and `resultatVaerdi` are present
          resultatType: result.resultatType || "Point",
          resultatVaerdi: result.resultatVaerdi || result.formattedResult,
        }));
        console.log("Registering multiple results:", formattedMultipleResults);
        await registerMultipleResults(formattedMultipleResults);
      } else {
        const resultatDeltager = await getDeltagerById(
          singleResult.deltager.id
        );
        console.log("Deltager:", resultatDeltager);

        const resultatDisciplin: Disciplin | undefined =
          resultatDeltager.discipliner.find(
            (d) => d.id === singleResult.disciplin.id
          );
        console.log("Disciplin:", resultatDisciplin.resultatType);

        const formattedSingleResult = {
          ...singleResult,
          deltager: {
            id: singleResult.deltager.id
              ? parseInt(singleResult.deltager.id.toString(), 10)
              : 0,
          },
          disciplin: {
            id: singleResult.disciplin.id
              ? parseInt(singleResult.disciplin.id.toString(), 10)
              : 0,
          },
          // Ensure `resultatType` and `resultatVaerdi` are present
          resultatType: resultatDisciplin.resultatType,
          resultatVaerdi:
            singleResult.resultatVaerdi || singleResult.formattedResult,
        };
        console.log("Registering single result:", formattedSingleResult);

        await registerSingleResult(formattedSingleResult);
      }
      navigate("/deltager");
    } catch (error: any) {
      console.error("Failed to register result(s):", error);

      if (error.response) {
        // Attempt to parse JSON response
        try {
          const jsonResponse = await error.response.json();
          alert(
            `Failed to register result(s): ${
              jsonResponse.message || JSON.stringify(jsonResponse)
            }`
          );
        } catch (parseError) {
          // If parsing fails, show raw response
          alert(`Failed to register result(s): ${error.response.data}`);
        }
      } else if (error.request) {
        alert("No response received from the server.");
      } else {
        alert(`Failed to register result(s): ${error.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Register Result
        </h1>
        <div className="mb-4 flex justify-center">
          <label className="mr-4">
            <input
              type="radio"
              name="resultType"
              checked={!isMultiple}
              onChange={() => setIsMultiple(false)}
            />
            Enkelt Resultat
          </label>
          <label>
            <input
              type="radio"
              name="resultType"
              checked={isMultiple}
              onChange={() => setIsMultiple(true)}
            />
            Flere Resultater
          </label>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          {isMultiple ? (
            multipleResults.map((result, index) => (
              <div key={index} className="mb-4">
                <h2 className="text-xl font-bold mb-2">Resultat {index + 1}</h2>
                <input
                  type="text"
                  name="formattedResult"
                  value={result.formattedResult}
                  onChange={(e) => handleMultipleChange(index, e)}
                  placeholder="Result"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                />
                <input
                  type="date"
                  name="dato"
                  value={result.dato}
                  onChange={(e) => handleMultipleChange(index, e)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                />
                <input
                  type="number"
                  name="deltager"
                  value={result.deltager.id}
                  onChange={(e) => handleMultipleChange(index, e)}
                  placeholder="Participant ID"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                />
                <input
                  type="number"
                  name="disciplin"
                  value={result.disciplin.id}
                  onChange={(e) => handleMultipleChange(index, e)}
                  placeholder="Discipline ID"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                />
              </div>
            ))
          ) : (
            <div>
              <input
                type="text"
                name="formattedResult"
                value={singleResult.formattedResult}
                onChange={handleSingleChange}
                placeholder="Result"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
              />
              <input
                type="date"
                name="dato"
                value={singleResult.dato}
                onChange={handleSingleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
              />
              <input
                type="number"
                name="deltager"
                value={singleResult.deltager.id}
                onChange={(e) =>
                  setSingleResult((prevState) => ({
                    ...prevState,
                    deltager: {
                      ...prevState.deltager,
                      id: parseInt(e.target.value, 10),
                    },
                  }))
                }
                placeholder="Participant ID"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
              />
              <input
                type="number"
                name="disciplin"
                value={singleResult.disciplin.id}
                onChange={(e) =>
                  setSingleResult((prevState) => ({
                    ...prevState,
                    disciplin: {
                      ...prevState.disciplin,
                      id: parseInt(e.target.value, 10),
                    },
                  }))
                }
                placeholder="Discipline ID"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
              />
            </div>
          )}
          {isMultiple && (
            <button
              type="button"
              onClick={addNewResultField}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
            >
              Add Another Result
            </button>
          )}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register Result
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterResultForm;
