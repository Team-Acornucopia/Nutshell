// In charge of executing all the DOM-builders etc.
import EventsList from "./eventsList"
import EventsForm from "./eventsForm"
import NewsList from "./newsList"
import NewsForm from "./newsForm"
import DomManager from "./domManager"
import APICollection from "./apiCollection";
import LoginCollection from "./login"
import TasksList from "./tasksList"
import TasksForm from "./tasksForm"

EventsList.buildEventsList()
.then(function(eventsList) {
  DomManager.elementAppender(eventsList, "#events_output")
  let container = document.getElementById("events_list").childNodes[0]
  // console.log(container)
  container.classList.add("prominent")
})
DomManager.elementAppender(EventsForm.buildEventForm("post"),"#events_form")



// const dateSorted = (a, b) => {
//   let eventDateA = new Date(a.date), eventDateB = new Date(b.date);
//   return eventDateA - eventDateB;
// }
// let sortedEvents = get_events_list.dateSorted(a, b)

let get_task_list = TasksList.buildTaskList()
console.log(get_task_list)
let get_news_list = NewsList.buildNewsList()
console.log(get_news_list);
DomManager.elementAppender(get_task_list, "#tasks_output")
DomManager.elementAppender(TasksForm.buildTasksForm("post"), "#tasks_form")
DomManager.elementAppender(get_news_list, "#news_output")
DomManager.elementAppender(NewsForm.buildNewsForm("post"), "#news_form")
