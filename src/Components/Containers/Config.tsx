/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { Input, InputNumber, Form, Button, Switch } from "antd";
import React, { FunctionComponent } from "react";
import styled from "@emotion/styled";
import { useState } from "react";
import { FormComponentProps } from "antd/lib/form";
import { Config as ConfigValues } from "../../Actions/types";
import { updateConfig } from "../../Functions";

const FormContainer = styled.div({
  margin: "auto",
  width: "95%"
});

export const Config: FunctionComponent = () => {
  return (
    <FormContainer>
      <ConfigForm />
    </FormContainer>
  );
};

const SearchForm = css({
  paddingTop: "0.7rem"
});

type SongSearchProps = {};
type FormValues = {
  frequency: number;
};

const ConfigFormComponent = (props: SongSearchProps & FormComponentProps) => {
  const { getFieldDecorator } = props.form;
  // flag to stop form for a second after submit
  const [disabled, setDisabled] = useState(false);

  return (
    <Form
      css={SearchForm}
      onSubmit={e => {
        // validate form and prevent default from refreshing the page
        e.preventDefault();
        props.form.validateFields((err, values: ConfigValues) => {
          if (!err) {
            updateConfig(values);
            // clear form
            props.form.resetFields();
            // create new song, so we can use logic used in normal queue
          }
        });
      }}
    >
      <Form.Item label={"frequency"} required={true}>
        {getFieldDecorator("frequency", {
          rules: [
            {
              required: true,
              message: "Please specify atleast one artist!",
              min: 87.6,
              max: 105.0,
              type: "number"
            }
          ]
        })(<InputNumber step={0.1} min={87.6} max={105.0} />)}
      </Form.Item>
      <Form.Item required={true}>
        <div>Changes will take place after currently played song</div>
        <Button loading={disabled} type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

const ConfigForm = Form.create({})(ConfigFormComponent);
