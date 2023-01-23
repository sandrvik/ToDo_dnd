const baseUrl: string = 'http://localhost:8000';

export const testRequest = async () => {
  const response = await fetch(baseUrl);
  const parsedResponse = await response.json();
  return parsedResponse;
};

export default testRequest;
