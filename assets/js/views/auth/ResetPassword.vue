<template>
  <div>
    <h1>Reset Password</h1>
    <form method="POST">
      <legend>Reset Password</legend>
      <div class="form-group"><label for="new_password">New Password</label><input class="form-control" type="password" id="new_password" name="new_password" value="" placeholder="New password" autofocus="autofocus" required="required" /></div>
      <div class="form-group"><label for="confirm_password">Confirm Password</label><input class="form-control" type="password" id="confirm_password" name="confirm_password" value="" placeholder="Confirm password" required="required" /></div>
      <div class="form-group"><button class="btn btn-primary" type="submit">Update Password</button></div>
    </form>
  </div>

</template>

<script>
  export default {
    mounted() {
      console.log('Component mounted.')
    }
  }
</script>