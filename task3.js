let marks = [85, 45, 72, 90, 38, 65, 50, 95, 45, 30];
console.log("Student Marks:");
for (let i = 0; i < marks.length; i++) {
    console.log(marks[i]);
}
let total = 0;
for (let i = 0; i < marks.length; i++) {
    total = total + marks[i];
}
console.log("Total Marks: " + total);
let average = total / marks.length;
console.log("Average Marks: " + average);
let highest = Math.max(...marks);
let lowest = Math.min(...marks);
console.log("Highest Marks: " + highest);
console.log("Lowest Marks: " + lowest);
let passed = 0;
let failed = 0;
for (let i = 0; i < marks.length; i++) {
    if (marks[i] >= 50) {
        passed++;
    }
    else {
        failed++;
    }
}
console.log("Passed Students: " + passed);
console.log("Failed Students: " + failed);
let grades = marks.map(function(mark) {
    if (mark >= 80) {
        return "A";
    }
    else if (mark >= 70) {
        return "B";
    }
    else if (mark >= 50) {
        return "C";
    }
    else {
        return "Fail";
    }
});
console.log("Grades: " + grades);
let passedStudents = marks.filter(function(mark) {
    return mark >= 50;
});

console.log("Passed Students Marks: " + passedStudents);
let ascending = [...marks];

ascending.sort(function(a, b) {
    return a - b;
});
console.log("Ascending Order: " + ascending);
let descending = [...marks];
descending.sort(function(a, b) {
    return b - a;
});
console.log("Descending Order: " + descending);
let uniqueMarks = [...new Set(marks)];
console.log("Marks Without Duplicates: " + uniqueMarks);
let searchMark = 45;
if (marks.includes(searchMark)) {
    console.log(searchMark + " is present in the marks array.");
}
else {
    console.log(searchMark + " is not present in the marks array.");
}