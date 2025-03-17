import { useEffect } from "react";
import { countriesApi } from "../src/api/countries-api";

export const Test = () => {
  useEffect(() => {
    countriesApi.get().then((data) => console.log(data));
  }, []);

  return <></>;
};
