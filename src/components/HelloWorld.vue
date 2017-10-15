<template>
  <div class="hello">
    <button class="btn btn-default" @click="handleFbLoginClick()">Login with Facebook</button>
  </div>
</template>

<script>
  import AuthApi from '../api/auth_api'

  export default {
    name: 'HelloWorld',
    data () {
    },
    methods: {
      handleFbLoginClick () {
        FB.login(function (response) {
          if (response.status === 'connected') {
            FB.api('/me', { fields: 'first_name,last_name,email,picture' }, (me) => {
              console.log(`me`, me)
            })
//            AuthApi.authFacebook(response)
          } else {
          }
        }, {scope: 'public_profile,email', return_scopes: true})
      }
    }
  }
</script>
