// Option Variable
let option = '';

// User's field variables
let userFirstName = '';
let userMiddleName = '';
let userLastName = '';
let userGender = '';
let userAge = -1;
let userAddress = '';
let userEmail = '';
let userContactNumber = '';
let userUsername = '';
let userPassword = '';
let userConfirmPassword = '';

// User's get data from prompt variables
let getUserFirstName = '';
let getUserMiddleName = '';
let getUserLastName = '';
let getUserGender = '';
let getUserAge = -1;
let getUserAddress = '';
let getUserEmail = '';
let getUserContactNumber = '';
let getUserUsername = '';
let getUserPassword = '';
let getUserConfirmPassword = '';

// Variable for saving user data
let userSave = '';

// An empty arrays to store data
const usersList = [];
const productsList = [];
const productCartList = [];

// Variable for Adding Product
let productName = '';
let productPrice = 0;

// Variable for calculation
let totalPrice = 0;

//Customers Variables
let customerFullName = ''

// Main Menu
function mainMenu() {
  option = prompt(`========================================
                            WELCOME TO POS SYSTEM
========================================\n
Choose an option:
A. Login  
B. Register
C. Exit\n
Enter Option:`);

  while (option.toUpperCase() !== 'C') {
    if (option.toUpperCase() === 'A') {
      login();
    } else if (option.toUpperCase() === 'B') {
      createUser();
    } else {
      option = prompt(`========================================
                            WELCOME TO POS SYSTEM
========================================\n
Choose an option:
A. Login
B. Register
C. Exit\n
Invalid Option! Please try again.
Enter Option:`);
      continue;
    }

    option = prompt(`========================================
                           WELCOME TO POS SYSTEM
========================================\n
Choose an option:
A. Login  
B. Register
C. Exit\n
Enter Option:`);
  }

  if (option.toUpperCase() === 'C') {
    option = prompt("Are you sure you want to exit? Yes/No (Y/N)");

    if (option.toUpperCase() === "YES" || option.toUpperCase() === "Y") {
      alert("Exiting the program. Thank you!");
    } else if (option.toUpperCase() === "NO" || option.toUpperCase() === "N") {
      mainMenu();
    } else {
      option = prompt("Invalid Input! Please try again.\nAre you sure you want to exit? Yes/No (Y/N)");
    }
  }
}


// Function to create a new user account
function createUser() {
  getUserFirstName = prompt('Enter your first name:');

  while (!getUserFirstName) {
    getUserFirstName = prompt('First name is required.\nEnter your first name:');
  }

  getUserMiddleName = prompt('Enter your middle name:');

  getUserLastName = prompt('Enter your last name:');
  while (!getUserLastName) {
    getUserLastName = prompt('Last name is required.\nEnter your last name:');
  }

  getUserGender = prompt('Enter your gender:');

  while (!getUserGender) {
    getUserGender = prompt('Gender is required.\nEnter your gender:');
  }

  getUserAge = parseInt(prompt('Enter your age:'));

  while (!getUserAge) {
    getUserAge = parseInt(prompt('Age is required.\nEnter your age:'));
  }

  getUserAddress = prompt('Enter your address:');

  while (!getUserAddress) {
    getUserAddress = prompt('Address is required.\nEnter your address:');
  }

  getUserContactNumber = prompt('Enter your contact number:');
  getUserEmail = prompt('Enter your email:');

  while (!getUserContactNumber && !validateUserEmail(getUserEmail)) {
    getUserContactNumber = prompt('Contact number or email is required.\nEnter your contact number:');
    getUserEmail = prompt('Enter your email:');
    if (!validateUserEmail(getUserEmail)) {
      getUserEmail = prompt('Invalid email. Please enter a valid email address.\nEnter your email: ');
    }
  }

  getUserUsername = prompt('Enter your username:');

  while (!getUserUsername || isUsernameTaken(getUserUsername)) {
    getUserUsername = prompt('Enter your username:');
    if (!getUserUsername) {
      getUserUsername = prompt('Username is required.\nEnter a username:');
    } else if (isUsernameTaken(getUserUsername)) {
      getUserUsername = prompt('Username already exists. Please try again!\nEnter a username:');
    }
  }

  getUserPassword = prompt('Enter your password:');
  getUserConfirmPassword = prompt('Confirm your password:');

  while (getUserPassword != getUserConfirmPassword || getUserPassword === '') {
    getUserPassword = prompt('Passwords do not match. Please try again!\nEnter a password:');
    getUserConfirmPassword = prompt('Confirm your password:');
  }

let userSave = false;
let validOptions = ['YES', 'Y', 'NO', 'N'];

while (!userSave) {
  userSave = prompt("Save the user? Yes/No (Y/N)");

  if (!userSave) {
    alert("Select one of the options.");
    continue;
  }

  userSave = userSave.toUpperCase();

  if (!validOptions.includes(userSave)) {
    alert("Invalid option. Please select Yes/No (Y/N).");
    userSave = false;
  }
}

if (userSave === 'YES' || userSave === 'Y') {
  // Save the user data
  usersList.push({
    userFirstName: getUserFirstName,
    userMiddleName: getUserMiddleName ? getUserMiddleName : '',
    userLastName: getUserLastName,
    userGender: getUserGender,
    userAge: getUserAge,
    userAddress: getUserAddress,
    userContactNumber: getUserContactNumber,
    userEmail: getUserEmail,
    userUsername: getUserUsername,
    userPassword: getUserPassword,
  });
  alert('User successfully saved.');
} else {
  alert('User has not been saved.');
}

mainMenu();
}

