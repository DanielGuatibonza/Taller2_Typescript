import { Course } from './course.js';
import { Student } from './student.js';
import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';

let nameStudent: HTMLElement = document.getElementById('nombreEstudiante')!;
let studentInfoTbody: HTMLElement = document.getElementById('info')!;
let coursesTbody: HTMLElement = document.getElementById('courses')!;
let totalCreditElm: HTMLElement = document.getElementById("total-credits")!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;
const inputLimInf: HTMLInputElement = <HTMLInputElement> document.getElementById("lim-inf")!;
const inputLimSup: HTMLInputElement = <HTMLInputElement> document.getElementById("lim-sup")!;
const camposInfo: string[] = ['Código', 'Cédula', 'Edad', 'Dirección', 'Teléfono']


btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick = () => applyFilterByCredits();
renderStudentInfo(dataStudent);
renderCoursesInTable(dataCourses);
totalCreditElm.innerHTML = `Total Créditos: ${getTotalCredits(dataCourses)}`

function renderStudentInfo(student : Student): void {
  nameStudent.innerHTML = student.nombreCompleto;
  camposInfo.forEach((dato, i) => {
    let textoActual : string = `${student.informacion[i]}`;
    textoActual += (dato=='Edad') ? ' Años' : '';
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${dato}</td>
                           <td>${textoActual}</td>`;
    studentInfoTbody.appendChild(trElement);
  })
}

function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
  totalCreditElm.innerHTML = `Total Créditos: ${getTotalCredits(coursesFiltered)}`
}

function applyFilterByCredits() {
  let infStr = inputLimInf.value;
  let infNum = (infStr == null) ? 0 : parseInt(infStr);
  let supStr = inputLimSup.value;
  let supNum = (supStr == null) ? 0 : parseInt(supStr);
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByCredits(infNum, supNum, dataCourses);
  renderCoursesInTable(coursesFiltered);
  totalCreditElm.innerHTML = `Total Créditos: ${getTotalCredits(coursesFiltered)}`
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function searchCourseByCredits(inf: number, sup: number, courses: Course[]) : Course[]
{
  let cursosEnRango : Course[] = [];
  courses.forEach((curso) => {
    if (inf <= curso.credits && curso.credits <= sup) {
      cursosEnRango.push(curso);
    }
  })
  return cursosEnRango;
}

function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}