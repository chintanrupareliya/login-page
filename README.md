# LogIn-SingUp

Login singUp page for website with backend in mongodb

# LogIn-SignUp

This repository contains a simple LogIn and SignUp system implemented using HTML, CSS, and JavaScript and for BACKEND it use node.js , express , mongodb , bcryptjs.
## Page Screenshot
![login page](https://ik.imagekit.io/o5vougxqi/Screenshot_2023-05-20_161311.png?updatedAt=1684579549291)
![Singup page](https://ik.imagekit.io/o5vougxqi/singup.png?updatedAt=1684579507547)
## Features

- User registration: Users can sign up for a new account by providing a unique username,email and password.
- User authentication: Once registered, users can log in using their email and password.
- Password hashing: User passwords are securely hashed before storing them in the database.
- Responsive design: The application is designed to adapt to different screen sizes, providing a good user experience on both desktop and mobile devices.
- Login with your Google account: Click on the "Continue with Google" button to securely log in using your Google credentials.
- Logout: You can log out of your account by clicking on the "Logout" button.

## Installation

To run this application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/chintanrupareliya/LogIn-SingUp.git
   ```

2. Navigate to the project directory:

   ```bash
   cd LogIn-SingUp
   ```
   
3. Create your google Oauth2 api and put client id hear

![change this with your google client id](https://ik.imagekit.io/o5vougxqi/Screenshot_2023-06-19_231855.png?updatedAt=1687197057348)
   
# for Backend

1.Navigate to the BACKEND directory:

   ```bash
   cd BACKEND
   ```
   
2. Make sure you install mongodb if not installed [visit this](https://www.geeksforgeeks.org/how-to-install-mongodb-on-windows/) 
   and install it 
   
3. Create `.env` file in `BACKEND` directory and add following ditalis
   1. JWT_SECRET = "Your secret key"
   2. MONGO_URL = "your mongodb url for database"
   3.  PORT = 3030
   
4. Run:
    ```bash
    npm i
    ```
    
5. Run:
    ```bash
    nodemon index.js
    ```
    
# for frontend

1. Open the `login.html` file in your web browser.

## Usage

1. Open the application in your web browser.
2. Register a new account by providing a unique username and password.
3. Log in using your registered credentials

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please create a new issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [Bootstrap](https://getbootstrap.com/) - A popular front-end framework for building responsive websites.
- [Font Awesome](https://fontawesome.com/) - An icon set and toolkit used for adding icons to the application.

## Contact

If you have any questions or feedback, feel free to contact the project owner:

- Name: Chintan Rupareliya
- GitHub: [chintanrupareliya](https://github.com/chintanrupareliya)
