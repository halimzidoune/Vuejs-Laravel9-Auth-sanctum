<template>
  <div>
    <v-main>
            <v-container fluid>
                <v-row justify="center" class="mt-15">
                    <v-col cols="12" lg="6" md="8">
                        <v-alert v-if="serverError" prominent type="error" class="my-3">
                            <v-row align="center">
                                <v-col class="grow">
                                    {{ serverError}}
                                </v-col>
                            </v-row>
                        </v-alert>
                        <form @submit.prevent="onSubmit">
                            <v-card>
                                <v-card-text>
                                    <div class="my-5">
                                        <v-row>
                                            <v-col cols="12" lg="6" md="6">
                                                <v-avatar tile size="300" style="margin-top: -30px">
                                                    <v-img src="/images/login22.svg"
                                                           aspect-ratio="1" >
                                                        <template v-slot:placeholder>
                                                            <v-row class="fill-height ma-0" align="center"
                                                                   justify="center">
                                                                <v-progress-circular
                                                                    indeterminate
                                                                    dark
                                                                ></v-progress-circular>
                                                            </v-row>
                                                        </template>
                                                    </v-img>
                                                </v-avatar>
                                            </v-col>
                                            <v-col cols="12" lg="6" md="6">
                                                <v-text-field v-model="form.email" outlined label="Email *" required
                                                              type="email"></v-text-field>
                                                <v-text-field v-model="form.password" outlined label="Mot de passe *"
                                                              required
                                                              type="password"></v-text-field>
                                                <v-btn :loading="loading" type="submit" dark large block>
                                                    Connexion
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                        <div class="mt-5 text-center">
                                            <v-row>
                                                <v-col cols="12" lg="12" md="12">
                                                    <h4 class="text-center">
                                                        © <a href="https://site.com" target="_blank">website.com</a>
                                                        2021 - Tous droits réservés. </h4>
                                                </v-col>
                                            </v-row>
                                        </div>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </form>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {

  data() {
    return {
      loading: false,
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