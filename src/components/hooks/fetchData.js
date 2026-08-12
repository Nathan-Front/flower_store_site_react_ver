const API_URL =
  "https://script.google.com/macros/s/AKfycbyKLPGoQElgHbTen7D6Xsqlwodlfaj3ikkim-QEeal7xp1a6iQR3ScmZQURg3ziFGLJ/exec";
export async function fetchSpecificSheet(sheetType, key, dataFormatter) {
  try {
    const response = await fetch(`${API_URL}?type=${sheetType}`); //send type to just fetch related files only
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();

    return dataFormatter ? dataFormatter(data[key]) : data[key];
  } catch (error) {
    console.log(`Error fetching ${sheetType}:`, error);
    throw error; //Re-throw so the caller knows it failed
  }
}
