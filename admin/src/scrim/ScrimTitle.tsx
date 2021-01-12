import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Scrim } from "../api/scrim/Scrim";

type Props = { id: string };

export const ScrimTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Scrim,
    AxiosError,
    [string, string]
  >(["get-/api/scrims", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/scrims"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/scrims"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
