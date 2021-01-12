import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Scrim } from "../api/scrim/Scrim";

type Data = Scrim[];

type Props = Omit<SelectFieldProps, "options">;

export const ScrimSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/scrims",
    async () => {
      const response = await api.get("/api/scrims");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.id && item.id.length ? item.id : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
