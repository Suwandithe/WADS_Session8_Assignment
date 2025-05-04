# WADS_Session8_Assignment - Creating REST API for Todo App frontend

## API Docummentation using swaggerjs

### Authentication

### Endpoints:
![register](./apiDocs/userRegister1.jpg)
![register2](./apiDocs/userRegister2.jpg)

To register an account, user must fill in 3 fields which are name, email, and password. As we can see from the picture above, the backend return a message that says user is created, but not verified. Therefore, we will verify it using the verification code that the backend has generated as well.

![verifyEmail](./apiDocs/verifyEmail1.jpg)
![verifyEmail2](./apiDocs//verifyEmail2.jpg)

To verify the registered email, user will first receive an email that contain a verification code after they register their account. As we can see from the picture above, once I entered the verification code, my registered email has been verified successfully. Then, I can login to the todo app.

![login](./apiDocs/userLogin1.jpg)
![login2](./apiDocs/userLogin2.jpg)

To login to the todo app, user must provide their email and password that they input in the register form.

![logout](./apiDocs/userLogout1.jpg)
![logout](./apiDocs/userLogout2.jpg)

User can also logout from the todo app, and they cannot access the todo app if they are logget out.

![middleware](./apiDocs/middleWare.jpg)

As mentioned previously, if the user is logged out, they will not be able to access any services from the todo app. They need to login again to access it, so we will login again and perform the CRUD for the todo app.

![getTodo](./apiDocs/getTodo.jpg)

As we can see, after we logged in, we can already access the todo app services. The picture above is the getTodo function that responsible to fetch all task for a specific user.

![addTodo](./apiDocs/addTodo.jpg)
![addTodo2](./apiDocs/addTodo2.jpg)

To add a task, user must provide at least the title of the task. They can leave the description as null if they do not want any description. As we can see from the picture above, the task is created for the account that we are logged in.

![updateTodo](./apiDocs/updateTodo.jpg)
![updateTodo2](./apiDocs/updateTodo2.jpg)

To update a todo, user will need to input the details that they want to update, and just simply save it.

![deleteTodo](./apiDocs/deleteTodo.jpg)

User can also delete the their specific task if they do not want it on their list anymore.




