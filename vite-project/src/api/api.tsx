import { makeOptions, handleHttpErrors } from "./fetchUtils";

const endpoint = "http://localhost:8080";
const deltagerURL = `${endpoint}/deltager`;
const createDeltagerURL = `${endpoint}/createdeltager`;

export interface Disciplin {
  id: number;
  navn: string;
  resultatType: string;
}

export interface Resultat {
  id: number;
  resultatType: string;
  dato: Date;
  resultatVaerdi: string;
  formattedResult: string;
}

export interface Deltager {
  id: number;
  name: string;
  kon: string;
  alder: number;
  klub: string;
  discipliner: Disciplin[];
  resultater: Resultat[];
}
async function getDeltagerList() {
  const response = await fetch(deltagerURL);
  return response.json();
}

async function getDeltagerById(id: number) {
  const response = await fetch(`${deltagerURL}/${id}`);
  return response.json();
}
async function createDeltager(deltager: Deltager) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deltager),
  };
  try {
    const response = await fetch(createDeltagerURL, options);
    if (!response.ok) {
      const errorDetail = await response.json();
      throw new Error(
        `HTTP error! status: ${response.status}, details: ${JSON.stringify(
          errorDetail
        )}`
      );
    }
    return response.json();
  } catch (error) {
    console.error("Error creating deltager:", error);
    throw error;
  }
}
async function updateDeltager(deltager: Deltager) {
  const options = makeOptions("PUT", deltager);
  return fetch(`${deltagerURL}/${deltager.id}`, options).then(handleHttpErrors);
}

export { getDeltagerList, getDeltagerById, createDeltager, updateDeltager };
