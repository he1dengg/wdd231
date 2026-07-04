const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: true },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true },
    { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, completed: false }
];

const courseContainer = document.getElementById("course-container");
const totalCreditsEl = document.getElementById("total-credits");

function renderCourses(filteredCourses) {
    // Xóa nội dung cũ trước khi render lại
    courseContainer.innerHTML = "";
    
    // Yêu cầu 11: Dùng hàm reduce để tính tổng số tín chỉ động
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsEl.textContent = totalCredits;

    // Yêu cầu 8 & 10: Hiển thị mảng, đánh dấu hoàn thành/chưa hoàn thành
    filteredCourses.forEach(course => {
        const courseCard = document.createElement("div");
        courseCard.classList.add("course-card");
        
        // Gắn class css tùy theo trạng thái hoàn thành
        if (course.completed) {
            courseCard.classList.add("completed");
        } else {
            courseCard.classList.add("incomplete");
        }
        
        courseCard.innerHTML = `<h3>${course.subject} ${course.number}</h3>`;
        courseContainer.appendChild(courseCard);
    });
}

// Render toàn bộ khóa học khi trang vừa load
renderCourses(courses);

// Yêu cầu 9: Lọc khóa học dùng array.filter() thông qua nút bấm
document.getElementById("all-btn").addEventListener("click", () => {
    renderCourses(courses);
});

document.getElementById("wdd-btn").addEventListener("click", () => {
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    renderCourses(wddCourses);
});

document.getElementById("cse-btn").addEventListener("click", () => {
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    renderCourses(cseCourses);
});