// To check if the username is already taken
function isUsernameTaken(username) {
  return usersList.some((user) => user.userUsername === username);
}

// To validate an email address
function validateUserEmail(email) {
  const userEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return userEmailRegex.test(email);
}

// To authenticate the user
function login() {
  const userUsername = prompt('Enter your username:');
  const userPassword = prompt('Enter your password:');

  // Check if the user exists in usersList array and the password is correct
  let user = null;
  for (let i = 0; i < usersList.length; i++) {
    if (usersList[i].userUsername === userUsername && usersList[i].userPassword === userPassword) {
      user = usersList[i];
      break;
    }
  }

  if (user) {
    Dashboard(user);
  } else {
    alert('Invalid username or password. Please try again.');
    login();
  }
}

// To display the main menu
function Dashboard(user) {
  while (option !== 'C' && option !== 'c') {
    option = prompt(`Logged in, ${user.userFirstName} ${user.userMiddleName ? user.userMiddleName[0].toUpperCase() + '. ' : ''} ${user.userLastName}!

Select an Option:
A.) Cashier
B.) Add Products
C.) Exit

Enter Option: `);

    if (option.toUpperCase() === 'A') {
      cashier(user, productsList, totalPrice, productCartList, customerFullName);
    } else if (option.toUpperCase() === 'B') {
      addProducts(user, productsList, totalPrice, productCartList);
    } else if (option.toUpperCase() === 'C') {
      alert('Exiting the dashboard. Thank you!');
      break;
    } else {
      option = prompt(`Logged in, ${user.userFirstName} ${user.userMiddleName ? user.userMiddleName[0].toUpperCase() + '. ' : ''} ${user.userLastName}!

Select an Option:
A.) Cashier
B.) Add Products
C.) Exit
  
Invalid choice. Please try again.
Enter Option: `);
    break;
    }
  }
}

