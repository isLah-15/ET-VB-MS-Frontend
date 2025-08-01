// register_and_login.cy.js

describe('Registration and Login Page E2E Tests', () => {

  // Before each test, we'll visit the appropriate page.
  // We assume the base URL is configured in cypress.config.js, e.g., baseUrl: 'http://localhost:3000'

  // Test suite for the registration page
  describe('Registration Page', () => {
    beforeEach(() => {
      // Visit the registration page before each test in this suite
      cy.visit('http://localhost:5173/register');
    });

    it('should display validation errors for required fields', () => {
      // Do not fill out any fields and click the submit button
      cy.get('button[type="submit"]').click();

      // Check for validation error messages for each required field
      cy.contains('First name is required').should('be.visible');
      cy.contains('Last name is required').should('be.visible');
      cy.contains('Email is required').should('be.visible');
      cy.contains('Address is required').should('be.visible');
      cy.contains('Confirm your password').should('be.visible');
    });

    it('should display an error if passwords do not match', () => {
      // Fill out the form with a mismatched password
      cy.get('input[placeholder="Password"]').type('password123');
      cy.get('input[placeholder="Confirm Password"]').type('different-password');
      cy.get('button[type="submit"]').click();

      // Check for the "Passwords must match" error message
      cy.contains('Passwords must match').should('be.visible');
    });

    it('should successfully register a new user and navigate to the verification page', () => {
      // Intercept the API request to the registration endpoint to mock a successful response.
      // This prevents an actual network call and allows us to test the UI flow.
      cy.intercept('POST', '**/auth/register', {
        statusCode: 201,
        body: { message: 'User created successfully' },
      }).as('registerUser');

      // Fill out the registration form with valid data
      cy.get('input[placeholder="First Name"]').type('Cypress');
      cy.get('input[placeholder="Last Name"]').type('Test');
      cy.get('input[data-cy="register-email"]').type('cypress.test@example.com');
      cy.get('input[placeholder="Phone Number"]').type('1234567890');
      cy.get('input[placeholder="Address"]').type('123 Test Street');
      cy.get('input[placeholder="Password"]').type('Password123!');
      cy.get('input[placeholder="Confirm Password"]').type('Password123!');

      // Submit the form
      cy.get('button[type="submit"]').click();

      // Wait for the API call to complete
      cy.wait('@registerUser');

      // Assert that the success toast notification appears
      cy.contains('Registration successful!').should('be.visible');
      
      // Assert that the URL navigates to the verification page
      cy.url().should('include', '/verify');
    });
  });

  // Test suite for the login page
  describe('Login Page', () => {
    beforeEach(() => {
      // Visit the login page before each test in this suite
      cy.visit('/login');
    });

    it('should display an error message for empty login fields', () => {
      // Click the login button without entering any credentials
      cy.get('button[type="submit"]').click();

      // Assert that the error message is visible
      cy.get('p.text-red-600').should('be.visible').and('contain', 'Please enter both email and password.');
    });

    it('should display an error message for failed login', () => {
      // Intercept the login API request and mock a failed response
      cy.intercept('POST', '**/auth/login', {
        statusCode: 401,
        body: { message: 'Login failed. Please try again.' },
      }).as('failedLogin');

      // Fill in invalid credentials
      cy.get('#email').type('invalid@email.com');
      cy.get('#password').type('wrongpassword');

      // Click the login button
      cy.get('button[type="submit"]').click();

      // Wait for the API call to finish
      cy.wait('@failedLogin');

      // Assert that the error message is displayed
      cy.get('p.text-red-600').should('be.visible').and('contain', 'Login failed. Please try again.');
    });

    it('should successfully log in and navigate to the home page', () => {
      // Intercept the login API request and mock a successful response
      cy.intercept('POST', '**/auth/login', {
        statusCode: 200,
        body: {
          user: { id: 1, email: 'test@example.com' },
          token: 'mock-auth-token-123',
        },
      }).as('successfulLogin');

      // Fill in valid credentials
      cy.get('#email').type('test@example.com');
      cy.get('#password').type('correctpassword');

      // Click the login button
      cy.get('button[type="submit"]').click();

      // Wait for the API call to finish
      cy.wait('@successfulLogin');

      // Assert that the URL navigates to the home page
      cy.url().should('include', '/home');
    });

    it('should navigate to the registration page when the "Sign Up" button is clicked', () => {
      // Click the "Sign Up" button on the login page
      cy.contains('Sign Up').click();

      // Assert that the URL navigates to the registration page
      cy.url().should('include', '/register');
    });
  });
});

