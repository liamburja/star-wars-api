import axios, { AxiosInstance } from "axios";
import { Service } from "typedi";

export enum DataType {
  PEOPLE = 'people',
  PLANETS = 'planets',
  STARSHIPS = 'starships',
  VEHICLES = 'vehicles',
  SPECIES = 'species',
  FILMS = 'films',
}

interface ApiResponse {
  count: number;
  results: any[];
}

@Service()
export class StarWarsApiService {
  private baseUrl: string;
  private client: AxiosInstance;
  private readonly ITEMS_PER_PAGE = 10;

  constructor() {
    this.baseUrl = process.env.URL_STAR_WARS_API || '';
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getData(type: DataType): Promise<ApiResponse> {
    try {
      const firstResponse = await this.client.get(`/${type}/`);
      const { count, results } = firstResponse.data;
      
      const totalPages = Math.ceil(count / this.ITEMS_PER_PAGE);
      
      if (totalPages === 1) {
        return { count, results };
      }

      const pageRequests = Array.from(
        { length: totalPages - 1 }, 
        (_, index) => this.client.get(`/${type}/?page=${index + 2}`)
      );
      
      const responses = await Promise.all(pageRequests);
      
      const allResults = [
        ...results,
        ...responses.flatMap(response => response.data.results)
      ];
      
      return {
        count: allResults.length,
        results: allResults
      };
    } catch (error: any) {
      throw new Error(`Error fetching ${type} from Star Wars API: ${error.message}`);
    }
  }

  async getDataById(type: DataType, id: string): Promise<any> {
    try {
      const response = await this.client.get(`/${type}/${id}/`);
      return response.data;
    } catch (error: any) {
      throw new Error(`Error fetching ${type} with ID ${id}: ${error.message}`);
    }
  }
}