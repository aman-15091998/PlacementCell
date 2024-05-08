
# Placement Cell App

In this web application we can add student details and the marks they have obtained in different tests. Another functionality is that we can create interview listings and can add enroll students in those interviews, and can also update interview results of each student individually. And we can export all the interview data in CSV format with just a click.

# Installation
1) git clone https://github.com/aman-15091998/PlacementCell/tree/main
2) move to the repository folder open with vs code
3) update the MONGO_URL env variable and others  with yours in the env file
4) Manually add a document in the mongodb employee collection to login as Employee
4) npm install
5) node index.js

# env variables
MONGO_URL : mongoDb connection string
PORT : Post number
SESSION_SECRET : express-session secret key 
 
# Features
1) Add sudents data
2) Add interview listings   
3) Enroll a student to interview
4) Update interview results
5) Export all interview data in CSV format
