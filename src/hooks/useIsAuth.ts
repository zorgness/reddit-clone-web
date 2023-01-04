import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";

export const useIsAuth = () => {
  const navigate = useNavigate();

  const [{ data, fetching }] = useMeQuery();
  useEffect(() => {
    if (!fetching && !data?.me) {
      navigate("/login");
    }
  }, [data, fetching, navigate]);
};
