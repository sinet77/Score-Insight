export interface Country {
  name: string;
  code: string | null;
  flag: string | null;
}

export interface CountriesResponse {
  get: string;
  parameters: unknown[];
  errors: string[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: Country[];
}