function addProducts(user, productsList, totalPrice, productCartList) {
  let productsListString = '';

  for (let i = 0; i < productsList.length; i++) {
    productsListString += `${i + 1}. ${productsList[i].productName} - ₱${productsList[i].productPrice}\n`;
  }

  productsListString += '\nX.) Exit';

  let option = prompt(`Available Products:\n${productsListString}\n\nEnter the name of the product:`);

  while (!option) {
    option = prompt(`Product name is required!\nEnter the name of the product:`);
  }

  if (option.toUpperCase() === "X") {
    option = prompt("Are you sure you want to Exit? Yes/No (Y/N)");
    if (option.toUpperCase() === "YES" || option.toUpperCase() === "Y") {
      Dashboard(user, productsList, totalPrice, productCartList);
      return;
    } else if (option.toUpperCase() === "NO" || option.toUpperCase() === "N") {
      addProducts(user, productsList, totalPrice, productCartList);
    } else {
      option = prompt("Invalid input, please try again!\nAre you sure you want to Exit? Yes/No (Y/N)");
    }
  } else if (option.toUpperCase() === "N") {
    addProducts(user, productsList, totalPrice, productCartList);
  } else if (option.toUpperCase() === "YES" || option.toUpperCase() === "Y") {
    Dashboard(user, productsList, totalPrice, productCartList);
    return;
  }

  const productName = option;

  let productPrice = parseFloat(prompt(`Product price:`));

  while (isNaN(productPrice)) {
    productPrice = parseFloat(prompt(`Invalid input try again!\nProduct price:`));
  }

  let saveProduct = prompt(`Save the product? Yes/No (Y/N): `);

  while (saveProduct.toUpperCase() !== 'YES' && saveProduct.toUpperCase() !== 'Y' && saveProduct.toUpperCase() !== 'NO' && saveProduct.toUpperCase() !== 'N') {
    saveProduct = prompt(`Invalid input. Please enter YES/NO or Y/N:`);
  }

  if (saveProduct.toUpperCase() === 'YES' || saveProduct.toUpperCase() === 'Y') {
    // Check if products limit is reached
    if (productsList.length === 7) {
      alert('Cannot add more products. There are already 7 products!');
      Dashboard(user, productsList, totalPrice, productCartList);
    } else {
      // Save the product
      const newProduct = {
        productName: productName,
        productPrice: productPrice
      };

      productsList.push(newProduct);
      alert('Product saved successfully!');
      addProducts(user, productsList, totalPrice, productCartList);
    }
  } else {
    alert('Product not saved!');
    addProducts(user, productsList, totalPrice, productCartList);
  }
}



function cashier(user, productsList, totalPrice, productCartList) {
  let productsListString = '';
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  for (let i = 0; i < productsList.length; i++) {
    let letter = letters[i];
    productsListString += `${letter}.) ${productsList[i].productName} - ₱${productsList[i].productPrice}\n`;
  }

  if (productsList.length === 0) {
    alert('There are no available products!');
    Dashboard(user, productsList, totalPrice, productCartList);
  } else {
    productsListString += '\nH.) Checkout\nX.) Exit\n';
    let option = prompt(`Available Products:\n${productsListString}\nTotal Price: ₱${totalPrice}\n\nEnter an option:`);

    if (option.toUpperCase() === 'H') {
      option = prompt("Are you sure you want to checkout? Yes/No (Y/N)");

      if (option.toUpperCase() === "YES" || option.toUpperCase() === "Y") {
        customerName(user, productsList, totalPrice, productCartList);
      } else if (option.toUpperCase() === "NO" || option.toUpperCase() === "N") {
        cashier(user, productsList, totalPrice, productCartList);
      } else {
        option = prompt("Invalid Input! Please try again.\nAre you sure you want to exit? Yes/No (Y/N)");
        if (option.toUpperCase() === "YES" || option.toUpperCase() === "Y") {
          alert("Exiting the cashier. Thank you!");
          Dashboard(user, productsList, totalPrice, productCartList);
        } else if (option.toUpperCase() === "NO" || option.toUpperCase() === "N") {
          cashier(user, productsList, totalPrice, productCartList);
        } else {
          option = prompt("Invalid Input! Please try again.\nAre you sure you want to exit? Yes/No (Y/N)");
        }
      }
    } else if (option.toUpperCase() === 'X') {
      option = prompt("Are you sure you want to exit? Yes/No (Y/N)");

      if (option.toUpperCase() === "YES" || option.toUpperCase() === "Y") {
        alert("Exiting the program. Thank you!");
      } else if (option.toUpperCase() === "NO" || option.toUpperCase() === "N") {
        cashier(user, productsList, totalPrice, productCartList);
      } else {
        option = prompt("Invalid Input! Please try again.\nAre you sure you want to exit? Yes/No (Y/N)");
      }
    } else if (letters.includes(option.toUpperCase())) {
      let selectedProduct = productsList[letters.indexOf(option.toUpperCase())];
      let getProductQuantity;
      let validQuantity = false;

      while (!validQuantity) {
        getProductQuantity = parseInt(prompt(`Enter quantity for ${selectedProduct.productName}:`));

        if (isNaN(getProductQuantity) || getProductQuantity <= 0) {
          getProductQuantity = parseInt(prompt(`Invalid quantity! Please enter a valid quantity.\nEnter quantity for ${selectedProduct.productName}:`));
        } else {
          validQuantity = true;
        }
      }

      const product = {
        productName: selectedProduct.productName,
        productPrice: selectedProduct.productPrice,
        productQuantity: getProductQuantity
      };

      productCartList.push(product);
      totalPrice += selectedProduct.productPrice * getProductQuantity;
      cashier(user, productsList, totalPrice, productCartList);
    } else {
      cashier(user, productsList, totalPrice, productCartList);
    }
  }
}

