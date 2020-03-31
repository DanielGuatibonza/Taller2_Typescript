import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var nameStudent = document.getElementById('nombreEstudiante');
var studentInfoTbody = document.getElementById('info');
var coursesTbody = document.getElementById('courses');
var totalCreditElm = document.getElementById("total-credits");
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var btnfilterByCredits = document.getElementById("button-filterByCredits");
var inputLimInf = document.getElementById("lim-inf");
var inputLimSup = document.getElementById("lim-sup");
var camposInfo = ['Código', 'Cédula', 'Edad', 'Dirección', 'Teléfono'];
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByCredits(); };
renderStudentInfo(dataStudent);
renderCoursesInTable(dataCourses);
totalCreditElm.innerHTML = "Total Cr\u00E9ditos: " + getTotalCredits(dataCourses);
function renderStudentInfo(student) {
    nameStudent.innerHTML = student.nombreCompleto;
    camposInfo.forEach(function (dato, i) {
        var textoActual = "" + student.informacion[i];
        textoActual += (dato == 'Edad') ? ' Años' : '';
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + dato + "</td>\n                           <td>" + textoActual + "</td>";
        studentInfoTbody.appendChild(trElement);
    });
}
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
    totalCreditElm.innerHTML = "Total Cr\u00E9ditos: " + getTotalCredits(coursesFiltered);
}
function applyFilterByCredits() {
    var infStr = inputLimInf.value;
    var infNum = (infStr == null) ? 0 : parseInt(infStr);
    var supStr = inputLimSup.value;
    var supNum = (supStr == null) ? 0 : parseInt(supStr);
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredits(infNum, supNum, dataCourses);
    renderCoursesInTable(coursesFiltered);
    totalCreditElm.innerHTML = "Total Cr\u00E9ditos: " + getTotalCredits(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByCredits(inf, sup, courses) {
    var cursosEnRango = [];
    courses.forEach(function (curso) {
        if (inf <= curso.credits && curso.credits <= sup) {
            cursosEnRango.push(curso);
        }
    });
    return cursosEnRango;
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
