import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteForever } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import {
  deleteInProgress,
  setEditInprogress,
  setIsProgressModalOpen,
  setOpenedModalId,
} from "../redux/InitialSlices";
import moment from "moment";
import { disabledDate } from "./AddButton";

//modal
import {
  Col,
  DatePicker,
  Input,
  Row,
  Form,
  message,
  Modal,
  Popconfirm,
} from "antd";
import { Controller, useForm } from "react-hook-form";

const InProgress = () => {
  const { inProgress } = useSelector((state) => state.initialSlice);

  const dispatch = useDispatch();
  const { isProgressModalOpen } = useSelector((state) => state.initialSlice);
  const { handleSubmit, control, setValue } = useForm();
  const [form] = Form.useForm();

  const confirmDelete = (id) => {
    message.success("Deleted Successfully");
    dispatch(deleteInProgress(id));
  };

  //modal
  const showModal = (id) => {
    const inProgres = inProgress.find((task) => task.id === id);
    if (inProgres) {
      setValue("name", inProgres.title);
      setValue("dateTime", [moment(inProgres.startDate, "DD-MM-YYYY")]); // Ensure you have 'moment' imported
      setValue("description", inProgres.description);
      form.setFieldsValue({
        name: inProgres.title,
        dateTime: [moment(inProgres.startDate, "DD-MM-YYYY")],
        description: inProgres.description,
      });
      dispatch(setIsProgressModalOpen(true));
      console.log(isProgressModalOpen);

      dispatch(setOpenedModalId(id));
    }
  };

  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    dispatch(setIsProgressModalOpen(false));
  };

  //Edit component
  const onSubmit = (formData) => {
    const { name, dateTime, description } = formData;

    const formattedDate = moment(dateTime[0]).format("DD-MM-YYYY");

    dispatch(
      setEditInprogress({
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
      <h2 className="lg:min-w-[300px] text-center bg-slate-300 py-1 rounded-md">
        In Progress
      </h2>
      {inProgress.map((cur, idx) => {
        return (
          <Draggable key={cur.id} draggableId={cur.id.toString()} index={idx}>
            {(provided) => (
              <div
                id={cur.id}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className={`draggable  mt-5 rounded-md text-black drop-shadow-lg  `}
              >
                <div className="flex flex-col justify-start p-5 gap-y-5 lg:h-[190px] lg:w-[300px]">
                  <div className="flex flex-col justify-center items-start gap-2">
                    <div className="text-[12px] capitalize">{cur.title}</div>
                    <div className="text-[10px]">{cur.startDate}</div>
                  </div>

                  <div className="text-[12px] capitalize text-left max-h-[100px] overflow-scroll">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Id ab cum, officiis a vitae rem saepe corrupti.
                      Blanditiis, velit sequi.
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
                <div className="pt-1 bg-green-400"></div>
              </div>
            )}
          </Draggable>
        );
      })}
      {/* modal */}
      <Modal
        title={"inprogress modal"}
        open={isProgressModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          id="myFormInprogress"
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
                      getPopupContainer={(trigger) => trigger.parentElement}
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

export default InProgress;
