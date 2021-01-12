import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { TeamSelect } from "../team/TeamSelect";
import { Scrim } from "../api/scrim/Scrim";
import { ScrimCreateInput } from "../api/scrim/ScrimCreateInput";

const INITIAL_VALUES = {} as ScrimCreateInput;

export const CreateScrim = (): React.ReactElement => {
  useBreadcrumbs("/scrims/new", "Create Scrim");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Scrim,
    AxiosError,
    ScrimCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/scrims", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/scrims"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: ScrimCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create Scrim"}>
              <Button type="submit" disabled={isLoading}>
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
