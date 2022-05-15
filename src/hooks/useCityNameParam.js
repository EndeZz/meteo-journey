import { useParams } from "react-router-dom";

export const useCityNameParam = () => {
  const { name } = useParams();
  if (!name) {
    throw new Error('no name param in route');
  }
  return name;
};