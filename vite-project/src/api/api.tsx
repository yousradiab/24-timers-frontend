import { makeOptions } from "./fetchUtils";

const endpoint = "http://localhost:8080";
const deltagerURL = `${endpoint}/deltager`;
const createDeltagerURL = `${endpoint}/createdeltager`;
const getDeltagerByIdURL = `${endpoint}/deltager`;
const updateDeltagerURL = `${endpoint}/deltager`;

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
  disciplin: Disciplin;
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
async function getDeltagerById(id: number): Promise<Deltager> {
  try {
    const response = await fetch(`${getDeltagerByIdURL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
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
    console.error("Error fetching deltager:", error);
    throw error;
  }
}

async function updateDeltager(id: number, deltager: Deltager): Promise<void> {
  try {
    const response = await fetch(`${updateDeltagerURL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deltager),
    });
    if (!response.ok) {
      const errorDetail = await response.json();
      throw new Error(
        `HTTP error! status: ${response.status}, details: ${JSON.stringify(
          errorDetail
        )}`
      );
    }
  } catch (error) {
    console.error("Failed to update deltager:", error);
    throw error;
  }
}

async function deleteDeltager(id: number): Promise<void> {
  const response = await fetch(`${endpoint}/deltager/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorDetail = await response.json();
    throw new Error(
      `HTTP error! status: ${response.status}, details: ${JSON.stringify(
        errorDetail
      )}`
    );
  }
}

async function registerSingleResult(result: Resultat) {
  const options = makeOptions("POST", result);
  const response = await fetch(`${endpoint}/resultat`, options);
  if (!response.ok) {
    const errorDetail = await response.json();
    throw new Error(
      `HTTP error! status: ${response.status}, details: ${JSON.stringify(
        errorDetail
      )}`
    );
  }
  return response.json();
}

async function registerMultipleResults(results: Resultat[]) {
  const options = makeOptions("POST", results);
  const response = await fetch(`${endpoint}/resultat/multiple`, options);
  if (!response.ok) {
    const errorDetail = await response.json();
    throw new Error(
      `HTTP error! status: ${response.status}, details: ${JSON.stringify(
        errorDetail
      )}`
    );
  }
  return response.json();
}

export {
  getDeltagerList,
  getDeltagerById,
  createDeltager,
  updateDeltager,
  deleteDeltager,
  registerSingleResult,
  registerMultipleResults,
};
