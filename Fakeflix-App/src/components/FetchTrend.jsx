 import { ApiKey } from "./ApiKeyFetchTrend";

 function FetchTrend({url, setData}){

    const header = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: ApiKey
    }
  };

  
  fetch(url, header)
  .then(response => response.json())
  .then(data => {
      setData(data);  

  })
  
  .catch(err => console.error(err))
 
  }
  
  
  export default FetchTrend;