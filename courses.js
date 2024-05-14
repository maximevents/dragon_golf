// Include jQuery directly within the courses.js file
var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
script.onload = function() {
    // Once jQuery is loaded, execute the rest of the script
    $(document).ready(function() {

        // Function to create and display course cards
        function displayCourse(course) {
            // Create card element
            var card = document.createElement('div');
            card.className = 'course-card';

            // Create title element
            var title = document.createElement('h3');
            title.textContent = course.title;
            card.appendChild(title);

            // Create description element
            var description = document.createElement('p');
            description.textContent = course.description;
            card.appendChild(description);

            // Append card to the courses container
            var coursesContainer = document.getElementById('courses-container');
            coursesContainer.appendChild(card);
        }

        // CSS styles for course cards
        var courseStyles = `
            /* Course container styles */
            #courses-container {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 16px;
                padding: 16px;
            }

            /* Course card styles */
            .course-card {
                padding: 16px;
                background-color: #f8f8f8;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                transition: transform 0.2s;
            }

            .course-card:hover {
                transform: translateY(-4px);
            }

            .course-card h3 {
                margin-top: 0;
                margin-bottom: 8px;
                font-size: 1.25rem;
            }

            .course-card p {
                margin: 0;
                font-size: 1rem;
                color: #666;
            }
        `;

        // Create a <style> element and append CSS styles to it
        var styleElement = document.createElement('style');
        styleElement.textContent = courseStyles;

        // Append the <style> element to the document's <head>
        document.head.appendChild(styleElement);

        // Function to fetch courses from Firestore using a Cloud Function
        function fetchCourses() {
            $.ajax({
                url: 'https://asia-southeast1-your-project-id.cloudfunctions.net/getCourses', // Update with your Cloud Function URL
                method: 'GET',
                success: function(data) {
                    data.forEach(course => {
                        displayCourse(course);
                    });
                },
                error: function(error) {
                    console.error('Error fetching courses:', error);
                }
            });
        }

        // Fetch courses on document ready
        fetchCourses();
    });
};
document.head.appendChild(script);
