import * as React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery, useMutation } from "react-query";
import { Formik } from "formik";
import pick from "lodash.pick";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  EnumButtonStyle,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { TeamSelect } from "../team/TeamSelect";
import { Scrim as TScrim } from "../api/scrim/Scrim";
import { ScrimUpdateInput } from "../api/scrim/ScrimUpdateInput";

export const Scrim = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/scrims/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TScrim,
    AxiosError,
    [string, string]
  >(["get-/api/scrims", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/scrims"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TScrim, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/scrims"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//scrims");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TScrim, AxiosError, ScrimUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/scrims"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: ScrimUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.id);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(() => pick(data, ["team1", "team2"]), [
    data,
  ]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form
            formStyle={EnumFormStyle.Horizontal}
            formHeaderContent={
              <FormHeader
                title={`${"Scrim"} ${
                  data?.id && data?.id.length ? data.id : data?.id
                }`}
              >
                <Button
                  type="button"
                  disabled={updateIsLoading}
                  buttonStyle={EnumButtonStyle.Secondary}
                  icon="trash_2"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button type="submit" disabled={updateIsLoading}>
                  Save
                </Button>
              </FormHeader>
            }
          >
            <div>
              <TeamSelect label="Team1" name="team1.id" />
            </div>
            <div>
              <TeamSelect label="Team2" name="team2.id" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
