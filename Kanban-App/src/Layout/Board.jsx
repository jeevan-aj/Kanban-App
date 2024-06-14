import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Todo from "../Components/Todo";
import InProgress from "../Components/InProgress";
import { useDispatch } from "react-redux";
import { moveItem } from "../redux/InitialSlices";
import Done from "../Components/Done";
import AddButton from "../Components/AddButton";

const Board = () => {
  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    if (!result.destination) return;
    let sourceList = "";
    if (result.source.droppableId === "todo") {
      sourceList = "tasks";
    } else if (result.source.droppableId === "inProgress") {
      sourceList = "inProgress";
    } else if (result.source.droppableId === "done") {
      sourceList = "done";
    }
    let destinationList = "";
    if (result.destination.droppableId === "todo") {
      destinationList = "tasks";
    } else if (result.destination.droppableId === "inProgress") {
      destinationList = "inProgress";
    } else if (result.destination.droppableId === "done") {
      destinationList = "done";
    }

    dispatch(
      moveItem({
        sourceList,
        destinationList,
        sourceIndex: result.source.index,
        destinationIndex: result.destination.index,
      })
    );
  };

  return (
    <>
      <div className="flex flex-col justify-center gap-3 mt-[100px]  mx-[10rem]">
      <div className="">
        <AddButton />
        </div>
        <div className="">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex justify-center  gap-5 lg:max-h-[600px] lg:max-w-[1100px] rounded-md bg-slate-100  p-10 overflow-scroll ">
            <Droppable droppableId="todo">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <Todo />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <Droppable droppableId="inProgress">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <InProgress />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="done">
              {(provide) => (
                <div ref={provide.innerRef} {...provide.droppableProps}>
                  <Done />
                  {provide.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
        </div>

        
        
      </div>
      
       
     
    </>
  );
};

export default Board;
