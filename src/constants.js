//URLS
export const BASE_ADDRESS = "https://f0a460305ed0.ngrok.io";
export const LOBBY_ADDRESS = BASE_ADDRESS+"/lobby";
export const CREATE_PROBLEM = BASE_ADDRESS+"/api/createProblem";
export const REGISTER_USER = BASE_ADDRESS+"/api/register";
export const LOGIN_USER = BASE_ADDRESS+"/api/login";
export const GET_PROBLEMS = BASE_ADDRESS+"/api/getProblems";
export const CREATE_LOBBY = BASE_ADDRESS+"/api/createLobby";
export const ADD_CONTESTANT = BASE_ADDRESS+"/api/addContestant";
export const GET_CONTESTANTS = BASE_ADDRESS+"/api/getContestants";
export const SOCK_JS = BASE_ADDRESS+"/ws";
export const START_CONTEST = BASE_ADDRESS+"/api/startContest";
export const GET_CONTEST_QUESTIONS = BASE_ADDRESS+"/api/getContestQuestions";

//INVITE MSGS
export const INVITE_MSG = "Hey! your friend has challenged you to fight a CodeBattle.\nClick the link to accept : \n"+LOBBY_ADDRESS+"/";

export const TAGS = [
    "implementation",
	"dp",
    "math",
    "greedy",
    "brute force",
    "data structures",
    "constructive algorithms",
    "dfs and similar",
    "sortings",
    "binary search",
    "graphs",
    "trees",
    "strings",
    "number theory",
    "geometry",
    "combinatorics",
    "two pointers",
    "dsu",
    "bitmasks",
    "probabilities",
    "shortest paths",
    "hashing",
    "divide and conquer",
    "games",
    "matrices",
    "flows",
    "string suffix structures",
    "expression parsing",
    "graph matchings",
    "ternary search",
    "meet-in-the-middle",
    "fft",
    "2-sat",
    "chinese remainder theorem",
    "schedules"
]

export const DIFFICULTY = {
    easy:"EASY",
    medium:"MEDIUM",
    hard:"HARD"
}
