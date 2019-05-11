/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { Input, InputNumber, Form, Button, Switch } from "antd";
import React, { FunctionComponent } from "react";
import styled from "@emotion/styled";
import { useState } from "react";
import { FormComponentProps } from "antd/lib/form";

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
  artists: string;
  songName: string;
  nsfw: boolean;
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
        props.form.validateFields((err, values: FormValues) => {
          if (!err) {
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
        <Button loading={disabled} type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

const ConfigForm = Form.create({})(ConfigFormComponent);
