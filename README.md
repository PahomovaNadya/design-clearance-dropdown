# design-clearance-dropdown
Design design of DropDown in React using CSS

The design is created without using img and only css. 
There are 3 design options:
	width: 100px; 
	width: 150px; 
	width: 200px;

In the App.js file, I create the UISelect components and handing over:
	options = {data1} - DB relevant;
	widthObj = {200 [100; 150]} - the width chosen for the design;
	tabindex = {1} is the serial number for TAB.

The widthObj value depends on the selected class: col1, col2, col3, respectively.

The main used color: #585857; font-family: Arial; font-size: 12px;

Has resorted to the help of a site:

https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css

for the output of internal arrows

The freeTextSearch.jsx component adds the text search capability. Magnifier is built using SVG.
