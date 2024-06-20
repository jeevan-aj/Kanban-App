import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  tasks: [
    { id: 1, title: "task1", startDate: "2-2-23",description:'Lorem ipsum dolor sit amet consectetur adipisicing elit.Id ab cum, officiis a vitae rem saepcorrupti.Blanditiis, velit sequi.' },
    { id: 2, title: "task2", startDate: "2-2-23",description:'Lorem ipsum dolor sit amet consectetur adipisicing elit.Id ab cum, officiis a vitae rem saepcorrupti.Blanditiis, velit sequi.' },
  ],
  inProgress: [
    { id: 5, title: "task5", startDate: "2-2-23",description:'Lorem ipsum dolor sit amet consectetur adipisicing elit.Id ab cum, officiis a vitae rem saepcorrupti.Blanditiis, velit sequi.' },
    { id: 6, title: "task6", startDate: "2-2-23" ,description:'Lorem ipsum dolor sit amet consectetur adipisicing elit.Id ab cum, officiis a vitae rem saepcorrupti.Blanditiis, velit sequi.'},
  ],
  done: [
    { id: 7, title: "task7", startDate: "2-2-23",description:'Lorem ipsum dolor sit amet consectetur adipisicing elit.Id ab cum, officiis a vitae rem saepcorrupti.Blanditiis, velit sequi.' },
    { id: 8, title: "task8", startDate: "2-2-23" ,description:'Lorem ipsum dolor sit amet consectetur adipisicing elit.Id ab cum, officiis a vitae rem saepcorrupti.Blanditiis, velit sequi.'},
  ],
  isModalOpen: false,
  isProgressModalOpen: false,
  openedModalId: null,
  currentUser:false
};

export const initialSlice = createSlice({
  name: "initialSlice",
  initialState,
  reducers: {
    moveItem: (state, action) => {
      const { sourceList, destinationList, sourceIndex, destinationIndex } =
        action.payload;

      const itemToMove = state[sourceList][sourceIndex];

      state[sourceList] = state[sourceList].filter(
        (_, idx) => idx !== sourceIndex
      );

      state[destinationList] = [
        ...state[destinationList].slice(0, destinationIndex),
        itemToMove,
        ...state[destinationList].slice(destinationIndex),
      ];
    },
    setAddTask: (state, action) => {
      state.tasks.unshift(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((cur) => cur.id !== action.payload);
    },
    deleteInProgress: (state, action) => {
      state.inProgress = state.inProgress.filter(
        (cur) => cur.id != action.payload
      );
    },
    deleteDone: (state, action) => {
      state.done = state.done.filter((cur) => cur.id !== action.payload);
    },
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setOpenedModalId: (state, action) => {
      state.openedModalId = action.payload;
    },
    setEditTodo: (state, action) => {
      state.tasks = state.tasks.map((cur) => {
        if (cur.id == state.openedModalId) {
          return { ...cur, ...action.payload };
        } else {
          return cur;
        }
      });
    },
    setIsProgressModalOpen: (state, action) => {
      state.isProgressModalOpen = action.payload;
    },
    setEditInprogress: (state, action) => {
      state.inProgress = state.inProgress.map((cur) => {
        if (cur.id === state.openedModalId) {
          return { ...cur, ...action.payload };
        } else {
          return cur;
        }
      });
    },
    setCurrentUser:(state,action)=> {
      state.currentUser = action.payload
    }
  },
});
export const {
  moveItem,
  setAddTask,
  deleteTask,
  deleteDone,
  deleteInProgress,
  setIsProgressModalOpen,
  setIsModalOpen,
  setOpenedModalId,
  setEditTodo,
  setEditInprogress,
  setCurrentUser
} = initialSlice.actions;
export default initialSlice.reducer;
