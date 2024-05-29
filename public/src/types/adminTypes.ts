import { UnknownAction } from "@reduxjs/toolkit"
import { lastQuizResultType } from "./quizStatTypes"

// Initial State type for the adminSlice
export type InitialAdminType = {
  isLoading: boolean,
  allUserStats: AllUserStatsType[],
  singleUserStats: AllUserStatsType[],
  editingRole: string,
  editingId: string,
  detailsOpen: boolean,
}
// Initial State type for the adminSlice End 

// Whole quiz Stats type for the adminSlice
export type LastQuizResultType = {
  _id:string,
  lastQuizCorrectAnswers:number,
  lastQuizDoneDate:Date,
  questionsUsed:{
    _id:string,
    answerIsTrue:string,
    answerSubmitted:string,
    question:string
  }[]
}

export type AllUserStatsType = {
  _id:string,
  averageQuizValue:number,
  createdAt:Date,
  dailyQuizAmount:number,
  lastQuizResult:LastQuizResultType,
  name:string,
  quizDoneAmount:number,
  role:string,
  totalQuizPoints:number,
  updatedAt:Date,
  user:string,
}
// Whole quiz Stats type for the adminSlice End

// Single Quiz Stats

export type ProfileDetailsType = {
  detailsOpen:boolean,
  // In here the or operator should be changed into a single type it's left like that to avoid bugs
  lastQuizResult:LastQuizResultType | lastQuizResultType,
  detailsToggle:()=>UnknownAction,
}

// Single Quiz Stats End 
