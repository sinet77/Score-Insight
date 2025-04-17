export type StadiumProps = {
    id: number;
    name: string;
    address: string;
    city: string;
    country: string;
    capacity: number;
    surface: string;
    image: string;
  };

  export type TeamVenueApiResponse = {
    response: {
      venue: {
        id: number;
      };
    }[];
  };
  
  export type VenueApiResponse = {
    response: StadiumProps[];
  };