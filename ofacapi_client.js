import axios from 'axios';

export const DEFAULT_AML_MIN_SCORE = 95;
export const ENTITY_TYPES = ['organization', 'person'];
export const AML_SOURCES = [
    'SDN', 'NONSDN', 'DPL', 'UN', 'OFSI', 'FSF', 'DFAT', 
    'DUAL-USE', 'SEMA', 'BFS', 'SECO', 'MXSAT', 'LEIE', 
    'LFIU', 'FINCEN', 'INTERPOL', 'REPET'
];

class AMLClient {
    constructor() {
      this.httpClient = axios.create({
        baseURL: "https://api.ofac-api.com/v4",
        timeout: 120000, // 2 minutes timeout
        headers: {
          'Content-Type': 'application/json',
          'apiKey': process.env.OFAC_API_API_KEY
        }
      });
    }
  
    async screenOrgs(cases, types, sources = AML_SOURCES, minScore = DEFAULT_AML_MIN_SCORE) {
      if (!Array.isArray(types)) {
        types = [types]; // Ensure types is always an array
      }
      
      try {
        const req = {
            minScore,
            sources,
            types,
            cases,
        };
        
        const response = await this.httpClient.post('/screen', req);
        return response.data;
      } catch (error) {
        if (error.response) {
          throw new Error(`API request error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
        }
        throw error;
      }
    }
  }
  
  const amlClient = new AMLClient();

  export default amlClient;