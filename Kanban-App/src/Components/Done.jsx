import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDeleteForever } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { message, Popconfirm } from "antd";
import { deleteDone } from "../redux/InitialSlices";

const Done = () => {
  const { done } = useSelector((state) => state.initialSlice);
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";

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
    dispatch(deleteDone(id));
  };

  return (
    <div>
      {contextHolder}
      <h1 className="lg:min-w-[300px] text-center bg-slate-300 py-1 rounded-md">
        Done
      </h1>
      {done.map((cur, idx) => {
        return (
          <Draggable draggableId={cur.id.toString()} key={cur.id} index={idx}>
            {(provided) => {
              return (
                <div
                  id={cur.id}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`draggable  mt-5 rounded-md text-black drop-shadow-lg  `}
                >
                  <div className="flex flex-col justify-start p-5 gap-y-5 lg:h-[190px] lg:w-[300px] lg:min-w-[300px] lg:flex-1">
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
                  <div className="pt-1 bg-red-500"></div>
                </div>
              );
            }}
          </Draggable>
        );
      })}
    </div>
  );
};

export default Done;
