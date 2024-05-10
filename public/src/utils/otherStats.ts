import historyPNG from '../assets/categories/history.png';
import geographyPNG from '../assets/categories/geography.png';
import mathPNG from '../assets/categories/math.png';
import physicsPNG from '../assets/categories/physics.png';
import chemistryPNG from '../assets/categories/chemistry.png';
import artPNG from '../assets/categories/art.png';
import literaturePNG from '../assets/categories/literature.png';
import sportPNG from '../assets/categories/sport.png';
import otherPNG from '../assets/categories/other.png';

export const optionValues: string[] = ["Math",
  "Geography",
  "History",
  "Literature",
  "Art",
  "Sports",
  "Chemistry",
  "Physics",
  "Other"];

export const categoryImagesArr = [{ img: mathPNG, category: "Math" }, { img: historyPNG, category: "History" }, { img: geographyPNG, category: "Geography" }, { img: physicsPNG, category: "Physics" }, { img: chemistryPNG, category: "Chemistry" }, { img: artPNG, category: "Art" }, { img: literaturePNG, category: "Literature" }, { img: sportPNG, category: "Sport" }, { img: otherPNG, category: "Other" }]

// Users summary
export const adminText: string = 'As an admin you should constantly be paying attention to incoming questions and monitoring the status of the players. Not many have the power that you have.'

export const questionGuruText: string = 'As a Question-guru you should be looking out for the the question, submitting and editing them if needed. Depending on your knowledge you might soon be eligible for a role of an admin.'

const questionGuruThreshold: number = 50
export const userText = (quizDoneAmount: number): string => {
  const amountLeftForQuru = questionGuruThreshold - quizDoneAmount
  if (quizDoneAmount <= 5) {
    return `You have just started your quizing journey with ${quizDoneAmount} quizes completed. Keep up the good work.`
  }
  return `Just couple of days of hard work!!! you have only ${amountLeftForQuru} quizes left to be eligible for Question-guru role.`
}
// Users summary End



