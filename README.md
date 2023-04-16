# fullstack-dashboard
<br>
<b><em>Hey there 👋</em></b> guys this is a fullstack dashboard application deployed on render.com :)
https://dashboard-frontend-klkv.onrender.com
<br>
<h1>ADMIN DASHBOARD</h1>
<h3>Backend</h3>
<ins>Install necessary dependencies</ins>
<br>
Express – for our api frameworks. <br>
Body-parser – for passing our data coming in but we can also use express if you have the latest release. <br>
Cors – This is for cross-origin resource sharing between the client and the server side. <br>
Dot-env – This is for the environment variables. <br>
Helmet – this is for protecting our api’s. <br>
Morgan – this is for logging our api calls. <br>
Mongoose – this is for handling mongo db calls. <br>
Nodemon – for live server reload. 
<br>
Command: npm i express body-parser cors dotenv helmet morgan mongoose nodemon
<br>
<h3>Frontend</h3>
<ins>Install necessary dependencies:</ins>
<br>
react-redux – for state management.(@reduxjs/toolkit). <br>
react-datepicker – it will give us a date picking range. <br>
React-router-dom – enable routing in our application. <br>
Material ui - (@mui/material  @emotion/react) npm install @mui/material @emotion/react @emotion/styled <br>
chart packages – for our charts (@nivo/core @nivo/bar @nivo/geo @nivo/pie) <br>
<br>
Command: npm install @reduxjs/toolkit react-redux react-datepicker react-router-dom @mui/material @emotion/react @emotion/styled @mui/icons-material @mui/x-data-grid @nivo/core @nivo/bar @nivo/geo @nivo/pie @nivo/line
<br>
if the datepicker doesn’t work pick version. 4.8.0: npm install react-datepicker@4.8.0 
<br>
&nbsp;
<h2><ins>Here's what i learnt</ins></h2>
<h4> I used useMemo react hook to:</h4> 
<ul>
<li>Change the theme of my website. I stored the mode as the dependency and a function <br>
that changes the theme only if the mode in the dependency array has changed. <br>
 - I stored the mode inside Redux as a state and is only changed after the user clicks the theme icon inside the Navbar </li>
<li>To change the graph of total units and total sales. <br>
 - I used useMemo to memoize the creation of the two line objects for the chart based on the data passed as a prop,<br>
so that the objects are only created when the data changes, and not on every re-render of the component that uses this code.
</li>
</ul>
<h4>On the backend</h4>
 - I learnt how to use aggregate to join two tables in mongoDB, which is more faster. <br>
 - I did it at /server/controllers/management.js as i get the users perfomance i combined the <b>user</b> and <b>transaction</b> .
Than doing it manually as i did at /server/controllers/client.js to get the products by getting all the products froom the Product <br>
table and iterated through each product to get the id and matched it with productId from the productStat table and then returning the product and the stats. <br>
 - I also learn't how to use Material UI on my frontend and how its prolific when making a table data grid than building your own from scratch
