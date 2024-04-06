<template>
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="card">
            <div class="card-header">
              <h3 class="text-center">Sign Up</h3>
            </div>
            <div class="card-body">
              <form @submit.prevent="onSubmit">
                <div class="form-group">
                  <label for="name">Name:</label>
                  <input type="text" class="form-control" id="name" v-model="name">
                </div>
                <div class="form-group">
                  <label for="email">Email:</label>
                  <input type="email" class="form-control" id="email" v-model="email">
                </div>
                <div class="form-group">
                  <label for="password">Password:</label>
                  <input type="password" class="form-control" id="password" v-model="password">
                </div>
                <div class="form-group">
                  <label for="confirmPassword">Confirm Password:</label>
                  <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword">
                </div>
                <button type="submit" class="btn btn-primary btn-block">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      };
    },
    methods: {
      async onSubmit() {
        try {
          const response = await axios.post("/api/users", {
            name: this.name,
            email: this.email,
            password: this.password
          });
  
          if (response.data.success) {
            // sign-up successful, display success message
            this.successMessage = response.data.message;
          } else {
            // sign-up unsuccessful, display error message
            this.errorMessage = response.data.message;
          }
        } catch (error) {
          // display error message
          this.errorMessage = error.message;
        }
      }
    }
  };
  </script>
  
  <style>
  .container {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .card {
    border: 0;
  }
  
  .card-header {
    background-color: #343a40;
    color: #fff;
    padding: 15px;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-control {
    border-radius: 0;
  }
  
  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
  }
  
  .btn-primary:hover {
    background-color: #0069d9;
    border-color: #0062cc;
  }
  
  .btn-primary:focus {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
  }
  
  .btn-block {
    width: 100%;
  }
  
  .alert {
    margin-top: 15px;
  }
  </style>