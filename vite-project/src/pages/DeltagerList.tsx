import { useState, useEffect } from "react";
import { getDeltagerList, Deltager } from "../api/api";

export default function DeltagerList() {
  const [deltagerlist, setDeltagerlist] = useState<Deltager[]>([]);

  useEffect(() => {
    getDeltagerList().then((data) => {
      console.log(data);
      setDeltagerlist(data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Deltager oversigt
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Navn
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Alder
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Køn
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Medlemsklub
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Discipliner
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Resultater
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {deltagerlist.map((deltager) => (
                <tr key={deltager.id} className="border-t border-gray-200">
                  <td className="py-3 px-4">{deltager.name}</td>
                  <td className="py-3 px-4">{deltager.alder}</td>
                  <td className="py-3 px-4">{deltager.kon}</td>
                  <td className="py-3 px-4">{deltager.klub}</td>
                  <td className="py-3 px-4">
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {deltager.discipliner.map((disciplin, index) => (
                        <li
                          key={`${disciplin.id}-${index}`}
                          className="text-gray-700"
                        >
                          {disciplin.navn} - {disciplin.resultatType}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-3 px-4">
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {deltager.resultater.map((resultat, index) => (
                        <li
                          key={`${resultat.id}-${index}`}
                          className="text-gray-700"
                        >
                          {resultat.formattedResult} (Dato:{" "}
                          {new Date(resultat.dato).toLocaleDateString()})
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
