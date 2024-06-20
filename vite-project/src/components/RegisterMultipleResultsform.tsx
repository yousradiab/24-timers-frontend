import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerMultipleResults, Resultat } from "../api/api";

export function RegisterMultipleResultsForm() {
  const [results, setResults] = useState<Resultat[]>([
    {
      id: 0,
      formattedResult: "",
      dato: new Date().toISOString().split("T")[0],
      deltager: { id: 0 },
      disciplin: { id: 0 },
    },
  ]);

  const navigate = useNavigate();

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedResults = [...results];
    updatedResults[index] = {
      ...updatedResults[index],
      [name]: value,
    };
    setResults(updatedResults);
  };

  const addResultField = () => {
    setResults([
      ...results,
      {
        id: 0,
        formattedResult: "",
        dato: new Date().toISOString().split("T")[0],
        deltager: { id: 0 },
        disciplin: { id: 0 },
      },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerMultipleResults(results);
      navigate("/deltager");
    } catch (error) {
      console.error("Failed to register results:", error);
      alert("Failed to register results. Check the console for more details.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Register Multiple Results
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          {results.map((result, index) => (
            <div key={index} className="mb-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor={`formattedResult-${index}`}
                >
                  Result
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`formattedResult-${index}`}
                  type="text"
                  name="formattedResult"
                  value={result.formattedResult}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor={`dato-${index}`}
                >
                  Date
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`dato-${index}`}
                  type="date"
                  name="dato"
                  value={result.dato}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor={`deltager-${index}`}
                >
                  Participant ID
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`deltager-${index}`}
                  type="number"
                  name="deltager"
                  value={result.deltager.id}
                  onChange={(e) => {
                    const updatedResults = [...results];
                    updatedResults[index] = {
                      ...updatedResults[index],
                      deltager: { id: parseInt(e.target.value) },
                    };
                    setResults(updatedResults);
                  }}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor={`disciplin-${index}`}
                >
                  Discipline ID
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`disciplin-${index}`}
                  type="number"
                  name="disciplin"
                  value={result.disciplin.id}
                  onChange={(e) => {
                    const updatedResults = [...results];
                    updatedResults[index] = {
                      ...updatedResults[index],
                      disciplin: { id: parseInt(e.target.value) },
                    };
                    setResults(updatedResults);
                  }}
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addResultField}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
          >
            Add Another Result
          </button>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register Results
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterMultipleResultsForm;
