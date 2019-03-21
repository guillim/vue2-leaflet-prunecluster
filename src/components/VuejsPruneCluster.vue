<template>
  <div>
    <button @mouseover='move($event)'> I'm alive </button>
  </div>
</template>

<script>
export default {
  data () {
   return {}
  },

  methods: {
    move (event) {
        let pos = event.target.style.float; 
      if(pos === 'left'){
        event.target.style.float = 'right'
      }else{
        event.target.style.float = 'left'
      }
    }
  }
}

</script>

<style scoped>

</style>
