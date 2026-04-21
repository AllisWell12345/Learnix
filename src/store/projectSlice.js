import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTemplateById,
  createTemplate,
  updateTemplate,
} from "../services/templateService";
import {
  getProjectById,
  createProject,
  updateProject,
  getProjectsAll,
} from "../services/projectService";

// --- 강사 가이드(Template) ---
export const fetchTemplateDetail = createAsyncThunk(
  "project/fetchTemplate",
  async (id) => await getTemplateById(id),
);

export const registTemplate = createAsyncThunk(
  "project/registTemplate",
  async (data) => await createTemplate(data),
);

// --- 학생 보고서(Project) ---
export const fetchProjectDetail = createAsyncThunk(
  "project/fetchProject",
  async (id) => await getProjectById(id),
);

export const registProject = createAsyncThunk(
  "project/registProject",
  async (data) => await createProject(data),
);

export const fetchProjectsAll = createAsyncThunk(
  "project/fetchAll",
  async () => await getProjectsAll(),
);

const projectSlice = createSlice({
  name: "project",
  initialState: {
    currentTemplate: null,
    currentProject: null,
    draftProject: null,
    projects: [],
    status: "idle",
  },
  reducers: {
    addProjectComment: (state, action) => {
      const { comment } = action.payload;
      if (state.currentProject) {
        if (!state.currentProject.comments) state.currentProject.comments = [];
        state.currentProject.comments.push(comment);
      }
    },

    setDraftProject: (state, action) => {
      state.draftProject = action.payload;
    },

    clearDraftProject: (state) => {
      state.draftProject = null;
    },

    clearProjectState: (state) => {
      state.currentTemplate = null;
      state.currentProject = null;
      state.draftProject = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectsAll.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchTemplateDetail.fulfilled, (state, action) => {
        state.currentTemplate = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchProjectDetail.fulfilled, (state, action) => {
        state.currentProject = action.payload;
        state.status = "succeeded";
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        },
      );
  },
});

export const {
  clearProjectState,
  addProjectComment,
  setDraftProject,
  clearDraftProject,
} = projectSlice.actions;

export default projectSlice.reducer;