//resources/js/pages/Login.vue
<template>
  <div>
    <b-container class="mt-5">
      <b-row class="justify-content-center">
        <b-col md="5">
          <h2>Login</h2>
          <br />
          <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
            {{ serverError }}
          </b-alert>
          <b-form @submit.stop.prevent="onSubmit" @reset="onReset">
            <b-form-group id="input-group-1" label="Email" label-for="input-1">
              <b-form-input
                id="email"
                name="email"
                v-model="form.email"
                v-validate="{ required: true }"
                :state="validateState('email')"
                type="email"
                placeholder="Enter email"
              ></b-form-input>
              <b-form-invalid-feedback id="email-feedback">{{
                veeErrors.first("email")
              }}</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Password"
              label-for="input-2"
            >
              <b-form-input
                id="password"
                name="password"
                v-model="form.password"
                v-validate="{ required: true }"
                :state="validateState('password')"
                placeholder="Enter Password"
                type="password"
              ></b-form-input>
              <b-form-invalid-feedback id="password-feedback">{{
                veeErrors.first("password")
              }}</b-form-invalid-feedback>
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
import { mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        email: "",
        name: "",
        food: null,
        checked: [],
      },
      serverError: "",
      showDismissibleAlert: false,
    };
  },
  components: {},
  methods: {
    ...mapActions({
      getUser: "auth/getUser",
    }),
    onSubmit(event) {
      this.$validator.validateAll().then((result) => {
        if (!result) {
          return;
        }
        // event.preventDefault();
        axios.get("http://localhost:8000/sanctum/csrf-cookie").then(() => {
          axios
            .post("/login", {
              ...this.form,
            })
            .then(() => {
              this.getUser().then((res) => {
                this.$router.push("/dashboard");
              });
            })
            .catch((err) => {
              this.serverError = null;
              this.$validator.reset();
              if (err.response.data && err.response.data.msg) {
                this.showDismissibleAlert = true;
                this.serverError = err.response.data.msg;
              }
            });
        });
      });
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.password = null;
      this.$nextTick(() => {
        this.$validator.reset();
      });
    },
    validateState(ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref);
      }
      return null;
    },
  },
};
</script>

<style>
</style>