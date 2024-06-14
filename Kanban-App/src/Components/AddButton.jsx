import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Space,
  message,
} from "antd";
import { useDispatch } from "react-redux";
import { setAddTask } from "../redux/InitialSlices";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object()
  .shape({
    name: yup.string().required("name is required"),
    dateTime: yup.date().required("select a date"),
    description: yup.string().required('description is required'),
  })
  .required();

export const disabledDate = (current) => {
  return (
    moment().add(-1, "days") >= current || moment().add(1, "month") <= current
  );
};

const AddButton = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const { handleSubmit, control, reset ,formState:{errors} } = useForm({
    resolver: yupResolver(schema),
  });

  const onsubmit = (formData) => {
    const { dateTime, name, description } = formData;

    if (dateTime) {
      const formattedDate = moment(dateTime).format("DD-MM-YYYY");

      dispatch(
        setAddTask({
          id: uuidv4(),
          title: name,
          startDate: formattedDate,
          description: description,
        })
      );

      onClose();
      reset();
    } else {
      console.error("dateTime[0] is undefined");
    }
    message.success("Task Added Successfully");
  };

  return (
    <>
      <Button
        className="bg-blue-300 hover:bg-blue-400"
        onClick={showDrawer}
        icon={<PlusOutlined />}
      >
        New Todo
      </Button>
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        
      >
        <Form
          id="myForm"
          layout="vertical"
          hideRequiredMark
          onFinish={handleSubmit(onsubmit)}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="Name" id="name">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Input {...field} placeholder="Please enter user name" />
                      {errors && <span className="error-message text-[10px] text-red-400">{errors?.name?.message ??''}</span>}
                    </>
                  
                  )}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="dateTime" id="dateTime" label="DateTime">
                <Controller
                  name="dateTime"
                  control={control}
                  render={({ field }) => (
                    <>
                     <DatePicker
                      disabledDate={disabledDate}
                      {...field}
                      style={{ width: "100%" }}
                      getPopupContainer={(trigger) => trigger.parentElement}
                    />
                    {errors && <span className="text-[10px] text-red-400">{errors?.dateTime?.message??""}</span> }
                    
                    </>
                   
                  )}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                id="description"
                label="Description"
              >
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <>
                     <Input.TextArea
                      {...field}
                      rows={4}
                      placeholder="please enter task description"
                    />
                  {errors && <span className="text-[10px] text-red-400">{errors?.description?.message??""}</span> }
                    </>
                   
                  )}
                />
              </Form.Item>
            </Col>
          </Row>
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" className="bg-blue-400 text-black" htmlType="submit">
              Submit
            </Button>
          </Space>
        </Form>
      </Drawer>
    </>
  );
};
export default AddButton;
