<template>
    <v-app>
        <v-toolbar dense max-height="50px" v-if="logged">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>Title</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </v-toolbar>

        <v-navigation-drawer
              v-model="drawer"
              absolute
              bottom
              temporary
              v-if="logged"
            >
              <v-list
                nav
                dense
              >

              
                <v-list-item link >
                  <v-list-item-icon>
                    <v-icon>mdi-view-dashboard</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>Dashboard</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item link @click="handleLogout">
                  <v-list-item-icon>
                    <v-icon>mdi-logout-variant</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>Logout</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                
              </v-list>

              <template v-slot:append>
        <div class="pa-2">
          <v-btn block>
            Logout
          </v-btn>
        </div>
      </template>
        </v-navigation-drawer>
        
        <v-main>
          <v-fade-transition mode="out-in">
            <router-view></router-view>
          </v-fade-transition>
        </v-main>
    </v-app>

</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {

    data() {

        return {
            drawer: false
        };
    },
    methods: {
        ...mapActions({
            logout: "auth/logout",
        }),

        handleLogout() {
            this.logout();
            this.$router.push({path: '/'});
        }

    },

    computed: {
        ...mapGetters([
          'auth/getAuthenticated'
        ]),
        logged(){
            return this['auth/getAuthenticated'];
        }
    },
};
</script>