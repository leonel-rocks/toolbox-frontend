# toolbox-frontend

Welcome to my code challenge. 

This repository contains a web application, using **React + React Bootstrap**, which consumes an API Rest implemented on **toolbox-backend**. Also, I'm using **Redux** to store the files information.

First of all you should run the project on **NodeJs 16**. You can use nvm to easily change versions. 

**Example:** ```nvm use 16.14.0```

Then ```npm install``` and run ```npm start```

Once you run the project you should be redirected to root route '/', where you can find the following content:

![image](https://user-images.githubusercontent.com/34432135/158038016-d97fd57e-e793-44e1-b00d-545374a39282.png)

The information is about CSV files sorted in columns (FileName, Text, Number and Hex)

This interface allows you to navigate through CSV file pages by default:

![image](https://user-images.githubusercontent.com/34432135/158038067-3d7d50ea-47a4-467b-91e4-5227c3c87bdb.png)

However if you want to search an specific file just type the file name:

![image](https://user-images.githubusercontent.com/34432135/158038077-5e069cb9-18ad-4585-b3b9-336755137868.png)

If the file you are searching does not exist, you should see the following message:

![image](https://user-images.githubusercontent.com/34432135/158038127-52ab5d4c-779c-4bce-bfde-32c63cf2a9ea.png)

The application is responsive :)

![image](https://user-images.githubusercontent.com/34432135/158038139-f4f4af3e-6fe9-4829-b369-756db644ba5d.png)

Unit tests were implemented using **Jest + Enzyme**. Coverage results are as follows:

![image](https://user-images.githubusercontent.com/34432135/158038189-288b4e92-230e-4a94-9320-4bddfd24bd59.png)

![image](https://user-images.githubusercontent.com/34432135/158038162-b04465b8-92c7-4f12-8f11-73c4b538a8a9.png)

To run tests use ```npm test```

I'm always happy to receive feedback. If you think I need to improve my code, please leave a comment ;)