function customerName(user, productsList, totalPrice, productCartList) {
  // Customer fields
  let customerFirstName = prompt("Customer first name:");

  while (!customerFirstName) {
    customerFirstName = prompt("Customer first name is required!\nCustomer first name:");
  }

  let customerMiddleName = prompt("Customer middle name:");

  let customerLastName = prompt("Customer last name:");

  while (!customerLastName) {
    customerLastName = prompt("Customer last name is required!\nCustomer last name:");
  }

  customerFullName = `${customerFirstName} ${customerMiddleName ? customerMiddleName[0].toUpperCase() + '.' : ''} ${customerLastName}`;

  checkout(user, productsList, totalPrice, productCartList, customerFullName);
}

function checkout(user, productsList, totalPrice, productCartList, customerFullName) {
  let totalAmount = 0;
  let checkoutDisplay = '';
  let receipt = '';

  // For Checkout Display
  checkoutDisplay += `========================================
                                            CHECKOUT
========================================\n\nCustomer Name: ${customerFullName}\n`;
  checkoutDisplay += 'Cart:\nProducts\t\t-Price\t\t-Quantity\t\t-Sub Total\n';

  for (let i = 0; i < productCartList.length; i++) {
    const product = productCartList[i];
    const subtotal = product.productPrice * product.productQuantity;
    totalAmount += subtotal;
    checkoutDisplay += `${product.productName} \t\t ₱${product.productPrice} \t\t ${product.productQuantity} \t\t ₱${subtotal}\n`;
  }

  checkoutDisplay += `\nTotal Price: ₱${totalAmount}\n`;

  let amountPaid = parseFloat(prompt(`${checkoutDisplay}\nEnter amount:`));

  while (!amountPaid || totalAmount > amountPaid) {
    amountPaid = parseFloat(prompt(`${checkoutDisplay}\nInsufficient! Please try again!\nEnter amount:`));
  }

  receipt += `========================================
                                  THANK YOU FOR SHOPPING!
========================================\n`;
  receipt += 'Products\t\t-Price\t\t-Quantity\t\t-Sub Total\n';

  for (let i = 0; i < productCartList.length; i++) {
    const product = productCartList[i];
    const subtotal = product.productPrice * product.productQuantity;
    receipt += `${product.productName} \t\t ₱${product.productPrice} \t\t ${product.productQuantity} \t\t ₱${subtotal}\n`;
  }

  let customerChange = amountPaid - totalAmount;

  alert(`${receipt}\nAmount: ₱${amountPaid}\nTotal Amount Paid: ₱${totalAmount}\nChange: ₱${customerChange}\n\nThank you for shopping ${customerFullName}, come again!`);

  // Clear productCartList , totalPrice and customerFullName
  productCartList = [];
  totalPrice = 0;
  customerFullName = '';

  // Return to the cashier function
  cashier(user, productsList, totalPrice, productCartList, customerFullName);
}


// Main Function To Start The Program 
mainMenu();

