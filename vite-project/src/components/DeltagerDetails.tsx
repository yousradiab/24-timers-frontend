import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDeltagerById, Deltager } from "../api/api";

export default function DeltagerDetails() {
  const { id } = useParams<{ id: string }>();
  const [deltager, setDeltager] = useState<Deltager | null>(null);

  useEffect(() => {
    getDeltagerById(Number(id)).then((data) => {
      setDeltager(data);
    });
  }, [id]);

  if (!deltager) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Deltager Detaljer
        </h1>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <p>Navn: {deltager.name}</p>
          <p>Køn: {deltager.kon}</p>
          <p>Alder: {deltager.alder}</p>
          <p>Medlemsklub: {deltager.klub}</p>
          <h3 className="text-md font-semibold mb-1 text-gray-700">
            Discipliner
          </h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            {deltager.discipliner.map((disciplin) => (
              <li key={disciplin.id} className="text-gray-700">
                {disciplin.navn} - {disciplin.resultatType}
              </li>
            ))}
          </ul>
          <h3 className="text-md font-semibold mb-1 text-gray-700">
            Resultater
          </h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            {deltager.resultater.map((resultat) => (
              <li key={resultat.id} className="text-gray-700">
                {resultat.formattedResult} (Dato:{" "}
                {new Date(resultat.dato).toLocaleDateString()})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
