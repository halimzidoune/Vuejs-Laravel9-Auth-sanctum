<template>
  <div>
    <b-container class="mt-5">
      <b-row class="justify-content-center">
        <b-col md="5">
          <h2>Registration</h2>
          <br />
          <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group id="input-group-1" label="Name" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="form.name"
                type="text"
                placeholder="Enter name"
                :state="errors && !errors.name"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-1" label="Email" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                placeholder="Enter email"
                :state="errors && !errors.email"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Password"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="form.password"
                placeholder="Enter Password"
                type="password"
                :state="errors && !errors.password"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-2"
              label="Confirm Password"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="form.password_confirmation"
                placeholder="Confirm Password"
                type="password"
                :state="errors && !errors.password"
              ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary" class="mr-1"
              >Submit</b-button
            >
            <b-button type="reset" variant="danger mr-2">Reset</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        email: "",
        name: "",
        password: "",
        password_confirmation: "",
      },
      errors: null,
    };
  },
  components: {},
  methods: {
    onSubmit(event) {
      event.preventDefault();
      axios.get("http://localhost:8000/sanctum/csrf-cookie").then(() => {
        axios
          .post("/register", {
            ...this.form,
          })
          .then(() => {
            this.$router.push("/");
          })
          .catch((err) => {
            this.errors = err.response.data.errors;
          });
      });
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.password = null;
      this.form.password_confirmation = null;
    },
  },
};
</script>

<style>
</style>