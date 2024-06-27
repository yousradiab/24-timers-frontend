import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  registerSingleResult,
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
  const [singleResult, setSingleResult] = useState<Resultat>(initialResult);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      {
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
    } catch (error) {
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

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
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
