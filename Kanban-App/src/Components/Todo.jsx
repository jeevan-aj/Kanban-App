import { Draggable } from "react-beautiful-dnd";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteForever } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { message, Popconfirm } from "antd";
import { v4 as uuidv4 } from "uuid";
import {
  deleteTask,
  setEditTodo,
  setIsModalOpen,
  setOpenedModalId,
} from "../redux/InitialSlices";
import { Modal } from "antd";
import { Controller, useForm } from "react-hook-form";
import { Col, DatePicker, Form, Input, Row } from "antd";
import moment from "moment";
import { disabledDate } from "./AddButton";

export const TodoItem = styled.div`
  width: 200px;
  border: 1px solid grey;
  margin-bottom: 8px;
  background-color: ${(props) =>
    props.isDragging
      ? "lightgreen; transition: background-color 2s linear;"
      : "white; transition: background-color 0.5s linear;"};
  padding: 8px;
`;

const Todo = () => {
  const { tasks } = useSelector((state) => state.initialSlice);
  const { isModalOpen } = useSelector((state) => state.initialSlice);
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";
  const dispatch = useDispatch();
  const { handleSubmit, control, setValue } = useForm();
  const [form] = Form.useForm();

  const confirmDelete = (id) => {
    messageApi.open({
      key,
      type: "loading",
      content: "Loading...",
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: "success",
        content: "Deleted Successfully!",
        duration: 2,
      });
    }, 1000);
    dispatch(deleteTask(id));
  };

  const showModal = (id) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setValue("name", task.title);
      setValue("dateTime", [moment(task.startDate, "DD-MM-YYYY")]); // Ensure you have 'moment' imported
      setValue("description", task.description);
      form.setFieldsValue({
        name: task.title,

        description: task.description,
      });
      dispatch(setIsModalOpen(true));
      dispatch(setOpenedModalId(id));
    }
  };

  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    dispatch(setIsModalOpen(false));
  };

  //Edit component
  const onSubmit = (formData) => {
    const { name, dateTime, description } = formData;

    const formattedDate = moment(dateTime[0]).format("DD-MM-YYYY");

    dispatch(
      setEditTodo({
        title: name,
        startDate: formattedDate,
        description: description,
      })
    );
    handleCancel();
    message.success("Edited Successfully");
  };

  return (
    <>
      {contextHolder}
      <div className="text-center lg:min-w-[300px] bg-slate-300 py-1 rounded-md drop-shadow-md">
        Todo
      </div>
      {tasks.map((cur, idx) => {
        return (
          <Draggable key={cur.id} draggableId={cur.id.toString()} index={idx}>
            {(provided) => (
              <div
                key={cur.id}
                id={cur.id}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className={`draggable  mt-5 rounded-md text-black drop-shadow-lg  `}
              >
                <div className="flex flex-col justify-start p-5 gap-y-5 lg:h-[190px] lg:w-[300px] ">
                  <div className="flex flex-col justify-center items-start gap-2">
                    <div className="text-[12px] capitalize">{cur.title}</div>
                    <div className="text-[10px]">{cur.startDate}</div>
                  </div>

                  <div className="text-[12px] capitalize text-left max-h-[100px] overflow-y-scroll">
                    <p>
                     {cur.description}
                    </p>
                  </div>
                </div>
                <div className="flex  justify-end items-end gap-1">
                  <div>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => showModal(cur.id)}>
                        <CiEdit size={20} />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <div>
                    <Popconfirm
                      title="Delete the task"
                      description="Are you sure to delete this task?"
                      onConfirm={() => confirmDelete(cur.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Tooltip title="Delete">
                        <IconButton>
                          <MdOutlineDeleteForever size={20} />
                        </IconButton>
                      </Tooltip>
                    </Popconfirm>
                  </div>
                </div>
                <div className="pt-1 bg-slate-600"></div>
              </div>
            )}
          </Draggable>
        );
      })}
      {/* modal */}
      <Modal
        title="basic_modal"
        id={uuidv4()}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          id="myForm"
          form={form}
          layout="vertical"
          hideRequiredMark
          onFinish={handleSubmit(onSubmit)}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="Name" id="name">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Please enter user name" />
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
                    <DatePicker
                      format={{
                        format: "DD-MM-YYYY",
                        type: "mask",
                      }}
                      disabledDate={disabledDate}
                      {...field}
                      style={{ width: "100%" }}
                      // getPopupContainer={(trigger) =>
                      //   trigger.parentElement
                      // }
                    />
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
                    <Input.TextArea
                      {...field}
                      rows={4}
                      placeholder="please enter task description"
                    />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default Todo;
